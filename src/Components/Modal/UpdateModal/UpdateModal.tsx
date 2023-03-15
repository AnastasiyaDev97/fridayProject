import { memo, useCallback } from 'react';

import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';

import { ModalContainer } from '../ModalContainer';
import style from '../ModalContainer.module.scss';

import { useCustomInput } from 'common/hooks/useCustomInput';
import { updateCardTC } from 'store/thunks/cards';
import { updatePackTC } from 'store/thunks/packs';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

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
  }): ReturnComponentType => {
    const dispatch = useDispatch();
    const { state: nameValue, onChangeInput: onChangeNameInput } = useCustomInput(name);
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
          }),
        );
      }
    }, [dispatch, itemName, answerValue, nameValue, questionValue, cardsPackId, id]);

    const editableFields = (): ReturnComponentType => {
      if (itemName === 'packs') {
        return (
          <TextField
            id="outlined-basic"
            label="Update name"
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

      return null;
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
  },
);
