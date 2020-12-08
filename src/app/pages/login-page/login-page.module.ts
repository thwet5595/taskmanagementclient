import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgxLoadingModule } from 'ngx-loading';
import { LoginPageComponent } from './login-page.component';
import { SharedModule } from 'src/app/common/modules/shared.module';
import { LoginPageService } from './login-page.service';

const routes = [
  {
    path: 'login',
    component: LoginPageComponent
  }
];

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    LoginPageService
  ]
})
export class LoginPageModule { }
