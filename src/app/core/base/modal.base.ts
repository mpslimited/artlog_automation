import { OnChanges, Input } from '@angular/core';
import { BaseComponent } from './base.component';
import { ModalApi } from '../../component/modal';
import { BaseService } from './base.service';
import { Router } from '@angular/router';




export class ModalBase extends BaseComponent implements OnChanges {

      @Input() modalApi: ModalApi;


      constructor(
            protected baseService: BaseService,
            protected router: Router) {
            super(baseService, router);
      }

      ngOnChanges() {

            if (this.modalApi) {
                  this.modalApi.onShow = this.reInit;
            }

      }

      reInit = (param: any) => {
      }

}
