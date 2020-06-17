import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() traingingStart = new EventEmitter();
  exercises: Exercise[]
  exerciseSubscribtion: Subscription

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
  ngOnInit(): void {
   this.exerciseSubscribtion = this.trainingService.exercisesChanged.subscribe(res => {
     this.exercises = res
   })
    this.trainingService.fetchtAvailableExercises()
    
  }
  ngOnDestroy(){
    this.exerciseSubscribtion.unsubscribe()
  }
}

