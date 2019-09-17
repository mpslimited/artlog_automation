import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { BaseService } from '../../../core/base/index';
import { Observable } from 'rxjs';
@Injectable()

export class CustomerSearchService extends BaseService {
      constructor(
            protected httpService: HttpService
      ) {
            super(httpService);
      }
      getData(api): Observable<any> {
            return this.getDataFromAPI(api, '');
      }
      loadJson(api): Observable<any> {
            return this.getjson(api);
      }

}





