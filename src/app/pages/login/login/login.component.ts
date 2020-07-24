import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { CustomerServicesUrls } from '../../../core/shared';
import { BaseComponent } from '../../../core/base/base.component';
import { SessionObject } from '../../../core/shared';
import { LoginModel, DocRefModel } from './login.model';
import { GuardService } from '../../../core/guard/guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  NAME_LOGIN = 'LOGIN';
  NAME_DOCREF = 'DOCREF';
  loginMsg: any;
  loginModel: LoginModel;
  docRefModel: DocRefModel;
  username: any;
  password: any;

  constructor(
    protected router: Router,
    protected loginService: LoginService,
    private grdSer: GuardService
  ) {
    super(loginService, router);
  }
  xtBaseAfterViewInit() {
    //this.addStyle(document.body, '#0072cf');
  }
  addStyle(elm: any, style) {
    elm.style.background = style;
  }

  initSearchModels() {
    this.loginModel = new LoginModel();
    this.docRefModel = new DocRefModel();

  }

  getServiceUrl(name: string) {
   if (name === this.NAME_LOGIN) {
       return CustomerServicesUrls.SMARTSHEET_LOGIN;
     }
  }

  getSearchModel(name: string) {
    if (name === this.NAME_LOGIN) {
      return this.loginModel;
    } else if (name === this.NAME_DOCREF) {
      return this.docRefModel;
    }
  }

  onLogin() {
    this.showLoader();
    debugger
    console.log("this.NAME_LOGIN=>", this.NAME_LOGIN);
    this.loadDataFromApi(this.NAME_LOGIN).subscribe((data) => {
      console.log("API LoginURL data=>",data);
      debugger
      if (data.Status === 'OK') {
        SessionObject.setUserDetails({
          'userInfo': data.id,
          'Token': data.token,
          'name' : data.name,
          'roleName': data.roleName,
          'userGroupName': data.userGroupName
        });
        localStorage.setItem('isLogin', 'true');

        this.grdSer.navigateFromLogin();
      } else if (data.Status === 'Error') {
        this.loginMsg = 'Invalid Username or Password';
        this.hideMsg();
      } else {
        this.loginMsg = 'Something went wrong....Please try again !!!';
        this.hideMsg();
      }

      this.hideLoader();
    });
  }


  private hideMsg() {
    setTimeout(() => {
      this.loginMsg = false;
    }, 3000);
  }


  getNonSearchModelParams(name?: string): any {
    if (name === this.NAME_DOCREF) {
      const obj = {
        limit: 100
      };
      return obj;
    }
  }

}
