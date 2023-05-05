import { ReactNode, memo, useCallback } from 'react';

import { ModalContainer } from '../ModalContainer';

import { EntityType, ReturnComponentType } from 'common/types';
import { useDeleteCardMutation } from 'dal/cards';
import { useDeletePackMutation } from 'dal/packs';

type DeleteModalPropsType = {
  id: string;
  itemName: EntityType;
  disabled: boolean;
  children: ReactNode;
};

export const DeleteModal: React.FC<DeleteModalPropsType> = memo(
  ({ id, itemName, disabled, children }: DeleteModalPropsType): ReturnComponentType => {
    const [deleteCard /* { data: cardData, error: addCardError } */] =
      useDeleteCardMutation();
    const [deletePack /* { data: cardData, error: addCardError } */] =
      useDeletePackMutation();

    const onDeleteButtonClick = useCallback(() => {
      if (itemName === 'packs') {
        deletePack(id);
      }
      if (itemName === 'cards') {
        deleteCard(id);
      }
    }, [id, itemName, deleteCard, deletePack]);

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
