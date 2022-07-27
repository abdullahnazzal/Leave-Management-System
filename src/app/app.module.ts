import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import {  MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
// import { UserComponent } from './components/user/user.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { UserGuard } from './user.guard';

const appRoutes:Routes=[
  {
    path:"",
    component:LoginComponent,
    canActivate:[UserGuard]
  }
  // {path:"",component:LoginComponent}
  // {path:"user",component:UserComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    // UserComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,

    MatMenuModule,
    MatSortModule,

    RouterModule.forRoot(appRoutes)
    // RouterModule.forRoot(appRoutes,{enableTracing:true})

  ],
  providers: [UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
