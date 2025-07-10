import {Dispatch, SetStateAction, useState} from 'react';

type TUseToggle = {
  isShowing: boolean;
  setIsShowing: Dispatch<SetStateAction<boolean>>;
  onToggle: () => void;
};
const useToggle = (initial = false): TUseToggle => {
  const [isShowing, setIsShowing] = useState<boolean>(initial);

  const onToggle = () => {
    setIsShowing(prev => !prev);
  };

  return {isShowing, setIsShowing, onToggle};
};

export {useToggle};
