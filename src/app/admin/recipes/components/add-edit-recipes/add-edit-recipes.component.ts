import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-recipes',
  templateUrl: './add-edit-recipes.component.html',
  styleUrls: ['./add-edit-recipes.component.css']
})
export class AddEditRecipesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEditRecipesComponent>) {}

  recipesName:string='';

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
