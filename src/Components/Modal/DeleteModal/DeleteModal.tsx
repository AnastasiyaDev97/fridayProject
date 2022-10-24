import { memo, useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { ModalContainer } from '../ModalContainer';

import { deleteCardTC } from 'store/thunks/cards';
import { deletePackTC } from 'store/thunks/packs';
import { ReturnComponentType } from 'types/ReturnComponentType';

type DeleteModalPropsType = {
  id: string;
  cardsPackId?: string;
  itemName: 'packs' | 'cards';
  disabled: boolean;
};

export const DeleteModal: React.FC<DeleteModalPropsType> = memo(
  ({ id, cardsPackId, itemName, disabled, children }): ReturnComponentType => {
    const dispatch = useDispatch();

    const onDeleteButtonClick = useCallback(() => {
      if (itemName === 'packs') {
        dispatch(deletePackTC(id));
      }
      if (itemName === 'cards' && cardsPackId) {
        dispatch(deleteCardTC(cardsPackId, id));
      }
    }, [dispatch, id, cardsPackId, itemName]);

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
