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

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  recipes = this.recipeService.getRecipeNames();
  myControl = new FormControl('');
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
    if (this.myControl.value == '') {
      this.snackBar.open('Debe ingresar una receta antes de continuar', '', {
        duration: 2000,
      });
      return;
    }
    var recipeId = this.recipeService.getRecipeByName(this.myControl.value!);
    if (recipeId) {
      this.loading = true;
      this.hidden = true;
      this.foodApiService
        .getRecipes(recipeId.id.toString())
        .subscribe((data) => {
          console.log(data);
          this.responseRecipes = data;
          this.hidden = false;
          this.loading = false;
        });
    }
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
