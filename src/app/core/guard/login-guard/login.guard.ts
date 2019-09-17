import { Injectable } from '@angular/core';
import { GuardService } from '../guard.service';
import { CanActivate, Router, CanActivateChild, CanLoad } from '@angular/router';


@Injectable()
export class LoginGuard implements CanActivate, CanLoad {

      constructor(
            private grdSer: GuardService
      ) { }

      canActivate(): Promise<boolean> {
            return this.checkRoute();
      }

      canLoad(): Promise<boolean> {
            return this.checkRoute();
      }

      private checkRoute(): Promise<boolean> {
            return new Promise((resolve, reject) => {
                  if (this.grdSer.isTokenAvaible()) {
                        this.grdSer.navigateFromLogin();
                        resolve(false);
                  } else {
                        resolve(true);
                  }
            });
      }
}
