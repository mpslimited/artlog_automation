import { NgModule } from '@angular/core';
import { LoaderService } from './loader/loader.service';
import { CustomModalPopUpService } from './custom-modal-pop-up/custom-modal-pop-up.service';
import { DropdownWithDescriptionService } from './dropdown-with-description';
import { AlertMessageService } from './alert-message/alert-message.service';
import { GlobalDropDownService } from './global-dropdown/global-dropdown.service';
import { GlobalPopupService } from './global-popup';
import { SelectService } from './select/select.service';

@NgModule({
      providers: [
            LoaderService,
            CustomModalPopUpService,
            DropdownWithDescriptionService,
            AlertMessageService,
            GlobalDropDownService,
            GlobalPopupService,
            SelectService
      ]
})

export class ComponentServiceModule { 
      
}
