import { SheardComponent } from './sheard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatDividerModule, MatIconModule,HttpClientModule,ReactiveFormsModule],
  declarations: [SheardComponent],
  exports:[ MatButtonModule, MatDividerModule, MatIconModule,HttpClientModule, ReactiveFormsModule]
})
export class SheardModule { }

