import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpService } from '../../core/services/http.service';
import { BaseComponent } from '../../core/base/base.component';
import { BaseService } from '../../core/base/base.service';
import { columnDefsArtLogs } from './dashboard.data';
import { ArtLogModel } from './dashboard.model';
import { CustomModalPopUpService } from '../../component/custom-modal-pop-up/custom-modal-pop-up.service';
import { CustomModalPopUpModel } from '../../component/custom-modal-pop-up/custom-modal-pop-up.model';
import { CustomerServicesUrls } from '../../core/shared/constant/url-constants/customer-services.constants';
import { DropdownDataModel, AlertMessageService } from '../../component';
import { Router } from '@angular/router';
import { GridAPII } from '../../core/base/base.component';
import { SessionObject } from '../../core/shared';
import { MenuItem, SelectItem } from 'primeng/api';
//ARTLOG_SEARCHSAVE
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HeaderOpt } from './token';
import { OverlayPanel } from 'primeng/overlaypanel';


import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

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
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ConfirmationService]
})
export class DashboardComponent extends BaseComponent implements OnInit, OnChanges {
  //@Input() jobId: string;
  blockedPanel: boolean = false;
  clonedArtLog: { [s: string]: any; } = {};
  yearFilter: number;
  selectedColumn: any;
  yearTimeout: any;
  cartdata: any;
  jobID: any;
  totalage: any = [];
  clonedCars: { [s: string]: any; } = {};
  jobkeys: any = [];
  // -- columans for filter Grid dropdown
  lessons: any = [];
  lessonLets: any = [];
  components: any = [];
  grades: any = [];
  modules: any = [];
  batchs: any = [];
  revisons: any = [];
  facings: any = [];
  seriess: any = [];
  revisions: any = [];
  cstages: any = [];
  cstatus: any = [];

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
  pagingCol: any = [
    { value: '', label: 'N/A' },
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
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
  //optionsModel
  artLogModel: ArtLogModel;
  Gdata: any;
  addGdata: any;
  Mdata: any;
  addMdata: any;
  Wdata: any;
  WIPdata: any;
  Tdata: any;
  jobStatus: any;
  NAME_ARTLOG = 'NAME_ARTLOG';
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
  bulkBatch: any;
  bulkTags: any;
  bulkTagModal: boolean;
  modes: SelectItem[];
  selectedModes: string[];
  selectedModesDisabled: boolean;
  jobsTypes: any[];
  criteria: boolean;
  isScrollable: boolean = true;
  g: any = {};
  public dataSource = new BehaviorSubject<AbstractControl[]>([]);


  //@Input("edit-jobs") editJobID: string;
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
    private fb: FormBuilder) {
    super(baseServices, router);
    //this.checkUserinfo();
    this.criteria = false;
    this.selectedModesDisabled = false;
    this.modes = [
      { value: 'AddRow', title: 'Add Row', icon: 'fa fa-plus' },
      { value: 'SaveGridState', title: 'Save Grid State', icon: 'fa fa-floppy-o' },
      { value: 'LockJobs', title: 'Lock Job & Generate Tags', icon: 'fa fa-lock' },
      { value: 'InsertBatch', title: 'Insert Batch', icon: 'fa fa-object-group' },
      { value: 'InsertTags', title: 'Insert Tags', icon: 'fa fa-tags' }
    ];
    this.jobsTypes = [
      { value: '', label: 'All' },
      { value: 1, label: 'Index Jobs' },
      { value: 2, label: 'Created Jobs' },
      { value: 3, label: 'Moved Jobs' }
    ];
    this.verificationsDt = [
      { value: '', label: 'All' },
      { value: 'Yes', label: 'Verified' },
      { value: 'No', label: 'Not Verified' }
    ];

    this.cols = [
      //{ field: '', header: 'Action' },
      { field: 'job_key', header: 'Job Key' },
      //{ field : 't', header : 'tt'},
      { field: 'name', header: 'Job Name' },
      { field: 'grade', header: 'Grade' },
      { field: 'module', header: 'Module' },
      { field: 'component', header: 'Component' },
      { field: 'lesson', header: 'Lesson' },
      { field: 'lessonlet', header: 'Lesson Letter' },
      { field: 'batch', header: 'Batch' },
      { field: 'description', header: 'Description' },
      { field: 'thumb', header: 'Thumbnail' },
      { field: 'cstage', header: 'Current Stage' },
      { field: 'job_active_stage.status', header: 'Completion Status' },
      { field: 'currentRTeam', header: 'CR Team' },
      { field: 'curriculum', header: 'Curriculum' },
      { field: 'totalage', header: 'Cumulative Age' },
      { field: 'lastage', header: 'Last Age' },
      { field: 'facing', header: 'Facing' },
      { field: 'series', header: 'Series' },
      { field: 'creditLine', header: 'Credit Line' },
      { field: 'comment', header: 'Comments' },
      { field: 'tags', header: 'Tag Entry' },
      { field: 'mverification', header: 'M. Verification' },
      { field: 'isPaging', header: 'Paging Approved' },
      { field: 'revisionC', header: 'Revision Count' },
      { field: 'artcomplex', header: 'Art-Complexity' },
      { field: 'artassion', header: 'Art-Assignment' },
      { field: 'risk', header: 'Permission-Risk' },
      { field: 'impact', header: 'Permission-Impact' },
      { field: 'workflow', header: 'Workflow' }
    ]
    this.cols = this.cols.map(d => ({ field: d.field, header: d.header, tid: this.cols.indexOf(d) }));
  }
  optionChangeData() {
    //debugger
    //console.log(this.selectedModes);
    if (this.selectedModes.indexOf('AddRow') > -1) {
      this.showDialogToAdd();
    } else if (this.selectedModes.indexOf('SaveGridState') > -1) {
      this.saveGridState();
    } else if (this.selectedModes.indexOf('LockJobs') > -1) {
      this.lockJobGenerateTags();
    } else if (this.selectedModes.indexOf('InsertBatch') > -1) {
      this.addBatch();
    } else if (this.selectedModes.indexOf('InsertTags') > -1) {
      this.addTags();
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
    this.dataloading = true;
    this.isSaveSearch = false;
    this.searchText = "Search List1";
    this.freezeCols = this.cols.filter(d => d.tid < 1);
    this.scrollableCols = this.cols.filter(d => d.tid > 0);
    this.cols.forEach(element => {
      if (!(element.field == '' || element.field == 'job_key')) {
        this.fixCol.push(element);
      }
    });
    this.frmdt = { grade: '', module: '', status: '', workflow: '' }
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
    let Wdata = [
      { value: '', label: 'Select All' },
      { value: 'Clip Art', label: 'Clip Art' },
      { value: 'Created Image', label: 'Created Image' },
      { value: 'Permission', label: 'Permission' },
      { value: 'Shutterstock', label: 'Shutterstock' }];
    this.workflows = Wdata;
    let Tdata = ["Permissions Team", "Art Team", "Clip Art & Storage Team", "Shutterstock Team", "Content Team", "On Hold Team"];
    this.Tdata = Tdata.map(d => ({ value: d, label: d }));
    let jobStatus = ['Active', 'Approved', 'Asset Bank'];
    this.jobStatus = jobStatus.map(d => ({ field: d, header: d }));
    //scrollableCols
    this.getinit();
    this.editSetting = new CustomModalPopUpModel('Edit Job');
  }
  collapseChange(event) {
    debugger
    console.log(event);
  }
  addBatch() {
    if (this.selectedRows.length > 0) {
      this.bulkBatchModal = true;
    } else {
      alert('Please select a row');
    }
  }
  addTags() {
    if (this.selectedRows.length > 0) {
      this.bulkTagModal = true;
    } else {
      alert('Please select a row');
    }
  }
  clearData() {
    this.artLogModel.jobkey.value = "";
    this.artLogModel.grade.value = "";
    this.artLogModel.module.value = "";
    this.artLogModel.batch.value = "";
    this.artLogModel.workflow.value = "";
    this.artLogModel.curricula.value = "";
    this.artLogModel.status.value = "";
    this.frmdt.grade = "";
    this.frmdt.module = "";
    this.artLogModel.batch.value = "";
    this.frmdt.workflow = "";
    this.artLogModel.curricula.value = "";
    this.frmdt.status = "";
    this.artLogModel.added.value = "";
  }
  isDuplicate(d, edit) {
    if (d.duplicate && edit) {
      return "newrecordEdited";
    }
    if (d.duplicate) {
      return "newrecord";
    }
  }
  onFilter(event, dt) {
    this.filteredValuesLength = event.filteredValue.length; // count of displayed rows 
  }
  ellipsisData(col) {
    if (  col.field == 'component' ||  col.field == 'series' ||  col.field == 'description' || col.field == 'module' || col.field == 'cstage' || col.field == 'tags' || col.field == 'name' || col.field == 'creditLine') {
      return "text-truncate";
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
    let obj = {};
    this.getMetaData(obj);
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
  filterData() {
    this.isSaveSearch = true;
    this.getMetaData(this.search);
  }
  checkUserinfo() {
    debugger
    this.httpService.extractPostData(CustomerServicesUrls.USERINFO_DATA, null, null).subscribe((data) => {
      debugger
      console.log("getting data=>", data);
    });
  }
  confirm() {
    debugger
    if ( this.selectedTagsData.length == 0) {
      this.alert.showAlertDanger(['Please select at lease one record.'], 10000);
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        accept: () => {
          let body = new HttpParams();
          for (let dt of this.selectedTagsData) {
            let ind = this.cartdata.indexOf(dt);
            this.cartdata[ind].duplicate = false;
          }
          body = body.set('data', JSON.stringify(this.selectedTagsData));
          this.httpService.extractData(CustomerServicesUrls.UPDATEASSETTAGS, body, null).subscribe((data) => {
            console.log("res=>", data);
            this.alert.showAlertScucess(['Update in progress! An email notification will be send, once it has been completed.'], 3000);
            this.tagverificationModal = false;
          });
        }
      });
    }
  }
  deleteMoveTagList(dt: any) {
    let index = this.rowsmoveTags.indexOf(dt);
    this.rowsmoveTags.splice(index, 1);
  }
  saveTagData() {
    let body = new HttpParams();
    body = body.set('tags', this.bulkTags);
    body = body.set('selectedids', JSON.stringify(this.selectedRows.map(d => d._id)));
    let self = this;
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_BULKTAGS, body, null).subscribe((data) => {
      for (let dt of data) {
        let index = self.cartdata.indexOf(self.cartdata.filter((d, i) => d._id === dt._id)[0]);
        if (self.cartdata[index].tags != "") {
          self.cartdata[index].tags = self.cartdata[index].tags + ',' + self.bulkTags
        } else
          self.cartdata[index].tags = self.bulkTags;
      }
      this.bulkTagModal = false;
      self.bulkTags = '';
      this.alert.showAlertScucess(['Bulk Batch has been updated successfully!'], 5000);
    });
  }
  saveBatchData() {
    let body = new HttpParams();
    body = body.set('batch', this.bulkBatch);
    body = body.set('selectedids', JSON.stringify(this.selectedRows.map(d => d._id)));
    let self = this;
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_BULKBATCH, body, null).subscribe((data) => {
      self.bulkBatch = '';
      for (let dt of data) {
        let index = self.cartdata.indexOf(self.cartdata.filter((d, i) => d._id === dt._id)[0]);
        self.cartdata[index].batch = dt.batch || self.bulkBatch;
      }
      this.bulkBatchModal = false;
      this.alert.showAlertScucess(['Bulk Batch has been updated successfully!'], 5000);
    });
  }
  lockJobGenerateTags() {
    if (this.selectedRows.length == 0) {
      alert('Please select a row.')
    } else {
      let dt = [];
      this.rowsmoveTags = [];
      for (let t = 0; t < this.selectedRows.length; t++) {
        let ind = this.cartdata.indexOf(this.selectedRows[t]);
        //this.selectedRows[t].tags 
        this.selectedRows[t].generatedTags = 'MPS artlog, ' + this.generateTags(this.cartdata[ind]);
        this.rowsmoveTags.push(this.selectedRows[t]);
      }
      this.tagverificationModal = true;
    }
  }
  place(d) {
    d = parseInt(d);
    return (d < 10) ? '0' + d.toString() : d.toString();
  }
  generateTags(dt: any) {
    let prfx='';
    if(!!dt.job_key && dt.job_key.indexOf("SCI-") > -1){
      prfx="SC_"
    }else if(!!dt.job_key && dt.job_key.indexOf("EM2-") > -1){
      prfx="EM2_"
    }
    let combination = Array();
    combination.push(prfx+'G' + this.place(dt.grade));
    combination.push(prfx+'G' + this.place(dt.grade) + '_M' + this.place(dt.module));
    if (!!dt.lesson) {
      let lett=false;
      if(!!dt.lessonlet){
        lett=true;
        combination.push(prfx+'G' + this.place(dt.grade) + '_M' + this.place(dt.module) +'_L'+this.place(dt.lesson)+'_'+dt.lessonlet);
      }
      combination.push(prfx+'G' + this.place(dt.grade) + '_M' + this.place(dt.module) +'_L'+this.place(dt.lesson));
      if(!!dt.component){
        let comp= dt.component.substring(0,3).trim();
        if(comp.indexOf('_') > -1){
          comp=comp.split('_').join('');
          combination.push(comp);
        }
        if(comp==comp.toUpperCase() && !lett){
          combination.push(prfx + this.place(dt.grade)  + this.place(dt.module)+comp +'_L'+this.place(dt.lesson));
        }else if(comp==comp.toUpperCase() && !!lett){
          combination.push(prfx + this.place(dt.grade)  + this.place(dt.module) + comp + '_L'+ this.place(dt.lesson) + '_' + dt.lessonlet);
        }else{
          combination.push(prfx + this.place(dt.grade)  + this.place(dt.module)  + '_L'+ this.place(dt.lesson));
        }
      }else{
        combination.push(prfx + this.place(dt.grade) +  this.place(dt.module) +'_L'+this.place(dt.lesson));
      }
      if(!dt.tags){
        combination.push(dt.job_key);
      }else{
        if(dt.tags.split(',').indexOf(dt.job_key) != -1){
          combination.push(dt.job_key);
        }
      }
    }
    console.log("tagGenerated:", combination.join(', '));
    return combination.join(', ');
  }
  setDefaltSearch(evt: any) {
    let body = new HttpParams();
    body = body.set('default', this.defaultSearch);
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_SETDEFAULT_SEARCH, body, null).subscribe((data) => {
      this.alert.showAlertScucess(['Your default search list has been updated!'], 3000);
    });
  }
  clearGridState() {
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_GRIDSTATECLEAR, null, null).subscribe((data) => {
      this.gridState = "";
      debugger
      this.scrollableCols = this.cols.filter(d => d.tid > 0);
      this.alert.showAlertScucess(['Grid state reset successfully!'], 3000);
    });
  }
  saveGridState() {
    let body = new HttpParams();
    let dt = { 'selectedColumn': this.scrollableCols, 'search': this.grid };
    body = body.set('selectedColumn', JSON.stringify(dt));
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_GRIDSTATESAVE, body, null).subscribe((data) => {
      if (!!data.searchTitle) {
        this.gridState = data;
      }
      this.alert.showAlertScucess(['Grid state saved successfully!'], 3000);
    });
  }
  saveUserSerach() {
    let body = new HttpParams();
    let frmDt = {
      grade: this.frmdt.grade, module: this.frmdt.module, status: this.frmdt.status, batch: this.artLogModel.batch.value,
      workflow: this.frmdt.workflow, curricula: this.artLogModel.curricula.value, resTeam: this.artLogModel.resTeam.value,
      added: this.artLogModel.added.value
    }
    body = body.set('frmdt', JSON.stringify(frmDt));
    body = body.set('searchText', JSON.stringify(this.searchText));
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_SEARCHSAVE, body, null).subscribe((data) => {
      this.savedsearchLists.splice(0, 0, data);
      this.saveSearchModal = false;
      this.alert.showAlertScucess(['Search saved successfully!'], 3000);
    });
  }
  deleteSearchList(obj) {
    let body = new HttpParams();
    body = body.set('_id', obj._id);
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_DELETE_SEARCHSAVE, body, null).subscribe((data) => {
      let d = this.savedsearchLists.find(d => d._id === data.did);
      let index = this.savedsearchLists.indexOf(d);
      this.savedsearchLists.splice(index, 1);
      this.alert.showAlertDanger(['Saved search removed successfully!'], 3000);
    });
  }
  getinit() {
    this.httpService.extractData(CustomerServicesUrls.ARTLOG_INIT, null, null).subscribe((data) => {
      if (data.hasOwnProperty('grade')) {
        data.grade.splice(0, 1);
        this.Gdata = data.grade;
        data.grade.splice(0, 0, { id: '', value: '', label: 'Please Select' });
        this.addGdata = data.grade;
      }
      if (!!data.module) {
        this.Mdata = data.module.filter(d => d.value != '');
        this.addMdata = data.module.filter(d => d.value != '');
        this.addMdata.splice(0, 0, { id: '', value: '', label: 'Please Select' });
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
        let def = data.inData.filter(d => d.isDefault === true);
        if (def.length > 0) {
          this.defaultSearch = def[0]._id;
        }
        this.gridState = data.inData.find(d => d.state === 'GridStage');
        // setting default grid state
        if (!!this.gridState && !!this.gridState.fields) {
          let dt = JSON.parse(this.gridState.fields);
          this.scrollableCols = dt.selectedColumn;
        }
        this.savedsearchLists = data.inData.filter(d => d.state !== 'GridStage');
        let defalutSearch = this.savedsearchLists.filter(d => d.isDefault == true);
        if (this.savedsearchLists.length && defalutSearch.length > 0) {
          let frmData = JSON.parse(defalutSearch[0].fields);
          if (frmData.grade.length) {
            this.frmdt.grade = frmData.grade;
          }
          if (frmData.module.length > 0) {
            this.frmdt.module = frmData.module;
          } if (frmData.batch !== "") {
            this.artLogModel.batch.value = frmData.batch;
          } if (frmData.workflow !== "") {
            this.frmdt.workflow = frmData.workflow;
          } if (frmData.curricula !== "") {
            this.artLogModel.curricula.value = frmData.curricula;
          } if (frmData.status !== "") {
            this.frmdt.status = frmData.status;
          } if (frmData.added !== "") {
            this.artLogModel.added.value = frmData.added;
          }
          this.filterData();
        } else {
          let obj: any = {};
          this.getMetaData(obj);
        }
      }
    });
  }
  getMetaData(Obj: any) {
    this.dataloading = true;
    var self = this;
    return new Promise(resolve => {
      this.loadDataFromApi(this.NAME_ARTLOG).subscribe((data) => {
        debugger
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
          this.revisions = (!!data.GridFilters.revision) ? data.GridFilters.revision.map(d => ({ label: d, value: d })) : [];
          this.cstatus =  (!!data.GridFilters.cstatus) ? data.GridFilters.cstatus.map(d => ({ label: d, value: d })) : [];
          this.cstages =  (!!data.GridFilters.cstages) ? data.GridFilters.cstages.map(d => ({ label: d, value: d })) : [];
        }
        self.cartdata = data.artLogData;
        this.filteredValuesLength = data.artLogData.length;
        self.selectedColumn = this.cols;
        resolve(data);
      });
    });
  }
  datatesting(d: any, dd: any){
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
    //  httpOptions.set('Authorization', tokenId);
    //this.getHTTPOption
    let body = new HttpParams();
    body = body.set('newData', JSON.stringify(artdt));
    this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_UPDATEJOBS, body, { headers: myheader }).subscribe((data) => {
      if (data.length > 0 && data[0].msg === 'SUCCESS') {
        this.alert.showAlertScucess([' Job updated successfully!'], 3000);
      } else {
        this.alert.showAlertDanger([' Job updated have some issue!'], 3000);
      }
    });
    //CustomerServicesUrls.ARTLOG_UPDATEJOBS
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
  // add a contact form group
  // addDuplicateJobs(){
  //   this.duplicateJobsList.push( this.createDuplicateJob())
  // }
  // createDuplicateJob(){
  //   return this.fb.group({
  //     grade: [null, Validators.compose([Validators.required])],
  //     module: [null, Validators.compose([Validators.required])],
  //     component: [null, Validators.compose([Validators.required])],
  //     batch: [null, Validators.compose([Validators.required])],
  //     jobkey: [null, Validators.compose([Validators.required])],
  //   });
  // }
  createContact(): FormGroup {
    return this.fb.group({
      grade: [null, Validators.compose([Validators.required])],
      module: [null, Validators.compose([Validators.required])],
      jobkey: [null, Validators.compose([Validators.required])],
      component: [null],
      lesson: [null],
    });
  }
  createDuplicateJob(jk: String = '', g: any = {}, m: any = {}, c: String = '', l: String = ''): FormGroup {
    return this.fb.group({
      jobkey: [jk, Validators.compose([Validators.required])],
      grade: [g, Validators.compose([Validators.required])],
      module: [m, Validators.compose([Validators.required])],
      component: [c],
      lesson: [l],
    });
  }
  addContact() {
    //debugger
    this.contactList.push(this.createContact());
  }
  // remove contact from group
  createClone(index) {

    let jobAdd = this.form.value.jobAdd[index];
    var clone = this.createDuplicateJob(jobAdd.jobkey, jobAdd.grade, jobAdd.module, jobAdd.component, jobAdd.lesson);
    this.contactList.push(clone);
    //this.contactList.push(this.createContact());
    //this.form.value.jobAdd[this.form.value.jobAdd.length-1].jobkey = this.form.value.jobAdd[index].jobkey;
    // setTimeout(function(){ 
    //   console.log("Data Changes:",this.form, this.form.value.jobAdd[this.form.value.jobAdd.length-1]);
    //   this.form.value.jobAdd[this.form.value.jobAdd.length-1] = this.form.value.jobAdd[index];
    //  }, 1000);
    //this.form.value.jobAdd[this.form.value.jobAdd.length-1] = this.form.value.jobAdd[index];
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
  // submit() {
  //  console.log( "from data => ", this.form.value.jobAdd.map(d=> d.jobkey).join("") ); 
  // }
  submit() {

    let valid = true;
    for (let test of this.form.value.jobAdd) {
      if (test.jobkey === null || !test.jobkey) {
        valid = false;
      }
    }

    if (valid) {

      const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      let body = new HttpParams();
      body = body.set('jobAdd', JSON.stringify(this.form.value.jobAdd));
      let self = this;
      this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_JOBADD, body, { headers: myheader }).subscribe((data) => {
        for (let dt of data) {
          let index = self.cartdata.indexOf(self.cartdata.filter((d, i) => d.job_key === dt.job_key)[0]);
          self.cartdata.splice((index + 1), 0, dt);
        }
        this.displayDialog = false;
        this.alert.showAlertScucess([data.length + ' Jobs added successfully!'], 3000);
      });
    } else {
      this.alert.showAlertDanger([' Job Key required !'], 5000);
    }
  }
  initSearchModels() {
    this.artLogModel = new ArtLogModel();
  }
  getSearchModel(name: string) {
    if (name === this.NAME_ARTLOG) {
      // debugger
      try {
        if (this.frmdt.grade.length > 0) {
          this.artLogModel.grade.value = this.frmdt.grade.map(a => a.id);
        } else { this.artLogModel.grade.value = []; }
        if (this.frmdt.module.length > 0) {
          this.artLogModel.module.value = this.frmdt.module.map(a => a.id);
        } else { this.artLogModel.module.value = []; }
        if (this.frmdt.status.length > 0) {
          this.artLogModel.status.value = this.frmdt.status.map(a => a.field);
        } else { this.artLogModel.status.value = []; }
        // if (this.frmdt.workflow != "") {
        //   this.artLogModel.workflow.value = this.frmdt.workflow.value;
        // } else { this.artLogModel.workflow.value = []; }
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
  getNonSearchModelParams(name: string) {
    if (name === this.NAME_ARTLOG) {
      const obj = { searchBy: 'test' };
      return obj;
    }
  }
  getGridApi(name: string): GridAPII {
    if (name === this.NAME_ARTLOG) {
      return {
        gridApi: this.gridApi,
        columnApi: this.columnApi
      };
    }
  }
  clearAllFilter(dt: any) {
    let Input: any = ['job_key', 'name', 'lessonlet', 'description', 'cstage', 'status', 'creditLine', 'comment', 'tags', 'mverification', 'isPaging'];
    let InputOth: any = ['tags'];
    let Select: any = ['grade', 'module', 'component', 'lesson', 'batch', 'currentRTeam', 'curriculum', 'facing', 'series', 'creditLine',
      'revisionC', 'artcomplex', 'artassion', 'risk', 'impact', 'workflow'];
    for (let a in Input) {
      if (this.g.hasOwnProperty(Input[a]))
        this.cleargInputFilter(dt, Input[a]);
    }
    for (let a in Select) {
      if (this.g.hasOwnProperty(Select[a]))
        this.cleargSelectFilter(dt, Select[a]);
    }
    if (this.g.hasOwnProperty(InputOth[0]))
      this.cleargInputOtherFilter(dt, InputOth[0]);
  }
  cleargInputOtherFilter(gdt: any, col: string) {
    this.g[col] = "";
    gdt.filter(this.g[col], col, 'contains');
  }
  cleargInputFilter(gdt: any, col: string) {
    this.g[col] = "";
    gdt.filter(this.g[col], col, 'filterMatchMode');
  }
  cleargSelectFilter(dt: any, col: string) {
    this.g[col] = "";
    dt.filter(this.g[col], col, 'in');
  }
  hasData(): boolean{
    let res= false;
    for (let key in this.g) {
      if(this.g[key]!=""){
        res = true;
      }
    }
    return res;
  }
  exportDataAsCSVSelected(dt: any) {
    this.scrollableCols = this.cols;
    let that = this;
    setTimeout(function () {
      dt.exportCSV({selectionOnly:true});
      that.scrollableCols = that.cols.filter(d => d.tid > 0);
    }, 1000);
  }
  exportDataAsCSV(dt: any) {
    this.scrollableCols = this.cols;
    let that = this;
    setTimeout(function () {
      dt.exportCSV();
      that.scrollableCols = that.cols.filter(d => d.tid > 0);
    }, 1000);
  }
}