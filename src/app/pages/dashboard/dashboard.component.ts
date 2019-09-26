import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
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
import {SessionObject} from '../../core/shared';
import { MenuItem } from 'primeng/api';

import { ColDef } from 'ag-grid';
import { HttpHeaders, HttpParams } from '@angular/common/http';
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit, OnChanges {
  //@Input() jobId: string;

  clonedArtLog: { [s: string]: any; } = {};
  yearFilter: number;
  selectedColumn: any;
  yearTimeout: any;
  cartdata: any;
  jobID: any;
  totalage: any = [ ];
  clonedCars: { [s: string]: any; } = {};

  jobkeys: any    = [];
  lessions: any   = [];
  components: any = [];
  grades: any     = [];
  modules: any    = [];
  artComplexcityOPT: any = []; artAssignmentOPT=[]; MetaRiskOPT=[]; MetaImpactOPT=[];
  artcomplexs=[];
  artassions=[]; risks=[]; impacts=[]; workflows=[]; items: MenuItem[];
  fixCol=[];
  cols = [
    { field: '', header: 'Action' },
    { field: 'job_key', header: 'JobKey'},
    { field : 'totalage', header : 'Cumulative Age'},
    {field: 'lastage', header: 'Last Age'},
    { field : 'lession', header : 'Lession'},
    { field : 'component', header : 'Component'},
   
   // {field: 'lastage', header: 'Last Age'},
    {field: 'tags', header: 'Tag Entry'},
    {field: 'artcomplex', header: 'Art-Complexity'},
    { field: 'artassion', header: 'Art-Assignment'},
    { field: 'risk', header: 'Permission-Risk'},
    { field: 'impact', header: 'Permission-Impact'},
    { field: 'module', header: 'Module'},
    { field: 'grade', header: 'Grade' },
    { field: 'batch', header: 'Batch' },
    { field: 'workflow', header: 'Workflow' }
  ];
  loading: boolean;
  dropdownList: any[];
  selectedItems: any [];
  dropdownSettings = {};
  editSetting: any;
  //optionsModel
  artLogModel: ArtLogModel;
  Gdata: any;
  Mdata: any;
  Wdata: any;
  WIPdata: any;
  Tdata : any;
  jobStatus: any;
  NAME_ARTLOG = 'NAME_ARTLOG';
  gridData: any;
  jobmeta: any;
  Editdata: any;
  search = { };
  displayDialog : boolean;
  frmdt :any;
  //@Input("edit-jobs") editJobID: string;
  public form: FormGroup;
  public contactList: FormArray;

  constructor(protected baseServices: BaseService,
    protected router: Router,
    protected httpService: HttpService,
    protected customModalPopService: CustomModalPopUpService,
    protected alert: AlertMessageService,
    private fb: FormBuilder ) {
    super(baseServices, router);
    //this.checkUserinfo();
  }
  ngOnInit() {
    this.cols.forEach(element => {
      if(!(element.field == '' || element.field == 'job_key') ){
        this.fixCol.push(element);
      }
    });
    this.frmdt={ grade:'',module:'',status:'', workflow:''}
    this.form = this.fb.group({
      grade: [null , Validators.compose([Validators.required])],
      module: [null , Validators.compose([Validators.required])],
      jobkey: [null, Validators.compose([Validators.required])],
      jobAdd: this.fb.array([this.createContact()])
    });
    // set contactlist to the form control containing jobAdd
    this.contactList = this.form.get('jobAdd') as FormArray;
    let Wdata = ['Clip Art', 'Created Image', 'Permission', 'Shutterstock'];
    this.workflows = Wdata.map( d=> ({value: d}));
    let Tdata= ["Permissions Team","Art Team","Clip Art & Storage Team","Shutterstock Team","Content Team","On Hold Team"];
    this.Tdata = Tdata.map( d=> ({value: d}));
    let jobStatus = ['Active', 'NeedsChanges', 'Approved'];
    this.jobStatus = jobStatus.map( d=> ({field: d, header: d}));
    let obj={};
    this.getMetaData(obj);
    this.editSetting = new CustomModalPopUpModel('Edit Job');
  }
  clearData() {

  }
  createContact(): FormGroup {
    return this.fb.group({
      grade: [ null, Validators.compose([Validators.required])],
      module: [ null, Validators.compose([Validators.required])],
      jobkey: [null, Validators.compose([Validators.required])],
     });
  }

  ngOnChanges(){
    this.artLogModel.jobkey.value = this.baseService.getMessage();
    let obj={};
    this.getMetaData(obj);
  }
  showDialogToAdd(){
    this.displayDialog = true;
  }
  searchByjobKey() {
    
  }
  filterData() {
    this.getMetaData( this.search );
  }
  checkUserinfo(){
    debugger
    this.httpService.extractPostData(CustomerServicesUrls.USERINFO_DATA, null, null).subscribe((data) => {
      debugger
      console.log("getting data=>", data);
    });
  }
  getMetaData(Obj: any) {
    var self = this;
    return new Promise(resolve => {
      this.loadDataFromApi(this.NAME_ARTLOG).subscribe((data) => {
      if ( data.hasOwnProperty('GlobalDt') ) {
        if (!!data.GlobalDt.grade) {
          this.Gdata = data.GlobalDt.grade;
        }
        if (!!data.GlobalDt.module ) {
          this.Mdata = data.GlobalDt.module ;
        }
        if (!!data.GlobalDt.artAssign ) {
          data.GlobalDt.artAssign.splice(0, 0, {id: '', value: '', label: 'Select One'});
          this.artassions = data.GlobalDt.artAssign ;
        }
        if (!!data.GlobalDt.artcomplex ) {
          data.GlobalDt.artcomplex.splice(0, 0, {id:'', value:'', label:'Select One'});
          this.artcomplexs = data.GlobalDt.artcomplex ;
        }
        if (!!data.GlobalDt.risk ) {
          data.GlobalDt.risk.splice(0, 0, {id: '', value: '', label: 'Select One'});
          this.risks = data.GlobalDt.risk ;
        }
        if (!!data.GlobalDt.impact ) {
          data.GlobalDt.impact.splice(0, 0, {id: '', value: '', label: 'Select One'});
          this.impacts = data.GlobalDt.impact ;
        }
      }
      if ( data.hasOwnProperty('GridFilters') ) {
        this.lessions = (!!data.GridFilters.lession) ? data.GridFilters.lession.map(d => ({label: d, value: d})) : [];
        this.components = (!!data.GridFilters.component) ? data.GridFilters.component.map(d => ({label: d, value: d})) : [];
        this.modules =  (!!data.GridFilters.module) ? data.GridFilters.module.map(d => ({label: d, value: d})) : [];
        this.grades =  (!!data.GridFilters.grade) ? data.GridFilters.grade.map(d => ({label: d, value: d})) : [];
      }
      self.cartdata = data.artLogData;
      self.selectedColumn = this.cols;
      resolve(data);
      });
    });
  }
  onRowEditInit(artdt: any, editing) {
    editing = !editing;
    this.clonedArtLog[artdt.jobId] = { ...artdt };
  }
  onRowEditSave(artdt: any) {
    debugger
    // if (car.year > 0) {
    //   delete this.clonedCars[car.vin];
    //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Car is updated' });
    // }
    // else {
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Year is required' });
    // }
  }
  onRowEditCancel(artdt: any, index: number) {
    // this.cars2[index] = this.clonedCars[car.vin];
    delete this.clonedArtLog[artdt.jobId];
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
addContact() {
  this.contactList.push(this.createContact());
}
// remove contact from group
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
  debugger
  console.log(this.form.value);
  const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  let body = new HttpParams();
  body = body.set('jobAdd', JSON.stringify(this.form.value.jobAdd));
  let self = this;
  this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_JOBADD, body, {headers: myheader}).subscribe((data) => {
    for(let dt of data){
      self.cartdata.push(dt);
    } 
    this.displayDialog=false;
    this.alert.showAlertScucess([ data.length +' Jobs Added Successfully!!!'], 300000);
  });
}
  initSearchModels() {
    this.artLogModel = new ArtLogModel();
  }
  getSearchModel(name: string) {
    if (name === this.NAME_ARTLOG) {
      try{
        if(this.frmdt.grade.length > 0){
          this.artLogModel.grade.value=this.frmdt.grade.map(a=> a.value);
        }
        if(this.frmdt.module.length > 0){
           this.artLogModel.module.value=this.frmdt.module.map(a=> a.value);
        }
        if(this.frmdt.status.length > 0){
          this.artLogModel.status.value=this.frmdt.status.map(a=> a.field);
        }
        if(this.frmdt.workflow!="" ){
          this.artLogModel.workflow.value = this.frmdt.workflow.value;
        }
      }catch(err){
       // console.log(err)
      }
      return this.artLogModel;
    }
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
}

