import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent {

  constructor(public dialogRef: MatDialogRef<AddEditCategoryComponent>) {}

  categoryName:string='';

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }


}
