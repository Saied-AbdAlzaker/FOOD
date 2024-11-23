import { Component, OnInit } from '@angular/core';
import { IUsers } from 'src/app/Core/dashboard/modules/admin/users/model/users';
import { HelperService } from 'src/app/shared/service/helper.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: IUsers | any;
  imgSrc: any;
  constructor(private _HelperService: HelperService) {
    this.imgSrc = _HelperService.imgPath;
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this._HelperService.currentUser().subscribe({
      next: (res) => {
        this.currentUser = res;
      }
    })
  }

}
