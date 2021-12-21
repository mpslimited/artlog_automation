import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { routing } from './login.routing';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
//import { ProcessModule } from '../process/process.module';
import { ComponentModule } from '../../component/component.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ComponentModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService
  ],
  exports: [
    FormsModule
  ]
})
export class LoginModule { }
