import { FC, ReactNode, memo, useCallback, useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';

import { ModalContainer } from '../ModalContainer';
import style from '../ModalContainer.module.scss';

import { EntityType } from 'common/types/EntityType';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { useAddCardMutation } from 'dal/cards';
import { useAddPackMutation } from 'dal/packs';
import { useCustomInput } from 'hooks/useCustomInput';

type AddModalPropsType = {
  cardsPackId?: string;
  itemName: EntityType;
  buttonStyle?: string;
  style?: { padding?: string; marginBottom?: string };
  children: ReactNode;
};

export const AddModal: FC<AddModalPropsType> = memo(
  ({
    cardsPackId,
    itemName,
    children,
    ...rest
  }: AddModalPropsType): ReturnComponentType => {
    const [addCard /* { data: cardData, error: addCardError } */] = useAddCardMutation();
    const [addPack /* { data: cardData, error: addCardError } */] = useAddPackMutation();

    const {
      state: nameValue,
      resetState: resetNameValue,
      onChangeInput: onChangeNameInput,
    } = useCustomInput('');
    const {
      state: questionValue,
      resetState: resetQuestionValue,
      onChangeInput: onChangeQuestionInput,
    } = useCustomInput('');
    const {
      state: answerValue,
      resetState: resetAnswerValue,
      onChangeInput: onChangeAnswerInput,
    } = useCustomInput('');

    const [isActionModalButtonDisabled, setIsActionModalButtonDisabled] = useState(true);

    const onAddButtonClick = useCallback(() => {
      if (itemName === 'packs' && nameValue) {
        addPack({ cardsPack: { name: nameValue } });
        resetNameValue();
      }
      if (itemName === 'cards' && questionValue && answerValue && cardsPackId) {
        addCard({
          card: {
            cardsPack_id: cardsPackId,
            question: questionValue,
            answer: answerValue,
          },
        });
        resetQuestionValue();
        resetAnswerValue();
      }
    }, [
      addCard,
      nameValue,
      itemName,
      answerValue,
      questionValue,
      cardsPackId,
      addPack,
      resetQuestionValue,
      resetAnswerValue,
      resetNameValue,
    ]);

    const createFields = (): ReturnComponentType => {
      if (itemName === 'packs') {
        return (
          <TextField
            id="outlined-basic"
            label="Add name"
            variant="outlined"
            value={nameValue}
            onChange={onChangeNameInput}
            className={style.field}
          />
        );
      }
      if (itemName === 'cards') {
        return (
          <>
            <TextField
              id="outlined-basic"
              label="Add question"
              variant="outlined"
              value={questionValue}
              onChange={onChangeQuestionInput}
              className={style.field}
            />
            <TextField
              id="outlined-basic"
              label="Add answer"
              variant="outlined"
              value={answerValue}
              onChange={onChangeAnswerInput}
            />
          </>
        );
      }

      return null;
    };

    useEffect(() => {
      if (itemName === 'packs') {
        if (nameValue && nameValue.length > 0) {
          setIsActionModalButtonDisabled(false);
        } else {
          setIsActionModalButtonDisabled(true);
        }
      }
      if (itemName === 'cards') {
        if (
          questionValue &&
          questionValue.length > 0 &&
          answerValue &&
          answerValue.length > 0
        ) {
          setIsActionModalButtonDisabled(false);
        } else {
          setIsActionModalButtonDisabled(true);
        }
      }
    }, [nameValue, itemName, setIsActionModalButtonDisabled, answerValue, questionValue]);

    return (
      <ModalContainer
        {...rest}
        buttonTitle="Add"
        modalTitle="Are you sure you want to add this record?"
        onActionButtonClick={onAddButtonClick}
        mainElement={children}
        isActionModalButtonDisabled={isActionModalButtonDisabled}
      >
        {createFields()}
      </ModalContainer>
    );
  },
);
