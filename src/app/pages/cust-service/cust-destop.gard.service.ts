import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SessionObject } from '../../core/shared/session-object';
@Injectable()
export class CustomerGuard implements CanActivate {

      effectivearraydata: Array<any> = [];

      constructor(

            protected router: Router,

      ) { }

      canActivate(): Promise<boolean> {
            return new Promise((resolve, reject) => {
                  const refID: SessionObject = SessionObject.getRefID();
                  if (this.checkSessionObject(refID)) {
                        resolve(true);
                  } else {
                        this.router.navigate(['/pages/customer']);
                        resolve(false);
                  }




            });
      }
      checkSessionObject(sessionObject: any) {
            if ((null !== sessionObject)
                  && (sessionObject.documentReferenceDialogue !== undefined)
                  && (sessionObject.documentReferenceDialogue !== '0')
            ) {
                  return true;
            } else {
                  return false;
            }


      }
      checkSessionObject2(sessionObject: any) {
            if ((null !== sessionObject)
                  && (sessionObject.documentReferenceDialogue !== undefined)
                  && (sessionObject.documentReferenceDialogue !== '0')
            ) {
                  return true;
            } else {
                  return false;
            }
      }

}
