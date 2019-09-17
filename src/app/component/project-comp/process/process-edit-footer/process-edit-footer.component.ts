import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-process-edit-footer',
  templateUrl: './process-edit-footer.component.html',
  styleUrls: ['./process-edit-footer.component.css']
})
export class ProcessEditFooterComponent implements OnInit {
  @Input() form: any;
  @Output() onDoSave = new EventEmitter<string>();

  constructor(protected location: Location) { }


  ngOnInit() {
  }

  doOnSaveFooter() {
    this.onDoSave.emit('');

  }
  doOnCancelFooter() {
    this.location.back();

  }

}
