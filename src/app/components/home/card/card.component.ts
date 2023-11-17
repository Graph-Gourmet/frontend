import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  recipe: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.recipe = data.formValues;
  }

  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  //   this.recipe = {
  //     id: 4511,
  //     ingredients: [
  //       {
  //         ingredient: 'hibiscus tea',
  //       },
  //       {
  //         ingredient: 'hot water',
  //       },
  //       {
  //         ingredient: 'milk',
  //       },
  //       {
  //         ingredient: 'agave nectar',
  //       },
  //     ],
  //     name: 'Hibiscus Latte',
  //     nutrition: {
  //       calories: 121,
  //       carbohydrates: 16,
  //       fat: 3,
  //       fiber: 0,
  //       protein: 5,
  //       sugar: 15,
  //     },
  //     price: 800,
  //     thumbnail_url:
  //       'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/186671.jpg',
  //   };
  // }
}
