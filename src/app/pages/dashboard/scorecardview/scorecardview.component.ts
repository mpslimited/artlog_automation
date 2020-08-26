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
}; /*
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
}; */
@Component({
  selector: 'app-scorecardview',
  templateUrl: './scorecardview.component.html',
  styleUrls: ['./scorecardview.component.css'],
  providers: [ConfirmationService]
})

export class ScorecardviewComponent extends BaseComponent implements OnInit {
  @ViewChild('chart', { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  // @ViewChild('chart2') chart2: ChartComponent;
  // public ChartOptions2: Partial<ChartOptions2>;
  // @ViewChild('chart3') chart3: ChartComponent;
  // public ChartOptions3: Partial<ChartOptions3>;
  // @ViewChild('chart4') chart4: ChartComponent;
  // public ChartOptions4: Partial<ChartOptions4>;

  // -- columans for filter Grid dropdown

  auth: any = [];
  criteria: boolean;

  dataloading: boolean ;
  medianLoading: boolean ;

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
    { value: '', label: 'Please Select' },
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
      that.Mdata = data.module;
      that.Gdata = data.grade;
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
    let that = this;
    let frmData = {
      'currentStatus': this.frmdt.currentStatus.toString(),
      'workflowPreset': this.frmdt.workflowPreset,
      'compaignId': this.frmdt.compaignId,
      'jobTypes': this.frmdt.jobTypes,
      'grade': this.frmdt.grade,
      'module': this.frmdt.module
    };
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.WeeklyJobsLoading = true;
    // tslint:disable-next-line: max-line-length
    this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_MEDIANOVERDUEPERTEAM, JSON.stringify(frmData), { headers: myheader }).subscribe((MedianData) => {
      debugger
      console.log(MedianData);
      var mediamOverDue = MedianData.OverDueData;
      for (let kin in mediamOverDue ) {
         if (mediamOverDue[kin].jobDuration && mediamOverDue[kin].jobDuration.length > 0) {
            var dataJobDuration = mediamOverDue[kin].jobDuration;
            for (let k2in in  dataJobDuration) {
                if (!! dataJobDuration[k2in]  && dataJobDuration[k2in].indexOf(' days') > -1 ) {
                  mediamOverDue[kin].jobDuration[k2in] = parseInt( dataJobDuration[k2in].split(' days')[0]);
                } else {
                  mediamOverDue[kin].jobDuration[k2in] = parseInt( dataJobDuration[k2in]);
                }
              }
         }
        }

     });
  }
  
  filterData() {
    let that = this;
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.WeeklyJobsLoading = true;
    debugger //obji.body
    let frmData = {
      'currentStatus': this.frmdt.currentStatus.toString(),
      'workflowPreset': this.frmdt.workflowPreset,
      'compaignId': this.frmdt.compaignId,
      'jobTypes': this.frmdt.jobTypes,
      'grade': this.frmdt.grade,
      'module': this.frmdt.module
    };
    this.httpService.extractPostData(CustomerServicesUrls.ARTLOG_CREATEDCOMPLETEDJOBS, JSON.stringify(frmData), null).subscribe((data) => {
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
        CreatedData.push(CreatedJobs);
        ComplatedData.push(ComplatedJobs);
        WeeklyData.push(dateRange);
        // dataFormate.push({dateRange: dateRange, Created: CreatedJobs, FinshedJobs : ComplatedJobs} );
        startDate.setDate(startDate.getDate() + 1);
      }
    that.CreatedJobs = CreatedData;
    that.ComplatedJobs = ComplatedData;
    that.WeeklyData = WeeklyData;
     // that.createdVSComplated();
     // optional VAlue
     debugger
    that.chartOptions.series = [
      {
        name: 'Created Jobs',
        data: CreatedData
      },
      {
        name: 'Complated Jobs',
        data:  ComplatedData
      }
    ];
    // that.chartOptions.series[1].data = ComplatedData;
     // that.chartOptions.xaxis.categories = WeeklyData;

       //   console.log(dataFormate);
    });
    console.log('Data filter');
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

  ngOnInit() {
    this.frmdt = { currentStatus: [], workflowPreset: '', compaignId : '', jobTypes: '', grade: '', module: '' };
    this.pageinit();

    // this.medianTimePerTeam();
    this.percentileView();
    // this.AllJobsView();
    this.WeeklyJobsLoading = true;
    this.createdVSComplated();
    this.filterData();
    // this.medianDataLoadAPI();
  }
  createdVSComplated() {
    this.WeeklyJobsLoading = false;
    this.chartOptions = {
      series: [
        {
          name: 'Created Jobs',
          data: [0, 2, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: 'Complated Jobs',
          data:  [2, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 0]
        }
      ],
      chart: {
        height: 550,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Created Jobs & Complated Jobs',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: [ '10-May To 16-May',
                      '17-May To 23-May',
                      '24-May To 30-May',
                      '31-May To 6-Jun',
                      '7-Jun To 13-Jun',
                      '14-Jun To 20-Jun',
                      '21-Jun To 27-Jun',
                      '28-Jun To 4-Jul',
                      '5-Jul To 11-Jul',
                      '12-Jul To 18-Jul',
                      '19-Jul To 25-Jul',
                      '26-Jul To 1-Aug',
                      '2-Aug To 8-Aug',
                      '9-Aug To 15-Aug',
                      '16-Aug To 22-Aug'
        ],
        title: {
          text: 'Weekly Report'
        }
      },
      yaxis: {
        title: {
          text: 'Number of jobs'
        },
        min: 5,
        max: 40
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
    // -------------end ----------------------
  }
  medianTimePerTeam() {
    /*
    this.ChartOptions2 = {
      series: [
        {
          name: 'Median Time',
          data: [44, 55, 57, 2]
        },
        {
          name: 'Median Duration',
          data: [76, 85, 101, 9]
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
          endingShape: 'rounded'
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
            return '$ ' + val + ' thousands';
          }
        }
      }
    };
    */
  }
  percentileView() {
    /*
    this.ChartOptions3 = {
      series: [
        {
          name: '10th Percentile',
          data: [44, 55, 57, 1]
        },
        {
          name: '10th Percentile',
          data: [76, 85, 101, 3]
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
          endingShape: 'rounded'
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
            return '$ ' + val + ' thousands';
          }
        }
      }
    };
    */
  }
  AllJobsView() {
    /*
    this.ChartOptions4 = {
      series: [
        {
          name: 'In-Progress',
          data: [400, 430, 448, 470, 540, 580]
        },
        {
          name: 'Hold',
          data: [400, 430, 448, 470, 540, 580]
        },
        {
          name: 'Complated',
          data: [400, 430, 448, 470, 540, 580]
        }

      ],
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
          'South Korea',
          'Canada',
          'United Kingdom',
          'Netherlands',
          'Italy',
          'France',
          'Japan',
        ]
      }
    };
    */
  }
}
