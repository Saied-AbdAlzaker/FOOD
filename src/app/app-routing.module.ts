import { ProfileDetailsComponent } from './sheard/profile-details/profile-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { ProfileEditComponent } from './sheard/profile-edit/profile-edit.component';

const routes: Routes = [
  {path:'',redirectTo:'auth',pathMatch:'full'},
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
  },
  {path:'profile-details',component:ProfileDetailsComponent},
  {path:'profile-edit',component:ProfileEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
