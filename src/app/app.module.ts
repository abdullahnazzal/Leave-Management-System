import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';

import { UserGuard } from './guard/user.guard';
import { DialogLoginErrorComponent } from './dialog-login-error/dialog-login-error.component';
import { DialogAddErrorComponent } from './dialog-add-error/dialog-add-error.component';
import { DialogAddConfirmComponent } from './dialog-add-confirm/dialog-add-confirm.component';
import { DialogApproveConfirmComponent } from './dialog-approve-confirm/dialog-approve-confirm.component';
import { DialogRejectReasonComponent } from './dialog-reject-reason/dialog-reject-reason.component';

import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogLoadingComponent } from './dialog-loading/dialog-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    DialogLoginErrorComponent,
    DialogAddErrorComponent,
    DialogAddConfirmComponent,
    DialogApproveConfirmComponent,
    DialogRejectReasonComponent,
    DialogLoadingComponent,
  ],
  entryComponents: [DialogLoginErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
