import { UrlBase } from './url.base';

export class CustomerServicesUrls extends UrlBase {
      public static ARTLOGAUTOMATION_URL="http://localhost:3000/";
      //public static ARTLOGAUTOMATION_URL = "https://gmartlogautomationdemo.mpstechnologies.com/";
      //public static ARTLOGAUTOMATION_URL = "https://gmartlogautomation.mpstechnologies.com/";
      public static SMARTSHEET_LOGIN = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/login";
      public static SMARTSHEET_LOGOUT = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/logout";
      public static ARTLOG_INIT = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/artloginit/";
      public static ARTLOG_DATA = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/artlogdata/";
      
      //setDefaultSearch
      public static ARTLOG_JOBADD = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/addnewjobs/";
      public static ARTLOG_UPDATEJOBS = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/updateJob/";
      public static ARTLOG_REDDRUSERINFO = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/getUserInfo/";
      public static ARTLOG_SEARCHSAVE = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/searchState/";
      public static ARTLOG_GRIDSTATESAVE = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/gridStage/";
      public static ARTLOG_GRIDSTATECLEAR = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/cleargridStage/";
      
      public static ARTLOG_DELETE_SEARCHSAVE = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/dellSearchState/";
      public static ARTLOG_SETDEFAULT_SEARCH = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/setDefaultSearch/";

      public static ARTLOG_BULKBATCH = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/updateBulkBatch/";
      public static ARTLOG_BULKTAGS  = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/updateBulkTags/";

      public static JOBSMETA_DATA = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/jobsMetadata/";
      public static UPDATEASSETTAGS = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/updateAsset/";
      
      public static USERINFO_DATA = "https://mpstrakdemo.mpstechnologies.com/mpstrak/production/taskTrakingReport";
      public static JOBSMETA_DATA1 = CustomerServicesUrls.ARTLOGAUTOMATION_URL + "api/artlogdata/";



      public static TK_CUSTOMER_BASE_URL = 'https://democswebservices.mps-think.com/';


      public static TK_CUSTOMER_LOGIN = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'login';

      public static TK_CUSTOMER_ORDER = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/order';

      public static TK_CUSTOMER_ADD_ORDER_SEARCH =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/subscriptionDefDetails';
      public static TK_CUSTOMER_REFERENCE_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'dashboardcsr';

      public static TK_CUSTOMER_REFERENCE_SEARCH_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'searchDocumentReferenceList';
      public static TK_CUSTOMER_AXUILIARY_ADD_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerAuxiliaryAdd';
      public static TK_CUSTOMER_AXUILIARY_ADD_SUBMIT = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerAuxiliaryAddSubmit';

      public static TK_CUSTOMER_REFERENCE_ADD_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + '/addDocumentReference';

      public static TK_CUSTOMER_REFERENCE_DESCRIPTIONS_COUNT = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'getDescriptionCount';

      public static TK_CUSTOMER_ADD_CUSTOMER_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerAdd';

      public static TK_CUSTOMER_GET_COUNTRY_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'getCountry';
      public static TK_CUSTOMER_ADDRESS_ADD_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerAddressAdd';
      public static TK_CUSTOMER_ADDRESS_ADD_SUBMIT_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerAddressAddSubmit';

      public static TK_CUSTOMER_ADDRESS_Edit_SUBMIT_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerAddressEditSubmit';

      public static TK_CUST_CHK_LOGIN_AVAILABILITY = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'checkLogin';

      public static TK_CUSTOMER_ADDRESS_Edit_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerAddressEdit';

      public static TK_CUSTOMER_SEND_ADD_CUSTOMER_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerAddSubmit';

      public static TK_CUSTOMER_EDIT_EXITING_CUSTOMER = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerEdit';

      public static TK_CUSTOMER_LOGIN_AUTH_DETAILS = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerLoginDetails';

      public static TK_CUST_IP_ADDRESS_DETAILS = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'ipAddressDetails';

      public static TK_DELETE_CUSTOMER_LOGIN = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'deleteCustomerLogin';

      public static TK_TRANSFER_CUSTOMER_LOGIN = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'transferCustomerLogin';

      public static TK_ADD_EDIT_IP_ADDRESS = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'addIpAddress';

      public static TK_ADD_CUST_AUTH_LOGIN = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'addCustomerLogin';

      public static TK_CUSTOMER_EDIT_SUBMIT_CUSTOMER = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerEditSubmit';

      public static TK_CUSTOMER_CHECK_DUPLICTE_CUSTOMER = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'checkDuplicateCustomer';

      public static TK_CUSTOMER_SEARCH_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerSearch';

      public static TK_CUSTOMER_REFERENCE_EDIT_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'editDocumentReference';

      public static TK_CANCEL_PAYMENT_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'cancelPayment';

      public static TK_ATTACHMENT_LIST_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerAttachment';

      // public static TK_ORDER_CODE_LOOKUP_SEARCH = CustomerServicesUrls.TK_CUSTOMER_BASE_URL+'order/orderCode';
      public static TK_EDIT_HEADER_INFO =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'selectEditOrderHeader';
      public static TK_ORDER_CODE_LOOKUP_SEARCH = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/orderCode';
      public static TK_ORDER_CLASS_LOOKUP_SEARCH = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/orderClassLookUp';
      public static TK_SOURCE_CODE_LOOKUP_SEARCH = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'order/sourceCode';

      public static TK_ORDER_IN_PROGRESS = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/orderProgress';
      public static TK_SAVE_ORDER =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/addOrder';
      public static TK_EDIT_ORDER = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/customerOrdersEdit';
      public static TK_CUSTOMER_LIST = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/customerDetail';
      public static TK_CUSTOMER_ADDRESS = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/customerAddress';

      public static TK_AGENCY_SEARCH = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'agenciesSearch';
      public static TK_AGENCY_LIST = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'agencies';
      public static TK_AGENCY_EDIT = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'editAgency';
      public static TK_ADD_AGENCY_GET = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'addAgency';
      public static TK_ADD_AGENCY = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'addAgencySubmit';

      public static TK_AGENCY_CHANGE = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/onAgencyChange';

      public static TK_RATE_CARD_CHANGE = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/onRateCardChange';

      public static TK_ORDER_CODE_LOOKUP_DROPDOWN = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/searchByOrderClass';

      public static TK_ORDER_UPDATE = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/orderUpdate';

      // payments url
      public static TK_PAYMENTS_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'Payments';
      public static TK_PAYMENTS_DROPDOWN_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'paymentFilterDropDown';

      public static TK_EDIT_PAYMENTS_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'EditPayment';
      public static TK_EDIT_PAYMENTS_SAVE_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'UpdatePayment';

      public static TK_MAKE_PAYMENTS_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'MakePayment';
      public static TK_MAKE_PAYMENTS_TABLE_FILTER_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'orderFIlterDropDownResult';
      public static TK_MAKE_PAYMENTS_SAVE_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'MakePaymentSave';
      public static TK_ORDER_LOOK_UP_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'orderlookup';
      public static TK_PAYMENT_THRESHOLD_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'ThresholdData';
      public static TK_PAYMENT_THRESHOLD_SETTINGS_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'thresholdSettingOptions';
      public static TK_DEPOSIT_PAYMENTS_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'DepositPaymentSave';
      public static TK_PAYMENT_BREAKDOWN_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'paymentBreakdown';
      public static TK_PAYMENTS_TRANSFER_URL = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'paymentTransfer';
      public static TK_PAYMENTS_DEPOSIT_SUMMARY_URL = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'depositeSummary';
      public static TK_PAYMENT_REFUND_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'depositRefundPayment';

      public static TK_GET_DEPOSIT_BALANCE = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'getDepositAmount';

      // Deposit Details For payment Table Data

      public static TK_GET_DEPOSIT_DETAILS_FOR_PAYMENT_TABLE_DATA =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'getOrderItemsFromDepositPay';

      // Pay From Deposit Save
      public static TK_GET_DEPOSIT_SAVE_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'payFromDepositAccountSave';

      // payment Accounts
      public static TK_PAYMENT_ACCOUNT_DETAILS_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'paymentAccountList';
      public static TK_PAYMENT_ADD_ACCOUNT_DETAILS_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'addAccountDetail';
      public static TK_PAYMENT_DEBIT_ACCOUNT_SAVE_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'savePaymentAccount';
      public static TK_PAYMENT_CREDIT_GET_ADDRESS_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'getAddressList';
      // Payment Review

      public static TK_PAYMENT_REVIEW_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'reviewPayments';

      // customer History
      public static TK_CUSTOMER_HISTORY_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerHistory';
      public static TK_CUSTOMER_ADDRESS_HISTORY_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'addressHistory';
      // NOTES API
      public static TK_NOTE_EXIST_DATA_URL = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'checkNoteExist';
      public static TK_CUSTOMER_NOTE_URL = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerNoteFilter';
      public static TK_CUSTOMER_NOTE_DROPDOWN_URL =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerNote';

      public static TK_NOTES_EDIT_SAVE_URL = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'editNote';
      public static TK_NOTES_ADD_GET_DATA_URL = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'addNote';
      public static TK_NOTES_ADD_SAVE_URL = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'addNoteSubmit';
      public static TK_NOTES_DELETE_NOTE_URL = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'deleteNote';

      public static TK_ORDER_DROPDOWN = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/viewOrderType';


      public static TK_SUBS_DEF_CHANGE = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/onSubscriptionChange';
      public static TK_PARTIAL_PAYMENT = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'partialPaymentDetails';

      public static TK_CHECK_DUPLICATE_ORDER = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/checkDuplicateOrder';
      public static TK_CHECK_RENEW_ORDER =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/getRenewalOrder';
      public static TK_DEL_CUSTOMER_TEMP_ADD =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerDeleteAddress';

      public static TK_GET_COUNTRY_LIST = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'getStateList';
      public static TK_SHOW_ALL_DOC_REF = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'showAllDocumentReferenceList';




      public static TK_CUSTOMER_ERROR_LOG = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'sendMail';

      public static TK_CUSTOMER_CANCEL_ORDER_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + '/cancelOrderDetail';
      public static TK_CUSTOMER_CANCEL_ORDER = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + '/cancelOrder';
      public static TK_CANCEL_ORDER_DETAILS = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + '/cancelOrderDetailInEntireSub';
      public static TK_CUSTOMER_AUTOSUGGEST = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'searchCustomerBillToAddress';

      public static TK_CUSTOMER_ORDER_QUANTITY_CHANGE = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + '/customerOrder/noOfIssueChange';

      public static TK_CUSTOMER_ORDER_EXPIRY_DATE_CHANGE = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + '/customerOrder/expireDateCalculate';

      public static TK_ORDER_ISSUE_NO_OF_COPY_CHANGE =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + '/customerOrder/bundleQuantityChangeOption';
      public static TK_CUSTOMER_DOC_REF_VIEW_DETAILS = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'getDocumentReferenceDetail';

      public static TK_ORDER_DATEBASE_NO_OF_COPY_CHANGE =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + '/customerOrder/noOfCopiesforDateOption';

      public static TK_ORDER_QUANTITY_CHANGE =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + '/customerOrder/optionBundleQuantityChange';

      public static TK_CUSTOMER_VIEW_EDIT_TRAILS = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'getEditTrialOnDocumentReference';

      public static TK_CUSTOMER_ADD_ATTACHMENT = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'addAttachment';

      public static TK_CUSTOMER_ADD_ATTACHMENT_SUBMIT = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'addAttachmentSubmit';

      public static TK_ATTACHMENT_TABLE_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerAttachmentFilter';

      public static TK_DELETE_ATTACHMENT = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'deleteAttachment';

      public static TK_VIEW_ATTACHMENT = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'viewAttachment';

      public static TK_NAME_EDIT_DATA_ATTACHMENT = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'editAttachment';

      public static TK_NAME_CLEAR_ADDRESS_INFO = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'clearAddressInfo';

      public static TK_PAYMENTS_GET_ADDRESS_URL = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'getPayerCustomerAddress';
      public static TK_NAME_COMPLAINT_SERVICE = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'order/orderComplaintData';

      public static TK_ORDER_AUX_FIELD = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/orderAuxiliaryAdd';

      public static TK_NAME_COMPLAINT_SERVICE_TABLE_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'order/serviceData';

      public static TK_NAME_SERVICE_FILTER_DROPDOWN_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'order/serviceDetails';

      public static TK_NAME_SERVICE_ROW_COUNT_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'order/rowCountValue';

      public static TK_NAME_SERVICE_UPDATE_DATA_SAVE = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'order/updateService';

      public static TK_ORDER_AUXILIARY_ADD_SUBMIT = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/orderAuxiliaryAddSubmit';

      public static TK_NAME_COMPLAINT_DATA_SUBMIT = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'order/serviceSave';

      public static TK_PKG_DEF_CHANGE = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/onPkgDefChange';

      public static TK_NAME_SERVICE_UPDATE_DATA = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'order/showDisplayForUpdate';

      public static TK_CUSTOMER_BACK_ISSUE_ORDERS = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/backIssues';

      public static TK_ON_SOURCE_CODE_CHANGE = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/onSourceCodeChange';

      public static TK_SAVE_ORDER_QUANTITY_CHANGE =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/saveOrderQuantityChangeOption';

      public static TK_GET_EXPIRY_DATE_ON_CHANGE =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/onDateChange';
      public static TK_EDIT_HEADER_INFO_SAVE =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'updateEditOrderHeader';

      public static TK_SUPPLEMENT_REFUND =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'supplementalRefund';

      public static TK_ORDER_HISTORY =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerOrder/orderHistory';

      public static TK_SERVICE_HISTORY =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'order/serviceHistory';

      public static TK_PAYMENT_HISTORY =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'paymentHistory';

      // *********** Temporary Suspension ************
      public static TK_TEMP_SUSPENSION_TABLE_DATA =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'selectTemporarySuspension';

      public static TK_ADD_TEMP_SUSPENSION =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'selectAddTempSuspension';

      public static TK_TEMP_SUSPENSION_SAVE =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'saveAddTempSuspension';

      // *********** END Temporary Suspension ************

      public static TK_SERVICE_AUXILLIARY_DATA =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'serviceAuxiliary';

      public static TK_SERVICE_AUXILLIARY_DATA_SAVE =
            CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'serviceAuxiliarySubmit';

      public static TK_SERVICE_TEMPLATE_CHECKBOX = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'order/serviceComplaintButton';

      public static TK_PAYMENT_AUXILIARY = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'paymentAuxiliary';

      public static TK_PAYMENT_AUXILIARY_SAVE = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'paymentAuxiliarySubmit';

      public static TK_CUST_ADDR_AUXILIARY = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerAddressAuxiliary';

      public static TK_CUST_ADDR_AUXILIARY_SAVE = CustomerServicesUrls.TK_CUSTOMER_BASE_URL + 'customerAddressAuxiliarySubmit';
}