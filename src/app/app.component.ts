import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { environment } from '../environments/environment.prod';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd, NavigationError } from '@angular/router';
import { Utils } from './core/shared';
import { LoaderComponent } from './component';
import { BaseUtil } from './core/base/base.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  version = environment.version;
  cssUrl = '/assets/css/styleCustomer.css';


  @ViewChild('globalLoader') globalLoader: LoaderComponent;

  constructor(
    private router: Router
  ) {
    this.routerEvents();
  }

  ngAfterViewInit() {
    BaseUtil.setGlobalLoader(this.globalLoader);
  }





  routerEvents() {
    this.router.events.subscribe((val) => {
      //Utils.setCss(this.cssUrl);


      if (val instanceof RouteConfigLoadStart) {
        BaseUtil.showGlobalLoader();
      } else if (val instanceof NavigationEnd) {
        BaseUtil.hideGlobalLoader();
      } else if (val instanceof NavigationError) {
        BaseUtil.hideGlobalLoader();
      }

    });
  }







}
