import { ColDef } from 'ag-grid';
import { ProjectUtils } from '../../../core/shared/utility';

export const columnDefsCustomerSearch: Array<ColDef> = [
      // {
      //       headerName: 'Select',
      //       field: '',
      //       //   minWidth: ProjectUtils.ag_SetWidth(15),
      //       cellRenderer: ProjectUtils.editSelectButton
      // },
      {
            headerName: 'customer Id',
            field: 'customer_id',
            // hide: true
      },
      {
            headerName: 'First Name',
            field: 'fname'
      },
      {
            headerName: 'Last Name',
            field: 'lname'
      },
      {
            headerName: 'Initial Name',
            field: 'initialName',
            hide: true
      },
      {
            headerName: 'Address1',
            field: 'address1',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            // hide: true
      },
      {
            headerName: 'Address3',
            field: 'address3',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            hide: true
      },

      {
            headerName: 'Address3',
            field: 'address2',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            hide: true
      },
      {
            headerName: 'City',
            field: 'city'
      }, {
            headerName: 'State',
            field: 'state'
      }, {
            headerName: 'country',
            field: 'county'
      }, {
            headerName: 'Phone#',
            field: 'phone'
      }, {
            headerName: 'TaxId Number',
            field: 'taxIdNumber'
      },
      {
            headerName: 'zip',
            field: 'zip'
      },
      {
            headerName: 'AuditCompanyId',
            field: 'auditCompanyId',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            hide: true
      }, {
            headerName: 'Audit County',
            field: 'auditCounty',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            hide: true
      },
      {
            headerName: 'Audit Name Change',
            field: 'auditNameChange',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            hide: true
      },


      {
            headerName: 'Audit Title Change',
            field: 'auditTitleChange',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            hide: true
      }, {
            headerName: 'Carrier',
            field: 'carrier',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            hide: true
      }, {
            headerName: 'Cass Date',
            field: 'cassDate',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            hide: true
      }, {
            headerName: 'Change Type',
            field: 'changeType',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            hide: true
      }, {
            headerName: 'Company',
            field: 'company',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            hide: true
      },


      {
            headerName: 'currency',
            field: 'currency',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            hide: true
      }, {
            headerName: 'cusCustomerAddressSeq2',
            field: 'cusCustomerAddressSeq2',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            hide: true
      }, {
            headerName: 'Company',
            field: 'company',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            hide: true
      }, {
            headerName: 'Cus CustomerId 2',
            field: 'cusCustomerId2',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            hide: true
      }, {
            headerName: 'Customer Address Seq',
            field: 'customerAddressSeq',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            // hide: true
      }, {
            headerName: 'Delivery Point',
            field: 'deliveryPoint',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            // hide: true
      },
      {
            headerName: 'Department',
            field: 'department',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            // hide: true
      },
      {
            headerName: 'Effective Date',
            field: 'effectiveDate',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            // hide: true
      },
      {
            headerName: 'dp Barcode',
            field: 'dpBarcode',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            // hide: true
      },
      {
            headerName: 'Eight Hundred',
            field: 'eighthundred',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            // hide: true
      },
      {
            headerName: 'Email',
            field: 'email',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            // hide: true
      },
      {
            headerName: 'Exchange Rate',
            field: 'exchangeRate',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            // hide: true
      },
      {
            headerName: 'Faxnbr',
            field: 'faxnbr',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            // hide: true
      }, {
            headerName: 'Ignored Clean',
            field: 'ignoredClean',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            // hide: true
      }, {
            headerName: 'Institutional Identifier',
            field: 'institutionalIdentifier',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            // hide: true
      }, {
            headerName: 'Lot Nbr',
            field: 'lotNbr',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            // hide: true
      }, {
            headerName: 'Mail Stop',
            field: 'mailstop',
            // minWidth: ProjectUtils.ag_SetWidth(20),
            // hide: true
      }, {
            headerName: 'Old Email',
            field: 'oldEmail'
      }, {
            headerName: 'Replace Customer Address Seq',
            field: 'replaceCustomerAddressSeq'
      }, {
            headerName: 'Reverse Date',
            field: 'reverseDate'
      }, {
            headerName: 'Row Version',
            field: 'rowVersion'
      }, {
            headerName: 'Salutation',
            field: 'salutation'
      },
      {
            headerName: 'Special Tax Id',
            field: 'specialTaxId'
      },
      {
            headerName: 'Suffix',
            field: 'suffix'
      },
      {
            headerName: 'Supp Clean',
            field: 'suppClean'
      },
      {
            headerName: 'Title',
            field: 'title'
      }
];

