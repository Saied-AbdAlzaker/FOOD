import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserFavoritesComponent } from './user-favorites/user-favorites.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routse: Routes = [
  { path: '', component: UserFavoritesComponent },
]

@NgModule({
  declarations: [
    UserFavoritesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routse),
    SharedModule
  ]
})
export class UserFavoritesModule { }
