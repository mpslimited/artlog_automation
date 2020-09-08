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
import * as _ from 'lodash';

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
  arrangData: any = [];
  arrangeKkeys: any = [];
  auth: any = [];
  cartdata: any = [];
  cols: any = [];
  summaryOfDCATaskModel: boolean;
  gridApi;
  gridColumnApi;

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
  onGridReady (params : any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  exportAsCSV() {
    this.gridApi.exportDataAsCsv({});
  }
  ngOnInit() {
    this.finddsmsummary();


    this.cols = [{ field: 'job_key', headerName: 'Job Key' },
    { field: 'name', headerName: 'Job Name' },
    { field: 'grade', headerName: 'Grade' },
    { field: 'module', headerName: 'Module' },
    { field: 'batch', headerName: 'Batch' },
    { field: 'topic', headerName: 'Topic' },
    { field: 'description', headerName: 'Description' },
    { field: 'cstage', headerName: 'Current Stage' },
    { field: 'currentRTeam', headerName: 'CR Team' },
    { field: 'curriculum', headerName: 'Curriculum' },
    { field: 'artcomplex', headerName: 'Art-Complexity' },
    { field: 'artassion', headerName: 'Art-Assignment' },
    { field: 'risk', headerName: 'Inflow/Woutflow' },
    { field: 'impact', headerName: 'Complation Status' },
    { field: 'batchCDate', headerName: 'Batch Complation Date' },
    { field: 'receiveddate', headerName: ' ArtTeam Recived Date ' },
    { field: 'mpsDueDate', headerName: 'MPS Due Date' },
    { field: 'mpsDueDate', headerName: 'ArtTeam Due Date' },
    { field: 'artTeamStatus', headerName: 'ArtTeam Complation Date' },
    { field: 'artTeamStatus', headerName: 'ArtTeam Task Recived Status' },
    { field: 'batchCDate', headerName: 'ArtTeam Status' },
    { field: 'artTeamPriority', headerName: 'ArtTeam Priority' },
    { field: 'exceptionCategory', headerName: ' Exception Category' },
    { field: 'exception', headerName: ' Explanation ' }];
  }
  viewSummary() {
    this.summaryOfDCATaskModel = true;
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
      that.OptData = data.sort( (a, b) => {
          let dateA: Date = new Date(a.receiveddate);
          let  dateB: Date = new Date(b.receiveddate);
          return dateA > dateB;
      });
      //that.OptData =_.groupBy(that.OptData, 'receiveddate','grade','module');
      that.arrangData =   _.groupBy(that.OptData, function (person) {
                              let props = ['receiveddate', 'grade','module','batch'];
                              let prop = [];
                              for (let i = 0, length = props.length; i < length; i++) {
                                  prop.push(person[props[i]]);
                              }
                              return prop.join('|');
                          });
      that.arrangeKkeys = Object.keys(that.arrangData);
      that.arrangeKkeys = that.arrangeKkeys.map(d=> ({key:d, date: d.split('|')[0], grade: d.split('|')[1], module: d.split('|')[2], batch: d.split('|')[3] }));
      debugger
      console.log(that.arrangeKkeys);

    });
  }
  allDataOfDCATastsummary() {
    this.cartdata = this.OptData;
    this.viewSummary();
  }
  overdueDataOfDCATastsummary() {
    this.cartdata = this.overDuedt;
    this.viewSummary();
  }
  highDataOfDCATastsummary() {
    this.cartdata = this.highDt;
    this.viewSummary();
  }
  mediumDataOfDCATastsummary() {
    this.cartdata = this.mediumDt;
    this.viewSummary();
  }
  lowDataOfDCATastsummary() {
    this.cartdata = this.lowDt;
    this.viewSummary();
  }
  getWorkinprogress( dt: any){
    debugger
    //this.cartdata = this.OptData.filter(d => d.receiveddate == dt.date && d.grade ==dt.grade && d.module == dt.module  && d.batch == dt.batch  );
    this.viewSummary();
  }
  getDateWideSummary(dt: any) {
    this.cartdata = this.OptData.filter(d => d.receiveddate == dt.date && d.grade ==dt.grade && d.module == dt.module  && d.batch == dt.batch  );
    this.viewSummary();
  }

}
