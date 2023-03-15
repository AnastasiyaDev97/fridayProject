import { memo, useCallback } from 'react';

import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';

import { ModalContainer } from '../ModalContainer';
import style from '../ModalContainer.module.scss';

import { useCustomInput } from 'common/hooks/useCustomInput';
import { addCardTC } from 'store/thunks/cards';
import { addPackTC } from 'store/thunks/packs';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type AddModalPropsType = {
  cardsPackId?: string;
  itemName: 'packs' | 'cards';
  buttonStyle?: string;
  style?: { padding?: string; marginBottom?: string };
};

export const AddModal: React.FC<AddModalPropsType> = memo(
  ({ cardsPackId, itemName, children, ...rest }): ReturnComponentType => {
    const dispatch = useDispatch();
    const { state: nameValue, onChangeInput: onChangeNameInput } = useCustomInput();
    const { state: questionValue, onChangeInput: onChangeQuestionInput } =
      useCustomInput();
    const { state: answerValue, onChangeInput: onChangeAnswerInput } = useCustomInput();

    const onAddButtonClick = useCallback(() => {
      if (itemName === 'packs' && nameValue) {
        dispatch(addPackTC(nameValue));
      }
      if (itemName === 'cards' && questionValue && answerValue && cardsPackId) {
        dispatch(addCardTC(cardsPackId, questionValue, answerValue));
      }
    }, [dispatch, nameValue, itemName, answerValue, questionValue, cardsPackId]);

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

    return (
      <ModalContainer
        {...rest}
        buttonTitle="Add"
        modalTitle="Are you sure you want to add this record?"
        onActionButtonClick={onAddButtonClick}
        mainElement={children}
      >
        {createFields()}
      </ModalContainer>
    );
  },
);
