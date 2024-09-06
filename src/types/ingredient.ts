export enum IngredientTag {
  Beverages,
  Strong,
  Syrup,
  Soft,
  Fruit,
  Juice,
  Other,
}

interface IIngredientTagInfo {
  color: string;
  title: string;
}

export const ingredientTagInfo: Record<IngredientTag, IIngredientTagInfo> = {
  [IngredientTag.Beverages]: {
    color: '#ffab91bb',
    title: 'Beverages',
  },
  [IngredientTag.Strong]: {
    color: '#fff59dbb',
    title: 'Strong alcohol',
  },
  [IngredientTag.Syrup]: {
    color: '#e0e0e0bb',
    title: 'Syrup',
  },
  [IngredientTag.Soft]: {
    color: '#aed581bb',
    title: 'Soft alcohol',
  },
  [IngredientTag.Fruit]: {
    color: '#9fa8dabb',
    title: 'Fruits',
  },
  [IngredientTag.Juice]: {
    color: '#ef9a9abb',
    title: 'Juice',
  },
  [IngredientTag.Other]: {
    color: '#00acc1bb',
    title: 'Other',
  },
};

export interface IIngredient {
  tags: IngredientTag[];
}
