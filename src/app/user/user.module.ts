import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { SheardModule } from '../sheard/sheard.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component: UserComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
