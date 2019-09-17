import { BasicSearchModelI } from '../../../core/base';

export class CustomerSearchModel {

      apiGridHeaderKay = 'searchresultByAddressTableHeaders';
      apiDatakey = 'searchresultByAddress';


      fName: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'fName',
            apiKey: 'fName',
            placeholder: 'First Name'
      };
      lName: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: ' lName',
            apiKey: 'lName',
            placeholder: 'Last Name',
            // name: 'from'
      };
      initial: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'initial',
            apiKey: 'initial',
            placeholder: 'Select Batch Template',
            // name: 'from'
      };
      customerId: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'customerId',
            apiKey: 'customerId',
            placeholder: '',
            //  name: 'to'
      };
      phoneNumber: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'phoneNumber',
            apiKey: 'phoneNumber',
            placeholder: '',
            //  name: 'to'
      };
      eMail: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'eMail',
            apiKey: 'eMail',
            placeholder: '',
            //  name: 'to'
      };
      companyName: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'Customer Service',
            apiKey: 'companyName',
            placeholder: '',
            //  name: 'to'
      };
      country: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'country',
            apiKey: 'country',
            placeholder: '',
            //  name: 'to'
      };
      postalCode: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'Customer Service',
            apiKey: 'postalCode',
            placeholder: '',
            //  name: 'to'
      };
      cheque: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'cheque',
            apiKey: 'cheque',
            placeholder: '',
            //  name: 'to'
      };
      orderNumber: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'orderNumber',
            apiKey: 'orderNumber',
            placeholder: '',
            //  name: 'to'
      };

      subscriptionNumber: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'subscriptionNumber',
            apiKey: 'subscriptionNumber',
            placeholder: '',
            //  name: 'to'
      };
      salesInvoice: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'salesInvoice',
            apiKey: 'salesInvoice',
            placeholder: '',
            //  name: 'to'
      };
      agentReference: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'agentReference',
            apiKey: 'agentReference',
            placeholder: '',
            //  name: 'to'
      };
      poNumber: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'poNumber',
            apiKey: 'poNumber',
            placeholder: '',
            //  name: 'to'
      };
      creditNote: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'creditNote',
            apiKey: 'creditNote',
            placeholder: '',
            //  name: 'to'
      };
      limit: BasicSearchModelI = {
            value: '',
            defaultValue: null,
            label: 'limit',
            apiKey: 'limit',
            placeholder: ''
      };

}
