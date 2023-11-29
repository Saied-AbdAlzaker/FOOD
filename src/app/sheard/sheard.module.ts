import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
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
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxDropzoneModule } from 'ngx-dropzone';

const routes: Routes = []

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatDividerModule, MatIconModule,HttpClientModule,ReactiveFormsModule,
    FormsModule,MatDialogModule,ToastrModule, MatPaginatorModule,NgxDropzoneModule,
    RouterModule.forChild(routes)],
  declarations: [SheardComponent, NavbarComponent, SidebarComponent, HomeComponent, DeleteDialogComponent],
  exports:[ MatButtonModule, MatDividerModule, MatIconModule,HttpClientModule, ReactiveFormsModule,
    FormsModule,MatDialogModule,ToastrModule, NavbarComponent, SidebarComponent, RouterModule, HomeComponent,
     MatPaginatorModule, DeleteDialogComponent, NgxDropzoneModule]
})
export class SheardModule { }

