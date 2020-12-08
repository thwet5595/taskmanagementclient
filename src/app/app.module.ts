import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AgGridModule } from 'ag-grid-angular';
import { PapaParseModule } from 'ngx-papaparse';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './common/modules/shared.module';
import { ButtonRendererComponent } from './common/components/button.renderer.component';
import { NeedAuthGuard } from './common/services/auth.guard';
import { CustomHttpInterceptor } from './common/services/httpinterceptor';
import { NgxLoadingModule } from 'ngx-loading';
import { CloseRenderComponent } from './common/components/close.render.component';
import { PagesModule } from './pages/pages.module';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        AppComponent
        ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        PapaParseModule,
        AgGridModule.withComponents([ButtonRendererComponent, CloseRenderComponent]),
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
        }),
        SharedModule,
        PagesModule,
        NgxLoadingModule.forRoot({})
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomHttpInterceptor,
            multi: true
        },
        NeedAuthGuard
    ],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule {
}
