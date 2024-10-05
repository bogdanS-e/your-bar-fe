import { useState } from 'react';

interface IUseToggleHandlers {
  toggle: () => void;
  on: () => void;
  off: () => void;
}

const useToggle = (initialState: boolean): [boolean, IUseToggleHandlers] => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const on = () => {
    setIsOpen(true);
  };

  const off = () => {
    setIsOpen(false);
  };

  return [isOpen, { toggle, off, on }];
};

export default useToggle;
