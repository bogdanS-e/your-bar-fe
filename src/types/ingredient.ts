export enum IngredientTag {
  Beverages = 'beverages',
  Strong = 'strong',
  Syrup = 'syrup',
  Soft = 'soft',
  Fruit = 'fruit',
  Juice = 'juice',
  Other = 'other',
}

export interface IIngredient {
  tags: IngredientTag[];
}