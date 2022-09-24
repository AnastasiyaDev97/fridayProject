import { memo, ReactElement, useCallback } from 'react';
import { Nullable } from 'types/Nullable';
import { useDispatch } from 'react-redux';
import { updatePackTC } from 'store/thunks/packs';
import { updateCardTC } from 'store/thunks/cards';
import { ModalContainer } from '../ModalContainer';
import TextField from '@mui/material/TextField';
import { useCustomInput } from 'common/hooks/useCustomInput';

type UpdateModalPropsType = {
  id: string;
  name?: string;
  question?: string;
  answer?: string;
  cardsPackId?: string;
  itemName: 'packs' | 'cards';
  disabled: boolean;
};

export const UpdateModal: React.FC<UpdateModalPropsType> = memo(
  ({
    id,
    name,
    question,
    answer,
    cardsPackId,
    itemName,
    children,
    ...rest
  }): Nullable<ReactElement> => {
    const dispatch = useDispatch();
    const { state: nameValue, onChangeInput: onChangeNameInput } =
      useCustomInput(name);
    const { state: questionValue, onChangeInput: onChangeQuestionInput } =
      useCustomInput(question);
    const { state: answerValue, onChangeInput: onChangeAnswerInput } =
      useCustomInput(answer);

    const onUpdateButtonClick = useCallback(() => {
      if (itemName === 'packs' && nameValue) {
        dispatch(updatePackTC(id, nameValue));
      }
      if (itemName === 'cards' && cardsPackId) {
        dispatch(
          updateCardTC(cardsPackId, {
            _id: id,
            question: questionValue,
            answer: answerValue,
          })
        );
      }
    }, [
      dispatch,
      itemName,
      answerValue,
      nameValue,
      questionValue,
      cardsPackId,
      id,
    ]);

    const editableFields = () => {
      if (itemName === 'packs') {
        return (
          <TextField
            id="outlined-basic"
            label="Update name"
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
              label="Update question"
              variant="outlined"
              value={questionValue}
              onChange={onChangeQuestionInput}
            />
            <TextField
              id="outlined-basic"
              label="Update answer"
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
        buttonTitle="Update"
        modalTitle="Are you sure you want to update this record?"
        onActionButtonClick={onUpdateButtonClick}
        mainElement={children}
        {...rest}
      >
        {editableFields()}
      </ModalContainer>
    );
  }
);
