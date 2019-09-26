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
      // limitToOc: BasicSearchModelI = {
      //       value: '',
      //       defaultValue: null,
      //       label: 'limitToOc',
      //       apiKey: 'limitToOc',
      //       placeholder: ''
      // };
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
}

