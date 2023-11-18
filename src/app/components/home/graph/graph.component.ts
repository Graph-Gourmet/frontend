import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent {
  recipes: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // this.recipes = data.formValues;
    this.recipes = [
      {
        id: 4505,
        ingredients: [
          { ingredient: 'assorted chocolate candy' },
          { ingredient: 'brown sugar' },
          { ingredient: 'granulated sugar' },
          { ingredient: 'unsalted butter' },
          { ingredient: 'large egg' },
          { ingredient: 'vanilla extract' },
          { ingredient: 'kosher salt' },
          { ingredient: 'baking soda' },
          { ingredient: 'all-purpose flour' },
        ],
        name: 'Leftover Halloween Candy-Bottom Cheesecake',
        nutrition: {
          calories: 429,
          carbohydrates: 30,
          fat: 31,
          fiber: 5,
          protein: 7,
          sugar: 19,
        },
        price: 1750,
        thumbnail_url:
          'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/186448.jpg',
      },
      {
        id: 4557,
        ingredients: [
          { ingredient: 'large egg' },
          { ingredient: 'unsalted butter' },
          { ingredient: 'kosher salt' },
          { ingredient: 'milk' },
          { ingredient: 'all-purpose flour' },
          { ingredient: 'cornmeal' },
        ],
        name: 'Cornmeal Popovers',
        nutrition: {
          calories: 84,
          carbohydrates: 9,
          fat: 3,
          fiber: 0,
          protein: 3,
          sugar: 1,
        },
        price: 550,
        thumbnail_url:
          'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/189399.jpg',
      },
      {
        id: 4561,
        ingredients: [
          { ingredient: 'sweet potato' },
          { ingredient: 'kosher salt' },
          { ingredient: 'unsalted butter' },
          { ingredient: 'milk' },
          { ingredient: 'large egg' },
          { ingredient: 'raw sweet potato' },
        ],
        name: 'Sweet And Savory Sweet Potato Casserole',
        nutrition: {
          calories: 602,
          carbohydrates: 102,
          fat: 15,
          fiber: 36,
          protein: 9,
          sugar: 40,
        },
        price: 1950,
        thumbnail_url:
          'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/189993.jpg',
      },
      {
        id: 4503,
        ingredients: [
          { ingredient: 'brown sugar' },
          { ingredient: 'granulated sugar' },
          { ingredient: 'kosher salt' },
          { ingredient: 'olive oil' },
          { ingredient: 'vanilla extract' },
          { ingredient: 'large egg' },
          { ingredient: 'baking soda' },
          { ingredient: 'ground cinnamon' },
          { ingredient: 'all purpose flour' },
          { ingredient: 'apple cider' },
        ],
        name: 'Apple Cider Cupcakes',
        nutrition: {
          calories: 428,
          carbohydrates: 51,
          fat: 23,
          fiber: 0,
          protein: 3,
          sugar: 40,
        },
        price: 1400,
        thumbnail_url:
          'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/131e1aaa7edc4df4b6fc077627688833/yt.jpg',
      },
      {
        id: 4643,
        ingredients: [
          { ingredient: 'all purpose flour' },
          { ingredient: 'baking powder' },
          { ingredient: 'kosher salt' },
          { ingredient: 'unsalted butter' },
          { ingredient: 'sugar' },
          { ingredient: 'large egg' },
          { ingredient: 'vanilla extract' },
        ],
        name: 'How To Decorate Shortbread Holiday Cut-Out Cookies With Royal Icing',
        nutrition: {
          calories: 229,
          carbohydrates: 37,
          fat: 8,
          fiber: 0,
          protein: 2,
          sugar: 23,
        },
        price: 800,
        thumbnail_url:
          'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/194544.jpg',
      },
      {
        id: 4617,
        ingredients: [
          { ingredient: 'unsalted butter' },
          { ingredient: 'granulated sugar' },
          { ingredient: 'cream cheese' },
          { ingredient: 'large egg' },
          { ingredient: 'large egg yolk' },
          { ingredient: 'McCormick® vanilla extract' },
          { ingredient: 'McCormick® almond extract' },
          { ingredient: 'kosher salt' },
          { ingredient: 'all purpose flour' },
          { ingredient: 'baking powder' },
          { ingredient: 'cream of tartar' },
        ],
        name: 'How to Make the Best Sugar Cookies',
        nutrition: {
          calories: 610,
          carbohydrates: 86,
          fat: 27,
          fiber: 0,
          protein: 6,
          sugar: 58,
        },
        price: 1150,
        thumbnail_url:
          'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/192958.jpg',
      },
      {
        id: 4771,
        ingredients: [
          { ingredient: 'unsalted butter' },
          { ingredient: 'granulated sugar' },
          { ingredient: 'light brown sugar' },
          { ingredient: 'corn syrup' },
          { ingredient: 'large egg' },
          { ingredient: 'vanilla extract' },
          { ingredient: 'all purpose flour' },
          { ingredient: 'baking powder' },
          { ingredient: 'baking soda' },
          { ingredient: 'kosher salt' },
          { ingredient: 'white chocolate chip' },
          { ingredient: 'rainbow sprinkles' },
          { ingredient: 'rolled oats' },
          { ingredient: 'sweetened rice cereal' },
          { ingredient: 'fruit shaped cereal' },
          { ingredient: 'cone shaped corn chips' },
        ],
        name: 'Unicorn Cookies As Made By Our Facebook Cookie Contest Winner',
        nutrition: {
          calories: 619,
          carbohydrates: 78,
          fat: 31,
          fiber: 1,
          protein: 7,
          sugar: 16,
        },
        price: 2300,
        thumbnail_url:
          'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/204043.jpg',
      },
      {
        id: 4681,
        ingredients: [
          { ingredient: 'unsalted butter' },
          { ingredient: 'light brown sugar' },
          { ingredient: 'sugar' },
          { ingredient: 'large egg' },
          { ingredient: 'semisweet chocolate chip' },
          { ingredient: 'all purpose flour' },
          { ingredient: 'cocoa powder' },
          { ingredient: 'baking powder' },
          { ingredient: 'kosher salt' },
        ],
        name: 'Hot Chocolate Cookie Mugs',
        nutrition: {
          calories: 221,
          carbohydrates: 31,
          fat: 11,
          fiber: 1,
          protein: 2,
          sugar: 20,
        },
        price: 1150,
        thumbnail_url:
          'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/197876.jpg',
      },
      {
        id: 4615,
        ingredients: [
          { ingredient: 'all purpose flour' },
          { ingredient: 'kosher salt' },
          { ingredient: 'baking powder' },
          { ingredient: 'baking soda' },
          { ingredient: 'unsalted butter' },
          { ingredient: 'light brown sugar' },
          { ingredient: 'sugar' },
          { ingredient: 'large egg' },
          { ingredient: 'vanilla extract' },
          { ingredient: 'crispy rice cereal' },
          { ingredient: 'semi-sweet chocolate chips' },
          { ingredient: 'butterscotch chips' },
          { ingredient: 'old-fashioned oat' },
          { ingredient: 'flakey sea salt' },
        ],
        name: 'Crispy Rice Chocolate Chip Butterscotch Oatmeal Cookies',
        nutrition: {
          calories: 173,
          carbohydrates: 22,
          fat: 8,
          fiber: 0,
          protein: 2,
          sugar: 10,
        },
        price: 1300,
        thumbnail_url:
          'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/192824.jpg',
      },
      {
        id: 4663,
        ingredients: [
          { ingredient: 'pastry flour' },
          { ingredient: 'rolled oats' },
          { ingredient: 'ground cinnamon' },
          { ingredient: 'baking powder' },
          { ingredient: 'kosher salt' },
          { ingredient: 'unsalted butter' },
          { ingredient: 'light brown sugar' },
          { ingredient: 'large egg' },
          { ingredient: 'boiling water' },
          { ingredient: 'baking soda' },
        ],
        name: 'Lil’ Merri’s As Made By Elizabeth Belkind',
        nutrition: {
          calories: 793,
          carbohydrates: 94,
          fat: 44,
          fiber: 3,
          protein: 7,
          sugar: 58,
        },
        price: 700,
        thumbnail_url:
          'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/196295.jpg',
      },
    ];
  }
}