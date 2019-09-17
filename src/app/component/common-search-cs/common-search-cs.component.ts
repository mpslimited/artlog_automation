import { Component, OnInit, Input } from '@angular/core';
import { IdGenerator } from '../ag-component/ag-radio/id-generator';
import { CommonSearchCS } from './common-search-cs.model';
import { ProjectUtils } from '../../core/shared';
import { popInLimit, showHideAnimate } from './animation';

@Component({
  selector: 'app-common-search-cs',
  templateUrl: './common-search-cs.component.html',
  styleUrls: ['./common-search-cs.component.css'],
  animations: [popInLimit, showHideAnimate]
})
export class CommonSearchCsComponent implements OnInit {

  @Input() searchModel: any;

  addLimit = true;
  limit: number | string | any = 1000;

  commonModel: CommonSearchCS = new CommonSearchCS();
  private idGen: IdGenerator = new IdGenerator('common-search');
  id: string;
  show = false;
  showInput = false;

  constructor(
  ) {
    this.id = this.idGen.genrateID();
  }


  ngOnInit() {

    if (ProjectUtils.isEmpty(this.searchModel)) {
      throw new Error('Search Model is required');
    } else {
      this.addingLimit();
    }

  }

  onChange() {

    this.addingLimit();
    // console.log(this.commonModel, this.searchModel);
  }




  addingLimit() {
    if (this.limit === '' || isNaN(this.limit)) {
      this.limit = 1000;
    }

    if (this.addLimit) {
      this.commonModel.limit.value = this.limit;
    } else {
      this.commonModel.limit.value = '';
    }
    Object.assign(this.searchModel, this.commonModel);
  }

  // onShow() {
  //   this.show = this.show ? false : true;
  // }

  // onContainerShown() {
  //   this.showInput = this.showInput ? false : true;

  // }


}
