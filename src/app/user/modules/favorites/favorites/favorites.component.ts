import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from './../services/favorites.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IٌFavoriteTable } from '../models/Favorite';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(private _FavoritesService:FavoritesService, private toastr:ToastrService) { }

  ngOnInit() {
    this.getAllFavorites();
  }

  myFavorite: any;

  getAllFavorites(){
    this._FavoritesService.onGetAllFavorite().subscribe({
      next: (res)=>{
        console.log(res);
        this.myFavorite = res.data;
      },error: (err)=>{
        console.log(err);
        this.toastr.error(err.error.message, 'Error!');
      },complete: ()=>{
        // this.toastr.success('Recipe Add To My Favorite', 'Successfully!');
      }
    })
  }

  removeFavorite(id: number){
    this._FavoritesService.onRemoveFavorite(id).subscribe({
      next: (res)=>{
        console.log(res);
        
      },error: (err)=>{
        console.log(err);
        this.toastr.error(err.error.message, 'Error!');
        
      },complete: ()=>{
        this.toastr.success('Removed Favorite', 'Successfully!');
        this.getAllFavorites();
      }
    })
  }

  title = 'pagination';
  usersLists: any[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

  onTableDataChange(event: any) {
    this.tableSize = event.target.value;
    this.page = event;
    this.getAllFavorites();
  }

}
