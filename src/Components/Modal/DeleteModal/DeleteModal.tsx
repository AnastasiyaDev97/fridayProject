import { ReactNode, memo, useCallback } from 'react';

import { ModalContainer } from '../ModalContainer';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { useDeleteCardMutation } from 'dal/cards';
import { useDeletePackMutation } from 'dal/packs';

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
    cardsPackId,
    itemName,
    disabled,
    children,
  }: DeleteModalPropsType): ReturnComponentType => {
    const [deleteCard /* { data: cardData, error: addCardError } */] =
      useDeleteCardMutation();
    const [deletePack /* { data: cardData, error: addCardError } */] =
      useDeletePackMutation();

    const onDeleteButtonClick = useCallback(() => {
      if (itemName === 'packs' && cardsPackId) {
        deletePack(cardsPackId);
        /* dispatch(deletePackTC(id)); */
      }
      if (itemName === 'cards' /* && cardsPackId */) {
        deleteCard(id);
        /* dispatch(deleteCardTC(cardsPackId, id)); */
      }
    }, [id, /* cardsPackId, */ itemName, deleteCard, cardsPackId, deletePack]);

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
