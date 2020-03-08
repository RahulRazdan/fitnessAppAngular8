import { Component, OnInit} from '@angular/core';
import {ExerciseService} from 'src/app/training/exercise.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/app.reducer';
import { map } from 'rxjs/operators';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  availableExercises$:Observable<Exercise[]>;
  isLoading$:Observable<boolean>;

  constructor(private store: Store<{ui: State,training:fromTraining.State}>,private exerciseService:ExerciseService,private uiService:UIService) { }

  ngOnInit() {
    this.isLoading$ = this.store.select('ui').pipe(map(state => state.isLoading));
    this.availableExercises$ = this.store.select(fromTraining.trainingFeatureKey).pipe(map(state => state.availableExercises));
    this.fetchExercises();
  }

  fetchExercises(){
    this.exerciseService.getAvailableExercises();
  }

  startTraining(form:NgForm){
    if(form.valid)
      this.exerciseService.startExercise(form.value.exercise);
  }

}
