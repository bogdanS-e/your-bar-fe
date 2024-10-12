import { LoginModal, useUser } from 'components/AuthHandler';
import Card, { ICardProps } from './Card';
import { useAvailableCocktailsSet, useToggle } from 'hooks';

interface IIngredientCardProps extends ICardProps {
  cocktailId: string;
}

const CocktailCard = ({ cocktailId, ...props }: IIngredientCardProps) => {
  const { data: user } = useUser();
  const availableCocktailsSet = useAvailableCocktailsSet();

  const [isLoginOpen, isLoginOpenHandler] = useToggle(false);

  const onIconClick = () => {
    if (!user) {
      isLoginOpenHandler.on();

      return;
    }
  };

  return (
    <>
      <Card
        {...props}
        isAvailable={availableCocktailsSet.has(cocktailId)}
        onIconClick={onIconClick}
      />
      <LoginModal isOpen={isLoginOpen} onClose={isLoginOpenHandler.off} />
    </>
  );
};

export default CocktailCard;
