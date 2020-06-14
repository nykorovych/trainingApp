import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) {}

  ngOnInit(): void {
   this.startOrStop()
  }
  startOrStop() {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000
    this.timer = Number(
      setInterval(() => {
        this.progress = this.progress + 22;
        if (this.progress >= 100) {
          this.trainingService.completeExercise()
          clearInterval(this.timer);
        }
      }, step)
    );
  }
 
  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });
    dialogRef.afterClosed().subscribe((la) => {
      if (la) {
        this.trainingService.cancelExercise(this.progress)
      } else {
        this.startOrStop()
      }
    });
  }
}
