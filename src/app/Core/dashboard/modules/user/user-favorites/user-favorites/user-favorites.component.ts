import { Component, OnInit } from '@angular/core';
import { UserRecipesService } from '../../services/user-recipes.service';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/shared/service/helper.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss']
})
export class UserFavoritesComponent implements OnInit {

  favList: any;
  favPage: any;
  imgPath: any;
  pageIndex: number = 0
  pageSize: number = 5;
  pageNumber: number | undefined = 1;

  constructor(private _UserRecipesService: UserRecipesService, private _toastr: ToastrService, private _HelperService: HelperService) {
    this.imgPath = _HelperService.imgPath;
  }

  ngOnInit(): void {
    this.getAllMyFavorites();
  }

  getAllMyFavorites() {
    let parms = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,

    }
    this._UserRecipesService.allFavorites(parms).subscribe({
      next: (res) => {
        this.favPage = res;
        this.favList = this.favPage.data;
        console.log(res);

      }
    })
  }

  removeFavorites(id: number) {
    this._UserRecipesService.deleteFavorites(id).subscribe({
      next: (res) => {

      }, error: (err) => {
        this._toastr.error(err.error.message, 'Error!')
      }, complete: () => {
        this._toastr.success('Removed Favorite', 'Successfully!');
        this.getAllMyFavorites();
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize
    this.pageNumber = e.pageIndex + 1
    this.getAllMyFavorites();
  }

}
