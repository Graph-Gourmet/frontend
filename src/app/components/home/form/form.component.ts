import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
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
  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;
  filteredOptionsIngredients!: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredientCtrl = new FormControl('');
  filteredIngredients: Observable<string[]>;
  ingredients: string[] = [];
  allIngrediens: string[] = [
    'Apple',
    'Lemon',
    'Lime',
    'Orange',
    'Strawberry',
    'Salt',
    'Sugar',
    'Tomato',
    'Potato',
    'Flour',
    'Butter',
    'Oregano',
    'Pepper',
    'Chile',
  ];
  announcer = inject(LiveAnnouncer);
  hidden: boolean = true;

  responseRecipes = [
    { codigo: 123, titulo: 'Paste', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 122, titulo: 'Brownie', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 121, titulo: 'Cookie', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 120, titulo: 'Tomate soap', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 119, titulo: 'Menestrone', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
    { codigo: 118, titulo: 'BBQ', descripcion: 'dsafsafdsfsdaf' },
  ];

  constructor(private snackBar: MatSnackBar) {
    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(null),
      map((ingredient: string | null) =>
        ingredient
          ? this._filterIngredients(ingredient)
          : this.allIngrediens.slice(0, 10)
      )
    );
  }

  @ViewChild('ingredientInput') ingredientInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterRecipes(value || ''))
    );
    this.filteredOptionsIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterIngredients(value || ''))
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (
      !this.ingredients.includes(value) &&
      this.allIngrediens.includes(value)
    ) {
      this.ingredients.push(value);
    }
    event.chipInput!.clear();
    this.ingredientCtrl.setValue(null);
  }

  remove(ingredient: string): void {
    const index = this.ingredients.indexOf(ingredient);

    if (index >= 0) {
      this.ingredients.splice(index, 1);

      this.announcer.announce(`Removed ${ingredient}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.ingredients.includes(event.option.viewValue)) {
      this.ingredients.push(event.option.viewValue);
    }
    this.ingredientInput.nativeElement.value = '';
    this.ingredientCtrl.setValue(null);
  }

  private _filterIngredients(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filterIngredients = this.allIngrediens.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
    return filterIngredients.slice(0, 10);
  }

  private _filterRecipes(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredRecipes = this.recipes.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
    return filteredRecipes.slice(0, 10);
  }

  onSubmit() {
    if (this.myControl.value == '') {
      this.snackBar.open('Debe ingresar una receta antes de continuar', '', {
        duration: 2000,
      });
      return;
    }
    this.hidden = false;
  }
}
