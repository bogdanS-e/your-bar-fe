import { ITagInfo } from './common';

export enum IngredientTag {
  Beverages,
  Strong,
  Syrup,
  Soft,
  Fruit,
  Juice,
  Other,
  Custom,
}

export const ingredientTagInfo: Record<IngredientTag, ITagInfo<IngredientTag>> = {
  [IngredientTag.Beverages]: {
    color: '#ffab91bb',
    title: 'Beverages',
    image: '/images/ingredients/beverages.png',
    key: IngredientTag.Beverages,
  },
  [IngredientTag.Strong]: {
    color: '#fff59dbb',
    title: 'Strong',
    image: '/images/ingredients/strong.png',
    key: IngredientTag.Strong,
  },
  [IngredientTag.Syrup]: {
    color: '#e0e0e0bb',
    title: 'Syrup',
    image: '/images/ingredients/syrup.png',
    key: IngredientTag.Syrup,
  },
  [IngredientTag.Soft]: {
    color: '#aed581bb',
    title: 'Soft',
    image: '/images/ingredients/soft.png',
    key: IngredientTag.Soft,
  },
  [IngredientTag.Fruit]: {
    color: '#9fa8dabb',
    title: 'Fruits',
    image: '/images/ingredients/fruits.png',
    key: IngredientTag.Fruit,
  },
  [IngredientTag.Juice]: {
    color: '#ef9a9abb',
    title: 'Juice',
    image: '/images/ingredients/juice.png',
    key: IngredientTag.Juice,
  },
  [IngredientTag.Other]: {
    color: '#00acc1bb',
    title: 'Other',
    image: '/images/ingredients/other.png',
    key: IngredientTag.Other,
  },
  [IngredientTag.Custom]: {
    color: '#8bf2ffbb',
    title: 'Custom',
    image: '/images/ingredients/other.png',
    key: IngredientTag.Custom,
  },
};

export interface IIngredient {
  _id: string;
  nameEn: string;
  descriptionEn: string;
  image: string | null;
  tags: IngredientTag[];
  slug: string;
}
