import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject, Subscription, pipe} from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import {map , take} from 'rxjs/operators';
import { UIService } from '../shared/ui.service';
import { State, startLoading,stopLoading } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';

@Injectable({
    providedIn : 'root'
})
export class ExerciseService {

    firebaseSubscriptions: Subscription[] = [];
    private availableExercises : Exercise[];

    constructor(private store: Store<{ui: State,training:fromTraining.State}>,private firestore: AngularFirestore,private uiService:UIService) { }

    getAvailableExercises(){
        this.store.dispatch(startLoading());
        this.firebaseSubscriptions.push(this.firestore.collection<Exercise>('availableExercises')
            .snapshotChanges().pipe(
            map(docArray => {
                return docArray.map(doc => {
                const data = doc.payload.doc.data() as Exercise;
                data.id = doc.payload.doc.id;
                return data;
                })
            })
            ).subscribe((exercises: Exercise[]) => {
                this.availableExercises = exercises;
                this.store.dispatch(fromTraining.availableExercise({exercises}));
                this.store.dispatch(stopLoading());
            },error => {
                this.store.dispatch(stopLoading());
                this.uiService.showSnackBar('Error loading exercises, try again!',null,3000);
            }));        
    }

    startExercise(selectedId:string){
        console.log(selectedId);
        let exercise = this.availableExercises.find(ex => ex.id === selectedId);
        console.log(exercise);
        this.store.dispatch(fromTraining.startExercise({exercise}));
    }

    getAllExercises(){
        this.firebaseSubscriptions.push(this.firestore.collection<Exercise>('finishedExercises').valueChanges().subscribe(
            (exercises:Exercise[]) => {
                this.store.dispatch(fromTraining.finishedExercise({exercises}));
            }
        ));
    }

    cancelfirebaseSubscriptions(){
        this.firebaseSubscriptions.forEach(sub => sub.unsubscribe());
    }

    completeExercise(){
        this.store.select(fromTraining.trainingFeatureKey).pipe(map(state => state.activeExercise)).pipe(take(1)).subscribe(exercise => {
            if(exercise){
                this.addDataToDb({
                    ...exercise,
                    date: new Date(),
                    state:'completed'
                });
                this.store.dispatch(fromTraining.stopExercise());
            }
        })        
    }
  
    cancelledExercise(progress:number){
        this.store.select(fromTraining.trainingFeatureKey).pipe(map(state => state.activeExercise)).pipe(take(1)).subscribe(exercise => {
            if(exercise){
                this.addDataToDb({
                    ...exercise,
                    duration : Number.parseInt((exercise.duration * (progress /100)).toFixed(2)),
                    calories :  Number.parseInt((exercise.calories * (progress /100)).toFixed(2)),
                    date: new Date(),
                    state:'cancelled'
                });
                this.store.dispatch(fromTraining.stopExercise());
            }
        })
    }

    private addDataToDb(exercise:Exercise){
        this.firestore.collection('finishedExercises').add(exercise);
    }
}