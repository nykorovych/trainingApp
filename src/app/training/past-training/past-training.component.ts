import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state']
  exChangedSubscription: Subscription
  // IT ALWAYS ASSUMES THAT IT WILL BE AN ARRAY NO NEED TO <Exercise[]>()
  dataSource = new MatTableDataSource<Exercise>()
  @ViewChild(MatSort)sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private trainingService: TrainingService) { }

  doFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  ngOnInit(): void {
    this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe(exercise => {
      this.dataSource.data = exercise
    })
    this.trainingService.fetchCompletedOrCancelledExercises()
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }
  ngOnDestroy(){
    this.exChangedSubscription.unsubscribe()
  }

}
