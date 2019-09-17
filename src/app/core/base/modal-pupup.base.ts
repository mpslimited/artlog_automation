import { BaseComponent } from './base.component';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Subject ,  Subscription } from 'rxjs';
import { Utils } from '../shared';

export abstract class ModelPopUpBase extends BaseComponent implements OnDestroy, OnChanges {
      @Input() reInitComponent: Subject<any>;


      resetScope = false;

      firstInit = true;

      reInInSub: Subscription;
      constructor(
            protected baseService: BaseService,
            protected router: Router) {
            super(baseService, router);
      }

      ngOnChanges(simpleChange: SimpleChanges) {
            this.subReInit();
            this.xtBaseOnChange();
      }

      xtBaseOnChange() {
      }

      subReInit() {
            if ((this.reInInSub instanceof Subscription) === false) {
                  if (this.reInitComponent instanceof Subject) {
                        this.reInInSub = this.reInitComponent.subscribe((data) => {

                              if (this.firstInit) {
                                    this.firstInit = false;
                                    this.firstReInit();
                              }
                              this.resetScope = false;
                              setTimeout(() => {
                                    this.resetScope = true;
                              }, 100);

                              this.reInit(data);
                        });
                  }
            }


      }


      firstReInit() {

      }

      reInit(data: any) {
      }

      ngOnDestroy() {
            Utils.unsubscribe(this.reInInSub);
            this.xtBaseOnDestroy();
      }

}
