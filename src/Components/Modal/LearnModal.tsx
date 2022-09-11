import { FC, memo, ReactElement, useEffect, useState } from 'react';
import { Nullable } from 'types/Nullable';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContainer } from './ModalContainer';
import { getCardsTC } from 'store/thunks/cards';
import { RootReducerType } from 'store/store';
import { CardType } from 'dal/cards/types';
import { getCards } from 'selectors/getCards';
import { getCard } from 'utils/handles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ANSWERS_GRADE } from './../../constants/modal/index';

type LearnModalPropsType = { disabled: boolean; id: string; name?: string };
type LearnPaclContentProps = { id: string };

const RowRadioButtonsGroup = ({ title }: { title: string }) => {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{title}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {ANSWERS_GRADE.map((answer, index) => {
          return (
            <FormControlLabel
              value={index + 1}
              control={<Radio />}
              label={answer}
              key={answer}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

const LearnPackContent: FC<LearnPaclContentProps> = memo(({ id }) => {
  const dispatch = useDispatch();
  const cards = useSelector<RootReducerType, Array<CardType>>(getCards);

  const [currentCard, setCurrentCard] = useState(getCard(cards));

  useEffect(() => {
    dispatch(getCardsTC({ cardsPack_id: id }));
  }, [dispatch, id]);

  return (
    <div>
      <RowRadioButtonsGroup title={currentCard?.answer} />
    </div>
  );
});

export const LearnModal: React.FC<LearnModalPropsType> = memo(
  ({ id, name, ...rest }): Nullable<ReactElement> => {
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

    const onRateButtonClick = useCallback((grade: number) => {
        dispatch(updateCardRatingTC(grade, activeCardId))
        onNextCardButtonClick()
    }, [dispatch, activeCardId, onNextCardButtonClick])
 */
    return (
      <ModalContainer
        buttonTitle="Learn"
        modalTitle={`Learn ${name}`}
        {...rest}
      >
        <LearnPackContent id={id} />
      </ModalContainer>
    );
  }
);
