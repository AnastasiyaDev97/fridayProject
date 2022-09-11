import { memo, ReactElement, useCallback } from 'react';
import { Nullable } from 'types/Nullable';
import { useDispatch } from 'react-redux';
import { updatePackTC } from 'store/thunks/packs';
import { updateCardTC } from 'store/thunks/cards';

type UpdateModalPropsType = {};

export const UpdateModal: React.FC<UpdateModalPropsType> = memo(
  (): Nullable<ReactElement> => {
    const dispatch = useDispatch();

    const onUpdatePackClick = useCallback(() => {
      /*   dispatch(updatePackTC(id, name)); */
    }, [dispatch]);

    const onUpdateCardClick = useCallback(() => {
      /*  if (cardsPack_id) {
        dispatch(updateCardTC(cardsPack_id, { _id: id, question, answer }));
      } */
    }, [dispatch]);
    return <></>;
  }
);
