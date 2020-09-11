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
  selector: 'app-jobrefres',
  templateUrl: './jobrefres.component.html',
  styleUrls: ['./jobrefres.component.css']
})
export class JobrefresComponent  extends BaseComponent implements OnInit {
  auth: any = [];
  ApiData : any = [];
  ApiHistory : any = [];
  historyOfApiPerformance: boolean;
  apiDetails: boolean;
  detailsData : any = [];
  cartdata: any = [];
  cols: any = [];
  freezeCols: any = [];
  scrollableCols: any = [];
  fixCol: any = [];
  job_keys: string;
  dataloading: boolean;
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


  

  ngOnInit(): void {
    this.job_keys ='';
    this.getRefreshJobKeysData();
    this.cols = [
      { field: 'job_key', header: 'Old Job Key' },
      { field: 'Newjobkey', header: 'New Job Key' },
      { field: 'jobID', header: 'JobID' },
      { field: 'grade', header: 'Grade' },
      { field: 'module', header: 'Module' },
      { field: 'batch', header: 'Batch' },
      { field: 'topic', header: 'Topic' },
      { field: 'curriculum', header: 'Curriculum' },
      { field: 'artcomplex', header: 'Art-Complexity' },
      { field: 'artassion', header: 'Art-Assignment' },
    ];
      this.cols = this.cols.map(d => ({ field: d.field, header: d.header, tid: this.cols.indexOf(d) }));
      this.freezeCols = this.cols.filter(d => d.tid < 1);
      this.scrollableCols = this.cols.filter(d => d.tid > 0);
      this.cols.forEach(element => {
      if (!(element.field === '' || element.field === 'job_key')) {
        this.fixCol.push(element);
      }
      });
  }
  getRefreshJobKeysData(): any {
    this.dataloading = true;
    const that = this;
    this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_JOBS_REFRESH_SHOW, null, null).subscribe((data) => {
      that.cartdata = data;
      that.dataloading = false;
    })
  }
  getAPIStatusData(): void{
    console.log("getAPIStatusData fn");
  }
  onGridReady (params : any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  exportAsCSV() {
    this.gridApi.exportDataAsCsv({});
  }
  dataSubmit() {
   if(this.job_keys!=""){
    const that = this;
    let body = new HttpParams()
    .append('filters', this.job_keys)
    this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_JOBS_REFRESH, body, null).subscribe((data) => {
      debugger
      for (const k of data.keys) {
        that.cartdata.splice((0 + 1), 0, {job_key: k});
      }
      that.alert.showAlertScucess([data.msg], 5000);
      console.log(data);
    });
   }
  }

}
