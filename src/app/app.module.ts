import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';

import { UserGuard } from './user.guard';
import { DialogLoginErrorComponent } from './dialog-login-error/dialog-login-error.component';
import { DialogAddErrorComponent } from './dialog-add-error/dialog-add-error.component';
import { DialogAddConfirmComponent } from './dialog-add-confirm/dialog-add-confirm.component';
import { DialogApproveConfirmComponent } from './dialog-approve-confirm/dialog-approve-confirm.component';
import { DialogRejectReasonComponent } from './dialog-reject-reason/dialog-reject-reason.component';

import { MaterialModule } from './material/material.module';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [UserGuard],
  },
];

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
  ],
  entryComponents: [DialogLoginErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [UserGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
