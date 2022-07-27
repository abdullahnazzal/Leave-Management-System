import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';


import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { AuthGuard } from '../auth.guard';
import { UserGuard } from '../user.guard';
import { HeaderComponent } from '../components/header/header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // HeaderComponent,
    ListComponent,
    AddComponent,
    ListItemsComponent
  ],
  imports: [
CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [AuthGuard,UserGuard,HeaderComponent],
})
export class UserModule { }
