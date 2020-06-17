import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  availableExercises: Exercise[] = [];
  exercisesChanged = new Subject<Exercise[]>();

  constructor(private db: AngularFirestore) {}

  private runningExercise: Exercise;
  private exercise = [];

  fetchtAvailableExercises() {
    this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray: any) => {
          return docArray.map((arr) => {
            return {
              id: arr.payload.doc.id,
              name: arr.payload.doc.data().name,
              duration: arr.payload.doc.data().duration,
              calories: arr.payload.doc.data().calories,
            };
          });
        })
      )
      .subscribe((res: Exercise[]) => {
        this.availableExercises = res;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  startExercise(selectedId) {
    this.runningExercise = this.availableExercises.find(
      (exercise) => exercise.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }
  getRunningExercise() {
    return { ...this.runningExercise };
  }
  cancelExercise(progress: number) {
    this.exercise.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    (this.runningExercise = null), this.exerciseChanged.next(null);
  }
  completeExercise() {
    this.exercise.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  getCompletedOrCancelledExercises() {
    return this.exercise.slice();
  }
}
