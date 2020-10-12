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

import {NgbDateStruct,  NgbCalendar, } from '@ng-bootstrap/ng-bootstrap';
import { TopmenuComponent } from '../topmenu/topmenu.component'
@Component({
  selector: 'app-art-productivity',
  templateUrl: './art-productivity.component.html',
  styleUrls: ['./art-productivity.component.css'],
  providers: [ConfirmationService]
})
export class ArtProductivityComponent extends BaseComponent implements OnInit {
  model: NgbDateStruct;
  date: {year: number, month: number};
  cartdata: any = [];
  cols: any = [];
  freezeCols: any = [];
  scrollableCols: any = [];
  fixCol: any = [];
  grid: any = {};
  dataloading: boolean;
  totalRecords: Number = 0;
  selectedRows: any =[];
  isScrollable: boolean = true;
  // -- columans for filter Grid dropdown

  dcaSummary: any = [];
  overDuedt: any = [];
  highDt: any = [];
  mediumDt: any = [];
  lowDt: any = [];
  OptData: any = [];
  auth: any = [];
  Inflow : any = [];
  Outflow : any = [];
  
  public dataSource = new BehaviorSubject<AbstractControl[]>([]);
  public form: FormGroup;
  public contactList: FormArray;
  public duplicateJobsList: FormArray;
  constructor(
    private calendar: NgbCalendar,
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
    exportDataAsCSV(d: any) {

    }
    selectToday() {
      this.model = this.calendar.getToday();
    }
     ellipsisData(col) {
    // tslint:disable-next-line: max-line-length
    if (col.field == 'component' || col.field == 'series' || col.field == 'description' || col.field == 'cstage' || col.field == 'tags' || col.field == 'name' || col.field == 'creditLine') {
      return 'text-truncate';
    }
  }
    ngOnInit() {
      this.cols = [
      { field: 'job_key', header: 'Job Key' },
      { field: 'name', header: 'Job Name' },
      { field: 'grade', header: 'Grade' },
      { field: 'module', header: 'Module' },
      { field: 'batch', header: 'Batch' },
      { field: 'topic', header: 'Topic' },
      { field: 'cstage', header: 'Current Stage' },
      { field: 'currentRTeam', header: 'CR Team' },
      { field: 'curriculum', header: 'Curriculum' },
      { field: 'revisionC', header: 'Revision Count' },
      { field: 'artcomplex', header: 'Art-Complexity' },
      { field: 'artassion', header: 'Art-Assignment' },
      { field: 'flowStatus', header: 'Inflow/Outflow' },
      { field: 'job_active_stage.status', header: 'Completion Status' },
      { field: 'batchCDate', header: 'Batch Completion Date ' },
      { field: 'receiveddate', header: 'ArtTeam Recived Date' },
      { field: 'mpsDueDate', header: 'MPS DueDate' },
      { field: 'artTeamStatus', header: 'ArtTeam Status' },
      { field: 'artTeamPriority', header: 'ArtTeam Priority' },
      { field: 'exceptionCategory', header: 'Exception Cat.' },
      { field: 'exception', header: 'Explanation' },
      { field: 'risk', header: 'Permission-Risk' },
      { field: 'impact', header: 'Permission-Impact' },
      { field: 'workflow', header: 'Workflow' },
      { field: 'permissionType', header: 'Permission Type' },
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
    filterData() {
      if(!!this.model)
      this.dataloading = true;
      let that = this;
      const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      let body = new HttpParams().append('filters', JSON.stringify(this.model));
      this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_TeamData, body, myheader).subscribe((data) => {
        debugger
        console.log(" ACTION data =>", data);
        that.Inflow = [];  that.Outflow = [];
        for( let dd of data){
          dd.flowStatus = 'Inflow';
          that.Inflow.push(JSON.parse(JSON.stringify(dd)));
          if(dd.artComplateDate!=''){
            dd.flowStatus = 'Outflow';
            that.Outflow.push(JSON.parse(JSON.stringify(dd)));
          } 
        }
       that.cartdata =  [...that.Inflow, ...that.Outflow]; //that.Inflow.cancat(that.Outflow);
      that.dataloading = false;
      });
    }
}
