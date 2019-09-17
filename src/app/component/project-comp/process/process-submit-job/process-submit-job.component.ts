import { Component, OnInit } from '@angular/core';
import { CustomModalPopUpService } from '../../../../component/custom-modal-pop-up/custom-modal-pop-up.service';
import { CustomModalPopUpModel } from '../../../../component/custom-modal-pop-up/custom-modal-pop-up.model';
@Component({
  selector: 'app-process-submit-job',
  templateUrl: './process-submit-job.component.html',
  styleUrls: ['./process-submit-job.component.css']
})
export class ProcessSubmitJobComponent implements OnInit {
  runPayProcessbasicSetting: any;
  AlertType: any;
  constructor(
    private customModalPopUpService: CustomModalPopUpService
  ) { }

  ngOnInit() {
    this.createReseDataPopoup();
  }

  createReseDataPopoup() {
    this.runPayProcessbasicSetting = new CustomModalPopUpModel();
    this.runPayProcessbasicSetting.id = 'runPayProcessSetupPop';
    this.runPayProcessbasicSetting.title = 'Run Pay Process';
    this.runPayProcessbasicSetting.noButtons = true;
    this.runPayProcessbasicSetting.upperCross = true;
    this.runPayProcessbasicSetting.large = false;

  }


  openSubmitJobPopUp() {

    this.customModalPopUpService.show(this.runPayProcessbasicSetting);
  }

}
