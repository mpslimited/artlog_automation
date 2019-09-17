import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentModule } from './../../component/component.module';
@Component({
  selector: 'app-front-panel',
  templateUrl: './front-panel.component.html',
  styleUrls: ['./front-panel.component.css']
})
export class FrontPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {

   // this.addStyle(document.body, '#ecebec');
  }
  addStyle(elm: any, style) {
    elm.style.background = style;
  }
}
