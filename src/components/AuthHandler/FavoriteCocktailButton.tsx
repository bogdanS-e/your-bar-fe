import { HeartButton } from 'components/Button';
import { useMemo } from 'react';
import useUser from './useUser';
import useAddFavoriteCocktailToUser from './useAddFavoriteCocktailToUser';
import useDeleteFavoriteCocktailFromUser from './useDeleteFavoriteCocktailFromUser';
import { useToggle } from 'hooks';
import LoginModal from './LoginModal';

interface IFavoriteCocktailButtonProps {
  cocktailId: string;
}

const FavoriteCocktailButton = ({ cocktailId }: IFavoriteCocktailButtonProps) => {
  const { data: user } = useUser();
  const addFavoriteCocktailToUserMutation = useAddFavoriteCocktailToUser(cocktailId);
  const deleteFavoriteCocktailFromUserMutation = useDeleteFavoriteCocktailFromUser(cocktailId);
  const [isLoginOpen, isLoginOpenHandler] = useToggle(false);

  const isFavorite = useMemo(() => {
    return !!user?.favoriteCocktails.includes(cocktailId);
  }, [user]);

  const onIconClick = () => {
    if (!user) {
      isLoginOpenHandler.on();

      return;
    }

    if (isFavorite) {
      deleteFavoriteCocktailFromUserMutation.mutate();

      return;
    }

    addFavoriteCocktailToUserMutation.mutate();
  };

  return (
    <>
      <HeartButton isActive={isFavorite} onClick={onIconClick} />
      <LoginModal isOpen={isLoginOpen} onClose={isLoginOpenHandler.off} />
    </>
  );
};

export default FavoriteCocktailButton;
