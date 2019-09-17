import { Component, OnInit, Input } from '@angular/core';
import { CustomModalPopUpModel } from '../custom-modal-pop-up/custom-modal-pop-up.model';
import { CustomModalPopUpService } from '../custom-modal-pop-up/custom-modal-pop-up.service';
@Component({
  selector: 'app-delete-pop',
  templateUrl: './delete-pop.component.html',
  styleUrls: ['./delete-pop.component.css']
})
export class DeletePopComponent implements OnInit {
  deletePopUpbasicSetting: any;
  AlertType: any;
  constructor(protected customModalPopUpService: CustomModalPopUpService) { }
  massage: any;
  ngOnInit() {
    this.createReseDataPopoup();
  }
  openDeletePopUp(text) {
    this.massage = text;
    this.customModalPopUpService.show(this.deletePopUpbasicSetting);
  }
  deleteClick() {
    this.customModalPopUpService.hide(this.deletePopUpbasicSetting);
  }
  createReseDataPopoup() {
    this.deletePopUpbasicSetting = new CustomModalPopUpModel();
    this.deletePopUpbasicSetting.id = 'DeleteDiloag';
    this.deletePopUpbasicSetting.title = 'Delete';
    this.deletePopUpbasicSetting.noButtons = true;
    this.deletePopUpbasicSetting.upperCross = true;
  }
}
