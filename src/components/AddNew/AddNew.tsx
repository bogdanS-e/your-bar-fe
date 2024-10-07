import { useAuth0 } from '@auth0/auth0-react';
import { LoginModal } from 'components/AuthHandler';
import { CreateCocktailModal } from 'components/Cocktail';
import Dropdown from 'components/Dropdown';
import IconButton from 'components/IconButton';
import { PlusIcon } from 'components/Icons';
import { AddIngredientModal } from 'components/Ingredient';
import { useToggle } from 'hooks';
import { useState } from 'react';

type TTypeToAdd = 'ingredient' | 'cocktail';

const AddNew = () => {
  const { isAuthenticated } = useAuth0();

  const [isAddIngredientOpen, addIngredientHandler] = useToggle(false);
  const [isAddCocktailOpen, addCocktailHandler] = useToggle(false);
  const [isLoginOpen, isLoginOpenHandler] = useToggle(false);

  const handleOptionClick = (type: TTypeToAdd) => {
    if (!isAuthenticated) {
      isLoginOpenHandler.on();

      return;
    }
    if (type === 'ingredient') {
      addIngredientHandler.on();

      return;
    }

    addCocktailHandler.on();
  };

  return (
    <>
      <Dropdown
        trigger={
          <IconButton size={50}>
            <PlusIcon />
          </IconButton>
        }
        renderItem={(type) => `Add ${type}`}
        items={['ingredient', 'cocktail']}
        position="top"
        onOptionClick={handleOptionClick}
      />
      <AddIngredientModal isOpen={isAddIngredientOpen} onClose={addIngredientHandler.off} />
      <CreateCocktailModal isOpen={isAddCocktailOpen} onClose={addCocktailHandler.off} />
      <LoginModal isOpen={isLoginOpen} onClose={isLoginOpenHandler.off} />
    </>
  );
};

export default AddNew;
