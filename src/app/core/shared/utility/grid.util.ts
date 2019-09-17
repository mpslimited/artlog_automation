
import { timer as observableTimer, Observable } from 'rxjs';

import { ColDef, GridApi, ColumnApi } from 'ag-grid';

import { HtmlUtil } from './html.util';

export interface GridAPII {
      gridApi: GridApi;
      columnApi: ColumnApi;
}

export class Grid {

      private static agElementIds = 0;


      get GRIDWIDTH() {
            return window.screen.availWidth;
      }


      html: HtmlUtil = new HtmlUtil();


      ag_SetWidth(perc: number) {
            return (this.GRIDWIDTH * perc) / 100;
      }

      makeColumnsFromSimpleArray(header: Array<string>): Array<ColDef> {
            const len = header.length;
            let width = 10;
            width = 100 / len;
            const colDef: Array<ColDef> = header.map((item) => {

                  return {
                        headerName: item, // 'Orderhdr Id',
                        field: item.toLowerCase().split(' ').join('_'),
                        minWidth: this.ag_SetWidth(width),
                  };
            });

            return colDef;

      }


      dynamicColumnsFromObj(obj: any): Array<ColDef> {
            const keys = Object.keys(obj);
            const len = keys.length + 1;
            let width = 10;
            width = 100 / len;
            const colDef: Array<ColDef> = keys.map((key) => {
                  return {
                        headerName: key, // 'Orderhdr Id',
                        field: obj[key],
                        minWidth: this.ag_SetWidth(width)
                  };
            });

            return colDef;
      }



      setGridRowData(gridApi: GridApi, data: Array<any>) {
            if (Array.isArray(data) && data.length) {
                  gridApi['gridEmpty'] = false;
                  gridApi.setRowData(data);
            } else {
                  gridApi['gridEmpty'] = true;
                  gridApi.setRowData([]);
            }
      }



      autoSizeColumns(gridAPIS: GridAPII) {

            if (gridAPIS.gridApi) {
                  const columnApi = gridAPIS.columnApi;
                  const gridApi = gridAPIS.gridApi;
                  const allColumnIds = [];
                  columnApi.getAllColumns()
                        .forEach(function (column: any) {
                              allColumnIds.push(column.colId);
                        });


                  if (gridApi.getDisplayedRowCount() !== 0) {
                        const timer = observableTimer(50, 100);
                        const timerSub = timer.subscribe((data) => {

                              if (data === 5) {
                                    timerSub.unsubscribe();
                              }
                              columnApi.autoSizeColumns(allColumnIds);
                        });
                  }

            }
            // gridAPIS.gridApi.sizeColumnsToFit();
      }


      setDynamicColumnDef(gridAPIS: GridAPII, cols: Array<ColDef>) {
            if (gridAPIS.gridApi) {
                  const gridApi = gridAPIS.gridApi;
                  //   gridApi.hideOverlay();
                  gridApi.setColumnDefs(cols);
                  gridApi.sizeColumnsToFit();
            }
      }



      checkBoxBootstrap(id: string, checked: boolean = false, disabled: '' | 'disabled' = '') {

            const checkboxStr = `<div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" ${checked ? 'checked' : ''} ${disabled} id="${id}"
            data-dismiss="modal">
            <label style="display:block" class="custom-control-label" for="${id}"></label>
          </div>`;

            return checkboxStr;

      }


      agCheckBox(key: string, disabled: '' | 'disabled' = '') {
            return (value: any) => {
                  let checked = true;
                  const keyValue = value['data'][key];

                  if ((keyValue == 0) && keyValue) {
                        checked = false;
                  }
                  const id = 'ag-checkbox' + (++Grid.agElementIds);
                  return this.checkBoxBootstrap(id, checked, disabled);
            };


      }



}
