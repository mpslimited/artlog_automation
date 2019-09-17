// import { CanActivate, Router } from '@angular/router';
// import { Injectable } from '@angular/core';
// import { SessionObject } from '../../core/shared/session-object';
// import { TimeOutService } from '../../core/services/timeOut.service';

// @Injectable()
// export class LoginGuard implements CanActivate {

//       constructor(
//             protected timeOutService: TimeOutService,
//             protected router: Router,

//       ) { }

//       canActivate(): Promise<boolean> {
//             return new Promise((resolve, reject) => {
//                   console.log('LoginGuard>canActivate>sessionObject');
//                   const sessionObject: SessionObject = SessionObject.getSessionObject();
//                   console.log('LoginGuard>canActivate>sessionObject', sessionObject);
//                   if (this.checkSessionObject(sessionObject)) {
//                         console.log('LoginGuard1');
//                         this.timeOutService.isTimeOutSilent()
//                               .then(() => {
//                                     console.log('isTimeOut true');
//                                     resolve(true);
//                               })
//                               .catch(() => {
//                                     console.log('isTimeOut false');
//                                     console.log('I am routing to Dashboard');
//                                     //const defaultPath = this.myClientServices.loginUrl + '/pages/';
//                                     const defaultPath = '/pages/process';
//                                     this.router.navigate(['/' + defaultPath])
//                                           .then((e) => {
//                                                 console.log('then', e);
//                                           }, (e) => {
//                                                 console.log('then catch', e);
//                                                 reject(false);
//                                           })
//                                           .catch((e) => {
//                                                 console.log('catch, e');
//                                           });

//                                     console.log('resolve false');
//                                     resolve(false);
//                               });

//                   } else {
//                         this.router.navigate(['']);
//                         resolve(false);
//                   }

//             });
//       }
//       checkSessionObject(sessionObject: any) {
//             if ((null !== sessionObject)
//                   && (sessionObject.status !== undefined)) {
//                   return true;
//             } else {
//                   return false;
//             }


//       }

// }
