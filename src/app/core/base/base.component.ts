import { OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { GridApi, ColumnApi, GridOptions, ColDef, Grid } from 'ag-grid';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { SessionObject, ProjectUtils, Utils } from '../shared';
import { BaseUtil, BaseGridUtil } from './base.util';
import { FormGroup, FormControl } from '@angular/forms';

export interface GridAPII {
      gridApi: GridApi;
      columnApi: ColumnApi;
}

export abstract class BaseComponent implements OnInit, OnDestroy, AfterViewInit {


      static GRIDPAGESIZE = 10;
      @ViewChild('baseForm') baseForm: FormGroup = null;


      gridOptions: GridOptions = {};
      gridApi: GridApi;
      columnApi: ColumnApi;

      jsonbody: any = {};
      @ViewChild('baseLoader') baseLoader: any;



      static get sessionObject(): SessionObject {
            return ProjectUtils.getSessionObject();
      }

      static changeLoaderState(loaders: any, state: boolean) {
            if (Array.isArray(loaders)) {
                  loaders.forEach((loader) => {
                        loader.show = state;
                  });
            }
      }

      constructor(
            protected baseService: BaseService,
            protected router: Router
      ) {
            this.initSearchModels();
      }

      isFormValid(name: string): boolean {

            let skipPhone = false;
            const form: FormGroup = this.getForm(name);
            if (form === undefined) {
                  return true;
            } else if (form.status === 'INVALID') {

                  const controls: Array<string> = Object.keys(form.controls);
                  controls.forEach((control) => {
                        if (form.controls[control].status === 'INVALID') {
                              if (control === 'phone1' || control === 'phone2') {
                                    skipPhone = true;
                              }
                              console.warn(control);
                        }
                  });
                  if (skipPhone === false) {
                        return false;
                  } else {
                        return true;
                  }

            } else if (form.status === 'VALID') {
                  return true;
            }
      }


      getForm(name: string): FormGroup {
            return this.baseForm;
            // throw new Error('Please provide form for ' + name);
      }


      ngOnInit() {
            this.xtBaseOnInit();
      }

      xtBaseOnInit() {
      }

      navigateTo(value) {
            this.router.navigate([value]);
      }

      ngAfterViewInit() {
            this.xtBaseAfterViewInit();
      }
      xtBaseAfterViewInit() {
      }


      initSearchModels() {
      }
      getSearchModel(name: string): any {
      return {};
      }
      setSearchModel(name: string) {
      }


      ngOnDestroy() {
            this.xtBaseOnDestroy();
      }
      xtBaseOnDestroy() {
      }

      setColumnDef(name: string): Array<ColDef> {
            return [];
      }

      doOnGridReady(name: string) {

            this.xtBaseDoOnGridReady(name);
            const gridAPIS = this.getGridApi(name);
            if (gridAPIS.gridApi) {
                  const gridApi = gridAPIS.gridApi;
                  //    gridApi.hideOverlay();
                  gridApi.setColumnDefs(this.setColumnDef(name));
                  gridApi.sizeColumnsToFit();
            }
      }
      xtBaseDoOnGridReady(name: string) {
      }



      OnSubmit(name: string, bindDataToGrid = true, ...otherGridNames: Array<string>) {

            if (this.isFormValid(name)) {

                  otherGridNames.forEach((otherName) => {

                        const gridAPIS = this.getGridApi(name);
                        if (gridAPIS.gridApi) {
                              const otherGridApi = gridAPIS.gridApi;
                              otherGridApi.paginationSetPageSize(BaseComponent.GRIDPAGESIZE);
                              // otherGridApi.showLoadingOverlay();
                        }
                  });

                  const gridAPIS = this.getGridApi(name);
                  if (gridAPIS.gridApi) {
                        const gridApi = gridAPIS.gridApi;
                        gridApi.paginationSetPageSize(BaseComponent.GRIDPAGESIZE);
                        //   gridApi.showLoadingOverlay();
                  }
                  this.setSearchModel(name);
                  this.loadDataFromApiNSetGrid(name, bindDataToGrid);
            }
      }



      OnSubmitNDontValidate(name: string, bindDataToGrid = true, ...otherGridNames: Array<string>) {

            otherGridNames.forEach((otherName) => {

                  const gridAPIS = this.getGridApi(name);
                  if (gridAPIS.gridApi) {
                        const otherGridApi = gridAPIS.gridApi;
                        otherGridApi.paginationSetPageSize(BaseComponent.GRIDPAGESIZE);
                        // otherGridApi.showLoadingOverlay();
                  }
            });

            const gridAPIS = this.getGridApi(name);
            if (gridAPIS.gridApi) {
                  const gridApi = gridAPIS.gridApi;
                  gridApi.paginationSetPageSize(BaseComponent.GRIDPAGESIZE);
                  //   gridApi.showLoadingOverlay();
            }
            this.setSearchModel(name);
            this.loadDataFromApiNSetGrid(name, bindDataToGrid);
      }


      getKeyName(name: string) {

      }

      loadDataFromApiNSetGrid(name: string, bindDataToGrid = false) {
            this.showLoader();
            const { url, params } = this.getQueryUrl(name);

            this.baseService.getDataFromAPI(url, params)
                  .subscribe((data) => {
                        this.xtBaseLoadDataFromApiProcessData(name, data);
                        if (bindDataToGrid) {
                              this.bindDataToGrid(name, data);
                        }
                        this.hideLoader();
                        //  this.autoSizeColumns(name);
                  }, (e) => {
                        this.hideLoader();
                  });
      }

      bindDataToGrid(name: string, data: Array<any>) {
            //debugger
            const searchModel = this.getSearchModel(name);
            const apiDataKey = searchModel['apiDatakey'];
            const apiGridHeaderKay = searchModel['apiGridHeaderKay'];

            const gridAPIS = this.getGridApi(name);
            if (gridAPIS.gridApi) {
                  const gridApi = gridAPIS.gridApi;

                  if (apiGridHeaderKay) {

                        if (!Utils.isEmpty(data[apiGridHeaderKay])) {
                              this.dynamicHeaderFromApi(data[apiGridHeaderKay], name);
                        }


                  }
                  ProjectUtils.grid.setGridRowData(gridApi, data[apiDataKey]);
            }
      }

      loadDataFromApi(name: string): Observable<any> {
            //debugger
            const { url, params } = this.getQueryUrl(name);
            return this.baseService.getDataFromAPI(url, params);
      }


      autoSizeColumns(name: string) {
            const gridAPIS = this.getGridApi(name);
            ProjectUtils.grid.autoSizeColumns(gridAPIS);
      }

      xtBaseLoadDataFromApiProcessData(name: string, data: any | Array<any>): any | Array<any> {
            return null;
      }

      getGridApi(name: string): GridAPII {
            return {
                  gridApi: this.gridApi,
                  columnApi: this.columnApi
            };
      }

      getServiceUrl(name: string): string {
            return null;
      }

      getValueFromSearchModel(name: string): any {
            const searchModel = this.getSearchModel(name) || {};
            return BaseUtil.getValueFromSearchModel(searchModel);
      }

      setValueFromSession(searchModel: any, sessionModel: any) {
            BaseUtil.setValueFromSession(searchModel, sessionModel);
      }

      getParamsBody(name: string) {
            const searchModel = this.getSearchModel(name) || {};
            const apiObj = BaseUtil.getApiObj(searchModel);
            const nonSearchParams = this.getNonSearchModelParams(name);
            return BaseUtil.getApiParams(apiObj, nonSearchParams);
      }

      getNonSearchModelParams(name?: string): any {
            return {};
      }

      getQueryUrl(name: string) {
            const url = this.getServiceUrl(name);
            const params = this.getParamsBody(name);
            return {
                  url: url,
                  params: params
            };
      }

      doOnTabChange(name: string) {
            this.xtBaseDoOnTabChange(name);
            this.autoSizeColumns(name);
      }

      xtBaseDoOnTabChange(name: string) {
      }


      hideLoader(...loaders: Array<| any>) {
            if (this.baseLoader) {
                  this.baseLoader.show = false;
            }

            BaseUtil.hideGlobalLoader();

            BaseComponent.changeLoaderState(loaders, false);
      }

      showLoader(...loaders: Array<any>) {
            if (this.baseLoader) {
                  this.baseLoader.show = true;
            }

            BaseUtil.showGlobalLoader();

            BaseComponent.changeLoaderState(loaders, true);
      }


      createDynamicColumns(obj: any, name: any) {
            const columns: Array<ColDef> = BaseGridUtil.createDynamicColumns(obj);
            this.setDynamicColumnDef(name, columns);
            this.autoSizeColumns(name);
      }

      addAdditionalHeaderToDynamicHeaders(name: string): Array<any> {
            return null;
      }

      dynamicHeaderFromApi(headers: Array<string>, name: string) {
            let columns = ProjectUtils.grid.dynamicColumnsFromObj(headers);
            const additionHeaders = this.addAdditionalHeaderToDynamicHeaders(name);
            if (additionHeaders) {
                  columns = additionHeaders.concat(columns);
            }
            this.setDynamicColumnDef(name, columns);
      }

      setDynamicColumnDef(name: string, cols: Array<ColDef>) {
            const gridAPIS = this.getGridApi(name);
            ProjectUtils.grid.setDynamicColumnDef(gridAPIS, cols);
      }








      getjson(filename) {
            return this.baseService.getjson(filename);
      }

      setParm(parm) {
            let tt = '';
            Object.entries(parm).forEach(function (key: any, index) {
                  if (key[1].value === null || key[1].value === undefined) {
                        key[1].value = '';
                  }
                  tt += key[0] + '=' + key[1].value + '&';
            });
            tt = tt.substring(0, tt.length - 1);
            return tt;
      }






}


