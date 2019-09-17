import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { GridOptions, GridApi, ColumnApi, ColDef } from 'ag-grid';

import { Subject, Observable } from 'rxjs';
import { ProjectUtils } from '../../core/shared';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css']
})
export class AgGridComponent implements OnInit, OnChanges {


  @Input() searchModel;

  rowsToShowArray = [10, 25, 50, 100];

  count = 0;
  @Input() extraOption: any;
  @Input() context: any;
  @Input() frameworkComponents: any;
  @Input() getRowHeight: any;
  @Input() paging = true;
  @Input() export = true;


  @Input() name;
  @Input() myGridOptions: GridOptions = {};
  @Input() rowSelection: any;
  @Input() fileName: string;
  @Output() myGridReady: EventEmitter<any> = new EventEmitter();
  @Input() newSetup: Subject<any> = new Subject();


  showGrid: 'block' | 'none' = 'none';

  @Input() showHeader = true;
  @Input() showFooter = true;
  totalEntries: number = null;
  pageSize: number = null;

  gridApi: GridApi | any;
  columnApi: ColumnApi;
  totalPages: number = null;
  pagesArray: Array<number> = [];
  lastSelectedPageEle: any = null;
  lastSelectedPage = 0;
  headerHeight: any;
  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];
  constructor() {
    this.gridOptions = <GridOptions>{};
    this.headerHeight = 32;
  }

  ngOnChanges() {

    this.gridOptions = this.myGridOptions;
    this.gridOptions.rowHeight = 30;
    this.gridOptions.suppressDragLeaveHidesColumns = true;
  }
  ngOnInit() {
    console.log('extraOption>', this.extraOption);
    if (this.extraOption) {
      console.log('extraOption>', this.extraOption);
      this.showHeader = this.extraOption.showHeader;
      this.showFooter = this.extraOption.showFooter;
    }
    this.rowSelection = (this.rowSelection !== undefined) ? this.rowSelection : 'multiple';
    console.log('rowSelection', this.rowSelection);
  }


  onPageSizeChanged(newPageSize) {
    this.pageSize = Number(newPageSize);
    this.myGridOptions.api.paginationSetPageSize(Number(newPageSize));
    this.newSetup.next(this.gridApi.paginationGetTotalPages());
    this.autoAdjustLocal();
  }


  onGridReady(api) {

    this.gridApi = api.api;

    // this.gridApi.setColumnDefs(this.columnDefs);
    // this.gridApi.setRowData(this.rowData);
    //  this.gridApi.sizeColumnsToFit();
    this.columnApi = api.columnApi;
    this.myGridReady.emit(api);

    this.gridApi.paginationSetPageSize(10);
    this.onRowDataChanged(null);

  }

  onRowDataChanged(event) {

    // this.totalPages = 0;
    // this.totalPages = this.gridApi.paginationGetTotalPages();

    if (this.gridApi) {
      ++this.count;
      console.log(this.count, 'onRowDataChanged');
      if (this.gridApi['gridEmpty'] === true) {
        this.showGrid = 'none';
      } else {
        this.showGrid = 'block';
      }
      this.pageSize = this.gridApi.paginationGetPageSize() || this.gridOptions.paginationPageSize;
      // if (this.gridOptions.rowData) {
      this.totalEntries = this.gridApi.totalRowCount || (this.gridOptions.rowData && this.gridOptions.rowData.length) || 0;
      // }


      this.newSetup.next(this.gridApi.paginationGetTotalPages());
      // this.generatePages();
      console.log('onRowDataChanged', this.totalPages);

      const allColumnIds = [];
      this.columnApi.getAllColumns()
        .forEach(function (column: any) {
          allColumnIds.push(column.colId);
        });

      this.columnApi.autoSizeColumns(allColumnIds);
    }

  }
  onRowDataUpdated(event) {
    console.log('onRowDataUpdated');
  }

  onQuickFilterChanged($event) {
    this.gridApi.setQuickFilter($event.target.value);
    this.newSetup.next(this.gridApi.paginationGetTotalPages());
  }

  onBtExport() {
    const params: any = {
      skipHeader: false,
      skipFooters: true,
      skipGroups: true,
      fileName: this.fileName || 'export.csv'
    };
    this.gridApi.exportDataAsCsv(params);
  }


  onBtFirst() {
    this.gridApi.paginationGoToFirstPage();
  }

  onBtLast() {
    this.gridApi.paginationGoToLastPage();
  }

  onBtNext() {
    this.gridApi.paginationGoToNextPage();
  }

  onBtPrevious() {
    this.gridApi.paginationGoToPreviousPage();
  }

  onNthPage(num: number) {
    this.gridApi.paginationGoToPage(num);
  }


  onPageChanged(val: string | number) {
    switch (val) {
      case 'first': this.gridApi.paginationGoToFirstPage();
        break;
      case 'last': this.gridApi.paginationGoToLastPage();
        break;

      case 'next': this.gridApi.paginationGoToNextPage();
        break;

      case 'prev': this.gridApi.paginationGoToPreviousPage();
        break;

      default: this.gridApi.paginationGoToPage(<number>val - 1);
        break;
    }

    this.autoAdjustLocal();


  }


  onSortChanged(event) {
    this.autoAdjustLocal();
    console.log('onSortChanged', event);
  }



  onFilterChanged(api) {
    this.newSetup.next(this.gridApi.paginationGetTotalPages());
    this.autoAdjustLocal();
  }


  autoAdjustLocal() {

    ProjectUtils.grid.autoSizeColumns({
      gridApi: this.gridApi,
      columnApi: this.columnApi
    });

  }

  onModelUpdated(event) {
    console.log('onModelUpdated', event);
  }


}
