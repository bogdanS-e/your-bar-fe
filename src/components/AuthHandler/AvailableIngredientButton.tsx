import { CheckmarkButton } from 'components/Button';
import { useMemo } from 'react';
import useUser from './useUser';
import { useToggle } from 'hooks';
import LoginModal from './LoginModal';
import useAddIngredientToUser from './useAddIngredientToUser';
import useDeleteIngredientFromUser from './useDeleteIngredientFromUser';

interface IAvailableIngredientButtonProps {
  ingredientId: string;
}

const AvailableIngredientButton = ({ ingredientId }: IAvailableIngredientButtonProps) => {
  const { data: user } = useUser();
  const addIngredientToUserMutation = useAddIngredientToUser(ingredientId);
  const deleteIngredientFromUserMutation = useDeleteIngredientFromUser(ingredientId);
  const [isLoginOpen, isLoginOpenHandler] = useToggle(false);

  const isAvailable = useMemo(() => {
    return !!user?.ingredients.includes(ingredientId);
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
      <CheckmarkButton isActive={isAvailable} onClick={onIconClick} />
      <LoginModal isOpen={isLoginOpen} onClose={isLoginOpenHandler.off} />
    </>
  );
};

export default AvailableIngredientButton;
