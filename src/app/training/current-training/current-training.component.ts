import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingStop = new EventEmitter();
  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
   this.startOrStop()
  }
  startOrStop() {
    this.timer = Number(
      setInterval(() => {
        this.progress = this.progress + 5;
        if (this.timer > 100) {
          clearInterval(this.timer);
        }
      }, 1000)
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
        this.trainingStop.emit();
      } else {
        this.startOrStop()
      }
    });
  }
}
