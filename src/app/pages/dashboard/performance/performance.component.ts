import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
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
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css'],
   providers: [ConfirmationService]
})
export class PerformanceComponent extends BaseComponent implements OnInit {
  auth: any = [];
  ApiData : any = [];
  ApiHistory : any = [];
  historyOfApiPerformance: boolean;
  apiDetails: boolean;
  detailsData : any = [];
  cartdata: any = [];
  cols: any = [];
   gridApi;
   gridColumnApi;

  constructor(
    protected baseServices: BaseService,
    protected router: Router,
    protected httpService: HttpService,
    protected customModalPopService: CustomModalPopUpService,
    protected alert: AlertMessageService,
    private fb: FormBuilder ) {
    super(baseServices, router);
    const user = SessionObject.getUserDetails();
    this.auth = user;
  }
  getAPIStatusData() {
    let that = this;
    this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_APIPERFORMANCE, null, null).subscribe((data) => {
        debugger
      //  console.log(data.length);
      that.ApiData = data.data;
      that.ApiHistory = data.result;
    });
  }
  showapiDetails (dt: any){
    debugger
    this.apiDetails = true;
    this.detailsData = this.ApiHistory.find(d => d.apiTaskName == dt.apiTaskName && d._id == dt.id );
  }
  showhistoryOfApiPerformance(dt: any) {
    debugger
    this.historyOfApiPerformance = true;
    this.cartdata = this.ApiHistory.filter(d => d.apiTaskName == dt.apiTaskName )
  }
  onGridReady (params : any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  exportAsCSV() {
    this.gridApi.exportDataAsCsv({});
  }
  ngOnInit() {
    this.getAPIStatusData();
    this.cols = [{ field: 'apiTaskName', headerName: 'Rule' },
    { field: 'responce', headerName: 'Details/Response' },
    { field: 'process.trigger', headerName: 'Status' },
    { field: 'process.nextRunTime', headerName: 'Next Run Time' },
    { field: 'process.startTime', headerName: 'Last Run Time' },
    { field: 'isError', headerName: 'API Result' },
    { field: 'isError', headerName: 'API Summary' },
    ];
  }
  takenTime(a: any , b: any) {
   //lel b = moment(b);
    let time1 = moment(a);
    let time2 = moment(b);
    return time2.diff(time1, 'seconds');
  }
}
