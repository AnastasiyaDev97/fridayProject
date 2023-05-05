import { ReactNode, memo, useCallback } from 'react';

import TextField from '@mui/material/TextField';

import { ModalContainer } from '../ModalContainer';
import style from '../ModalContainer.module.scss';

import { useCustomInput } from 'common/hooks/useCustomInput';
import { EntityType } from 'common/types/EntityType';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { useUpdateCardMutation } from 'dal/cards';
import { useUpdatePackMutation } from 'dal/packs';

type UpdateModalPropsType = {
  id: string;
  name?: string;
  question?: string;
  answer?: string;
  cardsPackId?: string;
  itemName: EntityType;
  disabled: boolean;
  children: ReactNode;
};

export const UpdateModal: React.FC<UpdateModalPropsType> = memo(
  ({
    id,
    name,
    question,
    answer,
    itemName,
    children,
    cardsPackId,
    ...rest
  }: UpdateModalPropsType): ReturnComponentType => {
    const [updateCard /* { data: cardData, error: addCardError } */] =
      useUpdateCardMutation();
    const [updatePack /* { data: cardData, error: addCardError } */] =
      useUpdatePackMutation();

    const { state: nameValue, onChangeInput: onChangeNameInput } = useCustomInput(name);
    const { state: questionValue, onChangeInput: onChangeQuestionInput } =
      useCustomInput(question);
    const { state: answerValue, onChangeInput: onChangeAnswerInput } =
      useCustomInput(answer);

    const onUpdateButtonClick = useCallback(() => {
      if (itemName === 'packs' && nameValue && cardsPackId) {
        updatePack({ cardsPack: { _id: cardsPackId, name: nameValue } });
        /* dispatch(updatePackTC(id, nameValue)); */
      }
      if (itemName === 'cards') {
        updateCard({ card: { _id: id, question: questionValue, answer: answerValue } });
        /*  dispatch(
          updateCardTC(cardsPackId, {
            _id: id,
            question: questionValue,
            answer: answerValue,
          }),
        ); */
      }
    }, [
      itemName,
      answerValue,
      nameValue,
      questionValue,
      cardsPackId,
      id,
      updatePack,
      updateCard,
    ]);

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
