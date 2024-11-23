import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from 'src/app/shared/components/home/home.component';
import { adminGuard } from '../guards/admin.guard';
import { userGuard } from '../guards/user.guard';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'admin', canActivate: [adminGuard],
        loadChildren: () => import('./modules/admin/admin.module').then((mod) => mod.AdminModule)
      },
      {
        path: 'user', canActivate: [userGuard],
        loadChildren: () => import('./modules/user/user.module').then((mod) => mod.UserModule)
      },
    ]
  }
]

@NgModule({
  declarations: [
    DashboardComponent, NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DashboardModule { }
