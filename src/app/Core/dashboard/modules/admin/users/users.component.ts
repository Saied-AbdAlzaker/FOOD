import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { IUsers, IUsersTable } from './model/users';
import { HelperService } from 'src/app/shared/service/helper.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  tableResponse: IUsersTable|any;
  tableData: IUsers[] = [];
  pageNumber: number = 1;
  pageSize: number = 25;
  searchValue: string = '';
  groupId: number = 0;
  imgSrc:string='';

  constructor(private _UsersService: UsersService, private _toastr: ToastrService,
    private dialog: MatDialog, private _HelperService:HelperService) {
      this.imgSrc=_HelperService.imgPath;
     }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    let params;
    if (this.groupId == 1 || this.groupId == 2) {
      params = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        userName: this.searchValue,
        groups: this.groupId
      }
    } else {
      params = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        userName: this.searchValue,
      }
    }

    this._UsersService.allUsers(params).subscribe({
      next: (res:IUsersTable) => {
        this.tableResponse = res;
        this.tableData = this.tableResponse.data;
      }
    })
  }

  // Delete
  openDeleteDialog(tableData: any, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: tableData,
      width: '40%',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.onDeleteCategory(result.id);
    });
  }

  onDeleteCategory(id: number) {
    this._UsersService.deleteUsers(id).subscribe({
      next: (res: any) => {

      }, error: (err: string) => {
        this._toastr.error('User Not Deleted', 'Error!')
      }, complete: () => {
        this._toastr.success('User Deleted Successfully', 'Ok');
        this.getAllUsers();
      }
    })
  }


}
