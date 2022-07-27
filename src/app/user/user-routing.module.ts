import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from "./add/add.component";
import { ListComponent } from "./list/list.component";
import { AuthGuard } from "../auth.guard";

const routes: Routes = [
  {path:"list", component:ListComponent, canActivate:[AuthGuard]},
  {path:"add",component:AddComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
