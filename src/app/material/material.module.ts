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

const material = [
  BrowserAnimationsModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSortModule,
  MatButtonModule,
  MatDialogModule,
  MatButtonModule,
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
