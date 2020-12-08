import { NgModule } from '@angular/core';
import { LoginPageModule } from './login-page/login-page.module';
import { TaskModule } from './task/task.module';

@NgModule({
	imports: [
		LoginPageModule,
		TaskModule
	],
	declarations: []
})
export class PagesModule {
}
