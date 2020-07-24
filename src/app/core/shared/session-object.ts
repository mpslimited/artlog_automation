// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';


export interface UserDetailsI {
    Token: string;
    userInfo: string;
    name: string;
    roleName: string;
    userGroupName: string;
}

export class SessionObject {
    status: any;

    public static getSessionObject(): SessionObject {
        return JSON.parse(localStorage.getItem('sessionObject'));
    }

    public static setSessionObject(sessionObject: SessionObject) {
        localStorage.setItem('sessionObject', JSON.stringify(sessionObject));
    }

    public static setRefObject(sessionObject: SessionObject) {
        localStorage.setItem('setRefObject', JSON.stringify(sessionObject));
    }

    public static getRefObject(): SessionObject {
        return JSON.parse(localStorage.getItem('setRefObject'));
    }

    public static setUserDetails(userDetail: UserDetailsI) {
        localStorage.setItem('UserDetails', JSON.stringify(userDetail));
    }

    public static getUserDetails(): UserDetailsI {
        return JSON.parse(localStorage.getItem('UserDetails'));
    }

    public static removeUserDetails() {
        localStorage.removeItem('UserDetails');
    }

    public static setJobKey(sessionObject: any) {
        localStorage.setItem('JobKey', JSON.stringify(sessionObject));
    }

    public static getJobKey(): any {
        return JSON.parse(localStorage.getItem('JobKey'));
    }
    public static setRefID(sessionObject: any) {
        localStorage.setItem('RefID', JSON.stringify(sessionObject));
    }

    public static getRefID(): any {
        return JSON.parse(localStorage.getItem('RefID'));
    }

    public static removeSessionObject() {
        localStorage.removeItem('sessionObject');
    }

    public static setCustomerID(sessionObject: any) {
        localStorage.setItem('customerId', JSON.stringify(sessionObject));
    }
    public static getCustomerID(): any {
        const retVal = JSON.parse(localStorage.getItem('customerId'));
        return retVal;
    }

    public static removeCustomerID() {
        localStorage.removeItem('customerId');
    }


    public static setAddressStatus(sessionObject: any) {
        localStorage.setItem('AddStatus', JSON.stringify(sessionObject));
    }

    public static getAddressStatus(): any {
        return JSON.parse(localStorage.getItem('AddStatus'));
    }

    public static getopenTab(): any {
        return JSON.parse(localStorage.getItem('openTab'));
    }
    public static setOpenTab(sessionObject: any) {
        localStorage.setItem('openTab', JSON.stringify(sessionObject));
    }

    public static getEditPaymentData(): any {
        return JSON.parse(localStorage.getItem('editData'));
    }
    public static setEditPaymentData(sessionObject: any) {
        localStorage.setItem('editData', JSON.stringify(sessionObject));
    }

    public static removeOpenTab() {
        localStorage.removeItem('openTab');
    }

    public static setOCID(ocid: any) {
        localStorage.setItem('OCId', JSON.stringify(ocid));
    }

    public static getOCID(): any {
        return JSON.parse(localStorage.getItem('OCId'));
    }

    public static removeOCID() {
        localStorage.removeItem('OCId');
    }

    public static setOcType(ocType: any) {
        localStorage.setItem('ocType', JSON.stringify(ocType));
    }

    public static getOcType(): any {

        const retVal = JSON.parse(localStorage.getItem('ocType'));
        return retVal;
    }

}
