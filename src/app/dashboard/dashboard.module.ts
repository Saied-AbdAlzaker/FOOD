import { UserGuard } from './../Guards/user.guard';
import { AdminGuard } from '../Guards/admin.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SheardModule } from '../sheard/sheard.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../sheard/home/home.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path:'',redirectTo:'home',pathMatch:'full'},
      { path: 'home', component: HomeComponent },
      {
        path: 'admin', canActivate: [AdminGuard],
        loadChildren: () => import('../admin/admin.module').then(mod => mod.AdminModule),
      },
      {
        path: 'user', canActivate: [UserGuard],
        loadChildren: () => import('../user/user.module').then(mod => mod.UserModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule
  ],
  declarations: [DashboardComponent],
  exports: [RouterModule],
})
export class DashboardModule { }
