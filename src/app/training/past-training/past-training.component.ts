import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state']
  // IT ALWAYS ASSUMES THAT IT WILL BE AN ARRAY NO NEED TO <Exercise[]>()
  dataSource = new MatTableDataSource<Exercise>()

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises()
  }

}
