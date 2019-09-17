import { GridApi, ColumnApi, Grid, ColDef, RowNode } from 'ag-grid';
import { Utils } from '../../core/shared';




export class AGServerRequest {

      sortModel: any = {};
      filterModel: any = {};
      paginationModel: any = {};

      completeSortParam: any = null;


      setSortKey(gridApi: GridApi) {
            this.sortModel = gridApi.getSortModel()[0];
            this.sendCompleteParamsToserver();
      }

      setFilterKey(filterString: string) {
            this.filterModel = {
                  filterString: filterString
            };
            this.sendCompleteParamsToserver();
      }

      setPaginationModel(pageSize: number, pageNumber) {
            if (pageSize) {
                  this.paginationModel['pageSize'] = pageSize;
            }
            if (pageNumber) {
                  this.paginationModel['pageNumber'] = pageNumber;
            }
            this.sendCompleteParamsToserver();
      }


      setCompleteGridParams() {
            this.completeSortParam = Utils.object.asignObjTofirstOne({}, this.sortModel, this.filterModel, this.paginationModel);
            console.log(this.completeSortParam);
      }

      sendCompleteParamsToserver() {
            this.setCompleteGridParams();
      }




}


