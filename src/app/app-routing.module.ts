import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { authGuard } from './Core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./Core/auth/auth.module').then((mod) => mod.AuthModule)
  },
  {
    path: 'dashboard', canActivate: [authGuard],
    loadChildren: () => import('./Core/dashboard/dashboard.module').then((mod) => mod.DashboardModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./shared/components/profile/profile.module').then((mod) => mod.ProfileModule)
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
