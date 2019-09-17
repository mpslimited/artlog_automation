import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, CanActivateChild } from '@angular/router';
import { GuardService } from '../guard.service';


@Injectable()

export class RefGuard implements CanActivate, CanLoad, CanActivateChild {

      constructor(
            private grdSer: GuardService
      ) { }

      canActivate(): Promise<boolean> {
            return this.checkMyRoute();
      }

      canLoad(): Promise<boolean> {
            return this.checkMyRoute();
      }

      canActivateChild(): Promise<boolean> {
            return this.checkMyRoute();
      }

      checkMyRoute(): Promise<boolean> {
            return new Promise((resolve, reject) => {
                  if (this.grdSer.isRefIdAvaible()) {
                        resolve(true);
                  } else {
                        resolve(false);
                  }
            });
      }
}


