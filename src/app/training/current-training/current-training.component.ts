import { Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise.model';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer:number;
  step:number;
  exercise: Exercise;
  
  constructor(private store: Store<{training:fromTraining.State}>,public dialog: MatDialog,private exerciseService:ExerciseService) { }

  ngOnInit() {
    this.store.select(fromTraining.trainingFeatureKey).pipe(map(state => state.activeExercise)).subscribe(exercise => {
      this.exercise = exercise;
    });
    this.startOrResumeTimer();
  }

  startOrResumeTimer(){
    this.step = this.exercise.duration/100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if(this.progress >=100){
        this.exerciseService.completeExercise();
        clearInterval(this.timer);
      }
    },this.step);
  }

  stopTraining(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent,{
      width: '300px',
      data :{
        progress : this.progress   
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.exerciseService.cancelledExercise(this.progress);
      else
        this.startOrResumeTimer();
    });
  }

}
