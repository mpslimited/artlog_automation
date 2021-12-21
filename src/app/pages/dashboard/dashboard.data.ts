import { ColDef } from 'ag-grid';
import { ProjectUtils } from '../../core/shared/utility';
import { HttpService } from '../../core/services/http.service';

export const columnDefsArtLogs: Array<ColDef> = [
      {
            headerName: 'Media ID',
            field: '',
            cellRenderer: ProjectUtils.selectsymb('orderlist'),
            pinned: 'left',
            
            suppressFilter: false,
            minWidth: ProjectUtils.ag_SetWidth(1),
           // hide: true
      }, {
            headerName: 'Job Key',
            field: 'job_key',
            cellRenderer: ProjectUtils.getJobKey("job_key"),
            minWidth: ProjectUtils.ag_SetWidth(3),
            pinned: 'left',
      },
      { 
            headerName: 'Lession',
            editable: true,
            field: 'lession',
            //cellRenderer: ProjectUtils.getLession('jobMetaproperties'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },{ 
            headerName: 'Component',
            field: 'component',
            editable: true,
            //cellRenderer: ProjectUtils.getComponents('jobMetaproperties'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },{ 
            headerName: 'Lession Letter',
            field: '',
            editable: true,
            //cellRenderer: ProjectUtils.chkboxCol('jobMetaproperties'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },{ 
            headerName: 'Description',
            editable: true,
            field: 'description',
            //cellRenderer: ProjectUtils.chkboxCol('jobMetaproperties'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },
      {
            headerName: 'Thumbnail',
            editable: true,
            field: 'Thumbnail',
            //cellRenderer: ProjectUtils.selectsymb('Thumbnail'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      }, {
            headerName: 'M Verification',
            field: '',
            //cellRenderer: ProjectUtils.createCheckBox('id'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },
      {
            headerName: 'Current Stage',
            field: 'Preset_Stages',
            cellRenderer: ProjectUtils.getStageName('Preset_Stages'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },
      {
            headerName: 'Cumulative Age',
            field: 'totalage',
            //cellRenderer: ProjectUtils.getStageName('Preset_Stages'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },
      {
            headerName: 'Last Age',
            field: 'lastage',
            //cellRenderer: ProjectUtils.getStageName('Preset_Stages'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },
      {
            headerName: 'Comments',
            field: '',
            //cellRenderer: ProjectUtils.getStageName('Preset_Stages'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },
      {
            headerName: 'Tag Entry',
            field: 'tags',
            //cellRenderer: ProjectUtils.getStageName('Preset_Stages'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },
      {
            headerName: 'Art Complexity',
            field: 'artcomplex',
            // cellRenderer: "genderCellRenderer",
            // cellEditor: "agRichSelectCellEditor",
            // cellEditorParams: {
            // values: ["Male", "Female"],
            // cellRenderer: "genderCellRenderer"
            // },
            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
                  values: ["simple","High", "Low","etc"]
                },
                editable: true,
            //cellRenderer: ProjectUtils.getArtComplexity('jobMetaproperties'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },{
            headerName: 'Art Assignment',
            field: 'artassion',
            //cellRenderer: ProjectUtils.getArtAssignment('jobMetaproperties'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },{
            headerName: 'Revision Count',
            field: '',
            //cellRenderer: ProjectUtils.getStageName('Preset_Stages'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },{
            headerName: 'Print Quality',
            field: '',
            //cellRenderer: ProjectUtils.getStageName('Preset_Stages'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },{
            headerName: 'Print Quality2',
            field: '',
            //cellRenderer: ProjectUtils.getStageName('Preset_Stages'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },
      //Permission Impact
      {
            headerName: 'Permission Risk',
            field: 'risk',
           // cellRenderer: ProjectUtils.getStageName('Preset_Stages'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },
      {
            headerName: 'Permission Impact',
            field: 'impact',
           // cellRenderer: ProjectUtils.getStageName('Preset_Stages'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },{
            headerName: 'Source',
            field: '',
            //cellRenderer: ProjectUtils.getStageName('Preset_Stages'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },{
            headerName: 'Credit Line',
            field: '',
            //cellRenderer: ProjectUtils.getStageName('Preset_Stages'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },{
            headerName: 'Page No',
            field: '',
            //cellRenderer: ProjectUtils.getStageName('Preset_Stages'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },{
            headerName: 'Grade',
            field: 'grade',
            //cellRenderer: ProjectUtils.getGrades('jobMetaproperties'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },{
            headerName: 'Module',
            field: 'module',
            //cellRenderer: ProjectUtils.getModules('jobMetaproperties'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },{
            headerName: 'Batch',
            field: 'batch',
            //cellRenderer: ProjectUtils.getArtAssignment('jobMetaproperties'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      },{
            headerName: 'Workflow Category',
            field: 'Preset_Stages',
            cellRenderer: ProjectUtils.getStageName('Preset_Stages'),
            minWidth: ProjectUtils.ag_SetWidth(3)
      }
      
      
      //Current Stage
      //, {
      //       headerName: 'Current Stage',
      //       field: 'service_exist',
      //       cellRenderer: ProjectUtils.chkboxCol('service_exist'),
      //       minWidth: ProjectUtils.ag_SetWidth(3)
           
      // }, {
      //       headerName: 'Job Age',
      //       field: 'group_order',
      //       cellRenderer: ProjectUtils.chkboxCol('group_order'),
      //       minWidth: ProjectUtils.ag_SetWidth(3),
           
      // }, {
      //       headerName: 'Last Age',
      //       field: 'attach_exist',
      //       cellRenderer: ProjectUtils.chkboxCol('attach_exist'),
      //       minWidth: ProjectUtils.ag_SetWidth(3),
            

      // }
      // , {
      //       headerName: 'Order Id',
      //       field: 'orderId',
      //       pinned: 'left'
      // },
      // {
      //       headerName: 'Renewal Order Id',
      //       field: 'renewalOrderId',


      // }, {
      //       headerName: 'Line',
      //       field: 'line',

      //       //  cellRenderer: ProjectUtils.svgZip
      // }, {
      //       headerName: 'Start Date',
      //       field: 'startDate',


      // }, {
      //       headerName: 'Expire Date',
      //       field: 'expireDate',


      // }, {
      //       headerName: 'Start Issue',
      //       field: 'startIssue',


      // }, {
      //       headerName: 'Stop Issue',
      //       field: 'stopIssue',


      // }, {
      //       headerName: 'Order Date',
      //       field: 'date',
      //       //   minWidth: ProjectUtils.ag_SetWidth(20)
      // }, {
      //       headerName: 'Order Class',
      //       field: 'orderClass',
      //       // minWidth: ProjectUtils.ag_SetWidth(20)
      // }, {
      //       headerName: 'Order Code',
      //       field: 'orderCode',
      //       // minWidth: ProjectUtils.ag_SetWidth(20)
      // }, {
      //       headerName: 'Order Status',
      //       field: 'orderStatus',

      //       //  cellRenderer: ProjectUtils.svgCsv
      // }, {
      //       headerName: 'Cancel Reason',
      //       field: 'cancelReason',

      //       //  cellRenderer: ProjectUtils.svgCsv
      // }, {
      //       headerName: 'Pay Status',
      //       field: 'payStatus',

      //       //   cellRenderer: ProjectUtils.svgExcel
      // }, {
      //       headerName: 'Qty',
      //       field: 'qty',

      //       //  cellRenderer: ProjectUtils.svgZip
      // }, {
      //       headerName: 'Liability',
      //       field: 'liabilty',

      //       //  cellRenderer: ProjectUtils.svgZip
      // }, {
      //       headerName: 'Subscription Id',
      //       field: 'subscripId',

      //       //   cellRenderer: ProjectUtils.svgExcel
      // }, {
      //       headerName: 'Charged',
      //       field: 'charged',

      //       //  cellRenderer: ProjectUtils.svgZip
      // }, {
      //       headerName: 'Bundle QTY',
      //       field: 'bundleQTY',

      //       //   cellRenderer: ProjectUtils.svgExcel
      // }, {
      //       headerName: 'Agency',
      //       field: 'agency',

      //       //  cellRenderer: ProjectUtils.svgZip
      // }, {
      //       headerName: 'Prof',
      //       field: 'prof',

      //       //  cellRenderer: ProjectUtils.svgZip
      // }, {
      //       headerName: 'Bill Type',
      //       field: 'billType',

      //       //  cellRenderer: ProjectUtils.svgZip
      // }, {
      //       headerName: 'Order Item Type',
      //       field: 'orderItemType',

      //       // hide: true
      // }
];















