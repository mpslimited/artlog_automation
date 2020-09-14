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
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexPlotOptions,
  ApexFill,
  ApexTooltip
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
export type ChartOptions3 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
export type ChartOptions4 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};
@Component({
  selector: 'app-scorecardview',
  templateUrl: './scorecardview.component.html',
  styleUrls: ['./scorecardview.component.css'],
  providers: [ConfirmationService]
})

export class ScorecardviewComponent extends BaseComponent implements OnInit {
  @ViewChild('chart1', { static: false }) chart1: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @ViewChild('chart2', { static: false }) chart2: ChartComponent;
  public ChartOptions2: Partial<ChartOptions2>;
  @ViewChild('chart3', { static: false }) chart3: ChartComponent;
  public ChartOptions3: Partial<ChartOptions3>;
  @ViewChild('chart4', { static: false }) chart4: ChartComponent;
  public ChartOptions4: Partial<ChartOptions4>;

  // -- columans for filter Grid dropdown

  auth: any = [];
  criteria: boolean;
  OverDueMedianData: any = [];
  MedianData: any = [];
  dataloading: boolean ;
  medianLoading: boolean ;
  NanCampaignID = [ 'f2e038c4-9191-4480-a55e-2dc92d3f52e7', '3b6d57c7-55c1-489b-aeff-b81b7aaff1ef', '0ad18ec8-8648-4d15-8681-2c3f4e0ee914', 'bb6f3943-5a47-49f0-ab82-c6278d1dad29'];
  summaryOfoverdueModel: boolean;
  JobsType: string;
  public dataSource = new BehaviorSubject<AbstractControl[]>([]);
  WeeklyJobsCData: any = [];
  WeeklyJobsCOptions: any = {};
  data = [];
  apex: any = {};
  Presets = [
    { value: '', label: 'Please Select' },
    { value: 'Permission', label: 'Permission' },
    { value: 'Created Image', label: 'Created Image' },
    { value: 'Shutterstock', label: 'Shutterstock' },
    { value: 'Clip Art', label: 'Clip Art' },
  ];
  StatusDt = [
    { value: 'Active', label: 'Active' },
    { value: 'NeedsChanges', label: 'NeedsChanges' },
    { value: 'Overdue', label: 'Overdue' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Closed', label: 'Closed' },
  ];
  frmdt: any;
  Gdata: any = [];
  Mdata: any = [];
  Campaigns : any = [];
  jobTypes: any = [];
  ScoreCard : any = { totalJobs: 0, Exptat: 0, MedianDur: 0, NumOver: 0 };
  CreatedJobs : any = [];
  ComplatedJobs : any = [];
  WeeklyData : any  = [];
  WeeklyJobsLoading: boolean ;
  medianDataLoading: boolean;
  percentileDataLoading : boolean;
  oherGraphDataLoading : boolean;
  api1Data : any = [];
  cartdata: any = [];
  cols: any = [];
  OverDueJobsData: any = [];
  median: any = [];
  gridApi;
  gridColumnApi;

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
      // this.frmdt.preset='';
      // this.fromDate = calendar.getToday();
      // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
      /// --------test------------------

    }

  pageinit() {
    const that = this;
    this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_SCORECARDINIT, null, null).subscribe((data) => {
      console.log('getting data=>', data);
      data.module.splice(0, 0, { id: '', value: 'Please Select'});
      data.grade.splice(0, 0, { id: '', value: 'Please Select'});
      that.Mdata = data.module.map(d => ({ value: d.id, label: d.value}));
      that.Gdata = data.grade.map(d => ({ value: d.id, label: d.value}));
      data.campaigns.splice(0, 0, { ID: '', name: 'Please Select'});
      that.Campaigns = data.campaigns.map(d => ({ value: d.ID, label: d.name}));
      if ( data.jobType.length > 0 && !!data.jobType[0].options) {
        let jobTypes =  data.jobType[0].options.map(d => ({value: d.ID.split('-').join(''), label: d.label}));
        jobTypes.splice(0, 0, { value: '', label: 'Please Select'});
        that.jobTypes  = jobTypes;
      }
    });
  }
  medianDataLoadAPI() {
    this.medianDataLoading = true;
    let that = this;
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.medianDataLoading = true;
    /* here is code foro  ARTLOG_SCORECARDLOAD  scorecardload action*/
    let body = new HttpParams()
    .append('currentStatus', JSON.stringify(this.frmdt.currentStatus))
    .append('workflowPreset',this.frmdt.workflowPreset)
    .append('compaignId',this.frmdt.compaignId)
    .append('jobType',this.frmdt.jobTypes)
    .append('grade',this.frmdt.grade)
    .append('module',this.frmdt.module);
    // tslint:disable-next-line: max-line-length
    this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_SCORECARDLOAD, body, null).subscribe((data) => {
        debugger
        let OverDueJobsData = (data as any ).permissionResponce.filter(d=> d.overDueStatus == true)
        that.OverDueJobsData = OverDueJobsData;
        let median = (data as any ).permissionResponce ;
        let TatData = (data as any ).TatRes ;
        if( that.frmdt.workflowPreset ) {
          if(that.frmdt.workflowPreset =='Permission' ) {
            if(that.frmdt.jobTypes != ''){
              let dd = TatData.filter(d => d.asset_typeId.split('-').join('') == that.frmdt.jobTypes);
              that.ScoreCard.Exptat = (dd.length > 0) ? dd[0].tat: 0;
            } else {
              let dd = TatData.filter(d => d.asset_typeId == "Unallocated");
              that.ScoreCard.Exptat = (dd.length > 0) ? dd[0].tat: 0;
            }
          } else if(that.frmdt.workflowPreset != ''){
            let dd = TatData.filter(d => d.asset_typeId == that.frmdt.workflowPreset);
            that.ScoreCard.Exptat = (dd.length > 0) ? dd[0].tat: 0;
          }
          else {
            let dd = TatData.filter(d => d.asset_typeId == "Unallocated");
            that.ScoreCard.Exptat = (dd.length > 0) ? dd[0].tat: 0;
          }
        } else {
          that.ScoreCard.Exptat = 0;
        }
        that.median = median;
        let permissionDuration = [];
        that.ScoreCard.NumOver = OverDueJobsData.length; // that.api1Data.reduce((a, b) => {  return a+b.overDueCount},0)
        that.ScoreCard.overDueIDs = OverDueJobsData.map(d=> d._id); //that.api1Data.reduce((a, b) => {  return a.concat(b.overDueIds)},[]);
        that.ScoreCard.MedianDur = that.getMedianData(median.map(d => d.duration));
        
        permissionDuration = OverDueJobsData.filter(d => d.workflow =='Permission');
        let permissionMedian = median.filter( d => d.workflow === 'Permission');
        let GraphDataM = []; let GraphDataO = [];
        let GraphData10th = []; let GraphData90th = [];
        let PermMedian = ( permissionMedian.length > 0 ) ? this.getMedianData(permissionMedian.map(d => d.duration)) : 0  ;
        let PerOverdueMed = (permissionDuration.length > 0 ) ? this.getMedianData( permissionDuration.map(d => d.CalDuration) ) : 0 ;
        GraphDataM.push(PermMedian);
        GraphDataO.push(PerOverdueMed);

        let per10th = ( permissionMedian.length > 0 ) ? this.getPercentileData(permissionMedian.map(d => d.duration), 10) : 0  ;
        let per90th = ( permissionMedian.length > 0 ) ? this.getPercentileData(permissionMedian.map(d => d.duration), 90) : 0  ;
        GraphData10th.push(per10th);
        GraphData90th.push(per90th);

        // l,lihgvfcdsxzc  Shutterstock
        let Shutterstockdt = OverDueJobsData.filter(d => d.workflow === 'Shutterstock');
        let ShutterstockMedian = median.filter( d => d.workflow === 'Shutterstock');
        let ShuMedian = (ShutterstockMedian.length > 0 ) ? this.getMedianData(ShutterstockMedian.map(d => d.duration )) : 0 ;
        // tslint:disable-next-line: max-line-length
        let ShuOverDueMedia = (Shutterstockdt.length > 0 ) ? this.getMedianData( Shutterstockdt.map(d => d.CalDuration) ) : 0;
        GraphDataM.push(ShuMedian);
        GraphDataO.push(ShuOverDueMedia);

        per10th = ( ShutterstockMedian.length > 0 ) ? this.getPercentileData(ShutterstockMedian.map(d => d.duration), 10) : 0  ;
        per90th = ( ShutterstockMedian.length > 0 ) ? this.getPercentileData(ShutterstockMedian.map(d => d.duration), 90) : 0  ;
        GraphData10th.push(per10th);
        GraphData90th.push(per90th);

        // l,lihgvfcdsxzc  Created Image
        let CreatedImagedt = OverDueJobsData.filter(d => d.workflow === 'Created Image' );
        let CreatedImageMedian = median.filter( d => d.workflow === 'Created Image');
        let CreatedMedian = (CreatedImageMedian.length > 0 ) ? this.getMedianData(CreatedImageMedian.map(d => d.duration )) : 0 ;
        // tslint:disable-next-line: max-line-length
        let CreatedOverDueMedia = (CreatedImagedt.length > 0  ) ? this.getMedianData( CreatedImagedt.map(d => d.CalDuration) ) : 0;
        GraphDataM.push(CreatedMedian);
        GraphDataO.push(CreatedOverDueMedia);

        per10th = ( CreatedImagedt.length > 0 ) ? this.getPercentileData(CreatedImagedt.map(d => d.duration), 10) : 0  ;
        per90th = ( CreatedImagedt.length > 0 ) ? this.getPercentileData(CreatedImagedt.map(d => d.duration), 90) : 0  ;
        GraphData10th.push(per10th);
        GraphData90th.push(per90th);
        // l,lihgvfcdsxzc  Clip Art
        let ClipArtdt = OverDueJobsData.filter(d => d.workflow === 'Clip Art' );
        let ClipArtOverMedian = median.filter( d => d.workflow === 'Clip Art');
        let ClipArtMedian = (ClipArtOverMedian.length > 0 ) ? this.getMedianData(ClipArtOverMedian.map(d => d.duration )) : 0 ;
        // tslint:disable-next-line: max-line-length
        let ClipArtOverDueMedia = (ClipArtdt.length > 0  ) ? this.getMedianData( ClipArtdt.map(d => d.CalDuration) ) : 0;
        GraphDataM.push(ClipArtMedian);
        GraphDataO.push(ClipArtOverDueMedia);

        per10th = ( ClipArtOverMedian.length > 0 ) ? this.getPercentileData(ClipArtOverMedian.map(d => d.duration), 10) : 0  ;
        per90th = ( ClipArtOverMedian.length > 0 ) ? this.getPercentileData(ClipArtOverMedian.map(d => d.duration), 90) : 0  ;
        GraphData10th.push(per10th);
        GraphData90th.push(per90th);
        that.OverDueMedianData = GraphDataM;
        that.MedianData = GraphDataO;
        that.ChartOptions2.series = [
          {
            name: 'Median Time',
            data: GraphDataM
          },
          {
            name: 'Median Duration',
            data: GraphDataO
          }
        ];
        that.ChartOptions3.series = [
          {
            name: '10th Percentile',
            data: GraphData10th
          },
          {
            name: '90th Percentile',
            data: GraphData90th
          }
        ];
        
       this.medianDataLoading = false;
       debugger
        let setOfCamp = [...new Set((data as any ).campaignIDDt.map(d => d._id.campaignID))];
        setOfCamp = that.Campaigns.filter(d => d.value !='').map(d => d.value);
        that.Campaigns; // all set of campaignID and Names
       let GraphData = [];
       that.ChartOptions4.series = [];
       for ( let sofCam of setOfCamp ) {
         let dd = (data as any ).campaignIDDt.filter(d => d._id.campaignID == sofCam)
         let dd1 = dd.map(d => ({ status: d._id.status, count: d.count})).sort( (a, b) =>  a.status.localeCompare(b.status));
         let ActiveC = (dd.filter(d => d._id.status == 'Active').length) ? dd.filter(d => d._id.status == 'Active')[0].count : 0 ;
         let ApprovedC = (dd.filter(d => d._id.status == 'Approved').length) ? dd.filter(d => d._id.status == 'Approved')[0].count : 0 ;
         let CancelledC = (dd.filter(d => d._id.status == 'Cancelled').length) ? dd.filter(d => d._id.status == 'Cancelled')[0].count : 0 ;
         let NeedsChangesC = (dd.filter(d => d._id.status == 'NeedsChanges').length) ? dd.filter(d => d._id.status == 'NeedsChanges')[0].count : 0 ;
         GraphData.push([ActiveC, ApprovedC, CancelledC, NeedsChangesC]);
         that.ChartOptions4.series.push({ 'name': that.getCampNameByID(sofCam), 'data': [ActiveC, ApprovedC, CancelledC, NeedsChangesC]})
       }
       that.ScoreCard.NumHold = (data as any ).campaignIDDt.filter(d => d._id.status =='NeedsChanges').reduce( (a, b) => {
        return a + b.count;
       }, 0);
       that.ScoreCard.totalJobs = (data as any ).campaignIDDt.reduce( (a, b) => {
        return a + b.count;
       }, 0);
        /**/
      });
    // });
  }
getCampNameByID(id: any): string {
  let ret = '-';
  let dt = this.Campaigns.filter( d => d.value == id);
  if(dt.length > 0 && !!dt[0].label) {
    ret = dt[0].label;
  }
  return ret;
}
combineMediun(arrays: any []): any {
    let TeamMedian: any = 0;
    if ( arrays.length > 0 ) {
      TeamMedian = this.getMedianData(arrays.map(d => d.jobDuration )[0]);
    }
    return parseFloat(TeamMedian).toFixed(2);
}
getPercentileData(arr: any [], val: number): any {
  // tslint:disable-next-line: no-shadowed-variable
  const percentile = (arr: any [], val: number ): number =>
  (100 * arr.reduce((acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0), 0)) / arr.length;
  return  parseFloat(percentile(arr, val ).toString()).toFixed(2);
}
getMedianData(arrSort: any []): any {
  let len = arrSort.length;
  arrSort.sort((a, b ) => a - b );
  const mid = Math.ceil(len / 2);
  const median = len % 2 == 0 ? (arrSort[mid] + arrSort[mid - 1]) / 2 : arrSort[mid - 1];
  return parseFloat(median).toFixed(2);
}
filterData() {
    let that = this;
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.WeeklyJobsLoading = true;
    let body = new HttpParams()
    .append('currentStatus', JSON.stringify(this.frmdt.currentStatus))
    .append('workflowPreset',this.frmdt.workflowPreset)
    .append('compaignId',this.frmdt.compaignId)
    .append('jobType',this.frmdt.jobTypes)
    .append('grade',this.frmdt.grade)
    .append('module',this.frmdt.module);
    this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_CREATEDCOMPLETEDJOBS, body, null).subscribe((data) => {
    var startDate = new Date(data.StartTime);
    var endDate = new Date(data.EndTime);
    var dataFormate = [];
      let CreatedData = [], ComplatedData = [], WeeklyData = [];
    while ( endDate.getTime() >= startDate.getTime() ) {
        var startWeek = new Date(this.MpsDateFormat(startDate));
        startDate.setDate(startDate.getDate() + 6);
        var dateFormate = this.MpsDateFormat(startDate);
        var CreatedJobs = 0, ComplatedJobs = 0;
        var dateRange =  startWeek.getDate() + '-' + this.Month(startWeek) + ' To ' + startDate.getDate() + '-' + this.Month(startDate) ;
        var result1 = data.CreatedData, result2 = data.FinishedData;
        for (let temp in result1) {
          var dbDate = new Date( this.MpsDateFormat(result1[temp]._id)).getTime();
          if (result1[temp].hasOwnProperty('_id') &&  dbDate >= startWeek.getTime() &&  dbDate <= startDate.getTime() ) {
            CreatedJobs = CreatedJobs + result1[temp].count;
          }
        }
        for (let temp in result2) {
          var dbDate = new Date(result2[temp]._id).getTime();
          if (result2[temp].hasOwnProperty('_id')  &&  dbDate > startWeek.getTime() &&  dbDate  <= startDate.getTime()  ) {
            ComplatedJobs = ComplatedJobs + result2[temp].count;
          }
        }
        CreatedData.push({ x: dateRange ,y:CreatedJobs});
        ComplatedData.push({ x: dateRange ,y:ComplatedJobs});
        WeeklyData.push(dateRange);
        startDate.setDate(startDate.getDate() + 1);
      }
    that.CreatedJobs = CreatedData;
    that.ComplatedJobs = ComplatedData;
    that.chartOptions.series = [
      {
        name: 'Created Jobs',
        data: CreatedData
      },
      {
        name: 'Completed Jobs',
        data:  ComplatedData
      }
    ];
     that.WeeklyJobsLoading = false;
    });
    console.log('Data filter');
    this.medianDataLoadAPI();

  }
   Month(dd: any) {
    var months    = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[dd.getMonth()];
  }
   MpsDateFormat(d: any) {
    if (typeof d == 'string') {
      d = new Date(d);
    }
    let month, day, year;
    month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  clearData() {
    console.log('Data filter');
  }
  viewAlljobs(){
    this.JobsType ="all";
    this.cartdata = this.median;
    this.viewSummary();
  }
  OverDuejobs(ids:any) {
    this.JobsType ="Overdue";
    this.cartdata = this.OverDueJobsData;
    this.viewSummary();
  }
  viewSummary() {
    
    this.summaryOfoverdueModel = true;
  }
  onGridReady (params : any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  exportAsCSV() {
    this.gridApi.exportDataAsCsv({});
  }
  ngOnInit() {
    this.cols = [
      { field: 'job_key', headerName: 'Job Key' },
      { field: 'name', headerName: 'Job Name' },
      { field: 'campaignName', headerName: 'Campaign' },
      { field: 'grade', headerName: 'Grade' },
      { field: 'module', headerName: 'Module' },
      { field: 'batch', headerName: 'Batch' },
      { field: 'job_active_stage.status', headerName:'Completion Status' },
      { field: 'dateCreated', headerName:'Date Created' },
      { field: 'job_date_finished', headerName:'Date Completed' },
      { field: 'CalDuration', headerName: 'Cumulative Age' },

      { field: 'workflow', header: 'Workflow' }   ];
    this.ScoreCard = { NumHold: 0, totalJobs: 0, Exptat: 0, MedianDur: 0, NumOver : 0 };
    this.frmdt = { currentStatus: [], workflowPreset: '', compaignId : '', jobTypes: '', grade: '', module: '' };
    this.pageinit();
    this.medianTimePerTeam();

   // this.percentileView();
    // this.AllJobsView();
    this.WeeklyJobsLoading = true;
    this.medianDataLoading = true;
    this.percentileDataLoading = true;
    this.oherGraphDataLoading = true;
    this.createdVSComplated();
    this.filterData();
    this.percentileView();
    this.AllJobsView();
  }
  createdVSComplated() {
    this.WeeklyJobsLoading = false;
    this.chartOptions = {
      series: [{
          name: 'Created Jobs',
          data: []
        }, {
          name: 'Completed Jobs',
          data: []
        }],
        xaxis: {
          title: {
          text: 'Weekly Report',
          }
        },
      chart: {
        height: 550,
        fontFamily: '"Open Sans", "Helvetica Neue", sans-serif',
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          blur: 10,
          opacity: 0.2
        },
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Created Jobs & Completed Jobs',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -10,
        offsetX: -5
      }
    };
    // -------------end ----------------------
  }
  medianTimePerTeam() {
    this.ChartOptions2 = {
      series: [
        {
          name: 'Median Time',
          data: [0, 0, 0, 0]
        },
        {
          name: 'Median Duration',
          data: [0, 0, 0, 0]
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'flat'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      title: {
        text: 'Median Time Per Team (In Days)',
        align: 'center'
      },
      xaxis: {
        categories: [
          'Permission Team',
          'Shutterstock Team',
          'Created Image',
          'Art Team',
          'Clip Art Team'
        ]
      },
      yaxis: {
        title: {
          text: 'Number Of Jobs'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return ' ' + val ;
          }
        }
      }
    };
  }
  percentileView() {

    this.ChartOptions3 = {
      series: [
        {
          name: '10th Percentile',
          data: [0, 0, 0, 0]
        },
        {
          name: '90th Percentile',
          data: [0, 0, 0, 0]
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'flat'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      title: {
        text: '10th & 90th Percentile (In Days) ',
        align: 'center'
      },
      xaxis: {
        categories: [
          'Permission Team',
          'Shutterstock Team',
          'Art Team',
          'Clip Art Team'
        ]
      },
      yaxis: {
        title: {
          text: 'Number Of Jobs'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return ' ' + val + ' ';
          }
        }
      }
    };
  }
  AllJobsView() {
   this.ChartOptions4 = {
      series: [ ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          'In Progress','Completed','Cancelled','Onhold'
        ]
      }
    };
  }
}
