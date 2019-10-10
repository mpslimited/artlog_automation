import { HttpHeaders, HttpParams } from '@angular/common/http';
export class HeaderOpt {
    tokenData: any ;
    httpOptions: any ;
    constructor() {
        this.tokenData = JSON.parse(localStorage.UserDetails);
        this.httpOptions = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        if(!this.hasTokendata()){
            let tokenDt = this.getTokenData();
            debugger
        }

    }
    hasTokendata(){
        return !this.tokenData;
    }
    getTokenData(){
        return JSON.parse(this.tokenData);
    }
    
    
   //  httpOptions.set('Authorization', tokenId);
}
      