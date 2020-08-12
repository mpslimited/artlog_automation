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
import { GoogleChartsModule, ScriptLoaderService } from 'angular-google-charts';

declare var google:any;


@Component({
  selector: 'app-scorecardview',
  templateUrl: './scorecardview.component.html',
  styleUrls: ['./scorecardview.component.css'],
  providers: [ConfirmationService]
})

export class ScorecardviewComponent extends BaseComponent implements OnInit {
  // -- columans for filter Grid dropdown
  dcaSummary: any = [];
  overDuedt: any = [];
  highDt: any = [];
  mediumDt: any = [];
  lowDt: any = [];
  OptData: any = [];
  auth: any = [];
  public dataSource = new BehaviorSubject<AbstractControl[]>([]);
  public form: FormGroup;
  public contactList: FormArray;
  public duplicateJobsList: FormArray;
  data = [];
  apex: any = {};
  constructor(
    private loaderService: ScriptLoaderService,
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

  ngOnInit() {
/*
   this.data = new google.visualization.arrayToDataTable([
      ['Element', 'Density', { role: 'style' }, { role: 'annotation' } ],
      ['Copper', 8.94, '#b87333', 'Cu' ],
      ['Silver', 10.49, 'silver', 'Ag' ],
      ['Gold', 19.30, 'gold', 'Au' ],
      ['Platinum', 21.45, 'color: #e5e4e2', 'Pt' ]
   ]);
    */
   this.apex = {
    series: [
    {
      name: 'round-1',
      data: [
        {
          x: ['Stage', 'A'],
          y: 2.9
        },
        {
          x: ['Stage', 'B'],
          y: 4.3
        },
        {
          x: ['Stage', 'C'],
          y: 6.2
        },
        {
          x: ['Stage', 'D'],
          y: 11.1
        }
      ]
    },
    {
      name: 'round-2',
      data: [
        {
          x: ['Stage', 'A'],
          y: 4.5
        },
        {
          x: ['Stage', 'B'],
          y: 1.9
        },
        {
          x: ['Stage', 'C'],
          y: 9.2
        },
        {
          x: ['Stage', 'D'],
          y: 3.1
        }
      ]
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
    google.charts.load('current', {'packages':['barchart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {

    var data  = new google.visualization.arrayToDataTable([
      ['Element', 'Density', { role: 'style' }, { role: 'annotation' } ],
      ['Copper', 8.94, '#b87333', 'Cu' ],
      ['Silver', 10.49, 'silver', 'Ag' ],
      ['Gold', 19.30, 'gold', 'Au' ],
      ['Platinum', 21.45, 'color: #e5e4e2', 'Pt' ]
   ]);

    var options = {
      title: 'My Daily Activities'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }
    this.finddsmsummary();
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
      that.OptData = data;
    });
  }
  allDataOfDCATastsummary() {
    console.log("function");
  }
  overdueDataOfDCATastsummary() {
    console.log("function");
  }
  highDataOfDCATastsummary() {
    console.log("function");
  }
  mediumDataOfDCATastsummary() {
    console.log("function");
  }
  lowDataOfDCATastsummary() {
    console.log("function");
  }
}


