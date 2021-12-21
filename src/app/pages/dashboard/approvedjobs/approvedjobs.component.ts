import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpService } from '../../../core/services/http.service';
import { BaseComponent } from '../../../core/base/base.component';
import { BaseService } from '../../../core/base/base.service';
import { columnDefsArtLogs } from '../dashboard.data';
import { ArtLogModel } from './../dashboard.model';
import { CustomModalPopUpService } from '../../../component/custom-modal-pop-up/custom-modal-pop-up.service';
import { CustomModalPopUpModel } from '../../../component/custom-modal-pop-up/custom-modal-pop-up.model';
import { CustomerServicesUrls } from '../../../core/shared/constant/url-constants/customer-services.constants';
import { DropdownDataModel, AlertMessageService } from '../../../component';
import { Router } from '@angular/router';
import { GridAPII } from '../../../core/base/base.component';
import { SessionObject } from '../../../core/shared';
import { MenuItem, SelectItem, LazyLoadEvent } from 'primeng/api';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HeaderOpt } from '.././token';
import { OverlayPanel } from 'primeng/overlaypanel';
import * as moment from 'moment';
import { unitOfTime } from 'moment';

import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { TopmenuComponent } from '../topmenu/topmenu.component'
// tslint:disable-next-line: class-name
export interface gGiltrt {
  job_key: string;
  name: string;
  lessonlet: string;
  tags: string;
  comment: string;
  description: string;
  cstage: string;
  stage: string;
  creditLine: string;
}
@Component({
  selector: 'app-approvedjobs',
  templateUrl: './approvedjobs.component.html',
  styleUrls: ['./approvedjobs.component.css'],
  providers: [ConfirmationService]
})
export class ApprovedjobsComponent extends BaseComponent implements OnInit, OnChanges {
  apex: any ={};
  blockedPanel = false;
  clonedArtLog: { [s: string]: any; } = {};
  yearFilter: number;
  selectedColumn: any;
  yearTimeout: any;
  cartdata: any;
  jobID: any;
  totalage: any = [];
  clonedCars: { [s: string]: any; } = {};
  jobkeys: any = [];
  flaggedComment: string;
  // -- columans for filter Grid dropdown
  lessons: any = [];
  lessonLets: any = [];
  components: any = [];
  grades: any = [];
  modules: any = [];
  topics: any = [];
  batchs: any = [];
  revisons: any = [];
  facings: any = [];
  seriess: any = [];
  revisions: any = [];
  cstages: any = [];
  cstatus: any = [];
  printAssets: any = [];
  printReadys: any = [];
  permissionTypes: any = [];
  pageNos: any = [];
 flagedTeams: any = [];
 mathAuditors: any = [];
  Gartcomplexs: any = [];
  Gartassions: any = [];
  Grisks: any = [];
  Gimpact: any = [];
  GcurrentRTeam: any = [];
  Gworkflow: any = [];
  Gcurriculum: any = [];
  verificationsDt: any = [];
  pagins: any = [];
  freezeCols: any = [];
  facingData: any = ['TE', 'SE'];
  pagingCol: any = [
    { value: '', label: 'N/A' },
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];
  excCat: any = [
    { value: 'On Track', label: 'On Track' },
    { value: 'Not On Track', label: 'Not On Track' }
  ];
  scrollableCols: any[];
  selectedRows: any = [];
  filteredValuesLength: any = [];
  artAssignmentOPT = []; MetaRiskOPT = []; MetaImpactOPT = [];
  artcomplexs = [];
  artassions = []; risks = []; impacts = []; workflows = []; wip = []; items: MenuItem[];
  fixCol = [];
  cols: any[];
  loading: boolean;
  dropdownList: any[];
  selectedItems: any[];
  dropdownSettings = {};
  editSetting: any;
  selectedData: any = [];
  artLogModel: ArtLogModel;
  Gdata: any;
  addGdata: any = [];
  Mdata: any;
  addMdata: any;
  Wdata: any;
  WIPdata: any;
  Tdata: any;
  jobStatus: any;
  NAME_ARTLOG = 'NAME_ARTLOG_APPROVED';
  gridData: any;
  jobmeta: any;
  Editdata: any;
  search = {};
  displayDialog: boolean;
  saveSearchModal: boolean;
  savedSearchListModal: boolean;
  tagverificationModal: boolean;
  savedsearchLists: any = [];
  rowsmoveTags: any = [];
  gridState: any;
  defaultSearch: any;
  isSaveSearch: boolean;
  searchText: string;
  selectedTagsData: any = [];
  frmdt: any;
  jobkey: any;
  grid: any = {};
  dataloading: boolean;
  bulkBatchModal: boolean;
  bulkExceptionCatModal: boolean;
  bulkExceptionModal: boolean;
  bulkBatchCDateModal: boolean;
  rowFlaggedModal: boolean;
  assignMathAuditModal: boolean;
  bulkBatch: any;
  bulkExceptionCat: any; bulkException: any; bulkBatchCDate: any;
  bulkTags: any;
  bulkDataVerifyModal: boolean;
  stageDurationGraph: boolean;
  bulkVerificationData: any = [] ;
  selectedVerifyData: any = [];
  bulkTagModal: boolean;
  modes: SelectItem[];
  selectedModes: string[];
  selectedModesDisabled: boolean;
  jobsTypes: any[];
  criteria: boolean;
  jobdurationLoading: boolean = false;
  isScrollable = true;
  auth: any ;
  g: any = {};
  teamsGrpup: any = [];
  flaggedTeam: String;
  MathAuditors: any;
  assignAuthor: any;
  verifi : any ;
  public dataSource = new BehaviorSubject<AbstractControl[]>([]);
  public form: FormGroup;
  public contactList: FormArray;
  public duplicateJobsList: FormArray;
  totalRecords: number;
constructor(
    private confirmationService: ConfirmationService,
    protected baseServices: BaseService,
    protected router: Router,
    protected httpService: HttpService,
    protected customModalPopService: CustomModalPopUpService,
    protected alert: AlertMessageService,
    private fb: FormBuilder) {
    super(baseServices, router);
    this.criteria = false;
    this.selectedModesDisabled = false;
    const user = SessionObject.getUserDetails();
    this.auth = user;
    console.log('User Details : ', user);
    let auth = [
        { value: 'SaveGridState', title: 'Save Grid State', icon: 'fa fa-floppy-o', ord: 2 },
        { value: 'RowFlagged', title: 'Row Flagged', icon: 'fa fa-flag-o', ord: 7 },
      ];
    if (!!user.userGroupName && (user.userGroupName === 'Admin' || user.userGroupName === 'DAM Team' )  ) {
        auth.push( { value: 'AddRow', title: 'Add Row', icon: 'fa fa-plus', ord: 1 });
        auth.push({ value: 'AddBatchCDate', title: 'Batch Completion Date', icon: 'fa fa-clock-o', ord: 1 });
        auth.push( { value: 'AddExceptionCat', title: 'Add Exception Cat', icon: 'fa fa-address-book-o', ord: 1 });
        auth.push( { value: 'AddException', title: 'Add Exception', icon: 'fa fa-wpexplorer', ord: 1 });
        auth.push({ value: 'LockJobs', title: 'Lock Job & Generate Tags', icon: 'fa fa-lock', ord: 3 });
        auth.push({ value: 'InsertBatch', title: 'Insert Batch', icon: 'fa fa-object-group', ord: 4 });
        auth.push({ value: 'InsertTags', title: 'Insert Tags', icon: 'fa fa-tags' , ord: 5});
        auth.push({ value: 'VerifyData', title: 'Manuscript Verification & Paging Approval', icon: 'fa fa-check', ord: 6 });
        auth.push({ value: 'killJobs', title: 'Kill Jobs', icon: 'fa fa-ban', ord: 8 });
      } else if ( !!user.userGroupName && (user.userGroupName === 'Page Production' ||
      user.userGroupName === 'Art Team' || user.userGroupName === 'Permission Team' || user.userGroupName === 'Content Team'
      )) {
         auth.push( { value: 'AddRow', title: 'Add Row', icon: 'fa fa-plus', ord: 1 });
         auth.push( { value: 'AddBatchCDate', title: 'Batch Complation Date', icon: 'fa fa-clock-o', ord: 1 } );
         auth.push( { value: 'AddExceptionCat', title: 'Add Exception Cat', icon: 'fa fa-address-book-o', ord: 1 });
         auth.push( { value: 'AddException', title: 'Add Exception', icon: 'fa fa-wpexplorer', ord: 1 });
         auth.push({ value: 'killJobs', title: 'Kill Jobs', icon: 'fa fa-ban', ord: 8 });
      } else if ( !!user.userGroupName && user.userGroupName === 'MPS Art') {
        auth.push({ value: 'VerifyData', title: 'Manuscript Verification & Paging Approval', icon: 'fa fa-check', ord: 6 });
      }
    auth.push( { value: 'AssignAuditors', title: 'Assign Auditors', icon: 'fa fa-user', ord: 9 });
    auth = auth.sort(function (a, b) {
        if (a.ord > b.ord) {
            return 1;
        }
        if (b.ord > a.ord) {
            return -1;
        }
        return 0;
    });

    this.modes = [
      { value: 'AddRow', title: 'Add Row', icon: 'fa fa-plus', ord: 1 },
      { value: 'AddBatchCDate', title: 'Batch Complation Date', icon: 'fa fa-clock-o', ord: 1 },
      { value: 'AddExceptionCat', title: 'Add Exception Cat', icon: 'fa fa-address-book-o', ord: 1 },
      { value: 'AddException', title: 'Add Exception', icon: 'fa fa-wpexplorer', ord: 1 },
      { value: 'SaveGridState', title: 'Save Grid State', icon: 'fa fa-floppy-o', ord: 2 },
      { value: 'LockJobs', title: 'Lock Job & Generate Tags', icon: 'fa fa-lock', ord: 3 },
      { value: 'InsertBatch', title: 'Insert Batch', icon: 'fa fa-object-group', ord: 4 },
      { value: 'InsertTags', title: 'Insert Tags', icon: 'fa fa-tags' , ord: 5},
      { value: 'VerifyData', title: 'Manuscript Verification & Paging Approval', icon: 'fa fa-check', ord: 6 },
      { value: 'RowFlagged', title: 'Row Flagged', icon: 'fa fa-flag-o', ord: 7 },
      { value: 'killJobs', title: 'Kill Jobs', icon: 'fa fa-ban', ord: 8 },
      { value: 'AssignAuditors', title: 'Assign Auditors', icon: 'fa fa-user', ord: 8 },
    ];
    this.jobsTypes = [
      { value: '', label: 'All' },
      { value: 1, label: 'Index Jobs' },
      { value: 2, label: 'Created Jobs' },
      { value: 3, label: 'Moved Jobs' },
      { value: 4, label: 'Flagged Jobs'},
      { value: 5, label: 'Killed Jobs'},
      { value: 6, label: 'Non-Killed Jobs'}
    ];
    this.verificationsDt = [
      { value: '', label: 'NA' },
      { value: 'Mismatch', label: 'Mismatch' },
      { value: 'Reconciled', label: 'Reconciled' },
      { value: 'Verified', label: 'Verified' }
    ];

    this.cols = [
      { field: 'job_key', header: 'Job Key' },
      { field: 'name', header: 'Job Name' },
     // { field: 'flagedTeam', header: 'Flagged Team'},
     // { field: 'mathAuditor', header: 'Math Auditors'},
     // { field: 'mathAuditRC', header: 'Math Audit RC'},
      { field: 'grade', header: 'Grade' },
      { field: 'module', header: 'Module' },
      { field: 'component', header: 'Component' },
      { field: 'lesson', header: 'Lesson' },
      { field: 'lessonlet', header: 'Lesson Letter' },
      { field: 'batch', header: 'Batch' },
      { field: 'topic', header: 'Topic' },
      { field: 'description', header: 'Description' },
      { field: 'thumb', header: 'Thumbnail' },
      { field: 'cstage', header: 'Current Stage' },
      { field: 'job_active_stage.status', header: 'Completion Status' },
      { field: 'currentRTeam', header: 'CR Team' },
      { field: 'curriculum', header: 'Curriculum' },
      { field: 'dateCreated', header: 'Date Created' },
      { field: 'job_date_finished', header: 'Date Completed' },
     /* { field: 'totalage', header: 'Cumulative Age' },
      { field: 'lastage', header: 'Last Age' },
      { field: 'facing', header: 'P.Category' },
      { field: 'series', header: 'Series' },
      { field: 'creditLine', header: 'Credit Line' },
      { field: 'comment', header: 'Comments' },
      { field: 'tags', header: 'Tag Entry' },
      { field: 'mverification', header: 'M. Verification' },
      { field: 'isPaging', header: 'Paging Approved' },
      { field: 'pageNo', header: 'Page No.' },
      { field: 'revisionC', header: 'Revision Count' },
      { field: 'printAsset', header: 'Print Asset' },
      { field: 'printReady', header: 'Print Ready' },
      { field: 'artcomplex', header: 'Art-Complexity' },
      { field: 'artassion', header: 'Art-Assignment' },
      { field: 'risk', header: 'Permission-Risk' },
      { field: 'impact', header: 'Permission-Impact' },
      { field: 'workflow', header: 'Workflow' },
      { field: 'permissionType', header: 'Permission Type' },

      { field: 'batchCDate', header: 'Batch CDate ' },
      { field: 'receiveddate', header: 'ArtTeam RDate' },
      { field: 'mpsDueDate', header: 'MPS DueDate' },
      { field: 'artTeamStatus', header: 'ArtTeam Status' },
      { field: 'artTeamPriority', header: 'ArtTeam Priority' },
      { field: 'exceptionCategory', header: 'Exception Cat.' },
      { field: 'exception', header: 'Explanation' },/**/
    ];
    this.cols = this.cols.map(d => ({ field: d.field, header: d.header, tid: this.cols.indexOf(d) }));
  }
  reactiveJob(d: any) {
    this.confirmationService.confirm({
      message: 'Are you sure, you want to be re-activate the job?',
      accept: () => {
        const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        let body = new HttpParams();
        body = body.append('UnkilledID', d._id);
        // tslint:disable-next-line: max-line-length
        this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_UnKILLEDSELECTEDJOBS, body, { headers: myheader }).subscribe((data) => {
          d.killed = false;
          this.alert.showAlertScucess([data.msg], 5000);
        });
      }
    });
  }
  clearFlag(d: any) {
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.append('UnflagedID', d._id);
    this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_UnFLAGEDSELECTEDJOBS, body, { headers: myheader }).subscribe((data) => {
      d.flaged = false;
      delete  d.flaged;
      delete d.flagedTeam;
      this.alert.showAlertScucess([data.msg], 5000);
    });
  }
  optionChangeData() {
    if (this.selectedModes.indexOf('AddRow') > -1) {
      this.showDialogToAdd();
    } else if (this.selectedModes.indexOf('AddBatchCDate') > -1) {
      this.addBatchCDate();
    } else if (this.selectedModes.indexOf('AddExceptionCat') > -1) {
      this.addExceptionCat();
    } else if (this.selectedModes.indexOf('AddException') > -1) {
      this.addException();
    } else if (this.selectedModes.indexOf('SaveGridState') > -1) {
      this.saveGridState();
    } else if (this.selectedModes.indexOf('LockJobs') > -1) {
      /*if (this.selectedRows.filter(d => d.duplicate !== true).length > 0) {
        alert('Index row(s) cannot be modified!');
      } else */ if (this.selectedRows.length == 0) {
        alert('No row(s) has been selected!');
      } else if (this.selectedRows.filter(d => d.killed === true).length > 0) {
        alert('You have selected a killed row(s)!');
      } else {
        this.lockJobGenerateTags();
      }
    } else if (this.selectedModes.indexOf('InsertBatch') > -1) {
      this.addBatch();
    } else if (this.selectedModes.indexOf('InsertTags') > -1) {
      /*if (this.selectedRows.filter(d => d.duplicate != true).length > 0) {
        alert('Index row(s) cannot be modified!');
      } else*/ if (this.selectedRows.length == 0) {
        alert('No row(s) has been selected!');
      } else if (this.selectedRows.filter(d => d.killed == true).length > 0) {
        alert('You have selected a killed row(s)!');
      } else {
        this.addTags();
      }
    } else if (this.selectedModes.indexOf('killJobs') > -1) {
      if (this.selectedRows.filter(d => d.duplicate != true).length > 0) {
        alert('Index row(s) cannot be modified!');
      } else if (this.selectedRows.length == 0) {
        alert('No row(s) has been selected!');
      } else if (this.selectedRows.filter(d => d.killed == true).length > 0) {
        alert('You have selected a killed row(s)!');
      } else {
        // need code for update killed
        this.confirmationService.confirm({
          message: 'Are you sure, you want to kill the selected jobs?',
          accept: () => {
            // tslint:disable-next-line: forin
            for (const t in this.selectedRows) {
              this.selectedRows[t].killed = true;
            }
            const myheader = new HttpHeaders().set('Content-Type', 'application/json');
            let body = new HttpParams();
            body = body.append('killedID', JSON.stringify(this.selectedRows.map(d => d._id)));
            const self = this;
            // tslint:disable-next-line: max-line-length
            this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_KILLEDSELECTEDJOBS, body, { headers: myheader }).subscribe((data) => {
              self.alert.showAlertScucess([data.msg], 5000);
              self.selectedRows = [];
            });
          }
        });
      }
    } else if (this.selectedModes.indexOf('RowFlagged') > -1) {
      if (this.selectedRows.length == 0) {
        alert('Please select at least a row(s)!');
      } else if (this.selectedRows.filter(d => d.killed == true).length > 0) {
        alert('You have selected a killed row(s)!');
      } else {
        this.rowFlaggedModal = true;
      }
    } else if (this.selectedModes.indexOf('VerifyData') > -1) {
      this.verifyMData();
    } else if (this.selectedModes.indexOf('AssignAuditors') > -1) {
      console.log(this.selectedModes);
      if (this.selectedRows.length === 0) {
        alert('Please select at least a row(s)!');
      } else if (this.selectedRows.filter(d => d.killed === true).length > 0) {
        alert('You have selected a killed row(s)!');
      } else {
        this.assignMathAuditModal = true;
      }
    }
  }
  assignAuditors() {
    console.log( this.assignAuthor, this.selectedRows );
    if ( this.assignAuthor.email === '' ) {
      alert('Please select Auditor');
    } else {
      // tslint:disable-next-line: forin
      for (const t in this.selectedRows) {
        this.selectedRows[t].mathAuditor = this.assignAuthor.name ;
      }
      const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      let body = new HttpParams();
      body = body.append('selectedData', JSON.stringify(this.selectedRows.map(d => d._id)));
      body = body.append('mathAuditor', JSON.stringify(this.assignAuthor));
      const self = this;
      this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_ASSIGNAUDITORS, body, { headers: myheader }).subscribe((data) => {
        self.alert.showAlertScucess([data.msg], 5000);
        self.assignMathAuditModal = false;
        self.assignAuthor = '';
        self.selectedRows = [];
      });
    }
  }
  saveFlagged() {
    if ( !!this.flaggedTeam ) {
      // tslint:disable-next-line: forin
      for (const t in this.selectedRows) {
        this.selectedRows[t].flaged = true;
        this.selectedRows[t].flagedTeam = this.flaggedTeam ;
      }
      const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      let body = new HttpParams()
      .append('flagedID', JSON.stringify(this.selectedRows.map(d => d._id)))
      .append('flagedTeam', this.flaggedTeam.toString())
      .append('flaggedComment', this.flaggedComment)
      .append('auth', JSON.stringify(this.auth));
      const self = this;
      this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_FLAGEDSELECTEDJOBS, body, { headers: myheader }).subscribe((data) => {
        self.alert.showAlertScucess([data.msg], 5000);
        self.rowFlaggedModal = false;
        self.flaggedTeam = '';
        self.selectedRows = [];
      });
    } else {
      alert('please select a team');
    }
  }
  OnChanges() {
    if (this.selectedRows.length = 0) {
      this.selectedModesDisabled = false;
    } else {
      this.selectedModesDisabled = true;
    }
  }
  ngOnInit() {
    this.verifi = {pageNo:'', isPaging:'', mverification:'', isBlank: false};
    this.bulkBatchCDate = moment().format('MM-DD-YYYY');
    this.MathAuditors = Array(
      {name: '--Please Select--', email: ''},
      {name: 'Allison Witcraft', email: 'allison.witcraft@greatminds.org'},
      {name: 'Robyn Sorenson', email: 'robyn.sorenson@greatminds.org'},
      {name: 'Theresa Streeter', email: 'theresa.streeter@greatminds.org'},
      {name: 'Amy Rome', email: 'amy.rome@greatminds.org'},
      {name: 'Jessica Sims', email: 'jessica.sims@greatminds.org'},
      {name: 'Mary Drayer', email: 'mary.drayer@greatminds.org'},
      {name: 'Andrew Senkowski', email: 'andrew.senkowski@greatminds.org'},
      {name: 'Dawn Burns', email: 'dawn.burns@greatminds.org'},
      {name: 'Philippa Walker', email: 'philippa.walker@greatminds.org'},
      {name: 'Karen Hall', email: 'karen.hall@greatminds.org'},
      {name: 'Carla VanWinkle', email: 'carla.vanwinkle@greatminds.org'},
      {name: 'Amanda Aleksiak', email: 'amanda.aleksiak@greatminds.org'},
      {name: 'Karen Eckberg', email: 'karen.eckberg@greatminds.org'},
      {name: 'Carla VanWinkle', email: 'carla.vanwinkle@greatminds.org'},
      {name: 'Karen Eckberg', email: 'karen.eckberg@greatminds.org'},
      {name: 'Lora Podgorny', email: 'lora.podgorny@greatminds.org'},
      {name: 'Brian Petras', email: 'brian.petras@greatminds.org'},
      {name: 'Lisa Babcock', email: 'lisa.babcock@greatminds.org'},
      {name: 'Bobbe Maier', email: 'bobbe.maier@greatminds.org'},
      {name: 'Bob Hollister', email: 'bob.hollister@greatminds.org'}
      );
    const teamsGrpup = ['Permissions Team', 'Art Team', 'Clip Art & Storage Team', 'Design Team', 'DAM Team'];
    this.teamsGrpup = teamsGrpup.map( d => ({ label: d, value: d}));
    this.teamsGrpup.splice(0, 0, { label: 'Select Team', value: ''});
    this.facingData = [{ label: 'TE', value: 'TE'}, { label: 'SE', value: 'SE'}];
    this.dataloading = true;
    this.isSaveSearch = false;
    this.searchText = 'Search List1';
    this.freezeCols = this.cols.filter(d => d.tid < 1);
    this.scrollableCols = this.cols.filter(d => d.tid > 0);
    this.cols.forEach(element => {
      if (!(element.field === '' || element.field === 'job_key')) {
        this.fixCol.push(element);
      }
    });
    this.frmdt = { grade: '', module: '', status: '', workflow: '' };
    this.form = this.fb.group({
      jobkey: [null, Validators.compose([Validators.required])],
      grade: [null, Validators.compose([Validators.required])],
      module: [null, Validators.compose([Validators.required])],
      component: [null, Validators.compose([Validators.required])],
      batch: [null, Validators.compose([Validators.required])],
      jobAdd: this.fb.array([this.createContact()])
    });
    // set contactlist to the form control containing jobAdd
    this.duplicateJobsList = this.form.get('jobAdd') as FormArray;
    this.contactList = this.form.get('jobAdd') as FormArray;
    const Wdata = [
      { value: '', label: 'Select All' },
      { value: 'Clip Art', label: 'Clip Art' },
      { value: 'Created Image', label: 'Created Image' },
      { value: 'Permission', label: 'Permission' },
      { value: 'Shutterstock', label: 'Shutterstock' }];
    this.workflows = Wdata;
    const Tdata = ['Permissions Team', 'Art Team', 'Clip Art & Storage Team', 'Shutterstock Team', 'Content Team', 'On Hold Team'];
    this.Tdata = Tdata.map(d => ({ value: d, label: d }));
    const jobStatus = ['Active', 'Approved', 'Asset Bank', 'On Hold'];
    this.jobStatus = jobStatus.map(d => ({ field: d, header: d }));
    this.getinit();
    this.editSetting = new CustomModalPopUpModel('Edit Job');
  }
  collapseChange(event) {
    console.log(event);
  }
  addExceptionCat(){
    if (this.selectedRows.length > 0) {
      this.bulkExceptionCatModal = true;
    } else {
      alert('No row(s) has been selected!');
    }
  }
  addBatchCDate(){
    if (this.selectedRows.length > 0) {
      this.bulkBatchCDateModal = true;
    } else {
      alert('No row(s) has been selected!');
    }
  }
  addException(){
    if (this.selectedRows.length > 0) {
      this.bulkExceptionModal = true;
    } else {
      alert('No row(s) has been selected!');
    }
  }
  addBatch() {
    if (this.selectedRows.length > 0) {
      this.bulkBatchModal = true;
    } else {
      alert('No row(s) has been selected!');
    }
  }
  addTags() {
    if (this.selectedRows.length > 0) {
      this.bulkTagModal = true;
    } else {
      alert('No row(s) has been selected!');
    }
  }
  verifyMData() {
    if (this.selectedRows.length > 0) {
      this.bulkDataVerifyModal = true;
      this.bulkVerificationData = this.selectedRows;
    } else {
      alert('No row(s) has been selected!');
    }
  }
  // this.bulkDataVerifyModal = true;
  clearData() {
    this.artLogModel.jobkey.value = '';
    this.artLogModel.grade.value = '';
    this.artLogModel.module.value = '';
    this.artLogModel.batch.value = '';
    this.artLogModel.workflow.value = '';
    this.artLogModel.curricula.value = '';
    this.artLogModel.status.value = '';
    this.frmdt.grade = '';
    this.frmdt.module = '';
    this.artLogModel.batch.value = '';
    this.frmdt.workflow = '';
    this.artLogModel.curricula.value = '';
    this.frmdt.status = '';
    this.artLogModel.added.value = '';
  }
  isDuplicate(d, edit) {
    let t = '';
    if ( d.killed) {
      return t + ' killed';
    } else if ( d.flaged) {
      return  t = 'flagedrecord';
    } else if (d.duplicate && edit) {
      return t + ' newrecordEdited';
    } else if (d.duplicate) {
      return t + ' newrecord';
    }
  }
  applyVerification(): void {
    if (this.selectedVerifyData.length == 0) {
      alert('Please select at least one row');
    } else {
      for( let i in this.selectedVerifyData){
        this.selectedVerifyData[i].mverification = this.verifi.mverification;
        this.selectedVerifyData[i].isPaging = this.verifi.isPaging;
        if(this.verifi.pageNo=="" && this.verifi.isBlank) {
          this.selectedVerifyData[i].pageNo ='';
        } else {
          this.selectedVerifyData[i].pageNo = this.verifi.pageNo;
        }
      }
      // debugger
      console.log(this.verifi);
      //verifi
    }
  }
  saveVerifiedData() {
    if (this.selectedVerifyData.length == 0) {
      alert('Please select at least one row');
    } else {
      let body = new HttpParams().append('newData', JSON.stringify(this.selectedVerifyData));
      const self = this;
      this.httpService.extractData(CustomerServicesUrls.ARTLOG_UPDATEJOBS_Verified, body, null).subscribe((data) => {
        console.log(data);
        self.bulkDataVerifyModal = false;
        self.selectedRows = [];
        self.alert.showAlertScucess(['row(s) verification has been complated!'], 5000);
      });
    }
  }
  onFilter(event, dt) {
    this.filteredValuesLength = event.filteredValue.length; // count of displayed rows
  }
  ellipsisData(col) {
    // tslint:disable-next-line: max-line-length
    if (col.field == 'component' || col.field == 'series' || col.field == 'description' || col.field == 'cstage' || col.field == 'tags' || col.field == 'name' || col.field == 'creditLine') {
      return 'text-truncate';
    }
  }
  setEditableHeight(isEdited) {
    return (!isEdited) ? 'nonEdited' : 'edited';
  }
  hideNewRecord(eve) {
    while (this.form.value.jobAdd.length > 1) {
      this.contactList.removeAt(1);
    }
    this.form.reset();
  }
  setWith(name) {
    if (name.field == 'job_key') {
      return 'width:140px';
    } else {
      return 'width:175px';
    }
  }

  ngOnChanges() {
    this.artLogModel.jobkey.value = this.baseService.getMessage();
    const obj = {};
    //this.getMetaData(obj);
  }
  searchByjobKey(evt: any) {
    this.filterData();
  }
  viewSavedSearchList() {
    this.savedSearchListModal = true;
  }
  showDialogToAdd() {
    this.displayDialog = true;
  }
  saveSearchDialog() {
    this.saveSearchModal = true;
  }
  lazyLoadEnv(event: LazyLoadEvent ) {
    console.log('lazyLoadEnv', event);
    this.dataloading = true;
    console.log('Data TEsting ==> Skip:', event.first, 'Getti ng :', event.rows);
    this.artLogModel.fromPage.value = event.first;
    this.artLogModel.toPage.value = event.rows;
    if (event.filters != undefined && !!Object.keys(event.filters) && !! Object.keys(event.filters).length ){
      // this.example = new Server();
      // this.example.name = event.filters["name"].value;
      this.artLogModel.filters.value  = JSON.stringify(event.filters);
       
   } else if( typeof event.filters =="object" && Object.keys(event.filters).length > 0){
    this.artLogModel.filters.value ='';
   }
    let self = this;
    setTimeout(() => {
    let promis1 = new Promise(resolve => {
      this.loadDataFromApi(this.NAME_ARTLOG).subscribe((data) => {
        this.dataloading = false;
        if (data.hasOwnProperty('GridFilters')) {
          this.lessons = (!!data.GridFilters.lesson) ? data.GridFilters.lesson.map(d => ({ label: d, value: d })) : [];
          this.lessonLets = (!!data.GridFilters.lessonlet) ? data.GridFilters.lessonlet.map(d => ({ label: d, value: d })) : [];
          this.components = (!!data.GridFilters.component) ? data.GridFilters.component.map(d => ({ label: d, value: d })) : [];
          this.modules = (!!data.GridFilters.module) ? data.GridFilters.module.map(d => ({ label: d, value: d })) : [];
          this.grades = (!!data.GridFilters.grade) ? data.GridFilters.grade.map(d => ({ label: d, value: d })) : [];
          this.Gartcomplexs = (!!data.GridFilters.artcomplex) ? data.GridFilters.artcomplex.map(d => ({ label: d, value: d })) : [];
          this.Gartassions = (!!data.GridFilters.artassion) ? data.GridFilters.artassion.map(d => ({ label: d, value: d })) : [];
          this.Grisks = (!!data.GridFilters.risk) ? data.GridFilters.risk.map(d => ({ label: d, value: d })) : [];
          this.Gimpact = (!!data.GridFilters.impact) ? data.GridFilters.impact.map(d => ({ label: d, value: d })) : [];
          this.GcurrentRTeam = (!!data.GridFilters.currentRTeam) ? data.GridFilters.currentRTeam.map(d => ({ label: d, value: d })) : [];
          this.Gworkflow = (!!data.GridFilters.workflow) ? data.GridFilters.workflow.map(d => ({ label: d, value: d })) : [];
          this.Gcurriculum = (!!data.GridFilters.curriculum) ? data.GridFilters.curriculum.map(d => ({ label: d, value: d })) : [];
          this.facings = (!!data.GridFilters.facing) ? data.GridFilters.facing.map(d => ({ label: d, value: d })) : [];
          this.batchs = (!!data.GridFilters.batch) ? data.GridFilters.batch.map(d => ({ label: d, value: d })) : [];
          this.topics = (!!data.GridFilters.topic) ? data.GridFilters.topic.map(d => ({ label: d, value: d })) : [];
          this.revisions = (!!data.GridFilters.revision) ? data.GridFilters.revision.map(d => ({ label: d, value: d })) : [];
          this.seriess = (!!data.GridFilters.series) ? data.GridFilters.series.map(d => ({ label: d, value: d })) : [];
          this.cstatus = (!!data.GridFilters.cstatus) ? data.GridFilters.cstatus.map(d => ({ label: d, value: d })) : [];
          this.cstages = (!!data.GridFilters.cstages) ? data.GridFilters.cstages.map(d => ({ label: d, value: d })) : [];
          this.printAssets = (!!data.GridFilters.printAssets) ? data.GridFilters.printAssets.map(d => ({ label: d, value: d })) : [];
          this.printReadys = (!!data.GridFilters.printReadys) ? data.GridFilters.printReadys.map(d => ({ label: d, value: d })) : [];
          // tslint:disable-next-line: max-line-length
          this.permissionTypes = (!!data.GridFilters.permissionTypes) ? data.GridFilters.permissionTypes.map(d => ({ label: d, value: d })) : [];
          this.pageNos = (!!data.GridFilters.pageNos) ? data.GridFilters.pageNos.map(d => ({ label: d, value: d })) : [];
          this.flagedTeams = (!!data.GridFilters.flagedTeams) ? data.GridFilters.flagedTeams.map(d => ({ label: d, value: d })) : [];
          this.mathAuditors = (!!data.GridFilters.mathAuditors) ? data.GridFilters.mathAuditors.map(d => ({ label: d, value: d })) : [];
        }
        this.totalRecords = data.totalCount;
        // tslint:disable-next-line: forin
        for ( const d in data.artLogData ) {
          data.artLogData[d].totalage = parseFloat(data.artLogData[d].totalage);
          data.artLogData[d].lastage = parseFloat(data.artLogData[d].lastage);
        }
        self.cartdata = data.artLogData;
        this.filteredValuesLength = data.artLogData.length;
        self.selectedColumn = this.cols;
        resolve(data);
      });
    });
  }, 1000);
    //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

        //imitate db connection over a network
        /*setTimeout(() => {
          if (this.datasource) {
              this.cars = this.datasource.slice(event.first, (event.first + event.rows));
              this.loading = false;
          }
      }, 1000);
      */
  }
  filterData() {
    // tslint:disable-next-line: triple-equals
    if ( this.frmdt.grade.length > 0 || this.frmdt.module.length > 0  || this.artLogModel.batch.value != '' || this.artLogModel.workflow.value.length > 0
      || this.artLogModel.curricula.value.length > 0  || this.frmdt.status.length > 0  || this.artLogModel.added.value > 0 ) {
      this.isSaveSearch = true;
    } else {
      this.isSaveSearch = false;
    }
    this.getMetaData(this.search);
  }
  checkUserinfo() {
    this.httpService.extractPostData(CustomerServicesUrls.USERINFO_DATA, null, null).subscribe((data) => {
      console.log('getting data=>', data);
    });
  }
  confirm() {
    if (this.selectedTagsData.length == 0) {
      this.alert.showAlertDanger(['Please select at lease one record.'], 10000);
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure you want to proceed?',
        accept: () => {
          for (const dt of this.selectedTagsData) {
            const ind = this.cartdata.indexOf(dt);
           /* if( this.cartdata[ind].duplicate === true)
            this.cartdata[ind].duplicate = false; */
          }
          let body = new HttpParams().append('data', JSON.stringify(this.selectedTagsData));
          this.httpService.extractData(CustomerServicesUrls.UPDATEASSETTAGS, body, null).subscribe((data) => {
            console.log('res=>', data);
            // tslint:disable-next-line: max-line-length
            this.alert.showAlertScucess(['Asset Bank tag updation is in progress! You will receive an email notification once it has been completed.'], 3000);
            this.tagverificationModal = false;
          });
        }
      });
    }
  }
  deleteMoveTagList(dt: any) {
    const index = this.rowsmoveTags.indexOf(dt);
    this.rowsmoveTags.splice(index, 1);
  }
  saveTagData() {
    let body = new HttpParams();
    body = body.append('tags', this.bulkTags);
    body = body.append('selectedids', JSON.stringify(this.selectedRows.map(d => d._id)));
    const self = this;
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_BULKTAGS, body, null).subscribe((data) => {
      for (const dt of data) {
        const index = self.cartdata.indexOf(self.cartdata.filter((d, i) => d._id === dt._id)[0]);
        if (self.cartdata[index].tags != '') {
          self.cartdata[index].tags = self.cartdata[index].tags + ',' + self.bulkTags;
        } else {
          self.cartdata[index].tags = self.bulkTags;
        }
      }
      self.selectedRows = [];
      this.bulkTagModal = false;
      self.bulkTags = '';
      this.alert.showAlertScucess(['Bulk tags has been updated successfully!'], 5000);
    });
  }
  savebulkBatchCDate(){
    let body = new HttpParams();
    body = body.append('batchCDate', this.bulkBatchCDate);
    body = body.append('selectedids', JSON.stringify(this.selectedRows.map(d => d._id)));
    const self = this;
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_BULK_BULKBATCHCDATE, body, null).subscribe((data) => {

     for (const dt of data) {
        const index = self.cartdata.indexOf(self.cartdata.filter((d, i) => d._id === dt._id)[0]);
        self.cartdata[index].batchCDate = dt.batchCDate || self.bulkBatchCDate;
        const unit = 'day';
        const days  = moment(self.cartdata[index].batchCDate).diff( moment(self.cartdata[index].receiveddate), unit as unitOfTime.DurationConstructor );
        if( days > 7 ){
          self.cartdata[index].artTeamPriority='Low';
        } else if( days <= 7 && days > 1  ) {
          self.cartdata[index].artTeamPriority='Medium';
        } else if (days <= 1){
          self.cartdata[index].artTeamPriority ='High';
        }
      }
     self.bulkBatchCDate =  moment().format('MM-DD-YYYY');;
     this.bulkBatchCDateModal = false;
     self.selectedRows = [];
     this.alert.showAlertScucess(['Bulk  Batch Complation Date has been updated successfully!'], 5000);
    });
  }
  savebulkExceptionCat(){
    let body = new HttpParams();
    body = body.append('exceptionCategory', this.bulkExceptionCat);
    body = body.append('selectedids', JSON.stringify(this.selectedRows.map(d => d._id)));
    const self = this;
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_BULK_EXCEPTIONCAT, body, null).subscribe((data) => {
      self.bulkExceptionCat = '';
      for (const dt of data) {
        const index = self.cartdata.indexOf(self.cartdata.filter((d, i) => d._id === dt._id)[0]);
        self.cartdata[index].exceptionCategory = dt.exceptionCategory || self.bulkExceptionCat;
      }
      this.bulkExceptionCatModal = false;
      self.selectedRows = [];
      this.alert.showAlertScucess(['Bulk exceptionCategory has been updated successfully!'], 5000);
    });
  }
  savebulkException(){
    let body = new HttpParams();
    body = body.append('exception', this.bulkException);
    body = body.append('selectedids', JSON.stringify(this.selectedRows.map(d => d._id)));
    const self = this;
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_BULK_EXCEPTION, body, null).subscribe((data) => {

      self.bulkException = '';
      for (const dt of data) {
        const index = self.cartdata.indexOf(self.cartdata.filter((d, i) => d._id === dt._id)[0]);
        self.cartdata[index].exception = dt.exception || self.bulkException;
      }
      this.bulkExceptionModal = false;
      self.selectedRows = [];
      this.alert.showAlertScucess(['Bulk exception has been updated successfully!'], 5000);
    });
  }
  saveBatchData() {
    let body = new HttpParams();
    body = body.append('batch', this.bulkBatch);
    body = body.append('selectedids', JSON.stringify(this.selectedRows.map(d => d._id)));
    const self = this;
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_BULKBATCH, body, null).subscribe((data) => {
      self.bulkBatch = '';
      for (const dt of data) {
        const index = self.cartdata.indexOf(self.cartdata.filter((d, i) => d._id === dt._id)[0]);
        self.cartdata[index].batch = dt.batch || self.bulkBatch;
      }
      this.bulkBatchModal = false;
      self.selectedRows = [];
      this.alert.showAlertScucess(['Bulk Batch has been updated successfully!'], 5000);
    });
  }
  lockJobGenerateTags() {
    if (this.selectedRows.length === 0) {
      alert('Please select a row.');
    } else {
      const dt = [];
      this.rowsmoveTags = [];
      for (let t = 0; t < this.selectedRows.length; t++) {
        const ind = this.cartdata.indexOf(this.selectedRows[t]);
        this.selectedRows[t].generatedTags = 'MPS_artlog, ' + this.generateTags(this.cartdata[ind]);
        this.rowsmoveTags.push(this.selectedRows[t]);
      }
      this.tagverificationModal = true;
    }
  }
  validG(d) {
    // tslint:disable-next-line: radix
   if (isNaN(parseInt(d))) {
     return d;
   } else {
     // tslint:disable-next-line: radix
     d = parseInt(d);
     return (d < 10) ? '0' + d.toString() : d.toString();
   }
  }
  place(d) {
    // tslint:disable-next-line: radix
    d = parseInt(d);
    return (d < 10) ? '0' + d.toString() : d.toString();
  }
  generateTags(dt: any) {
    let prfx = '';
    if (!!dt.job_key && dt.job_key.indexOf('SCI-') > -1) {
      prfx = 'SC_';
    } else if (!!dt.job_key && dt.job_key.indexOf('EM2-') > -1) {
      prfx = 'EM2_';
    }
    const combination = Array();
    if ((dt.grade !== '' || dt.grade !== 'N/A') && (dt.module !== '' && dt.module !== 'NA')) {
      combination.push(prfx + 'G' + this.validG(dt.grade));
      combination.push(prfx + 'G' + this.validG(dt.grade) + '_M' + this.validG(dt.module));
      if (!!dt.lesson) {
        let lett = false;
        if (!!dt.lessonlet) {
          lett = true;
          // tslint:disable-next-line: max-line-length
          combination.push(prfx + 'G' + this.validG(dt.grade) + '_M' + this.validG(dt.module) + '_L' + this.validG(dt.lesson) + '_' + dt.lessonlet);
        }
        combination.push(prfx + 'G' + this.validG(dt.grade) + '_M' + this.validG(dt.module) + '_L' + this.validG(dt.lesson));
        if (!!dt.component) {
          let comp = dt.component.substring(0, 3).trim();
          if (comp.indexOf('_') > -1) {
            comp = comp.split('_').join('');
          }
          combination.push(comp);
          // tslint:disable-next-line: triple-equals
          if (comp == comp.toUpperCase() && !lett) {
            combination.push(prfx + this.validG(dt.grade) + this.place(dt.module) + comp + '_L' + this.place(dt.lesson));
          // tslint:disable-next-line: triple-equals
          } else if (comp == comp.toUpperCase() && !!lett) {
            // tslint:disable-next-line: max-line-length
            combination.push(prfx + this.validG(dt.grade) + this.place(dt.module) + comp + '_L' + this.place(dt.lesson) + '_' + dt.lessonlet);
          } else {
            combination.push(prfx + this.validG(dt.grade)  + this.place(dt.module) + '_L' + this.place(dt.lesson));
          }
        } else {
          combination.push(prfx + this.validG(dt.grade) + this.place(dt.module) + '_L' + this.place(dt.lesson));
        }
        if (!dt.tags) {
          combination.push(dt.job_key);
        } else {
          if (dt.tags.split(',').indexOf(dt.job_key) === -1) {
            combination.push(dt.job_key);
          }
        }
      }
    } else {
      if (dt.tags.split(',').indexOf(dt.job_key) === -1) {
        combination.push(dt.job_key);
      }
    }
    console.log('tagGenerated:', combination.join(', '));
    return combination.join(', ');
  }
  setDefaltSearch(evt: any) {
    let body = new HttpParams();
    body = body.append('default', this.defaultSearch);
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_SETDEFAULT_SEARCH, body, null).subscribe((data) => {
      this.alert.showAlertScucess(['Your default search list has been updated!'], 3000);
    });
  }
  clearGridState() {
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_GRIDSTATECLEAR, null, null).subscribe((data) => {
      this.gridState = '';
      this.scrollableCols = this.cols.filter(d => d.tid > 0);
      this.alert.showAlertScucess(['Your grid state has been reset successfully!'], 3000);
    });
  }
  saveGridState() {
    let body = new HttpParams();
    const dt = { 'selectedColumn': this.scrollableCols, 'search': this.grid };
    body = body.append('selectedColumn', JSON.stringify(dt));
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_GRIDSTATESAVE, body, null).subscribe((data) => {
      if (!!data.searchTitle) {
        this.gridState = data;
      }
      this.alert.showAlertScucess(['Grid state saved successfully!'], 3000);
    });
  }
  saveUserSerach(d:string) {
    let body = new HttpParams();
    const frmDt = {
      tabData:d,
      grade: this.frmdt.grade, module: this.frmdt.module, status: this.frmdt.status, batch: this.artLogModel.batch.value,
      workflow: this.artLogModel.workflow.value, curricula: this.artLogModel.curricula.value, resTeam: this.artLogModel.resTeam.value,
      added: this.artLogModel.added.value
    };
    body = body.append('frmdt', JSON.stringify(frmDt));
    body = body.append('searchText', JSON.stringify(this.searchText));
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_SEARCHSAVE, body, null).subscribe((data) => {
      this.savedsearchLists.splice(0, 0, data);
      this.saveSearchModal = false;
      this.alert.showAlertScucess(['Search saved successfully!'], 3000);
    });
  }
  deleteSearchList(obj) {
    let body = new HttpParams();
    body = body.append('_id', obj._id);
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_DELETE_SEARCHSAVE, body, null).subscribe((data) => {
      const d = this.savedsearchLists.find(d => d._id === data.did);
      const index = this.savedsearchLists.indexOf(d);
      this.savedsearchLists.splice(index, 1);
      this.alert.showAlertDanger(['Saved search removed successfully!'], 3000);
    });
  }
  getinit() {
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_INIT, null, null).subscribe((data) => {

      if (data.hasOwnProperty('grade')) {
        this.Gdata = data.grade;
        const GradeData = JSON.parse(JSON.stringify(data.grade));
        GradeData.splice(0, 0, { id: '', value: '', label: 'Select' });
        this.addGdata = GradeData;
      }
      if (!!data.module) {
        this.Mdata = data.module.filter(d => d.value != '');
        this.addMdata = data.module.filter(d => d.value != '');
        this.addMdata.splice(0, 0, { id: '', value: '', label: ' Select' });
      }
      if (!!data.artAssign) {
        data.artAssign.splice(0, 0, { id: '', value: '', label: 'Please Select' });
        this.artassions = data.artAssign;
      }
      if (!!data.artcomplex) {
        data.artcomplex.splice(0, 0, { id: '', value: '', label: 'Please Select' });
        this.artcomplexs = data.artcomplex;
      }
      if (!!data.risk) {
        data.risk.splice(0, 0, { id: '', value: '', label: 'Please Select' });
        this.risks = data.risk;
      }
      if (!!data.impact) {
        data.impact.splice(0, 0, { id: '', value: '', label: 'Please Select' });
        this.impacts = data.impact;
      }
      if (!!data.wip) {
        data.wip.splice(0, 0, { id: '', value: '', label: 'Select All' });
        this.wip = data.wip;
      }
      if (!!data.inData) {
        const def = data.inData.filter(d => d.isDefault === true);
        if (def.length > 0) {
          this.defaultSearch = def[0]._id;
        }
        this.gridState = data.inData.find(d => d.state === 'GridStage');
        // setting default grid state
        if (!!this.gridState && !!this.gridState.fields) {
          const dt = JSON.parse(this.gridState.fields);
          this.scrollableCols = dt.selectedColumn;
        }
        /*
        this.savedsearchLists = data.inData.filter(d => d.state !== 'GridStage');
        const defalutSearch = this.savedsearchLists.filter(d => d.isDefault == true);
        if (this.savedsearchLists.length && defalutSearch.length > 0) {
          const frmData = JSON.parse(defalutSearch[0].fields);
          if (frmData.grade.length) {
            this.frmdt.grade = frmData.grade;
          }
          if (frmData.module.length > 0) {
            this.frmdt.module = frmData.module;
          } if (frmData.batch !== '') {
            this.artLogModel.batch.value = frmData.batch;
          } if (frmData.workflow !== '') {
            this.artLogModel.workflow.value = frmData.workflow;
          } if (frmData.curricula !== '') {
            this.artLogModel.curricula.value = frmData.curricula;
          } if (frmData.status !== '') {
            this.frmdt.status = frmData.status;
          } else {
            this.frmdt.status = ['Approved'];
          } if (frmData.added !== '') {
            this.artLogModel.added.value = frmData.added;
          }
          this.filterData();
        } else {
          const obj: any = {};
          this.getMetaData(obj);
        }*/
          const obj: any = {};
        //this.getMetaData(obj);
      }
    });
  }
  changeMfilter( val: any, dt: any, colName: any) {
    this.dataloading = true;
    const self = this;
    setTimeout(function() {
      dt.filter(val, colName, 'in');
      self.dataloading = false;
    }, 200 );
  }
  getMetaData(Obj: any) {
    this.dataloading = true;
    const self = this;
    this.selectedRows = [];
    return new Promise(resolve => {
      this.loadDataFromApi(this.NAME_ARTLOG).subscribe((data) => {
        this.dataloading = false;
        if (data.hasOwnProperty('GridFilters')) {
          this.lessons = (!!data.GridFilters.lesson) ? data.GridFilters.lesson.map(d => ({ label: d, value: d })) : [];
          this.lessonLets = (!!data.GridFilters.lessonlet) ? data.GridFilters.lessonlet.map(d => ({ label: d, value: d })) : [];
          this.components = (!!data.GridFilters.component) ? data.GridFilters.component.map(d => ({ label: d, value: d })) : [];
          this.modules = (!!data.GridFilters.module) ? data.GridFilters.module.map(d => ({ label: d, value: d })) : [];
          this.grades = (!!data.GridFilters.grade) ? data.GridFilters.grade.map(d => ({ label: d, value: d })) : [];
          this.Gartcomplexs = (!!data.GridFilters.artcomplex) ? data.GridFilters.artcomplex.map(d => ({ label: d, value: d })) : [];
          this.Gartassions = (!!data.GridFilters.artassion) ? data.GridFilters.artassion.map(d => ({ label: d, value: d })) : [];
          this.Grisks = (!!data.GridFilters.risk) ? data.GridFilters.risk.map(d => ({ label: d, value: d })) : [];
          this.Gimpact = (!!data.GridFilters.impact) ? data.GridFilters.impact.map(d => ({ label: d, value: d })) : [];
          this.GcurrentRTeam = (!!data.GridFilters.currentRTeam) ? data.GridFilters.currentRTeam.map(d => ({ label: d, value: d })) : [];
          this.Gworkflow = (!!data.GridFilters.workflow) ? data.GridFilters.workflow.map(d => ({ label: d, value: d })) : [];
          this.Gcurriculum = (!!data.GridFilters.curriculum) ? data.GridFilters.curriculum.map(d => ({ label: d, value: d })) : [];
          this.facings = (!!data.GridFilters.facing) ? data.GridFilters.facing.map(d => ({ label: d, value: d })) : [];
          this.batchs = (!!data.GridFilters.batch) ? data.GridFilters.batch.map(d => ({ label: d, value: d })) : [];
          this.topics = (!!data.GridFilters.topic) ? data.GridFilters.topic.map(d => ({ label: d, value: d })) : [];
          this.revisions = (!!data.GridFilters.revision) ? data.GridFilters.revision.map(d => ({ label: d, value: d })) : [];
          this.seriess = (!!data.GridFilters.series) ? data.GridFilters.series.map(d => ({ label: d, value: d })) : [];
          this.cstatus = (!!data.GridFilters.cstatus) ? data.GridFilters.cstatus.map(d => ({ label: d, value: d })) : [];
          this.cstages = (!!data.GridFilters.cstages) ? data.GridFilters.cstages.map(d => ({ label: d, value: d })) : [];
          this.printAssets = (!!data.GridFilters.printAssets) ? data.GridFilters.printAssets.map(d => ({ label: d, value: d })) : [];
          this.printReadys = (!!data.GridFilters.printReadys) ? data.GridFilters.printReadys.map(d => ({ label: d, value: d })) : [];
          // tslint:disable-next-line: max-line-length
          this.permissionTypes = (!!data.GridFilters.permissionTypes) ? data.GridFilters.permissionTypes.map(d => ({ label: d, value: d })) : [];
          this.pageNos = (!!data.GridFilters.pageNos) ? data.GridFilters.pageNos.map(d => ({ label: d, value: d })) : [];
          this.flagedTeams = (!!data.GridFilters.flagedTeams) ? data.GridFilters.flagedTeams.map(d => ({ label: d, value: d })) : [];
          this.mathAuditors = (!!data.GridFilters.mathAuditors) ? data.GridFilters.mathAuditors.map(d => ({ label: d, value: d })) : [];
        }
        // tslint:disable-next-line: forin
        for ( const d in data.artLogData ) {
          
          data.artLogData[d].totalage = parseFloat(data.artLogData[d].totalage);
          data.artLogData[d].lastage = parseFloat(data.artLogData[d].lastage);
        }
        debugger
        self.totalRecords = data.totalCount;
        this.filteredValuesLength = data.artLogData.length;
        self.selectedColumn = this.cols;
        resolve(data);
        //self.getOtherData(this.NAME_ARTLOG);
      });
    });
  }
  getOtherData(action: string) {
    // background Process
    this.loadDataFromApi(this.NAME_ARTLOG).subscribe((data) => {
      console.log(data);
    });
    console.log(action);
  }
  datatesting(d: any, dd: any) {
    console.log(d, dd);
  }
  updateSelection() {
    this.scrollableCols = this.scrollableCols.sort((a, b) => a.tid - b.tid);
  }
  onRowEditInit(artdt: any, editing) {
    editing = !editing;
    // this.clonedArtLog[artdt._id] = { ...artdt };
  }
  onRowEditCancel(artdt: any, editing) {
    editing = !editing;
  }
  onRowEditSave(artdt: any) {
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.append('newData', JSON.stringify(artdt));
    this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_UPDATEJOBS, body, { headers: myheader }).subscribe((data) => {
      if (data.length > 0 && data[0].msg === 'SUCCESS') {
        this.alert.showAlertScucess(['Job(s) updated successfully!'], 3000);
      } else {
        this.alert.showAlertDanger(['Updated job(s) have some issue!'], 3000);
      }
    });
  }
  checkEdit(field, dt) {
    if (dt.hasOwnProperty('duplicate') && dt.duplicate == true && field === 'job_key') {
      return true;
    } else {
      return false;
    }
  }
  onYearChange(event, dt) {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }
    this.yearTimeout = setTimeout(() => {
      dt.filter(event.value, 'year', 'gt');
    }, 1250);
  }
  createContact(): FormGroup {
    return this.fb.group({
      grade : [null, Validators.compose([Validators.required])],
      module : [null, Validators.compose([Validators.required])],
      jobkey : [null, Validators.compose([Validators.required])],
      component : [null],
      lesson : [null],
      topic : [null],
      facing : [null],
    });
  }
  createDuplicateJob(jk: String = '', g: any = {}, m: any = {}, c: String = '', l: String = '', f: String= '', t: String= '' ): FormGroup {
    return this.fb.group({
      jobkey: [jk, Validators.compose([Validators.required])],
      grade: [g, Validators.compose([Validators.required])],
      module: [m, Validators.compose([Validators.required])],
      component: [c],
      lesson: [l],
      topic: [t],
      facing : [f],
    });
  }
  addContact() {
    this.contactList.push(this.createContact());
  }
  // remove contact from group
  createClone(index) {
    const jobAdd = this.form.value.jobAdd[index];
    // tslint:disable-next-line: max-line-length
    const clone = this.createDuplicateJob(jobAdd.jobkey, jobAdd.grade, jobAdd.module, jobAdd.component, jobAdd.lesson, jobAdd.facing, jobAdd.topic);
    this.contactList.push(clone);
  }
  removeContact(index) {
    this.contactList.removeAt(index);
  }
  get contactFormGroup() {
    return this.form.get('jobAdd') as FormArray;
  }
  getContactsFormGroup(index): FormGroup {
    this.contactList = this.form.get('jobAdd') as FormArray;
    const formGroup = this.contactList.controls[index] as FormGroup;
    return formGroup;
  }
  submit() {
    let valid = true;
    for (const test of this.form.value.jobAdd) {
      if (test.jobkey === null || !test.jobkey) {
        valid = false;
      }
    }
    if (valid) {
      const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      let body = new HttpParams();
      body = body.append('jobAdd', JSON.stringify(this.form.value.jobAdd));
      const self = this;
      this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_JOBADD, body, { headers: myheader }).subscribe((data) => {
        const jobsInfo = data.jobsInfo;
        const data1 = data.resDt;
        for (const dt of data1) {
          const index = self.cartdata.indexOf(self.cartdata.filter((d, i) => d.job_key === dt.job_key)[0]);
          self.cartdata.splice((index + 1), 0, dt);
        }
        this.displayDialog = false;
        const saved = jobsInfo.filter(d => d.exist === true);
        const invalid = jobsInfo.filter(d => d.exist === false);
        let msg = '';
        if ( saved.length > 0 ) {
          msg = saved.length + ' Jobs (' + saved.map(d => d.jobkey).join() + ') has been saved successfully ';
        }
        if ( invalid.length > 0) {
          msg = (!msg) ? ' ' : msg + ', ';
          msg = msg + invalid.length + ' Jobs (' + invalid.map( d => d.jobkey ).join() + ') not exist or invalid ';
        }
        msg = msg + '!';
        this.alert.showAlertScucess([msg], 10000);
      });
    } else {
      this.alert.showAlertDanger(['Job key required !'], 5000);
    }
  }
  initSearchModels() {
    this.artLogModel = new ArtLogModel();
  }
  getSearchModel(name: string) {
    if (name === this.NAME_ARTLOG) {
      try {
        if (this.frmdt.grade.length > 0) {
          this.artLogModel.grade.value = this.frmdt.grade.map(a => a.id);
        } else { this.artLogModel.grade.value = []; }
        if (this.frmdt.module.length > 0) {
          this.artLogModel.module.value = this.frmdt.module.map(a => a.id);
        } else { this.artLogModel.module.value = []; }
        if (this.frmdt.status.length > 0) {
          this.artLogModel.status.value = this.frmdt.status.map(a => a.field);
        } else { this.artLogModel.status.value = ['Approved']; }
      } catch (err) {
        // console.log(err)
      }
      return this.artLogModel;
    }
  }
  selectedImages(event, data: any, overlaypanel: OverlayPanel) {
    this.selectedData = data;
    overlaypanel.toggle(event);
  }
  getServiceUrl(name: string) {
    if (name === this.NAME_ARTLOG) {
      return CustomerServicesUrls.ARTLOG_DATA;
    }
  }

  clearAllFilter(dt: any) {
    // tslint:disable-next-line: max-line-length
    const Input: any = ['job_key', 'name', 'lessonlet', 'description', 'cstage', 'status', 'creditLine', 'comment', 'tags', 'mverification', 'isPaging'];
    const InputOth: any = ['tags'];
    // tslint:disable-next-line: max-line-length
    const Select: any = ['flagedTeam', 'mathAuditor', 'grade', 'module', 'component', 'lesson', 'batch', 'currentRTeam', 'curriculum', 'facing', 'series', 'creditLine',
      'revisionC', 'artcomplex', 'artassion', 'risk', 'impact', 'workflow'];
    for (const a in Input) {
      if (this.g.hasOwnProperty(Input[a])) {
        this.cleargInputFilter(dt, Input[a]);
      }
    }
    for (const a in Select) {
      if (this.g.hasOwnProperty(Select[a])) {
        this.cleargSelectFilter(dt, Select[a]);
      }
    }
    if (this.g.hasOwnProperty(InputOth[0])) {
      this.cleargInputOtherFilter(dt, InputOth[0]);
    }
  }
  cleargInputOtherFilter(gdt: any, col: string) {
    this.g[col] = '';
    gdt.filter(this.g[col], col, 'contains');
  }
  cleargInputFilter(gdt: any, col: string) {
    this.g[col] = '';
    gdt.filter(this.g[col], col, 'filterMatchMode');
  }
  cleargSelectFilter(dt: any, col: string) {
    this.g[col] = '';
    dt.filter(this.g[col], col, 'in');
  }
  hasData(): boolean {
    let res = false;
    for (const key in this.g) {
      if (this.g[key] !== '') {
        res = true;
      }
    }
    return res;
  }
  exportDataAsCSVSelected(dt: any) {
    if ( this.selectedRows.length === 0 ) {
      alert('No row(s) has been selected!');
    } else {
     // this.scrollableCols = this.cols;
      const that = this;
     // setTimeout(function () {
     //   debugger;
        let OtherCol = [{ field: 'job_key', header: 'Job Key' },
        { field: '_id', header: 'ACHJob ID' }
        ];
      dt.exportCSV({ selectionOnly: true }, OtherCol );
     // }, 1000);
    }
  }
  exportCombineDataAsCSV(dt: any){
    debugger
    console.log("Combine Data request");
    //let body = this.getSearchModel(ARTLOG_DATA);
    let status = ['Active','Approved'];
    let body = new HttpParams().append('status', status.toString());
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_DATA, body,  null).subscribe((data) => {
      //debugger
      data = data.artLogData;
      console.log('Combine data part', data, this.cols);
      let columansArray = this.cols.map(d => d.field);
      let str = '';
      let row = 'S.No, ';
     // for (let i = 0; data.length; i++) {
        for (let Key of columansArray) {
            row += Key + ', ';
        }
     // }
      row = row.slice(0, -1);
      str += row + '\r\n';
      for (let i = 0; i < data.length; i++) {
        let line = (i+1)+'';
        for (let Key of columansArray) {
          if(Key.indexOf('.') != -1){
            line += ',' + ((eval("data[i]."+Key))?eval("data[i]."+Key):'');
          } else {
            line += ',' + ((data[i][Key])?data[i][Key]:'');
          }
        }
        str += line + '\r\n';
    }
      let csvData = str;
      let filename ='CombineData.csv';
      let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    console.log(str);
    });
   // throw new Error('http request error!, Request could not be served')
  }
  downloadFile(data: any) {
    let filename = 'data'; let csvData;
    //let csvData = this.ConvertToCSV(data, [
    //  'name', 'age', 'average', 'approved', 'description']);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], {
        type: 'text/csv;charset=utf-8;'
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
   /* let isSafariBrowser = navigator.userAgent.indexOf( 'Safari') != -1 & amp; & amp;  navigator.userAgent.indexOf('Chrome') == -1;

    //if Safari open in new window to save file with random filename.
    if (isSafariBrowser) {
        dwldLink.setAttribute("target", "_blank");
    }
    */
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}
  exportDataAsCSV(dt: any) {
    //this.scrollableCols = this.cols;
    // const that = this;
    //setTimeout(function () {
      let OtherCol = [
          { field: 'job_key', header: 'Job Key' },
          { field: '_id', header: 'ACHJob ID' },
          { field: '', header: 'Stages'}
        ];
      dt.exportCSV({}, OtherCol);
  }

  addGraph(rowData: any) {
    console.log("garph data display::", rowData);
    this.stageDurationGraph = true;
    debugger
    let that = this;
    // tslint:disable-next-line: max-line-length
    let rowDuration = rowData.Preset_Stages.map( d => ({ position: d.position, StageNames: d.StageNames ||d.name,
      duration: parseFloat(that.dateDiffinDurationStage( d.job_date_finished ,  d.start_date))
    }));
    debugger
    let newDrawPattern = [];
    for ( let  i in  rowDuration) {
      if ( newDrawPattern.filter( d => d.position == rowDuration[i].position).length==0) {
        newDrawPattern.push(rowDuration[i]);
        rowDuration[i].ispushed= true;
      }
    }
    let nextRow = rowDuration.filter(d=> d.ispushed != true);
    debugger
    let newDrawPattern2 = [];
    for ( let  i in  nextRow) {
      if ( newDrawPattern2.filter( d => d.position == nextRow[i].position).length==0) {
        newDrawPattern2.push(nextRow[i]);
        nextRow[i].ispushed= true;
      }
    }
    let nextRow3 =nextRow.filter(d=> d.ispushed!= true);
    let newDrawPattern3 = [];
    for ( let  i in  nextRow3) {
      if ( newDrawPattern3.filter( d => d.position == nextRow3[i].position).length==0) {
        newDrawPattern3.push(nextRow3[i]);
        nextRow3[i].ispushed= true;
      }
    }
    let nextRow4 =nextRow3.filter(d=> d.ispushed!= true);
    let newDrawPattern4 = [];
    for ( let  i in  nextRow4) {
      if ( newDrawPattern4.filter( d => d.position == nextRow4[i].position).length==0) {
        newDrawPattern4.push(nextRow4[i]);
        nextRow4[i].ispushed= true;
      }
    }
   // newDrawPattern newDrawPattern2 newDrawPattern3, newDrawPattern4
   for(let dd in newDrawPattern){
    if(newDrawPattern2.length > 0 && newDrawPattern2.filter(d=> d.position ==newDrawPattern[dd].position).length ==0){
      newDrawPattern2.push({position: newDrawPattern[dd].position, StageNames: newDrawPattern[dd].StageNames,  duration:0});
    }
    if(newDrawPattern3.length > 0 && newDrawPattern3.filter(d=> d.position ==newDrawPattern[dd].position).length ==0){
      newDrawPattern3.push({position: newDrawPattern[dd].position, StageNames: newDrawPattern[dd].StageNames, duration:0});
    }
    if(newDrawPattern4.length > 0 && newDrawPattern4.filter(d=> d.position ==newDrawPattern[dd].position).length ==0){
      newDrawPattern4.push({position: newDrawPattern[dd].position, StageNames: newDrawPattern[dd].StageNames, duration:0});
    }
   }
    newDrawPattern4=newDrawPattern4.sort((a,b)=> a.position-b.position);
    newDrawPattern3=newDrawPattern3.sort((a,b)=> a.position-b.position);
    newDrawPattern2=newDrawPattern2.sort((a,b)=> a.position-b.position);
    debugger
    console.log(newDrawPattern3);
    this.apex = {
      series: [
      {
        name: ['Iteration','1'],
        data: newDrawPattern.map(d=> ({x:d.StageNames, y: d.duration}))/*[
          {
            x: ['Stage A'],
            y: 2.9
          },
          {
            x: ['Stage B'],
            y: 4.3
          },
          {
            x: ['Stage C'],
            y: 6.2
          },
          {
            x: ['Stage D'],
            y: 11.1
          }
        ]*/
      },
      {
        name: ['Iteration','2'],
        data: newDrawPattern2.map(d=> ({x:d.StageNames, y: d.duration}))
      },
      {
        name: ['Iteration','3'],
        data: newDrawPattern3.map(d=> ({x:d.StageNames, y: d.duration}))
      },
      {
        name: ['Iteration','4'],
        data: newDrawPattern4.map(d=> ({x:d.StageNames, y: d.duration}))
      }

    ],
      chart: {
      type: 'bar',
      stacked: true,
      height: 450,
      width: '100%'
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    dataLabels: {
      enabled: true
    },
    yaxis: {
      labels: {
        align: 'center'
      }
    },
    legend: {
      horizontalAlign: 'center'
    }
    };

    //throw new Error("apex chart library not rendering. NPM dependency not found");
  }
  dateDiffinDurationStage ( date1: string , date2: string) {
    let d2, d1;
    if ( typeof date1 === "undefined"|| date1 === null  || date1=="") {
      d1 = new Date();
    } else {
      d1 = new Date(date1);
    }
    if ( typeof date2 === "undefined"|| date2 === null  || date2=="") {
      d2 = new Date();
    } else {
      d2 = new Date(date2);
    }
    return parseFloat( (Math.abs(d2.getTime() - d1.getTime()) / 86400000).toString() ).toFixed(1);
  }
}
