import { List } from 'lodash';

export class RecipeRequest {
  constructor(
    public recipeId: number | null = null,
    public omittedIngredients: string[] = []
  ) {}
}
