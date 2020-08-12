import { Component, OnInit, OnChanges } from '@angular/core';
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
import { GoogleChartsModule, ScriptLoaderService } from 'angular-google-charts';

@Component({
  selector: 'app-scorecardview',
  templateUrl: './scorecardview.component.html',
  styleUrls: ['./scorecardview.component.css'],
  providers: [ConfirmationService]
})

export class ScorecardviewComponent extends BaseComponent implements OnInit {
  // -- columans for filter Grid dropdown
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
  data = [];
  apex: any = {};
  Presets = [
    {'text':'Permission'},
    {'text':'Created Image'},
    {'text':'Shutterstock'},
    {'text':'Clip Art'},
  ];
  frmdt: any;
  Gdata: any = [];
  Mdata: any = [];
  Campaigns :any =[];
  jobTypes: any=[];


  constructor(
    private loaderService: ScriptLoaderService,
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
    pageinit() {
      let that = this;
      this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_SCORECARDINIT, null, null).subscribe((data) => {
       debugger
        console.log('getting data=>', data);
        that.Mdata =data.module;
        that.Gdata = data.grade;
        that.Campaigns = data.campaigns;

      });
    }
  ngOnInit() {
    this.frmdt = { grade: '', module: '', status: '', workflow: '' };
    this.pageinit();
/*
   this.data = new google.visualization.arrayToDataTable([
      ['Element', 'Density', { role: 'style' }, { role: 'annotation' } ],
      ['Copper', 8.94, '#b87333', 'Cu' ],
      ['Silver', 10.49, 'silver', 'Ag' ],
      ['Gold', 19.30, 'gold', 'Au' ],
      ['Platinum', 21.45, 'color: #e5e4e2', 'Pt' ]
   ]);
    */
  }
 // function drawChart() {// this.finddsmsummary(); }
}