import { NgModule } from '@angular/core';
import { AuthGuard } from './auth-guard';
import { RefGuard } from './ref-guard';
import { GuardService } from './guard.service';
import { LoginGuard } from './login-guard';

@NgModule({
      providers: [
            AuthGuard,
            RefGuard,
            GuardService,
            LoginGuard
      ]
})

export class GuardModule { }
