import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRecipes } from '../../../../admin/recipes/model/recipes';
import { HelperService } from 'src/app/shared/service/helper.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent {

  imgSrc: any;

  constructor(public dialogRef: MatDialogRef<RecipeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRecipes, private _HelperService: HelperService) {
    this.imgSrc = _HelperService.imgPath;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
