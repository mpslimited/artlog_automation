import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpService } from '../../../core/services/http.service';
import { BaseComponent } from '../../../core/base/base.component';
import { BaseService } from '../../../core/base/base.service';
import { columnDefsArtLogs } from '../dashboard.data';
import { ArtLogModel } from '../dashboard.model';
import { CustomModalPopUpService } from '../../../component/custom-modal-pop-up/custom-modal-pop-up.service';
import { CustomModalPopUpModel } from '../../../component/custom-modal-pop-up/custom-modal-pop-up.model';
import { CustomerServicesUrls } from '../../../core/shared/constant/url-constants/customer-services.constants';
import { DropdownDataModel, AlertMessageService } from '../../../component';
import { Router } from '@angular/router';
import { GridAPII } from '../../../core/base/base.component';
import { SessionObject } from '../../../core/shared';
import { MenuItem, SelectItem, LazyLoadEvent } from 'primeng/api';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HeaderOpt } from '../token';
import { OverlayPanel } from 'primeng/overlaypanel';
import * as moment from 'moment';
import { unitOfTime } from 'moment';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-art-dashboard',
  templateUrl: './art-dashboard.component.html',
  styleUrls: ['./art-dashboard.component.css'],
  providers: [ConfirmationService]
})
export class ArtDashboardComponent extends BaseComponent implements OnInit {
  dcaSummary: any = [];
  overDuedt: any = [];
  highDt: any = [];
  mediumDt: any = [];
  lowDt: any = [];
  OptData: any = [];
  auth: any = [];
  public dataSource = new BehaviorSubject<AbstractControl[]>([]);
  public form: FormGroup;
  public contactList: FormArray;
  public duplicateJobsList: FormArray;
  constructor(
    private confirmationService: ConfirmationService,
    protected baseServices: BaseService,
    protected router: Router,
    protected httpService: HttpService,
    protected customModalPopService: CustomModalPopUpService,
    protected alert: AlertMessageService,
    private fb: FormBuilder ) {
    super(baseServices, router);
    const user = SessionObject.getUserDetails();
    this.auth = user;
      console.log('User Details : ', user);
    }

  ngOnInit() {
    this.finddsmsummary();
  }
  finddsmsummary() {
    let that = this;
    this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_DCASUMMARY, null, null).subscribe((data) => {
      that.dcaSummary = data;
      that.overDuedt = data.filter( d => d.artTeamStatus == 'Overdue' );
      that.highDt = data.filter( d => d.artTeamPriority == 'High ' );
      that.mediumDt = data.filter( d => d.artTeamPriority == 'Medium' );
      that.lowDt = data.filter( d => d.artTeamPriority == 'Low' );
      /// here in OptData have group wise By date data;
      that.OptData = data;
    });
  }
 /* allDataOfDCATastsummary() {
    console.log("function");
  }
  overdueDataOfDCATastsummary() {
    console.log("function");
  }
  allDataOfDCATastsummary() {
    console.log("function");
  }
  highDataOfDCATastsummary() {
    console.log("function");
  }
  mediumDataOfDCATastsummary() {
    console.log("function");
  }
  lowDataOfDCATastsummary() {
    console.log("function");
  }
  */
}
