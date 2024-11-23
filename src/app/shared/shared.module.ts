import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
// Primeng
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PasswordModule } from 'primeng/password';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxSpinnerModule } from "ngx-spinner";
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { HomeComponent } from './components/home/home.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
// Angular Material
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    NotFoundComponent,
    HomeComponent,
    DeleteDialogComponent,
    LogoutDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 2000,
      progressBar: true
    }),
    ReactiveFormsModule,
    HttpClientModule,
    // Primeng
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    PasswordModule,
    NgxDropzoneModule,
    NgxSpinnerModule,
    DynamicDialogModule,
    DialogModule,
    MenubarModule,
    TableModule,
    DropdownModule,
    // Angular Material
    MatDialogModule,
    MatFormFieldModule, MatSelectModule, NgFor, MatInputModule, FormsModule,MatPaginatorModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Primeng
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    PasswordModule,
    NgxDropzoneModule,
    NgxSpinnerModule,
    DynamicDialogModule,
    DialogModule,
    MenubarModule,
    TableModule,
    DropdownModule,
    // Angular Material
    MatDialogModule,
    MatFormFieldModule, MatSelectModule, NgFor, MatInputModule, FormsModule,MatPaginatorModule
  ]
})
export class SharedModule { }
