import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { Environment } from '../environment/environment';
import { catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodApiService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  private baseUrl = Environment.foodApiUrl + 'similar';

  private buildIngredientsData(
    ingredients: string[],
    minPrice?: number,
    maxPrice?: number,
    minCalories?: number,
    maxCalories?: number,
    minCarbohydrates?: number,
    maxCarbohydrates?: number,
    minProtein?: number,
    maxProtein?: number,
    minFat?: number,
    maxFat?: number,
    minSugar?: number,
    maxSugar?: number
  ): any {
    const data: any = {
      ingredients: ingredients || [],
    };

    if (minPrice !== undefined) {
      data.min_price = minPrice;
    }
    if (maxPrice !== undefined) {
      data.max_price = maxPrice;
    }
    if (minCalories !== undefined) {
      data.min_calories = minCalories;
    }
    if (maxCalories !== undefined) {
      data.max_calories = maxCalories;
    }
    if (minCarbohydrates !== undefined) {
      data.min_carbohydrates = minCarbohydrates;
    }
    if (maxCarbohydrates !== undefined) {
      data.max_carbohydrates = maxCarbohydrates;
    }
    if (minProtein !== undefined) {
      data.min_protein = minProtein;
    }
    if (maxProtein !== undefined) {
      data.max_protein = maxProtein;
    }
    if (minFat !== undefined) {
      data.min_fat = minFat;
    }
    if (maxFat !== undefined) {
      data.max_fat = maxFat;
    }
    if (minSugar !== undefined) {
      data.min_sugar = minSugar;
    }
    if (maxSugar !== undefined) {
      data.max_sugar = maxSugar;
    }

    return data;
  }

  // http://localhost:5000/api/v1/recipes/similar?id=4405
  getRecipes(
    id: string,
    ingredients: string[],
    filters: {
      minPrice?: number;
      maxPrice?: number;
      minCalories?: number;
      maxCalories?: number;
      minCarbohydrates?: number;
      maxCarbohydrates?: number;
      minProtein?: number;
      maxProtein?: number;
      minFat?: number;
      maxFat?: number;
      minSugar?: number;
      maxSugar?: number;
    } = {}
  ) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const ingredientsData = this.buildIngredientsData(
      ingredients,
      filters.minPrice,
      filters.maxPrice,
      filters.minCalories,
      filters.maxCalories,
      filters.minCarbohydrates,
      filters.maxCarbohydrates,
      filters.minProtein,
      filters.maxProtein,
      filters.minFat,
      filters.maxFat,
      filters.minSugar,
      filters.maxSugar
    );

    // print as json data
    console.log(JSON.stringify(ingredientsData));

    return this.http
      .post(this.baseUrl + '?id=' + id, ingredientsData, { headers })
      .pipe(retry(2), catchError(this.errorHandlerService.handleHttpError));
  }
}
