import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserGuard } from './user.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((mod) => mod.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [UserGuard],
})
export class AppRoutingModule {}
