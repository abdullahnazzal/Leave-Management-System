import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

const material = [
  MatTableModule,
  MatIconModule,
  MatListModule,
  FormsModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatDialogModule,
  MatCardModule,
  ReactiveFormsModule,
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialUserModule {}
