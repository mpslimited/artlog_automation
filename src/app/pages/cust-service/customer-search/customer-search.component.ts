import { Component, OnInit, Input } from '@angular/core';
import { CustomerSearchService } from './customer-search.service';
import { CustomerSearchModel } from './customer-serach.model';
import { BaseService } from '../../../core/base/base.service';
import { CustomerServicesUrls, Utils, ProjectUtils } from '../../../core/shared';
import { GridApi, ColumnApi, ColDef, GridOptions } from 'ag-grid';
import { BaseComponent } from '../../../core/base/index';
// import { columnDefsCustomerSearch } from './customer-search.data';
import { SessionObject } from '../../../core/shared';
import { GridAPII } from '../../../core/base/base.component';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DropdownDataModel, AlertMessageService } from '../../../component';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css'],
  providers: [CustomerSearchService]
})
export class CustomerSearchComponent extends BaseComponent implements OnInit {

  gridApi: any;
  columnApi: any;
  rowdata: any;
  showtable = 'none';
  NAME_CUSTOMER_SEARCH = 'NAME_CUSTOMER_SEARCH';
  ADDRESS_TYPE_SELECTED = 'ADDRESS_TYPE_SELECTED';
  NAME_GET_COUNTRY_LIST = 'GET_COUNTRY_LIST';
  searchByKeword: any = 'Name';
  CountryList: any;
  sortModel: any = 'Address';
  gridData: any;
  CollapesTooltip = 'Expand';

  customerSearchModel: CustomerSearchModel;
  searchBy = [
    {
      lable: 'Name',
      value: 'Name'
    },
    {
      lable: 'Customer ID',
      value: 'CustomerID'
    },
    {
      lable: 'Phone Number / Email ',
      value: 'phoneNo'
    },
    {
      lable: 'Name / Location',
      value: 'ZipCode'
    },
    {
      lable: 'Company',
      value: 'Company'
    },
    {
      lable: 'Payment',
      value: 'Payment'
    },
    {
      lable: 'Subscriptions',
      value: 'Subscriptions'
    },
    {
      lable: 'Order Number',
      value: 'OrderNumber'
    },
    {
      lable: 'Reference Number',
      value: 'ReferenceNumber'
    }
  ];

  sortBy = [
    {
      lable: 'Address',
      value: 'Address'
    },
    {
      lable: 'Order',
      value: 'Order'
    },
    {
      lable: 'Payment',
      value: 'Payment'
    }
  ];

  mask: any[] = ['+', /[1-9]/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-',
    /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    protected customerSearchService: CustomerSearchService,
    protected baseService: BaseService,
    protected router: Router,
    protected alert: AlertMessageService
  ) {
    super(baseService, router);
    this.gridOptions.onCellClicked = this.agCellClicked;
  }

  initSearchModels() {
    this.customerSearchModel = new CustomerSearchModel();
  }
  ngOnInit() {
    this.initSearchModels();
    this.getCountryList();
    if (this.customerSearchModel.limit.value === 0
      || this.customerSearchModel.limit.value === null || this.customerSearchModel.limit.value === '') {
      this.customerSearchModel.limit.value = 100;
    }
    console.log('customerSearchModel', this.searchByKeword,
      this.customerSearchModel);
    this.showtable = 'block';
    this.loadDataFromApi1(name);
  }

  onSubmit() {
    this.showtable = 'block';
    //  this.gridApi.sizeColumnsToFit();
    // document.getElementById('CollapesIcon').click();
    this.loadDataFromApi1(name);

  }

  agCellClicked = (event) => {
    const headerName: string = event.colDef.headerName;
    const row = event['data'];
    this.rowdata = row;
    SessionObject.setCustomerID({
      'customerId': row.customer_id
    });
    SessionObject.setOpenTab({
      'openTab': 'ORDER_REPORTS',
    });
    this.navigateTo('pages/customer/agency-details');

  }

  loadDataFromApi1(name: string) {
    ProjectUtils.html.validator(['LimitField']);
    if (this.customerSearchModel.limit.value !== '') {
      this.showLoader();
      this.loadDataFromApi(this.NAME_CUSTOMER_SEARCH)
        .subscribe((data) => {
          this.gridData = data;
          this.SetGridData(this.sortModel);
          this.hideLoader();
        });
    } else {
      this.alert.showAlertDanger(['Data Limit field is Empty!!!'], 5000);
    }
  }

  DataLimitKeyUp(event) {
    ProjectUtils.html.validator(['LimitField']);
  }

  private SetGridData(sortValue: any) {

    if (sortValue === 'Payment') {
      this.customerSearchModel.apiGridHeaderKay = 'searchResultByPaymentTableHeaders';
      this.customerSearchModel.apiDatakey = 'searchResultByPayment';
      Utils.date.convertArrayKeytoDate(this.gridData[this.customerSearchModel.apiDatakey], 'creation_date');
      this.bindDataToGrid(this.NAME_CUSTOMER_SEARCH, this.gridData);
    } else if (sortValue === 'Order') {
      this.customerSearchModel.apiGridHeaderKay = 'searchResultByOrderTableHeaders';
      this.customerSearchModel.apiDatakey = 'searchResultByOrder';
      Utils.date.convertArrayKeytoDate(this.gridData[this.customerSearchModel.apiDatakey], 'bill_date');
      Utils.date.convertArrayKeytoDate(this.gridData[this.customerSearchModel.apiDatakey], 'expire_date');
      Utils.date.convertArrayKeytoDate(this.gridData[this.customerSearchModel.apiDatakey], 'invoice_date');
      Utils.date.convertArrayKeytoDate(this.gridData[this.customerSearchModel.apiDatakey], 'order_date');
      Utils.date.convertArrayKeytoDate(this.gridData[this.customerSearchModel.apiDatakey], 'start_date');
      this.bindDataToGrid(this.NAME_CUSTOMER_SEARCH, this.gridData);
    } else if (sortValue === 'Address') {
      this.customerSearchModel.apiGridHeaderKay = 'searchresultByAddressTableHeaders';
      this.customerSearchModel.apiDatakey = 'searchresultByAddress';
      this.bindDataToGrid(this.NAME_CUSTOMER_SEARCH, this.gridData);
    }

  }

  sortDataBy(evt) {
    const evtVal = evt.target.value;
    if (this.gridData) {
      this.SetGridData(evtVal);
    }
  }
  getSearchModel(name: string) {
    return this.customerSearchModel;
  }

  getNonSearchModelParams(name: string) {
    if (name === this.NAME_CUSTOMER_SEARCH) {
      const obj = {
        searchBy: this.searchByKeword
      };
      return obj;
    }
  }

  getServiceUrl(name): string {
    if (name === this.NAME_CUSTOMER_SEARCH) {
      return CustomerServicesUrls.TK_CUSTOMER_SEARCH_DATA;
    } else if (name === this.NAME_GET_COUNTRY_LIST) {
      return CustomerServicesUrls.TK_GET_COUNTRY_LIST;
    }
  }

  getGridApi(name: string): GridAPII {
    if (name === this.NAME_CUSTOMER_SEARCH) {
      return {
        gridApi: this.gridApi,
        columnApi: this.columnApi
      };

    }
  }

  doOnGridReadyCs(api) {
    this.gridApi = api.api;
    this.columnApi = api.columnApi;
    this.doOnGridReady(this.NAME_CUSTOMER_SEARCH);
  }


  getForm(name: string): FormGroup {
    if (name === this.NAME_CUSTOMER_SEARCH) {
      return this.baseForm;
    }
  }

  resetform() {
    this.customerSearchModel.lName.value = null;
    this.customerSearchModel.fName.value = null;
    this.customerSearchModel.initial.value = null;
    this.customerSearchModel.customerId.value = null;
    this.customerSearchModel.eMail.value = null;
    this.customerSearchModel.phoneNumber.value = null;
    this.customerSearchModel.companyName.value = null;
    this.customerSearchModel.country.value = null;
    this.customerSearchModel.cheque.value = null;
    this.customerSearchModel.subscriptionNumber.value = null;
    this.customerSearchModel.orderNumber.value = null;
    this.customerSearchModel.salesInvoice.value = null;
    this.customerSearchModel.agentReference.value = null;
    this.customerSearchModel.poNumber.value = null;
    this.customerSearchModel.creditNote.value = null;
    this.customerSearchModel.postalCode.value = null;
  }

  public getCountryList() {
    this.loadDataFromApi(this.NAME_GET_COUNTRY_LIST)
      .subscribe((data) => {
        this.CountryList = new DropdownDataModel(data.StateList);
      });
  }

  restrictNumeric(e: any) {
    return ProjectUtils.html.numericValidation(e);
  }

  onPaste(event) {
    ProjectUtils.html.numericValidationOnPaste(event);
  }

  ToggleIcon(event) {
    const IconTag = document.getElementById('CollapesIcon').childNodes;
    if (IconTag[0]['className'] === 'fa fa-angle-double-down') {
      document.getElementById('iconId').classList.add('fa-angle-double-up');
      document.getElementById('iconId').classList.remove('fa-angle-double-down');
      this.CollapesTooltip = 'Collapse';
    } else {
      document.getElementById('iconId').classList.add('fa-angle-double-down');
      document.getElementById('iconId').classList.remove('fa-angle-double-up');
      this.CollapesTooltip = 'Expand';
    }
  }

  phoneNumberValidation(evt) {
    const phnValue = evt.target.value;
    if (phnValue !== '') {
      if (phnValue.length > 15) {
        alert('Please enter a valid phone Number');
        this.customerSearchModel.phoneNumber.value = '';
        return false;
      } else {
        return true;
      }
    }
  }

  onPhnSearchRestrict(e) {

    let input;

    if (e.which > 95 && e.which < 107) {
      return true;
    } else if ((e.which > 34 && e.which < 38) || e.which === 39 || e.which === 46) {
      return true;
    } else if (e.metaKey || e.ctrlKey || e.shiftKey) {
      return true;
    } else if (e.which === 32) {
      return true;
    } else if (e.which === 0) {
      return true;
    } else if (e.which < 33) {
      return true;
    } else if (e.which === 110 || e.which === 190) {
      return true;
    } else if (e.which === 107) {
      return true;
    } else if ((e.shiftKey && e.which === 187) || (!e.shiftKey && e.which === 43)) {
      return true;
    }

    input = String.fromCharCode(e.which);

    return !!/[\d\s]/.test(input);
  }

}


