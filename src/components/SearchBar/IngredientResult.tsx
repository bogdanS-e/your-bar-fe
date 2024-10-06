import { useAddIngredientToUser, useUser } from 'components/AuthHandler';
import useDeleteIngredientFromUser from 'components/AuthHandler/useDeleteIngredientFromUser';
import { useToggle } from 'hooks';
import { useMemo } from 'react';
import SearchCard, { ISearchCardProps } from './SearchCard';

interface IngredientResultProps extends ISearchCardProps {
  ingredientId: string;
}

const IngredientResult = ({
  href,
  name,
  image,
  ingredientId,
}: IngredientResultProps) => {
  const addIngredientToUserMutation = useAddIngredientToUser(ingredientId);
  const deleteIngredientFromUserMutation =
    useDeleteIngredientFromUser(ingredientId);
  const { data: user } = useUser();

  const [isLoginOpen, isLoginOpenHandler] = useToggle(false);

  const isAvailable = useMemo(() => {
    return user?.ingredients.includes(ingredientId);
  }, [user]);

  const onIconClick = () => {
    if (!user) {
      isLoginOpenHandler.on();

      return;
    }

    if (isAvailable) {
      deleteIngredientFromUserMutation.mutate();

      return;
    }

    addIngredientToUserMutation.mutate();
  };

  return (
    <SearchCard
      href={href}
      name={name}
      image={image}
      onIconClick={onIconClick}
      isAvailable={isAvailable}
    />
  );
};

export default IngredientResult;
