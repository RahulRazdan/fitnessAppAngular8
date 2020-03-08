import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['date', 'name', 'duration', 'calories','state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort,{static : true})
  sort: MatSort;

  @ViewChild(MatPaginator, {static: true}) 
  paginator: MatPaginator;

  constructor(private store: Store<{training:fromTraining.State}>,private exerciseService:ExerciseService) { }

  ngOnInit() {
    this.store.select(fromTraining.trainingFeatureKey).pipe(map(state => state.finishedExercises)).subscribe(
       (exercises:Exercise[]) => {
       this.dataSource.data = exercises;
       });

    this.exerciseService.getAllExercises(); 
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }
  applyFilter(event:Event){
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }
}
