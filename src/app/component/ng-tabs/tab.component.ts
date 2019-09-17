/**
 * A single tab page. It renders the passed template
 * via the @Input properties by using the ngTemplateOutlet
 * and ngTemplateOutletContext directives.
 */

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'my-tab',
  templateUrl: './tab.html'
})
export class TabComponent implements OnInit {
  @Input('tabId') tabId: string;
  @Input('tabTitle') title: string;
  @Input() active = false;
  @Input() isCloseable = false;
  @Input() template;
  @Input() dataContext;
  @Input() disabled = false;

  ngOnInit() {
    console.log('TabComponent', 'ngOnInit', this.tabId);
    if (this.tabId === undefined) {
      throw new Error('Tabs must have a "tabId" attribute.');
    }
  }



}
