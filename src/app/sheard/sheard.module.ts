import { SheardComponent } from './sheard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatDividerModule, MatIconModule,HttpClientModule,ReactiveFormsModule,
    FormsModule,MatDialogModule,ToastrModule],
  declarations: [SheardComponent],
  exports:[ MatButtonModule, MatDividerModule, MatIconModule,HttpClientModule, ReactiveFormsModule,
    FormsModule,MatDialogModule,ToastrModule]
})
export class SheardModule { }

