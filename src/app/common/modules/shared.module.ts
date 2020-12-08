import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { DeleteConfirmDialogComponent } from '../components/delete-confirm-dialog/delete-confirm-dialog.component';
import { DailoguePageComponent } from '../components/dailogue-page/dailogue-page.component';
import { ButtonRendererComponent } from '../components/button.renderer.component';
import { NumberOnlyDirective } from '../directives/number-only-directive';
import { ClosedConfirmDialogComponent } from '../components/closed-confirm-dialog/closed-confirm-dialog.component';
import { CloseRenderComponent } from '../components/close.render.component';
import { NgxLoadingModule } from 'ngx-loading';
import { WarningDialogComponent } from '../components/warning-dialog/warning-dialog.component';
import { RejectResendConfirmDialogComponent } from '../components/reject-resend-confirm-dialog/reject-resend-confirm-dialog.component';
import { ImagePreviewDialogComponent } from '../components/image-preview-dialog/image-preview-dialog.component';
import { SessionExpiredDialogComponent } from '../components/session-expired-dialog/session-expired-dialog.component';
import { UserAlreadyExistDialogComponent } from '../components/user-already-exist-dialog/user-already-exist-dialog.component';
import { UserAccountLockedDialogComponent } from '../components/user-account-locked-dialog/user-account-locked-dialog.component';
import { RemarkDialogComponent } from '../components/remark-dialog/remark-dialog.component';

@NgModule({
    declarations: [
        DailoguePageComponent,
        DeleteConfirmDialogComponent,
        ClosedConfirmDialogComponent,
        ButtonRendererComponent,
        WarningDialogComponent,
        RejectResendConfirmDialogComponent,
        CloseRenderComponent,
        NumberOnlyDirective,
        ImagePreviewDialogComponent,
        UserAlreadyExistDialogComponent,
        UserAccountLockedDialogComponent,
        SessionExpiredDialogComponent,
        RemarkDialogComponent
    ],
    imports: [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxExtendedPdfViewerModule,
        NgxLoadingModule.forRoot({})
    ],
    exports: [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxExtendedPdfViewerModule,
        NumberOnlyDirective
    ],
    entryComponents: [
        DeleteConfirmDialogComponent,
        ClosedConfirmDialogComponent,
        WarningDialogComponent,
        RejectResendConfirmDialogComponent,
        DailoguePageComponent,
        ButtonRendererComponent,
        CloseRenderComponent,
        ImagePreviewDialogComponent,
        UserAlreadyExistDialogComponent,
        UserAccountLockedDialogComponent,
        SessionExpiredDialogComponent,
        RemarkDialogComponent
    ],
    providers: [

    ]
})

export class SharedModule {

}
