import { FC, memo, ReactElement, useEffect, useState } from 'react';
import { Nullable } from 'types/Nullable';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContainer } from '../ModalContainer';
import { getCardsTC, updateCardRatingTC } from 'store/thunks/cards';
import { AppRootStateType } from 'store/store';
import { CardType } from 'dal/cards/types';
import { getCards } from 'selectors/getCards';
import { getCard } from 'utils/handles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { ANSWERS_GRADE } from '../../../constants/modal/index';
import { Button } from '@mui/material';
import style from './LearnModal.module.scss';

type LearnModalPropsType = { disabled: boolean; id: string; name?: string };
type RowRadioButtonsGroupProps = { cardId: string };
type LearnPaclContentProps = {
  id: string;
};

const RowRadioButtonsGroup: FC<RowRadioButtonsGroupProps> = ({ cardId }) => {
  const dispatch = useDispatch();

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {ANSWERS_GRADE.map((answer, index) => {
          const grade = index + 1;
          const onRateButtonClick = () => {
            dispatch(updateCardRatingTC(grade, cardId));
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

const LearnPackContent: FC<LearnPaclContentProps> = memo(({ id }) => {
  const dispatch = useDispatch();
  const cards = useSelector<AppRootStateType, Array<CardType>>(getCards);
  const [currentCard, setCurrentCard] = useState<Nullable<CardType>>();
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);

  const onToggleButtonClick = ():void => {
    if (isShowAnswer) {
      setIsShowAnswer(false);
    } else {
      setIsShowAnswer(true);
    }
  };

  const onNextQuestionClick = ():void => {
    setIsShowAnswer(false);
    setCurrentCard(getCard(cards));
  };

  useEffect(() => {
    dispatch(getCardsTC({ cardsPack_id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    setCurrentCard(getCard(cards));
  }, [id]);

  useEffect(() => {
    if (!currentCard?._id && cards) {
      setCurrentCard(getCard(cards));
    }
  }, [currentCard, cards]);

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
  ({ id, name, children, ...rest }): Nullable<ReactElement> => (
    <ModalContainer
      buttonTitle="Learn"
      modalTitle={`Learn ${name}`}
      mainElement={children}
      {...rest}
    >
      <LearnPackContent id={id} />
    </ModalContainer>
  )
);
