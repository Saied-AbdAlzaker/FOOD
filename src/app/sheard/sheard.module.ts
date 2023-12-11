import { DarkThemeComponent } from './dark-theme/dark-theme.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SheardComponent } from './sheard.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const routes: Routes = []

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, 
    MatDialogModule, 
    ToastrModule, 
    MatPaginatorModule, 
    NgxDropzoneModule, 
    NgxPaginationModule, 
    MatSlideToggleModule,
    RouterModule.forChild(routes)],

  declarations: [
    SheardComponent, 
    NavbarComponent, 
    SidebarComponent, 
    HomeComponent, 
    DeleteDialogComponent, 
    ProfileDetailsComponent, 
    ProfileEditComponent, 
    NotfoundComponent, 
    DarkThemeComponent],

  exports: [
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule, 
    HttpClientModule, 
    ReactiveFormsModule,
    FormsModule, 
    MatDialogModule, 
    ToastrModule, 
    NavbarComponent, 
    SidebarComponent, 
    RouterModule, 
    HomeComponent, 
    DarkThemeComponent,
    MatPaginatorModule, 
    DeleteDialogComponent, 
    NgxDropzoneModule, 
    NgxPaginationModule, 
    ProfileDetailsComponent, 
    ProfileEditComponent, 
    NotfoundComponent, 
    MatSlideToggleModule],
    
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SheardModule { }

