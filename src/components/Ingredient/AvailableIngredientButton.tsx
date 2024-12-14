import { CheckmarkButton } from 'components/Button';
import { useMemo } from 'react';
import useUser from '../AuthHandler/useUser';
import { useToggle } from 'hooks';
import LoginModal from '../AuthHandler/LoginModal';
import useAddIngredientToUser from '../AuthHandler/useAddIngredientToUser';
import useDeleteIngredientFromUser from '../AuthHandler/useDeleteIngredientFromUser';

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
  }, [user, ingredientId]);

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
