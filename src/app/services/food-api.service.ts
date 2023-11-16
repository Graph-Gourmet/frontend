import { HttpClient } from '@angular/common/http';
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

  // http://localhost:5000/api/v1/recipes/similar?id=4405
  getRecipes(id: string) {
    return this.http
      .get(this.baseUrl + '?id=' + id)
      .pipe(retry(2), catchError(this.errorHandlerService.handleHttpError));
  }
}
