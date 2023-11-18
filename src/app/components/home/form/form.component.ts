import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, startWith } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FoodApiService } from 'src/app/services/food-api.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CardComponent } from '../card/card.component';
import { GraphComponent } from '../graph/graph.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  recipes = this.recipeService.getRecipeNames();
  filteredOptions!: Observable<string[]>;
  filteredOptionsIngredients!: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredientCtrl = new FormControl('');
  filteredIngredients: Observable<string[]>;
  ingredients: string[] = [];
  allIngrediens: string[] | undefined;
  announcer = inject(LiveAnnouncer);
  hidden: boolean = true;
  loading: boolean = false;
  responseRecipes: any;

  recipeControl = new FormControl('');
  minPriceControl = new FormControl();
  maxPriceControl = new FormControl();
  minCaloriesControl = new FormControl();
  maxCaloriesControl = new FormControl();
  minCarbohydratesControl = new FormControl();
  maxCarbohydratesControl = new FormControl();
  minProteinControl = new FormControl();
  maxProteinControl = new FormControl();
  minFatControl = new FormControl();
  maxFatControl = new FormControl();
  minSugarControl = new FormControl();
  maxSugarControl = new FormControl();

  constructor(
    private snackBar: MatSnackBar,
    private foodApiService: FoodApiService,
    private recipeService: RecipeService,
    private dialog: MatDialog
  ) {
    this.allIngrediens = recipeService.getIngredientName() ?? [];
    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(null),
      map((ingredient: string | null) =>
        ingredient
          ? this._filterIngredients(ingredient)
          : this.allIngrediens!.slice(0, 20)
      )
    );
  }

  @ViewChild('ingredientInput') ingredientInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.filteredOptions = this.recipeControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterRecipes(value || ''))
    );
    this.filteredOptionsIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterIngredients(value || ''))
    );
    this.minPriceControl.valueChanges.subscribe((minPrice) => {
      if (minPrice > this.maxPriceControl.value) {
        this.maxPriceControl.setValue(minPrice);
      }
    });
    this.maxPriceControl.valueChanges.subscribe((maxPrice) => {
      if (maxPrice < this.minPriceControl.value) {
        this.minPriceControl.setValue(maxPrice);
      }
    });
    this.minCaloriesControl.valueChanges.subscribe((minCalories) => {
      if (minCalories > this.maxCaloriesControl.value) {
        this.maxCaloriesControl.setValue(minCalories);
      }
    });
    this.maxCaloriesControl.valueChanges.subscribe((maxCalories) => {
      if (maxCalories < this.minCaloriesControl.value) {
        this.minCaloriesControl.setValue(maxCalories);
      }
    });
    this.minCarbohydratesControl.valueChanges.subscribe((minCarbohydrates) => {
      if (minCarbohydrates > this.maxCarbohydratesControl.value) {
        this.maxCarbohydratesControl.setValue(minCarbohydrates);
      }
    });
    this.maxCarbohydratesControl.valueChanges.subscribe((maxCarbohydrates) => {
      if (maxCarbohydrates < this.minCarbohydratesControl.value) {
        this.minCarbohydratesControl.setValue(maxCarbohydrates);
      }
    });
    this.minProteinControl.valueChanges.subscribe((minProtein) => {
      if (minProtein > this.maxProteinControl.value) {
        this.maxProteinControl.setValue(minProtein);
      }
    });
    this.maxProteinControl.valueChanges.subscribe((maxProtein) => {
      if (maxProtein < this.minProteinControl.value) {
        this.minProteinControl.setValue(maxProtein);
      }
    });
    this.minFatControl.valueChanges.subscribe((minFat) => {
      if (minFat > this.maxFatControl.value) {
        this.maxFatControl.setValue(minFat);
      }
    });
    this.maxFatControl.valueChanges.subscribe((maxFat) => {
      if (maxFat < this.minFatControl.value) {
        this.minFatControl.setValue(maxFat);
      }
    });
    this.minSugarControl.valueChanges.subscribe((minSugar) => {
      if (minSugar > this.maxSugarControl.value) {
        this.maxSugarControl.setValue(minSugar);
      }
    });
    this.maxSugarControl.valueChanges.subscribe((maxSugar) => {
      if (maxSugar < this.minSugarControl.value) {
        this.minSugarControl.setValue(maxSugar);
      }
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (this.ingredients.length >= 10) {
      this.snackBar.open('No puede agregar mas de 10 ingredientes', '', {
        duration: 2000,
      });
      return;
    }
    if (this.allIngrediens!.includes(value)) {
      this.ingredients.push(value);
      this.allIngrediens!.splice(this.allIngrediens!.indexOf(value), 1);
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
    if (this.ingredients.length >= 10) {
      this.snackBar.open('No puede agregar mas de 10 ingredientes', '', {
        duration: 2000,
      });
      return;
    }
    this.ingredients.push(event.option.viewValue);
    this.allIngrediens!.splice(
      this.allIngrediens!.indexOf(event.option.viewValue),
      1
    );
    this.ingredientInput.nativeElement.value = '';
    this.ingredientCtrl.setValue(null);
  }

  private _filterIngredients(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filterIngredients = this.allIngrediens!.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
    return filterIngredients.slice(0, 20);
  }

  private _filterRecipes(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredRecipes = this.recipes!.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
    return filteredRecipes.slice(0, 20);
  }

  onSubmit() {
    if (this.recipeControl.value == '') {
      this.snackBar.open('Debe ingresar una receta antes de continuar', '', {
        duration: 2000,
      });
      return;
    }
    var recipeId = this.recipeService.getRecipeByName(
      this.recipeControl.value!
    );

    if (recipeId) {
      const filters = {
        minPrice: this.minPriceControl.value,
        maxPrice: this.maxPriceControl.value,
        minCalories: this.minCaloriesControl.value,
        maxCalories: this.maxCaloriesControl.value,
        minCarbohydrates: this.minCarbohydratesControl.value,
        maxCarbohydrates: this.maxCarbohydratesControl.value,
        minProtein: this.minProteinControl.value,
        maxProtein: this.maxProteinControl.value,
        minFat: this.minFatControl.value,
        maxFat: this.maxFatControl.value,
        minSugar: this.minSugarControl.value,
        maxSugar: this.maxSugarControl.value,
      };

      this.loading = true;
      this.hidden = true;
      this.foodApiService
        .getRecipes(recipeId.id.toString(), this.ingredients, filters)
        .subscribe((data) => {
          this.responseRecipes = data;
          this.hidden = false;
          this.loading = false;
        });
    }
  }

  resetForm() {
    this.minPriceControl.setValue(null);
    this.maxPriceControl.setValue(null);
    this.minCaloriesControl.setValue(null);
    this.maxCaloriesControl.setValue(null);
    this.minCarbohydratesControl.setValue(null);
    this.maxCarbohydratesControl.setValue(null);
    this.minProteinControl.setValue(null);
    this.maxProteinControl.setValue(null);
    this.minFatControl.setValue(null);
    this.maxFatControl.setValue(null);
    this.minSugarControl.setValue(null);
    this.maxSugarControl.setValue(null);
    this.ingredients = [];
    this.recipeControl.setValue('');
  }

  showGraph() {
    // if (!this.responseRecipes) {
    //   this.snackBar.open('You still havent found any recipes', '', {
    //     duration: 2000,
    //   });
    //   return;
    // }
    const dialogRef: MatDialogRef<GraphComponent> = this.dialog.open(
      GraphComponent,
      {
        data: { formValues: this.responseRecipes },
      }
    );
  }

  openRecipeCard(recipe: any) {
    const dialogRef: MatDialogRef<CardComponent> = this.dialog.open(
      CardComponent,
      {
        data: { formValues: recipe },
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
