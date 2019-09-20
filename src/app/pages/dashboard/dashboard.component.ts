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
  totalage: any = [
  ];
  clonedCars: { [s: string]: any; } = {};
  colors = [ ];
  jobkeys =[ ];
  lessions =[];
  components= [];
  grades =[];
  modules=[];
  artComplexcityOPT=[]; artAssignmentOPT=[]; MetaRiskOPT=[]; MetaImpactOPT=[];
  artcomplexs=[];
  artassions=[]; risks=[]; impacts=[]; workflows=[]; items: MenuItem[];
  cols = [
    { field: '', header: 'Action' },
    { field: 'job_key', header: 'JobKey'},
    { field : 'lession', header : 'Lession'},
    { field : 'component', header : 'Component'},
    { field : 'totalage', header : 'Cumulative Age'},
    {field: 'lastage', header: 'Last Age'},
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
  dropdownList = [];
  selectedItems = [];
 
  dropdownSettings = {};
  editSetting: any;
  //optionsModel
  artLogModel: ArtLogModel;
  Gdata: any;
  Mdata: any;
  Wdata: any;
  WIPdata: any;
  Tdata: any;
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
    private fb: FormBuilder ) {
    super(baseServices, router);
    //this.gridOptions.onCellClicked=this.agCellClicked;
    let obj={};
    this.getMetaData(obj);
    this.gridOptions.onCellValueChanged = this.agCellClicked;
    this.editSetting = new CustomModalPopUpModel('Edit Job');



  }
  clearData() {

  }
  createContact(): FormGroup {
    return this.fb.group({
      grade: [ null, Validators.compose([Validators.required])],
      module: [ null, Validators.compose([Validators.required])],
     // type: ['email', Validators.compose([Validators.required])],
     jobkey: [null, Validators.compose([Validators.required])],
     // value: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

ngOnChanges(){
  //debugger
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
  getMetaData(Obj: any) {
   // debugger
    var self = this;
    //this.artLogModel.jobkey.value = SessionObject.getJobKey();
    return new Promise(resolve => {
      this.loadDataFromApi(this.NAME_ARTLOG).subscribe((data) => {
     // this.httpService.extractPostData(CustomerServicesUrls.JOBSMETA_DATA1, null, null).subscribe((data) => {
       //code for Art-Complexity temp ID c7fbc907710045778ee29863e33d2bd2
       if(data.hasOwnProperty("WorkFlowJobsMetaData") && data.WorkFlowJobsMetaData.length > 0){
         let MetaArtComplexity = data.WorkFlowJobsMetaData.filter(d => d.tempId == 'c7fbc907710045778ee29863e33d2bd2' );
         if(MetaArtComplexity.length > 0 && MetaArtComplexity[0].hasOwnProperty('options')){
          this.artComplexcityOPT=  MetaArtComplexity[0].options.map(d=>({value:d.ID.split('-').join(''), label:d.label}));
          this.artComplexcityOPT.push({ value:'', label:'Select Complexity'})
         }
       //"cd8809565088496da4955eb3327fea04" for Assignment
       
        let MetaArtAssignment = data.WorkFlowJobsMetaData.filter(d => d.tempId == "cd8809565088496da4955eb3327fea04" );
        if(MetaArtAssignment.length > 0 && MetaArtAssignment[0].hasOwnProperty('options')){
         this.artAssignmentOPT=  MetaArtAssignment[0].options.map(d=>({value:d.ID.split('-').join(''), label:d.label}));
         this.artAssignmentOPT.push({ value:'', label:'Select Assignment'})
        }
      //"309909b0de3f4eb9b5674efe59bee8b9" Permission Risk Rating 
        //debugger
        let MetaRisk = data.WorkFlowJobsMetaData.filter(d => d.tempId ==  "309909b0de3f4eb9b5674efe59bee8b9");
        if(MetaRisk.length > 0 && MetaRisk[0].hasOwnProperty('options')){
         this.MetaRiskOPT=  MetaRisk[0].options.map(d=>({value:d.ID.split('-').join(''), label:d.label}));
         this.MetaRiskOPT.push({ value:'', label:'Select Risk'});
        }
      // "f8bf767302224972a79fd80f7fb36d12" MetaImpactOPT
        let MetaMetaImpact = data.WorkFlowJobsMetaData.filter(d => d.tempId ==  "f8bf767302224972a79fd80f7fb36d12");
        if(MetaMetaImpact.length > 0 && MetaMetaImpact[0].hasOwnProperty('options')){
         this.MetaImpactOPT=  MetaMetaImpact[0].options.map(d=>({value:d.ID.split('-').join(''), label:d.label}));
         this.MetaImpactOPT.push({ value:'', label:'Select Impact'});
         //this.MetaImpactOPT.sort((a,b )=> return a.value - b.value)
        }
      }

        //debugger
        if ( data.hasOwnProperty('Grade') && data.Grade.length > 0 && data.Grade[0].hasOwnProperty('options')) {
        this.Gdata = data.Grade[0].options;
        this.Gdata = this.Gdata.map(d=>({'value':d.ID.split("-").join(''), label: d.label}));
       }
       if ( data.hasOwnProperty('module') && data.module.length > 0 && data.module[0].hasOwnProperty('options') ) {
        this.Mdata = data.module[0].options;
        this.Mdata = this.Mdata.map(d=>({'value':d.ID.split("-").join(''), label: d.label}));
       }
       if ( data.hasOwnProperty('CurriculaWIP') && data.CurriculaWIP.length > 0 && data.CurriculaWIP[0].hasOwnProperty('options') ) {
        this.WIPdata = data.CurriculaWIP[0].options;
       }

        let jobkeys = data.artLogData.map( d => d.job_key).filter(d => d != '');
        this.jobkeys = jobkeys.filter((v,i) => jobkeys.indexOf(v) === i).map( d=> ({label: d, value: d}));
        
        let artcomplexs = data.artLogData.map( d => d.artcomplex);
        this.artcomplexs = artcomplexs.filter((v,i) => artcomplexs.indexOf(v) === i).map( d=> ({label: d, value: d}));

        let artassions = data.artLogData.map( d => d.artassion);
        this.artassions = artassions.filter((v,i) => artassions.indexOf(v) === i).map( d=> ({label: d, value: d}));
        //risks , this.impacts
        //let risks = data.artLogData.map( d => d.risk);
        //this.artassions = artassions.filter((v,i) => artassions.indexOf(v) === i).map( d=> ({label: d, value: d}));

        let lessions=data.artLogData.map(d=> d.lession).filter(d=>d!='');
        this.lessions = lessions.filter((v,i) => lessions.indexOf(v) === i).map(d=> ({label: d, value: d}));

        let components=data.artLogData.map(d=> d.component).filter(d=>d!='');
        this.components = components.filter((v,i) => components.indexOf(v) === i).map(d=> ({label: d, value: d}));
        let grades=data.artLogData.map(d=> d.grade).filter(d=>d!='');
        this.grades = grades.filter((v,i) => grades.indexOf(v) === i).map(d=> ({label: d, value: d}));
        let modules=data.artLogData.map(d=> d.module).filter(d=>d!='');
        this.modules = modules.filter((v,i) => modules.indexOf(v) === i).map(d=> ({label: d, value: d}));
        
        data.artLogData.forEach(element => {
          this.colors.push({ label: element.name, value: element.name })
          if (!element.totalage) {
            element.totalage = 0
          }
          this.totalage.push({ label: element.totalage, value: element.totalage })
        });
        self.cartdata = data.artLogData;

        self.selectedColumn = this.cols;
        resolve(data);
      });
    });
  }
  onRowEditInit(artdt: any, editing) {
    //debugger
     editing = !editing;
    this.clonedArtLog[artdt.jobId] = { ...artdt };
  }

  onRowEditSave(artdt: any) {
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
  //this.form.value.hasOwnProperty('jobAdd')
  body = body.set('jobAdd', JSON.stringify(this.form.value.jobAdd));
  //body = body.set('module', '');
  //body = body.set('jobKey','');
  let self=this;
  this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_JOBADD, body, {headers: myheader}).subscribe((data) => {
     debugger 
     console.log("added Responce Dadata ==>", data);
     //data= JSON.parse(data);
    for(let dt of data){
      self.cartdata.push(dt);
    } 
     //cartdata
  });
}
  ngOnInit() {
    this.frmdt={ grade:'',moduge:'',status:''}
    this.form = this.fb.group({
      grade: [null , Validators.compose([Validators.required])],
      module: [null , Validators.compose([Validators.required])],
      jobkey: [null, Validators.compose([Validators.required])],
      jobAdd: this.fb.array([this.createContact()])
    });
  
  // set contactlist to the form control containing jobAdd
    this.contactList = this.form.get('jobAdd') as FormArray;
    
    this.Wdata = ['Clip Art', 'Created Image', 'Permission', 'Shutterstock'];
    this.jobStatus = ['Active', 'NeedsChanges', 'Approved', 'Closed'];
    this.jobStatus = this.jobStatus.map( d=> ({field: d, header: d}));
    this.workflows = this.Wdata.map( d=> ({field: d, label: d}));
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
  setColumnDef(name: String): Array<ColDef> {

    // debugger
    // if (name === this.NAME_ARTLOG) {

    return columnDefsArtLogs;
    // }
  }
  agCellClicked = (event) => {
    //debugger
    console.log(event)
    this.jobID = event.data;
    // this.customModalPopService.show(this.editSetting);
  }
  doOnGridReadyDashboard(api) {
    this.gridApi = api.api;
    this.columnApi = api.columnApi;
    this.doOnGridReady(this.NAME_ARTLOG);
    this.OnSubmit(this.NAME_ARTLOG);
  }
  xtBaseLoadDataFromApiProcessData(name: String, data: Array<any>) {
   // debugger

    this.Gdata = data['Grade'][0].options;
    this.Mdata = data['module'][0].options;
    this.WIPdata = data['CurriculaWIP'][0].options;
  }
}

