import { ITagInfo } from './common';

export enum CocktailTag {
  NonAlcoholic,
  Strong,
  Long,
  Soft,
  MediumStrength,
  Shooter,
  Custom,
}

export const cocktailTagInfo: Record<CocktailTag, ITagInfo<CocktailTag>> = {
  [CocktailTag.NonAlcoholic]: {
    color: '#ffab91bb',
    title: 'Non alcoholic',
    image: '/images/cocktails/non-alcoholic.png',
    key: CocktailTag.NonAlcoholic,
  },
  [CocktailTag.Strong]: {
    color: '#fff59dbb',
    title: 'Strong',
    image: '/images/cocktails/strong.png',
    key: CocktailTag.Strong,
  },
  [CocktailTag.Long]: {
    color: '#e0e0e0bb',
    title: 'Long',
    image: '/images/cocktails/long.png',
    key: CocktailTag.Long,
  },
  [CocktailTag.Soft]: {
    color: '#aed581bb',
    title: 'Soft',
    image: '/images/cocktails/soft.png',
    key: CocktailTag.Soft,
  },
  [CocktailTag.MediumStrength]: {
    color: '#9fa8dabb',
    title: 'Medium strength',
    image: '/images/cocktails/medium.png',
    key: CocktailTag.MediumStrength,
  },
  [CocktailTag.Shooter]: {
    color: '#ef9a9abb',
    title: 'Shooter',
    image: '/images/cocktails/shooter.png',
    key: CocktailTag.Shooter,
  },
  [CocktailTag.Custom]: {
    color: '#8bf2ffbb',
    title: 'Custom',
    image: '/images/cocktails/other.png',
    key: CocktailTag.Custom,
  },
};

export enum CocktailUnit {
  Cl,
  Oz,
  BarSpoon,
  Sprig,
  Gram,
  Dash,
  Drop,
  Cube,
  Leaf,
  Slice,
  Ml,
  Half,
  Splash,
  Tablespoon,
  Stalk,
  Zest,
  Third,
  Pinch,
  Teaspoon,
  Part,
  Cup,
  Quarter,
  Scoop,
  Items,
}

export const cocktailUnitInfo: Record<
  CocktailUnit,
  { title: string; key: CocktailUnit }
> = {
  [CocktailUnit.Cl]: {
    title: 'cl',
    key: CocktailUnit.Cl,
  },
  [CocktailUnit.Oz]: {
    title: 'oz',
    key: CocktailUnit.Oz,
  },
  [CocktailUnit.Items]: {
    title: 'items',
    key: CocktailUnit.Items,
  },
  [CocktailUnit.BarSpoon]: {
    title: 'bar spoon',
    key: CocktailUnit.BarSpoon,
  },
  [CocktailUnit.Sprig]: {
    title: 'sprig',
    key: CocktailUnit.Sprig,
  },
  [CocktailUnit.Gram]: {
    title: 'g',
    key: CocktailUnit.Gram,
  },
  [CocktailUnit.Dash]: {
    title: 'dash',
    key: CocktailUnit.Dash,
  },
  [CocktailUnit.Drop]: {
    title: 'drop',
    key: CocktailUnit.Drop,
  },
  [CocktailUnit.Cube]: {
    title: 'cube',
    key: CocktailUnit.Cube,
  },
  [CocktailUnit.Leaf]: {
    title: 'leaf',
    key: CocktailUnit.Leaf,
  },
  [CocktailUnit.Slice]: {
    title: 'slice',
    key: CocktailUnit.Slice,
  },
  [CocktailUnit.Ml]: {
    title: 'ml',
    key: CocktailUnit.Ml,
  },
  [CocktailUnit.Half]: {
    title: 'half',
    key: CocktailUnit.Half,
  },
  [CocktailUnit.Splash]: {
    title: 'splash',
    key: CocktailUnit.Splash,
  },
  [CocktailUnit.Tablespoon]: {
    title: 'table spoon',
    key: CocktailUnit.Tablespoon,
  },
  [CocktailUnit.Stalk]: {
    title: 'stalk',
    key: CocktailUnit.Stalk,
  },
  [CocktailUnit.Zest]: {
    title: 'zest',
    key: CocktailUnit.Zest,
  },
  [CocktailUnit.Third]: {
    title: 'third',
    key: CocktailUnit.Third,
  },
  [CocktailUnit.Pinch]: {
    title: 'pinch',
    key: CocktailUnit.Pinch,
  },
  [CocktailUnit.Teaspoon]: {
    title: 'teaspoon',
    key: CocktailUnit.Teaspoon,
  },
  [CocktailUnit.Part]: {
    title: 'part',
    key: CocktailUnit.Part,
  },
  [CocktailUnit.Cup]: {
    title: 'cup',
    key: CocktailUnit.Cup,
  },
  [CocktailUnit.Quarter]: {
    title: 'quarter',
    key: CocktailUnit.Quarter,
  },
  [CocktailUnit.Scoop]: {
    title: 'scoop',
    key: CocktailUnit.Scoop,
  },
};

export interface ICocktailIngredient {
  ingredientId: string;
  value: number;
  unit: CocktailUnit;
  isOptional: boolean;
  isDecoration: boolean;
}

export interface ICocktail {
  _id: string;
  nameEn: string;
  descriptionEn: string;
  recipeEn: string;
  image: string | null;
  tags: CocktailTag[];
  ingredients: ICocktailIngredient[];
  slug: string;
}
