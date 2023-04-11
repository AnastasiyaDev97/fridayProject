import { FC, memo, ReactElement, ReactNode, useEffect, useState } from 'react';

import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useDispatch } from 'react-redux';

import { ANSWERS_GRADE } from '../../../constants/modal/index';
import { ModalContainer } from '../ModalContainer';

import style from './LearnModal.module.scss';

import { Nullable } from 'common/types/Nullable';
import { useGetCardsQuery, useUpdateCardGradeMutation } from 'dal/cards';
import { CardType } from 'dal/cards/types';
import { updateCardRatingTC } from 'store/thunks/cards';
import { getCard } from 'utils/handles';

type LearnModalPropsType = {
  disabled: boolean;
  id: string;
  name?: string;
  children: ReactNode;
};
type RowRadioButtonsGroupProps = { cardId: string };
type LearnPaclContentProps = {
  id: string;
};

const RowRadioButtonsGroup: FC<RowRadioButtonsGroupProps> = ({ cardId }) => {
  const dispatch = useDispatch();
  const [updateCardGrade /* { data: cardData, error: addCardError } */] =
    useUpdateCardGradeMutation();

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {ANSWERS_GRADE.map((answer, index) => {
          const grade = index + 1;
          const onRateButtonClick = (): void => {
            updateCardGrade({ grade, card_id: cardId });
            /* dispatch(updateCardRatingTC(grade, cardId)); */
          };

          return (
            <FormControlLabel
              sx={{ color: 'black' }}
              value={index + 1}
              control={<Radio />}
              label={answer}
              key={answer}
              onClick={onRateButtonClick}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

const LearnPackContent: FC<LearnPaclContentProps> = memo(({ id }: { id: string }) => {
  /* const dispatch = useDispatch(); */
  const {
    data: cardsData,
    /* error: cardsError, */
    isSuccess: isCardsSuccess,
    /* isLoading: isCardsLoading, */
  } = useGetCardsQuery({ cardsPack_id: id }, { skip: !id });

  const [currentCard, setCurrentCard] = useState<Nullable<CardType>>();
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);

  const onToggleButtonClick = (): void => {
    if (isShowAnswer) {
      setIsShowAnswer(false);
    } else {
      setIsShowAnswer(true);
    }
  };

  const onNextQuestionClick = (): void => {
    setIsShowAnswer(false);
    if (cardsData?.cards && isCardsSuccess) {
      setCurrentCard(getCard(cardsData.cards));
    }
  };

  /*   useEffect(() => {
    dispatch(getCardsTC({ cardsPack_id: id }));
  }, [dispatch, id]); */

  /*   useEffect(() => {
    if (cardsData?.cards) {
      setCurrentCard(getCard(cardsData.cards));
    }
  }, [id]); */

  useEffect(() => {
    if (!currentCard?._id && cardsData?.cards) {
      setCurrentCard(getCard(cardsData.cards));
    }
  }, [currentCard, cardsData?.cards]);

  if (!currentCard) {
    return null;
  }

  return (
    <div className={style.contentBlock}>
      <span className={style.question}>{currentCard.question}</span>
      <RowRadioButtonsGroup cardId={currentCard._id} />
      {isShowAnswer && <div className={style.answer}>{currentCard.answer}</div>}
      <div className={style.buttonsBlock}>
        <Button onClick={onToggleButtonClick}>
          {isShowAnswer ? 'Hide answer' : 'Show answer'}
        </Button>
        <Button onClick={onNextQuestionClick}>Next question</Button>
      </div>
    </div>
  );
});

export const LearnModal: React.FC<LearnModalPropsType> = memo(
  ({ id, name, children, ...rest }: LearnModalPropsType): Nullable<ReactElement> => (
    <ModalContainer
      buttonTitle="Learn"
      modalTitle={`Learn ${name}`}
      mainElement={children}
      {...rest}
    >
      <LearnPackContent id={id} />
    </ModalContainer>
  ),
);
