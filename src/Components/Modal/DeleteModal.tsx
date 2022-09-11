import { memo, ReactElement, useCallback } from 'react';
import { Nullable } from 'types/Nullable';
import { ModalContainer } from './ModalContainer';
import { useDispatch } from 'react-redux';
import { deletePackTC } from 'store/thunks/packs';
import { deleteCardTC } from 'store/thunks/cards';

type DeleteModalPropsType = {
  id: string;
  cardsPackId?: string;
  itemName: 'packs' | 'cards';
};

export const DeleteModal: React.FC<DeleteModalPropsType> = memo(
  ({ id, cardsPackId, itemName }): Nullable<ReactElement> => {
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
        buttonTitle="Delete"
        modalTitle="Are you sure you want to delete this record?"
        onActionButtonClick={onDeleteButtonClick}
      />
    );
  }
);
