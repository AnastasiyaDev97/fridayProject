import { ReactNode, memo, useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { ModalContainer } from '../ModalContainer';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { useDeleteCardMutation } from 'dal/cards';
import { deletePackTC } from 'store/thunks/packs';

type DeleteModalPropsType = {
  id: string;
  cardsPackId?: string;
  itemName: 'packs' | 'cards';
  disabled: boolean;
  children: ReactNode;
};

export const DeleteModal: React.FC<DeleteModalPropsType> = memo(
  ({
    id,
    /* cardsPackId, */
    itemName,
    disabled,
    children,
  }: DeleteModalPropsType): ReturnComponentType => {
    const dispatch = useDispatch();

    const [deleteCard /* { data: cardData, error: addCardError } */] =
      useDeleteCardMutation();

    const onDeleteButtonClick = useCallback(() => {
      if (itemName === 'packs') {
        dispatch(deletePackTC(id));
      }
      if (itemName === 'cards' /* && cardsPackId */) {
        deleteCard(id);
        /* dispatch(deleteCardTC(cardsPackId, id)); */
      }
    }, [dispatch, id, /* cardsPackId, */ itemName, deleteCard]);

    return (
      <ModalContainer
        disabled={disabled}
        buttonTitle="Delete"
        modalTitle="Are you sure you want to delete this record?"
        onActionButtonClick={onDeleteButtonClick}
        mainElement={children}
      />
    );
  },
);
