import { IUserTable, IٌUser } from './models/admin-users';
import { Component, OnInit } from '@angular/core';
import { UsersAdminService } from './services/users-admin.service';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/sheard/delete-dialog/delete-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private _UsersAdminService:UsersAdminService, 
    private _ToastrService:ToastrService,
    private _HelperService:HelperService,
    private dialog:MatDialog) { }

    ngOnInit() {
      this.getTableData()
    }

  pageSize: number = 25;
  pageNumber: number | undefined = 1;
  tableResponse: IUserTable | undefined;
  tableData: IٌUser[] = [];
  searchValue: string = ''
  groupId: number = 0

  getTableData() {
    let params;
    if(this.groupId == 1 || this.groupId == 2){
      params = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        userName:this.searchValue,
        groups:this.groupId,
      }
    } else{
      params = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        userName:this.searchValue,
      }
    }

    this._UsersAdminService.getAllUsers(params).subscribe({
      next: (res: IUserTable) => {
        console.log(res);
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data;
      }
    })
  }

    // Delete
    openDeleteDialog(adminUserData: any): void {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: adminUserData,
        width: '40%',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // console.log(result);
        if(result){
          // console.log(result.id);
        this.onDeleteUser(result.id);
        }
      });
    }
    onDeleteUser(id: number){
      this._UsersAdminService.deleteAdminUser(id).subscribe({
        next: (res) => {
          console.log(res);
        }, error: (err)=>{
          console.log(err);
        }, complete: ()=>{
          this._ToastrService.success('Recipe Deleted Successfully', 'Ok');
          this.getTableData();
        }
        })
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize;
    this.pageNumber = this.tableResponse?.pageNumber;
    this.getTableData();
  }

}
