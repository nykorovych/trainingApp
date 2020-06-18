import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  exercisesChanged = new Subject<Exercise[]>();
  private fbSubs: Subscription[] = [];
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private exercise = [];

  constructor(private db: AngularFirestore, private uiService: UIService) {}
  fetchtAvailableExercises() {
    this.fbSubs.push(
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
          console.log(res);
          this.availableExercises = res;
          this.exercisesChanged.next([...this.availableExercises]);
        }, error => {
          this.uiService.showSnackBar('Fetching failed try again', null, 3000)
        })
    );
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
    this.addDataToDB({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      data: new Date(),
      state: 'cancelled',
    });
    (this.runningExercise = null), this.exerciseChanged.next(null);
  }
  completeExercise() {
    this.addDataToDB({
      ...this.runningExercise,
      data: new Date(Date.now()),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercise: any) => {
          console.log(exercise);
          this.finishedExercisesChanged.next(exercise);
        })
    );
  }
  private addDataToDB(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
  canselSubcription(){
    this.fbSubs.forEach(sub => sub.unsubscribe())
  }
}

