import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { RecipeRequest } from 'src/app/models/recipe-request.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  // recipeForm: FormGroup;
  // recipeRequest = new RecipeRequest();

  recipes = [
    'Spaghetti Bolognese',
    'Chicken Alfredo',
    'Beef Stroganoff',
    'Vegetarian Lasagna',
    'Margherita Pizza',
    'Tofu Stir-Fry',
    'Shrimp Scampi',
    'Chocolate Brownies',
    'Caesar Salad',
    'Tiramisu',
    'Chicken Tacos',
    'Mushroom Risotto',
    'Thai Green Curry',
    'Beef Burritos',
    'Caprese Salad',
    'Spinach and Feta Stuffed Chicken',
    'Vegetable Pad Thai',
    'Grilled Salmon',
    'Penne alla Vodka',
    'Chocolate Chip Cookies',
  ];

  // constructor(private fb: FormBuilder) {
  //   this.recipeForm = this.fb.group({});
  // }

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    const filteredRecipes = this.recipes.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );

    return filteredRecipes.slice(0, 10);
  }
}
