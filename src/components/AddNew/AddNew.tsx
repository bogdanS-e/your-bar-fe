import { AddCocktailModal } from 'components/Cocktail';
import Dropdown from 'components/Dropdown';
import IconButton from 'components/IconButton';
import { AddIngredientModal } from 'components/Ingredient';
import { useState } from 'react';

type TTypeToAdd = 'ingredient' | 'cocktail';

const AddNew = () => {
  const [isAddIngredientOpen, setIsAddIngredientOpen] = useState(false);
  const [isAddCocktailOpen, setIsAddCocktailOpen] = useState(false);

  const handleOptionClick = (type: TTypeToAdd) => {
    if (type === 'ingredient') {
      setIsAddIngredientOpen(true);

      return;
    }

    setIsAddCocktailOpen(true);
  };

  return (
    <>
      <Dropdown
        trigger={
          <IconButton size={50}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <path
                  d="M4 12H20M12 4V20"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{' '}
              </g>
            </svg>
          </IconButton>
        }
        renderItem={(type) => `Add ${type}`}
        items={['ingredient', 'cocktail']}
        position="top"
        onOptionClick={handleOptionClick}
      />
      <AddIngredientModal
        isOpen={isAddIngredientOpen}
        onClose={() => setIsAddIngredientOpen(false)}
      />
      <AddCocktailModal
        isOpen={isAddCocktailOpen}
        onClose={() => setIsAddCocktailOpen(false)}
      />
    </>
  );
};

export default AddNew;
