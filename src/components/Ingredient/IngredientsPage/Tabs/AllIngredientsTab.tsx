import { IIngredient, IngredientTag } from 'types/ingredient';

import Head from 'next/head';
import Ingredients from '../Ingredients';

interface IAllIngredientsTabProps {
  initialData: IIngredient[];
  selectedTags: IngredientTag[];
}

const AllIngredientsTab = ({ initialData, selectedTags }: IAllIngredientsTabProps) => {
  return (
    <>
      <Head>
        <title>All Ingredients | Your Bar</title>
      </Head>
      <Ingredients initialData={initialData} selectedTags={selectedTags} />
    </>
  );
};

export default AllIngredientsTab;
