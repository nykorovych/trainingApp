import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() traingingStart = new EventEmitter()
  exercises: Exercise[]=[]

  constructor(private trainingService: TrainingService) { }

  onStartTraining(form: NgForm){
    this.trainingService.startExercise( form.value.exercise)
  }
  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises()
  }

}
