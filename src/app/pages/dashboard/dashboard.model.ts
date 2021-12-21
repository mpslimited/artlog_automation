import { BasicSearchModelI, BaseSearchModelI } from '../../core/base';

export class ArtLogModel implements BaseSearchModelI {
      
      apiDatakey = 'artLogData';
      // apiGridHeaderKay = '';
      jobkey:BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'jobkey',
            apiKey: 'jobkey',
            placeholder: ''
      };
      grade: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'grade',
            apiKey: 'grade',
            placeholder: ''
      };
      module: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'module',
            apiKey: 'module',
            placeholder: ''
      };
      batch: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'batch',
            apiKey: 'batch',
            placeholder: ''
      };
      workflow: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'workflow',
            apiKey: 'workflow',
            placeholder: ''
      };
      curricula: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'curricula',
            apiKey: 'curricula',
            placeholder: ''
      };
      status: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'status',
            apiKey: 'status',
            placeholder: ''
      };
      resTeam: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'resTeam',
            apiKey: 'resTeam',
            placeholder: ''
      };
      added: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'added',
            apiKey: 'added',
            placeholder: ''
      };
      fromPage: BasicSearchModelI = {
             value: '',
             defaultValue: 0,
             label: 'fromPage',
             apiKey: 'fromPage',
             placeholder: ''
       };
       toPage: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'toPage',
            apiKey: 'toPage',
            placeholder: ''
       };
       filters: BasicSearchModelI = {
            apiKey: 'filters', 
            value: '',
       };
      // ocDescrip: BasicSearchModelI = {
      //       value: '',
      //       defaultValue: null,
      //       label: 'ocDescrip',
      //       apiKey: 'ocDescrip',
      //       placeholder: ''
      // };
      // orderCode: BasicSearchModelI = {
      //       value: '',
      //       defaultValue: null,
      //       label: 'orderCode',
      //       apiKey: 'orderCode',
      //       placeholder: ''
      // };

      sortField: BasicSearchModelI = {
          value: '',
          defaultValue: '',
          label: 'sortField',
          apiKey: 'sortField',
          placeholder: ''
     };
     sortOrder: BasicSearchModelI = {
          value: '',
          defaultValue: 1,
          label: 'sortOrder',
          apiKey: 'sortOrder',
          placeholder: ''
     }; 
};
export class ArtLogAddModel implements BaseSearchModelI {
      
      apiDatakey = 'artLogData';
      // apiGridHeaderKay = '';
      jobkey:BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'jobkey',
            apiKey: 'jobkey',
            placeholder: ''
      };
      grade: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'grade',
            apiKey: 'grade',
            placeholder: ''
      };
      module: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'module',
            apiKey: 'module',
            placeholder: ''
      };
      sortField: BasicSearchModelI = {
          value: '',
          defaultValue: '',
          label: 'sortField',
          apiKey: 'sortField',
          placeholder: ''
     };
     sortOrder: BasicSearchModelI = {
          value: '',
          defaultValue: 1,
          label: 'sortOrder',
          apiKey: 'sortOrder',
          placeholder: ''
     }; 
}








export class FilterArtLogModel implements BaseSearchModelI {
      
      apiDatakey = 'artLogData';
      // apiGridHeaderKay = '';
      jobkey:BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'jobkey',
            apiKey: 'jobkey',
            placeholder: ''
      };
      grade: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'grade',
            apiKey: 'grade',
            placeholder: ''
      };
      module: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'module',
            apiKey: 'module',
            placeholder: ''
      };
      batch: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'batch',
            apiKey: 'batch',
            placeholder: ''
      };
      workflow: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'workflow',
            apiKey: 'workflow',
            placeholder: ''
      };
      curricula: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'curricula',
            apiKey: 'curricula',
            placeholder: ''
      };
      status: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'status',
            apiKey: 'status',
            placeholder: ''
      };
      resTeam: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'resTeam',
            apiKey: 'resTeam',
            placeholder: ''
      };
      added: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'added',
            apiKey: 'added',
            placeholder: ''
      };
      fromPage: BasicSearchModelI = {
             value: '',
             defaultValue: 0,
             label: 'fromPage',
             apiKey: 'fromPage',
             placeholder: ''
       };
       toPage: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'toPage',
            apiKey: 'toPage',
            placeholder: ''
       };
       filters: BasicSearchModelI = {
            apiKey: 'filters', 
            value: '',
       };

       flagedTeam: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'flagedTeam',
            apiKey: 'flagedTeam',
            placeholder: ''
       };

       mathAuditor: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'mathAuditor',
            apiKey: 'mathAuditor',
            placeholder: ''
       };


       name: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'name',
            apiKey: 'name',
            placeholder: ''
       };
       lessonlet: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'lessonlet',
            apiKey: 'lessonlet',
            placeholder: ''
       };
       tags: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'tags',
            apiKey: 'tags',
            placeholder: ''
       };
       comment: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'comment',
            apiKey: 'comment',
            placeholder: ''
       };
       description: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'description',
            apiKey: 'description',
            placeholder: ''
       };
       cstage: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'cstage',
            apiKey: 'cstage',
            placeholder: ''
       };
       creditLine: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'creditLine',
            apiKey: 'creditLine',
            placeholder: ''
       };
       mverification: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'mverification',
            apiKey: 'mverification',
            placeholder: ''
       };
       isPaging: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'isPaging',
            apiKey: 'isPaging',
            placeholder: ''
       };
       pageNo: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'pageNo',
            apiKey: 'pageNo',
            placeholder: ''
       };
       lesson: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'lesson',
            apiKey: 'lesson',
            placeholder: ''
       };

       component: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'component',
            apiKey: 'component',
            placeholder: ''
       };
       topic: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'topic',
            apiKey: 'topic',
            placeholder: ''
       };
       currentRTeam: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'currentRTeam',
            apiKey: 'currentRTeam',
            placeholder: ''
       };
       curriculum: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'curriculum',
            apiKey: 'curriculum',
            placeholder: ''
       };
       revisionC: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'revisionC',
            apiKey: 'revisionC',
            placeholder: ''
       };
       printAsset: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'printAsset',
            apiKey: 'printAsset',
            placeholder: ''
       };
       printReady: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'printReady',
            apiKey: 'printReady',
            placeholder: ''
       };
       artcomplex: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'artcomplex',
            apiKey: 'artcomplex',
            placeholder: ''
       };
       artassion: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'artassion',
            apiKey: 'artassion',
            placeholder: ''
       };
       impact: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'impact',
            apiKey: 'impact',
            placeholder: ''
       };
       risk: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'risk',
            apiKey: 'risk',
            placeholder: ''
       };
       facing: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'facing',
            apiKey: 'facing',
            placeholder: ''
       };
       series: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'series',
            apiKey: 'series',
            placeholder: ''
       };
       permissionType: BasicSearchModelI = {
            value: '',
            defaultValue: 50,
            label: 'permissionType',
            apiKey: 'permissionType',
            placeholder: ''
       }; 
       
       sortField: BasicSearchModelI = {
          value: '',
          defaultValue: '',
          label: 'sortField',
          apiKey: 'sortField',
          placeholder: ''
     };
     sortOrder: BasicSearchModelI = {
          value: '',
          defaultValue: 1,
          label: 'sortOrder',
          apiKey: 'sortOrder',
          placeholder: ''
     }; 
   
};





























      
      // { field: 'cstage', header: 'Current Stage' },
      // { field: 'job_active_stage.status', header: 'Completion Status' },
      // { field: 'currentRTeam', header: 'CR Team' },
      // { field: 'curriculum', header: 'Curriculum' },
      
      // { field: 'facing', header: 'P.Category' },
      // { field: 'series', header: 'Series' },
      // { field: 'creditLine', header: 'Credit Line' },
      // { field: 'comment', header: 'Comments' },
      // { field: 'tags', header: 'Tag Entry' },
      // { field: 'mverification', header: 'M. Verification' },
      // { field: 'isPaging', header: 'Paging Approved' },
      // { field: 'pageNo', header: 'Page No.' },
      // { field: 'revisionC', header: 'Revision Count' },
      // { field: 'printAsset', header: 'Print Asset' },
      // { field: 'printReady', header: 'Print Ready' },
      // { field: 'artcomplex', header: 'Art-Complexity' },
      // { field: 'artassion', header: 'Art-Assignment' },
      // { field: 'risk', header: 'Permission-Risk' },
      // { field: 'impact', header: 'Permission-Impact' },
      // { field: 'workflow', header: 'Workflow' },
      // { field: 'permissionType', header: 'Permission Type' },

    








