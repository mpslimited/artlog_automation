import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SessionObject } from '../../core/shared/session-object';
@Injectable()
export class DocucmentRefGuard implements CanActivate {

      constructor(

            protected router: Router,

      ) { }

      canActivate(): Promise<boolean> {
            return new Promise((resolve, reject) => {
                  const refID: SessionObject = SessionObject.getRefID();

                  if (this.checkSessionObject(refID)) {
                        if (this.checkSessionObject2(refID)) {
                              resolve(true);
                        } else {
                              resolve(false);
                        }
                  } else {
                        resolve(true);
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
