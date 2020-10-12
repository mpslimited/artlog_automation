import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../../core/base/base.service';
import { SessionObject } from '../../../core/shared';
@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {
  auth: any;
  constructor(
    protected baseServices: BaseService) {
    const user = SessionObject.getUserDetails();
    this.auth = user;
  }

  ngOnInit(): void {

  }

}
