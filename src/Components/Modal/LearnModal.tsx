import { memo, ReactElement } from 'react';
import { Nullable } from 'types/Nullable';
import { useDispatch, useSelector } from "react-redux";


type LearnModalPropsType = {};

export const LearnModal: React.FC<LearnModalPropsType> = memo(
  (): Nullable<ReactElement> => {
    const dispatch = useDispatch();

/*     const onNextCardButtonClick = useCallback(() => {
      if (!isActivePrevBtn) {
        setIsActivePrevBtn(true);
      }
      let newCard = getCard(cards);
      setActiveCard(newCard);
      setIsPrevCards([newCard, ...prevCards]);
    }, [cards, isActivePrevBtn, prevCards]);
  
    const onPrevCardButtonClick = useCallback(() => {
      if (conditionForExecution) {
        setActiveCard(prevCards[activeCardIndex]);
        setActiveCardIndex(activeCardIndex + 1);
        return;
      }
      setIsActivePrevBtn(false);
    }, [activeCard, activeCardIndex, prevCards, conditionForExecution]);
 */
    return <></>;
  }
);