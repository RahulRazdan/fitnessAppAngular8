import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseService } from './exercise.service';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  onGoingTraining$:Observable<boolean>;

  constructor(private store: Store<{training:fromTraining.State}>,private exerciseService:ExerciseService) { }

  ngOnInit() {
    this.store.select(fromTraining.trainingFeatureKey).pipe(map(state => state.activeExercise!=null)).subscribe(res => {
      console.log(res);
    })
    this.onGoingTraining$ = this.store.select(fromTraining.trainingFeatureKey).pipe(map(state => state.activeExercise!=null));
  }
}
