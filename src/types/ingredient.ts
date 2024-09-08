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
  image: string;
  key: IngredientTag;
}

export const ingredientTagInfo: Record<IngredientTag, IIngredientTagInfo> = {
  [IngredientTag.Beverages]: {
    color: '#ffab91bb',
    title: 'Beverages',
    image: '/images/beverages.png',
    key: IngredientTag.Beverages,
  },
  [IngredientTag.Strong]: {
    color: '#fff59dbb',
    title: 'Strong alcohol',
    image: '/images/strong.png',
    key: IngredientTag.Strong,
  },
  [IngredientTag.Syrup]: {
    color: '#e0e0e0bb',
    title: 'Syrup',
    image: '/images/syrup.png',
    key: IngredientTag.Syrup,
  },
  [IngredientTag.Soft]: {
    color: '#aed581bb',
    title: 'Soft alcohol',
    image: '/images/soft.png',
    key: IngredientTag.Soft,
  },
  [IngredientTag.Fruit]: {
    color: '#9fa8dabb',
    title: 'Fruits',
    image: '/images/fruits.png',
    key: IngredientTag.Fruit,
  },
  [IngredientTag.Juice]: {
    color: '#ef9a9abb',
    title: 'Juice',
    image: '/images/juice.png',
    key: IngredientTag.Juice,
  },
  [IngredientTag.Other]: {
    color: '#00acc1bb',
    title: 'Other',
    image: '/images/other.png',
    key: IngredientTag.Other,
  },
};

export interface IIngredient {
  _id: string;
  nameEn: string;
  descriptionEn: string;
  image: string | null;
  tags: IngredientTag[];
}
