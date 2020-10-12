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

@Component({
  selector: 'app-jobsview',
  templateUrl: './jobsview.component.html',
  styleUrls: ['./jobsview.component.css']
})
export class JobsviewComponent extends BaseComponent implements OnInit {
  auth : any;
  artLogModel: ArtLogModel;
  frmdt: any;
  Gdata: any;
  addGdata: any = [];
  Mdata: any;
  addMdata: any;
  Wdata: any;
  WIPdata: any;
  Tdata: any;
  jobStatus: any;
  jobsTypes: any;
  isSaveSearch: boolean;
  criteria: boolean;
  artassions = []; risks = []; impacts = []; workflows = []; wip = []; items: MenuItem[];
  
    constructor(
    private confirmationService: ConfirmationService,
    protected baseServices: BaseService,
    protected router: Router,
    protected httpService: HttpService,
    protected customModalPopService: CustomModalPopUpService,
    protected alert: AlertMessageService,
    private fb: FormBuilder) {
    super(baseServices, router);
    const user = SessionObject.getUserDetails();
    this.auth = user;
   }

  ngOnInit(): void {
    this.isSaveSearch = false;
    this.frmdt = { grade: '', module: '', status: '', workflow: '' };
  }
  clearData() : void {

  }
  saveSearchDialog(): void {
  }
  viewSavedSearchList(): void {

  }
  filterData(): void {
  }
}
