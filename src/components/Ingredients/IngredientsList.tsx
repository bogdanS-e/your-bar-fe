import { IIngredient } from "types/ingredient";
import useIngredients from "./useIngredients";

interface IIngredientsListProps {
  initialData: IIngredient[];
}

const IngredientsList = ({ initialData }: IIngredientsListProps) => {
  const { data: queryData } = useIngredients();
  const data = queryData || initialData;

  return (
    <div id='here-we-have-it'>
      {data.map(({_id, nameEn}) => (
        <div key={_id}>
          {nameEn}
        </div>
      ))}
    </div>
  )
}

export default IngredientsList;