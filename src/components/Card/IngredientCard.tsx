import {
  LoginModal,
  useAddIngredientToUser,
  useUser,
} from 'components/AuthHandler';
import Card, { ICardProps } from './Card';
import { useMemo } from 'react';
import useDeleteIngredientFromUser from 'components/AuthHandler/useDeleteIngredientFromUser';
import { useToggle } from 'hooks';

interface IIngredientCardProps extends ICardProps {
  ingredientId: string;
}

const IngredientCard = ({ ingredientId, ...props }: IIngredientCardProps) => {
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
    <>
      <Card {...props} isAvailable={isAvailable} onIconClick={onIconClick} />

      <LoginModal isOpen={isLoginOpen} onClose={isLoginOpenHandler.off} />
    </>
  );
};

export default IngredientCard;
