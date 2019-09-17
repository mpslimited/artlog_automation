import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { IDGeneratorService } from '../../core/services';


export interface ModalApi {
  show: any;
  hide: any;
  onShow: any;
}

declare var $;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterViewInit {

  id: string;
  modalApi: ModalApi;

  @Input() title: string;
  @Input() large: boolean;
  @Input() upperCross = true;
  @Input() buttons: Array<string> = [];

  @Output() modalReady: EventEmitter<ModalApi> = new EventEmitter();
  @Output() buttonsClick: EventEmitter<string> = new EventEmitter();

  constructor(
    private idGen: IDGeneratorService
  ) {
    this.id = this.idGen.generateNormalIDs('modal');
  }

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.modalApi = {
      show: this.show,
      hide: this.hide,
      onShow: null
    };

    this.modalReady.emit(this.modalApi);

  }




  show = () => {
    $(`#${this.id}`).modal('show');
    if (this.modalApi.onShow) {
      this.modalApi.onShow();
    }

  }

  hide = () => {
    $(`#${this.id}`).modal('hide');
  }

  onButtonClick(button) {
    this.buttonsClick.emit(button);
  }

}
