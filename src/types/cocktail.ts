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
    image: '/images/beverages.png',
    key: CocktailTag.NonAlcoholic,
  },
  [CocktailTag.Strong]: {
    color: '#fff59dbb',
    title: 'Strong',
    image: '/images/strong.png',
    key: CocktailTag.Strong,
  },
  [CocktailTag.Long]: {
    color: '#e0e0e0bb',
    title: 'Long',
    image: '/images/syrup.png',
    key: CocktailTag.Long,
  },
  [CocktailTag.Soft]: {
    color: '#aed581bb',
    title: 'Soft',
    image: '/images/soft.png',
    key: CocktailTag.Soft,
  },
  [CocktailTag.MediumStrength]: {
    color: '#9fa8dabb',
    title: 'Medium strength',
    image: '/images/fruits.png',
    key: CocktailTag.MediumStrength,
  },
  [CocktailTag.Shooter]: {
    color: '#ef9a9abb',
    title: 'Shooter',
    image: '/images/juice.png',
    key: CocktailTag.Shooter,
  },
  [CocktailTag.Custom]: {
    color: '#8bf2ffbb',
    title: 'Custom',
    image: '/images/other.png',
    key: CocktailTag.Custom,
  },
};

export interface ICocktailngredient {
  ingredientId: string;
  value: number;
  unit: string;
}
