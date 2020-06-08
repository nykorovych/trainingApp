import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() traingingStart = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  onStartTraining(){
    this.traingingStart.emit()
  }

}
