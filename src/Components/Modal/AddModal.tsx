import { memo, ReactElement, useCallback } from 'react';
import { Nullable } from 'types/Nullable';
import { useDispatch } from 'react-redux';
import { addPackTC } from 'store/thunks/packs';
import { addCardTC } from 'store/thunks/cards';
import { useCustomInput } from 'common/hooks/useCustomInput';
import { ModalContainer } from './ModalContainer';
import TextField from '@mui/material/TextField';

type AddModalPropsType = {
  cardsPackId?: string;
  itemName: 'packs' | 'cards';
};

export const AddModal: React.FC<AddModalPropsType> = memo(
  ({ cardsPackId, itemName }): Nullable<ReactElement> => {
    const dispatch = useDispatch();
    const { state: nameValue, onChangeInput: onChangeNameInput } =
      useCustomInput();
    const { state: questionValue, onChangeInput: onChangeQuestionInput } =
      useCustomInput();
    const { state: answerValue, onChangeInput: onChangeAnswerInput } =
      useCustomInput();

    const onAddButtonClick = useCallback(() => {
      if (itemName === 'packs' && nameValue) {
        dispatch(addPackTC(nameValue));
      }
      if (itemName === 'cards' && questionValue && answerValue && cardsPackId) {
        dispatch(addCardTC(cardsPackId, questionValue, answerValue));
      }
    }, [
      dispatch,
      nameValue,
      itemName,
      answerValue,
      questionValue,
      cardsPackId,
    ]);

    const createFields = () => {
      if (itemName === 'packs') {
        return (
          <TextField
            id="outlined-basic"
            label="Add name"
            variant="outlined"
            value={nameValue}
            onChange={onChangeNameInput}
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
    };

    return (
      <ModalContainer
        buttonTitle="Add"
        modalTitle="Are you sure you want to add this record?"
        onActionButtonClick={onAddButtonClick}
      >
        {createFields()}
      </ModalContainer>
    );
  }
);
