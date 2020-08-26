import { Utils } from './utils';
import { ColDef } from 'ag-grid';

declare var $;
export class ProjectUtils extends Utils {
      public static GRIDWIDTH = window.screen.availWidth;
      public static idCount = 0;

      public static getJobKey(value){
            return function ( value: any ) {
                  if(!!value.data.job_key ){
                        return  `<a href="https://greatminds.getbynder.com/workflow/job/view/`+ value.data.job_key +`/" target="_blank">`+ value.data.job_key +`</a>`;
                  }else{
                        return "";
                  }
            }
      }
      public static getLession(value){
        return function (value: any ) {
            if(!!value.data.jobMetaproperties && value.data.jobMetaproperties.hasOwnProperty("b447dc7d70b0420a8ac9ec9aeff78296")){
                  return  value.data.jobMetaproperties.b447dc7d70b0420a8ac9ec9aeff78296;
            }else{
                  return "";
            }
        }
      }public static getComponents(value){
        return function (value: any ) {
            //var ret ="";
            for (let [key, val] of Object.entries( value.data.jobMetaproperties )) {
                  if(key=="87d538e6d3a442468b20426285aef253"){ return val; break; }
            }
             return "";
        }
      }public static getGrades(value){
            return function (value: any ) {
                  for (let [key, val] of Object.entries( value.data.jobMetaproperties )) {
                        if(key=="c0ac0a86e65f4f7ebd88dbd7e77965ef"){
                             let dd= value.data.grade.options.filter((dt)=> dt.ID.split("-").join("") == val);
                              return dd[0].label; break; }
                  }
                  return "";
            }
      }public static getModules(value){
            return function (value: any ) {
                  ///debugger
                  for (let [key, val] of Object.entries( value.data.jobMetaproperties )) {
                        if(key=="7388493928bc4a9aa57ca65306ed1579"){
                             let dd= value.data.modules.options.filter((dt)=> dt.ID.split("-").join("") == val);
                             if(dd.length >0){
                              return dd[0].label; break;
                             }
                        }
                  }
                  return "";
            }
      }public static getArtComplexity(value){
            return function (value: any ) {  //debugger //modules.options
                for (let [key, val] of Object.entries( value.data.jobMetaproperties )) {
                      if(key=="c7fbc907710045778ee29863e33d2bd2"){
                             return val; break;
                        }
                }
                 return "";
            }
      }public static getArtAssignment(value){
            return function (value: any ) {  //debugger //modules.options
                for (let [key, val] of Object.entries( value.data.jobMetaproperties )) {
                      if(key=="cd8809565088496da4955eb3327fea04"){
                             return val; break;
                        }
                }
                 return "";
            }
      }
      //
      public static getMetainfo(value, key){
            return function (value: any ) {
                  debugger

                  if( typeof value.getValue()=="object" ){
                        for (let [key, val] of Object.entries( value.getValue())) {
                          if(key=="b447dc7d70b0420a8ac9ec9aeff78296"){
                              return  val;
                              break;
                          }
                        }
                        //return value.getValue()[ value.getValue().length -1 ].name;
                  }else{
                        return "";
                  }// value['data'][key];
            }
      } public static getStageName(key: string){
            return function (value: any) {
                  if(value.getValue().length > 0){
                        return value.getValue()[ value.getValue().length -1 ].name;
                  }else{
                        return "";
                  }// value['data'][key];
            }
      }
      public static displayThumbnail( value ){
        return `<img src="notfound.jpg">`;
      }
      public static getSessionObject() {
            return null;
      }
      public static decimaltwoplace(value) {
            if (value.value
                  === null) { return ''; }
            return parseFloat(value.value).toFixed(2);
      }

      public static ChangeValueToTrueFalse(value) {
            if (value.value === 1) {
                  return 'True';
            } else {
                  return 'False';
            }

      }

      public static ag_SetWidth(perc: number) {
            return (ProjectUtils.GRIDWIDTH * perc) / 100;
      }

      public static selectsymb(value: any) {
            return function (value: any ) {
             return '<i class="fa fa-edit text-primary"></i>';
            }
      }
      public static selecticon(value: any) {
            return '<input type="checkbox" style="zoom: 1.5" data-dismiss="modal">';
      }
      public static selecticonredio(name: string) {


            return function (value: any) {
                  const id = 'radio-' + (++ProjectUtils.idCount);
                  return `<div class="custom-control custom-radio">
            <input type="radio" id="${id}" name="${name}" class="custom-control-input">
            <label style="display:block" class="custom-control-label" for="${id}"></label>
          </div>`;
            };
      }

      public static selecticon1(key: string) {
            return function (value: any) {
                  const id = value['data'][key];
                  return `<div class="custom-control custom-checkbox">
                  <input type="checkbox" ${value['data'].select ? 'checked' : ''} class="custom-control-input" id="${id}"
                  data-dismiss="modal">
                  <label style="display:block" class="custom-control-label" for="${id}"></label>
                </div>`;

            };
      }


      public static chkboxCol(key: string) {
            return function (value: any) {
                  const id = key + (++ProjectUtils.idCount);
                  return `<div class="custom-control custom-checkbox">
                  <input type="checkbox" ${value['data'][key] ? 'checked' : ''} class="custom-control-input" id="${id}"
                  data-dismiss="modal" disabled>
                  <label style="display:block" class="custom-control-label" for="${id}"></label>
                </div>`;
            };
      }

      public static createCheckBox(key: string) {

            return function (value: any) {
                  const id = key + (++ProjectUtils.idCount);
                  return `<div class="custom-control custom-checkbox">
                  <input type="checkbox" ${value['data'][key] !== 0 ? 'checked' : ''}
                  class="custom-control-input" id="${id}">
                  <label style="display:block" class="custom-control-label" for="${id}"></label>
                </div>`;
            };
      }

      public static createDisabledCheckBox(key: string) {
            return function (value: any) {
                  const id = key + (++ProjectUtils.idCount);
                  return `<div class="custom-control custom-checkbox">
                  <input type="checkbox" ${value['data'][key] !== 0 ? 'checked' : ''} class="custom-control-input" id="${id}"  disabled>
                  <label style="display:block" class="custom-control-label" for="${id}"></label>
                </div>`;
            };
      }

      public static RowOption(key: any) {
            return function (value: any) {

                  const rowIndex = value.rowIndex;
                  const eSelect = document.createElement('select');
                  eSelect.setAttribute('class', 'cursor-pntr');
                  eSelect.setAttribute('style', 'padding:0px');
                  eSelect.setAttribute('name', value.colDef.field);
                  eSelect.setAttribute('id', value.colDef.field + '_' + rowIndex);
                  const eOption = document.createElement('option');
                  eOption.text = ' Choose Action';
                  eOption.value = '';

                  eSelect.appendChild(eOption);
                  if (value.colDef.field == 'action') {
                        const eOption1 = document.createElement('option');
                        eOption1.text = ' Edit';
                        eOption1.value = '1';
                        eSelect.appendChild(eOption1);
                        if (!(value.data.orderItemType == 1 || value.data.orderStatusId == 2 || value.data.orderItemType == 2)) {
                              const eOption2 = document.createElement('option');
                              eOption2.text = ' Renew ';
                              eOption2.value = '2';
                              eSelect.appendChild(eOption2);
                        }
                        const eOption3 = document.createElement('option');
                        eOption3.text = ' Add To Order';
                        eOption3.value = '3';
                        eSelect.appendChild(eOption3);
                        if (!(value.data.orderStatusId == 2) && (!(value.data.gross_local_amount == 0) || value.data.noCharge == 0)) {
                              const eOption4 = document.createElement('option');
                              eOption4.text = '  Make Payment';
                              eOption4.value = '4';
                              eSelect.appendChild(eOption4);
                        }
                        if (!(value.data.orderStatusId == 2)) {
                              const eOption5 = document.createElement('option');
                              eOption5.text = ' Cancel Order';
                              eOption5.value = '5';
                              eSelect.appendChild(eOption5);
                        }

                        if (!(value.data.payment_status === 'No Payment')) {
                              if (value.data.gross_local_amount !== '0.00') {
                                    const eOption6 = document.createElement('option');
                                    eOption6.text = ' Payment Review';
                                    eOption6.value = '6';
                                    eSelect.appendChild(eOption6);
                              }
                        }
                        const eOption7 = document.createElement('option');
                        eOption7.text = ' Service/Complaints';
                        eOption7.value = '7';
                        eSelect.appendChild(eOption7);

                        if (value.data.orderItemType === 4) {
                              const eOption8 = document.createElement('option');
                              eOption8.text = 'Package Members';
                              eOption8.value = '8';
                              eSelect.appendChild(eOption8);
                        }
                        const eOption9 = document.createElement('option');
                        eOption9.text = ' Edit Order Header Info';
                        eOption9.value = '9';
                        eSelect.appendChild(eOption9);

                        if (value.data.orderStatusId === '2') {
                              const eOption10 = document.createElement('option');
                              eOption10.text = ' Supplemental Refund';
                              eOption10.value = '10';
                              eSelect.appendChild(eOption10);
                        }

                  }

                  return eSelect;


                  // return function (value: any) {

                  //       return `<div class="dropdown show">
                  //       <div class="cursor-pntr" id="dropdownMenuButton"
                  //        data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style="padding:0px;">
                  //         <i class="fa fa-ellipsis-v text-primary"></i>
                  //       </div>
                  //       <div class="dropdown-menu hide" aria-labelledby="dropdownMenuButton"  style="position: relative;">

                  //         <a class="custom-select form-control">Edit</a>

                  //         <div class="dropdown-divider" ${(value.data.orderItemType == 1
                  //                   || value.data.orderStatusId == 2 || value.data.orderItemType == 2) ? 'hidden' : ''}></div>
                  //         <a class="custom-select form-control" ${(value.data.orderItemType == 1
                  //                   || value.data.orderStatusId == 2 || value.data.orderItemType == 2) ? 'hidden' : ''}  >Renew</a>

                  //         <div class="dropdown-divider"></div>
                  //         <a class="custom-select form-control">Add To Order</a>

                  //         <div class="dropdown-divider" ${(value.data.gross_local_amount == 0
                  //                   || value.data.orderStatusId == 2) ? 'hidden' : ''}></div>
                  //         <a class="custom-select form-control" ${(value.data.gross_local_amount == 0
                  //                   || value.data.orderStatusId == 2) ? 'hidden' : ''}>Payments</a>


                  //         <div class="dropdown-divider" ${(value.data.orderStatusId == 2) ? 'hidden' : ''}></div>
                  //         <a class="custom-select form-control" ${(value.data.orderStatusId == 2) ? 'hidden' : ''} >Cancel Order</a>


                  //         <div class="dropdown-divider" ${(value.data.payment_status === 'No Payment') ? 'hidden' : ''}></div>
                  //   <a class="custom-select form-control"
                  //   ${(value.data.payment_status === 'No Payment')
                  //    ? 'hidden' : ''}>Payment Review</a>

                  //         <div class="dropdown-divider"></div>
                  //         <a class="custom-select form-control">Service/Complaints</a>
                  //       </div>
                  //     </div>`;

            };
      }

      public static PackageOrderRowOption(key: string) {

            return function (value: any) {

                  const rowIndex = value.rowIndex;
                  const eSelect = document.createElement('select');
                  eSelect.setAttribute('class', 'cursor-pntr');
                  eSelect.setAttribute('style', 'padding:0px');
                  eSelect.setAttribute('name', value.colDef.field);
                  eSelect.setAttribute('id', value.colDef.field + '_' + rowIndex);
                  const eOption = document.createElement('option');
                  eOption.text = 'Choose Action';
                  eOption.value = '';

                  eSelect.appendChild(eOption);
                  if (value.colDef.field == 'action') {
                        const eOption1 = document.createElement('option');
                        eOption1.text = 'Edit Package';
                        eOption1.value = '1';
                        eSelect.appendChild(eOption1);

                        const eOption2 = document.createElement('option');
                        eOption2.text = 'Renew Member';
                        eOption2.value = '2';
                        eSelect.appendChild(eOption2);

                        const eOption3 = document.createElement('option');
                        eOption3.text = 'Edit Member';
                        eOption3.value = '3';
                        eSelect.appendChild(eOption3);

                        const eOption4 = document.createElement('option');
                        eOption4.text = 'Cancel Member';
                        eOption4.value = '4';
                        eSelect.appendChild(eOption4);

                        const eOption5 = document.createElement('option');
                        eOption5.text = 'Extend Member Subscription';
                        eOption5.value = '5';
                        eSelect.appendChild(eOption5);

                  }
                  return eSelect;
            };
      }


      public static ProcessRowOption(key: string) {

            return function (value: any) {

                  const rowIndex = value.rowIndex;
                  const eSelect = document.createElement('select');
                  eSelect.setAttribute('class', 'cursor-pntr');
                  eSelect.setAttribute('style', 'padding:0px');
                  eSelect.setAttribute('name', value.colDef.field);
                  eSelect.setAttribute('id', value.colDef.field + '_' + rowIndex);
                  const eOption = document.createElement('option');
                  eOption.text = 'Choose Action';
                  eOption.value = '';

                  eSelect.appendChild(eOption);
                  if (value.colDef.field == 'reportList') {
                        const eOption1 = document.createElement('option');
                        eOption1.text = 'Open Record';
                        eOption1.value = '1';
                        eSelect.appendChild(eOption1);

                        if (!(value.data.charged == 0 || value.data.orderStatusId == 2)) {
                              const eOption2 = document.createElement('option');
                              eOption2.text = 'Delete Record';
                              eOption2.value = '2';
                              eSelect.appendChild(eOption2);
                        }

                        if (!(value.data.status == 0)) {
                              const eOption3 = document.createElement('option');
                              eOption3.text = 'Submit Job';
                              eOption3.value = '3';
                              eSelect.appendChild(eOption3);
                        }
                  }
                  return eSelect;
            };
      }


      // return function (value: any) {
      //       return `<div class="dropdown show">
      //       <div class="cursor-pntr" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
      //         <i class="fa fa-ellipsis-v text-primary"></i>
      //       </div>
      //       <div class="dropdown-menu hide" aria-labelledby="dropdownMenuButton" x-placement="top-start" style="position: relative;
      //        transform: translate3d(0px, -64px, 0px); top: 0px; left: 0px; will-change: transform;">

      //         <div class="dropdown-divider"></div>
      //         <a class="dropdown-item">Open Record</a>

      //         <div class="dropdown-divider" ${(value.data.charged == 0 || value.data.orderStatusId == 2) ? 'hidden' : ''}></div>
      //         <a class="dropdown-item" ${(value.data.charged == 0 || value.data.orderStatusId == 2) ? 'hidden' : ''}>Delete Record</a>

      //         <div class="dropdown-divider" ${value.data.status == 0 ? 'hidden' : ''}></div>
      //         <a class="dropdown-item"${value.data.status == 0 ? 'hidden' : ''}>Submit Job</a>
      //       </div>
      //     </div>`;

      // };




      public static editicon(value: any) {
            return '<a href="javascript:;"><i class="fa fa-edit" style="font-size:16px;"></i></a>';
      }

      public static viewDetailsIcon(value: any) {
            return '<a href="javascript:;"><i class="fa fa-eye" style="font-size:16px;"></i></a>';
      }

      public static viewPaymentDetailIcon(value: any) {
            return '<a href="javascript:;"><i class="fa fa-money" style="font-size:16px;"></i></a>';
      }
      public static processiconReviewJob(value: any) {
            return '<a href="javascript:;" style="padding-left: 55px"><i class="fa fa-history" aria-hidden="true"></i></a>';
      }
      public static processiconEmailSetup(value: any) {
            return '<a href="javascript:;" style="padding-left: 55px"><i class="fa fa-envelope" aria-hidden="true"></i></a>';
      }


      public static DocRefType(value: any) {
            const docType = value.value;
            if (docType === 0) {
                  return 'Customer Service';
            } else if (docType === 1) {
                  return 'Import';
            } else if (docType === 2) {
                  return 'Batch';
            } else if (docType === 3) {
                  return 'Day End';
            } else if (docType === 4) {
                  return 'Internet';
            }
      }

      public static renewalType(value: any) {
            const docType = value.value;
            if (docType === 0) {
                  return 'By Issue/Unit';
            } else if (docType === 1) {
                  return 'By Volume Group';
            } else if (docType === 2) {
                  return 'Requal';
            }
      }

      public static effortType(value: any) {
            const docType = value.value;
            if (docType === 0) {
                  return 'N/A';
            } else if (docType === 1) {
                  return 'Issues/Units Left';
            } else if (docType === 2) {
                  return 'Issues/Units Left with Expire';
            } else if (docType === 3) {
                  return 'At Birth';
            } else if (docType === 4) {
                  return 'By Package Expire Date';
            } else if (docType === 5) {
                  return 'From Long Qual. date';
            } else if (docType === 6) {
                  return 'From Short Qual. date';
            } else if (docType === 7) {
                  return 'By Subscription Expire Date';
            } else if (docType === 8) {
                  return 'Exact Issues/Units Left';
            }
      }

      public static historyicon(value: any) {
            return '<a href="javascript:;"><i class="fa fa-history" style="font-size:16px;"></i></a>';
      }

      public static editSelectButton(value: any) {
            return `<i class="fa fa-edit iconColor mr-2" >edit</i>
            <i class="fa fa-check-square-o iconColor" >Select</i>`;
      }
      public static editDeleteButton(value: any) {
            return `<a href="javascript:;" style="text-decoration: none;"><i class="fa fa-edit" ></i>&nbsp;&nbsp;&nbsp;
            <i class="fa fa-trash" ></i></a>`;
      }

      public static deleteButton(value: any) {
            return `<a href="javascript:;" style="text-decoration: none;">
            <i class="fa fa-trash" ></i></a>`;
      }

      public static editButton(value: any) {
            return `<a href="javascript:;" style="text-decoration: none;">
            <i class="fa fa-edit" ></i></a>`;
      }

      public static transferButton(value: any) {
            return `<a href="javascript:;" style="text-decoration: none;">
            <i class="fa fa-exchange" ></i></a>`;
      }

      public static checkButton(value: any) {
            return `<a href="javascript:;" style="text-decoration: none;">
            <i type="checkbox" class="custom-control-input" ></i></a>`;
      }

      // public static setUnpaidOrderSelected(value: any) {

      //       if (value.data['netBaseAmount'] > '0') {
      //             return `<a href="javascript:;" style="text-decoration: none;"><input type="checkbox" checked></a>`;
      //       } else {
      //             return `<a href="javascript:;" style="text-decoration: none;"><input type="checkbox" readonly></a>`;
      //       }

      // }


      public static AddEditSelect(colDef: Array<ColDef>, header: string): Array<ColDef> {

            const edtSel: Array<ColDef> = [{
                  headerName: header,
                  cellRenderer: ProjectUtils.editSelectButton,
                  suppressFilter: true
            }];
            colDef = edtSel.concat(colDef);
            return colDef;
      }
      public static AddEditDelect(colDef: Array<ColDef>, header: string): Array<ColDef> {

            const edtSel: Array<ColDef> = [{
                  headerName: header,
                  cellRenderer: ProjectUtils.editDeleteButton,
                  suppressFilter: true
            }];
            colDef = edtSel.concat(colDef);
            return colDef;
      }

      public static setSelect(value) {
            let anchor;
            if (value.node.data.is_reversed === 1) {
                  anchor = '<input type="checkbox" disabled id=""  checked>';
            } else if (value.node.data.is_reversed === 0) {
                  anchor = '<input type="checkbox" id="" disabled>';
            }
            return anchor;
      }

      public static numberFormatter(parm) {
            if (parm !== undefined) {
                  const argu = (parm.value !== undefined) ? parm.value : parm;
                  if (argu === 0) { return 'Customer Service'; }
                  if (argu === 1) { return 'Import'; }

                  if (argu === 2) { return 'Batch'; }

                  if (argu === 3) { return 'Day End'; }

                  if (argu === 4) { return 'Internet'; }
            }

      }

      public static tableNumberFormatter(parm) {
            if (parm !== undefined) {
                  const argu = (parm.value !== undefined) ? parm.value : parm;
                  if (argu === 0) { return 'Customer'; }
                  if (argu === 1) { return 'Customer Address'; }

                  if (argu === 2) { return 'Customer Prospect'; }

                  if (argu === 3) { return 'Order Item'; }

                  if (argu === 4) { return 'Payment'; }
                  if (argu === 4) { return 'Demographic'; }
                  if (argu === 6) { return 'Order Item Amount Break'; }
                  if (argu === 7) { return 'Cust. Addr. Distr'; }
                  if (argu === 8) { return 'Subscrip'; }
                  if (argu === 9) { return 'Order Item Install'; }
                  if (argu === 10) { return 'Payment Account'; }
                  if (argu === 11) { return 'Service'; }

            }

      }


      public static numericValidation(e: any) {  // to be fire on keydown

            let input;
            if (e.which > 95 && e.which < 107) {
                  return true;
            } else if ((e.which > 34 && e.which < 38) || e.which === 39 || e.which === 46) {
                  return true;
            } else if (e.metaKey || e.ctrlKey) {
                  return true;
            } else if (e.which === 32) {
                  return false;
            } else if (e.which === 0) {
                  return true;
            } else if (e.which < 33) {
                  return true;
            }

            input = String.fromCharCode(e.which);
            return !!/[\d\s]/.test(input);
      }

      public static editNumberFormatter(parm) {
            if (parm !== undefined) {
                  const argu = (parm.value !== undefined) ? parm.value : parm;
                  if (argu === 0 || argu === '0') { return 'Add'; }
                  if (argu === 1 || argu === '1') { return 'Edited'; }
            }
      }

      public static editNumberFormatter1(parm) {
            if (parm !== undefined) {
                  const argu = (parm.value !== undefined) ? parm.value : parm;
                  if (argu === 0 || argu === '0') { return 'Add'; }
                  if (argu === 1 || argu === '1') { return 'Change'; }
            }
      }

      public static ChangeBeforeValueAsPerNoteExist(parm) {
            const rowData = parm['data'];
            if (rowData.column_name === 'note_exist' || rowData.column_name === 'status_noedit'
                  || rowData.column_name === 'is_reversed') {

                  if (rowData.before_change === '0') {
                        return 'False';
                  } else {
                        return 'True';
                  }
            }
            return parm.value;
      }

      public static ChangeAfterValueAsPerNoteExist(parm) {
            const rowData = parm['data'];
            if (rowData.column_name === 'note_exist' || rowData.column_name === 'status_noedit'
                  || rowData.column_name === 'is_reversed') {
                  if (rowData.after_change === '0') {
                        return 'False';
                  } else {
                        return 'True';
                  }
            }
            return parm.value;
      }


      public static changeAddType(parm) {
            const changeType = parm.data['changeType'];
            if (changeType === '1') {
                  return 'TEMP';
            } else {
                  return 'FUTURE';
            }
      }

      public static removeTimeStamp(param) {
            const value = param.value;
            if (value !== null) {
                  if (value.includes('T')) {
                        return value.split('T')[0];
                  } else {
                        return value.split(' ')[0];
                  }
            } else {
                  return '';
            }
      }

      public static CheckBoxVal(param) {

            console.log(param);
            return '';
      }


      public static fadeIn(id: string, durationInMilliseconds: number |
            string | 'slow' | 'fast' = 'slow') {
            $('#' + id).fadeIn(durationInMilliseconds);
      }


      public static fadeOut(id: string, durationInMilliseconds: number |
            string | 'slow' | 'fast' = 'slow') {
            $('#' + id).fadeOut(durationInMilliseconds);
      }


      public static showMsgForDuration(id: string, time: number = 5000) {
            this.fadeIn(id);
            setTimeout(() => {
                  this.fadeOut(id);
            }, time);
      }

      public static processPathArray(value: any) {

            let pathProcess = '';
            switch (value) {
                  case 0:
                        pathProcess = 'accounting_reconciliation';
                        break;
                  case 1:
                        pathProcess = 'audit_galley';
                        break;
                  case 2:
                        pathProcess = 'audit_paragraph_report';
                        break;
                  case 3:
                        pathProcess = 'backlabel';
                        break;
                  case 4:
                        pathProcess = 'billing';
                        break;
                  case 5:
                        pathProcess = 'accounting_reconciliation';
                        break;
                  case 6:
                        pathProcess = 'label';
                        break;
                  case 7:
                        pathProcess = 'list_extract';
                        break;
                  case 8:
                        pathProcess = 'accounting_reconciliation';
                        break;
                  case 9:
                        pathProcess = 'accounting_reconciliation';
                        break;
                  case 10:
                        pathProcess = 'mass_kill';
                        break;
                  case 11:
                        pathProcess = 'payment';
                        break;
                  case 12:
                        pathProcess = 'refund';
                        break;
                  case 13:
                        pathProcess = 'accounting_reconciliation';
                        break;
                  case 14:
                        pathProcess = 'product_fulfillment';
                        break;
                  case 15:
                        pathProcess = 'promotion';
                        break;
                  case 16:
                        pathProcess = 'renewal';
                        break;
                  case 17:
                        pathProcess = 'accounting_reconciliation';
                        break;
                  case 18:
                        pathProcess = 'accounting_reconciliation';
                        break;
                  case 19:
                        pathProcess = 'start_stop';
                        break;
                  case 20:
                        pathProcess = 'accounting_reconciliation';
                        break;
                  case 21:
                        pathProcess = 'bacs';
                        break;
                  case 22:
                        pathProcess = 'cleanup';
                        break;
                  case 23:
                        pathProcess = 'installment_notices';
                        break;
                  case 24:
                        pathProcess = 'accounting_reconciliation';
                        break;
                  case 25:
                        pathProcess = 'accounting_reconciliation';
                        break;
                  case 26:
                        pathProcess = 'accounting_reconciliation';
                        break;
                  case 27:
                        pathProcess = 'customer_deposit_reconciliation';
                        break;
                  case 28:
                        pathProcess = 'on_off';
                        break;
                  case 29:
                        pathProcess = 'accounting_reconciliation';
                        break;
                  case 30:
                        pathProcess = 'label_estimate';
                        break;
                  case 31:
                        pathProcess = 'ics_payment_batch_listener';
                        break;
                  case 32:
                        pathProcess = 'bacs_billing';
                        break;
                  case 33:
                        pathProcess = 'bacs_auddis';
                        break;
                  case 34:
                        pathProcess = 'accounting_reconciliation';
                        break;
                  case 37:
                        pathProcess = 'accounting_reconciliation';
                        break;
                  case 38:
                        pathProcess = 'credit_card_expiry_notify';
                        break;
                  case 39:
                        pathProcess = 'credit_card_token_refresh';
                        break;
                  case 40:
                        pathProcess = 'auto_renewal_notify';
                        break;
                  case 41:
                        pathProcess = 'accounting_reconciliation';
                        break;
                  default:
                        break;
            }
            return pathProcess;

      }
}


