import { FC, memo, ReactElement, ReactNode, useEffect, useState } from 'react';

import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { ModalContainer } from '../ModalContainer';

import style from './LearnModal.module.scss';

import { Nullable } from 'common/types/Nullable';
import { ANSWERS_GRADE } from 'constants/modal/index';
import { useGetCardsQuery, useUpdateCardGradeMutation } from 'dal/cards';
import { CardType } from 'dal/cards/types';
import { getCard } from 'utils';

type LearnModalPropsType = {
  disabled: boolean;
  id: string;
  name?: string;
  children: ReactNode;
};
type RowRadioButtonsGroupProps = {
  onInputChange: (value: Nullable<string>) => void;
  defaultValue: Nullable<string>;
};
type LearnPaclContentProps = {
  id: string;
};

const RowRadioButtonsGroup: FC<RowRadioButtonsGroupProps> = ({
  onInputChange,
  defaultValue,
}) => {
  const onRateButtonClick = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onInputChange((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={defaultValue}
        onChange={onRateButtonClick}
      >
        {ANSWERS_GRADE.map((answer, index) => {
          return (
            <FormControlLabel
              sx={{ color: 'black' }}
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

const LearnPackContent: FC<LearnPaclContentProps> = memo(({ id }: { id: string }) => {
  const {
    data: cardsData,
    /* error: cardsError, */
    isSuccess: isCardsSuccess,
    /* isLoading: isCardsLoading, */
  } = useGetCardsQuery({ cardsPack_id: id }, { skip: !id });

  const [updateCardGrade /* { data: cardData, error: addCardError } */] =
    useUpdateCardGradeMutation();

  const [currentCard, setCurrentCard] = useState<Nullable<CardType>>();
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [currentGrade, setCurrentGrade] = useState<Nullable<string>>(null);

  const onToggleButtonClick = (): void => {
    if (isShowAnswer) {
      setIsShowAnswer(false);
    } else {
      setIsShowAnswer(true);
    }
  };

  const onNextQuestionClick = (): void => {
    setIsShowAnswer(false);
    if (currentGrade && currentCard) {
      updateCardGrade({ grade: Number(currentGrade), card_id: currentCard._id });
      setCurrentGrade(null);
    }
    if (cardsData?.cards && isCardsSuccess) {
      setCurrentCard(getCard(cardsData.cards));
    }
  };

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
      <RowRadioButtonsGroup onInputChange={setCurrentGrade} defaultValue={currentGrade} />
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
  ({ id, name, children, ...rest }: LearnModalPropsType): Nullable<ReactElement> => {
    return (
      <ModalContainer
        buttonTitle="Learn"
        modalTitle={`Learn ${name}`}
        mainElement={children}
        {...rest}
      >
        <LearnPackContent id={id} />
      </ModalContainer>
    );
  },
);
