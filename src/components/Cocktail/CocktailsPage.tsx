import { ICocktail } from "types/cocktail";
import useCocktails from "./useCocktails";

interface ICocktailsPageProps {
  initialData: ICocktail[];
}

const CocktailsPage = ({ initialData }: ICocktailsPageProps) => {
  const { data: queryData } = useCocktails();
  
  const data = queryData || initialData;

  return (
    <div>
      {data.map(({ _id, nameEn }) => (
        <h2 key={_id}>{nameEn}</h2>
      ))}
    </div>
  )
}

export default CocktailsPage;