import { memo, ReactElement } from 'react';
import { Nullable } from 'types/Nullable';
import { useDispatch } from 'react-redux';
import { addPackTC } from 'store/thunks/packs';
import { addCardTC } from 'store/thunks/cards';

type AddModalPropsType = {};

export const AddModal: React.FC<AddModalPropsType> = memo(
  (): Nullable<ReactElement> => {
    const dispatch = useDispatch();

    /*  const onSavePackButtonClick = useCallback(() => {
      dispatch(addPackTC(name));
      onCloseModalButtonClick();
    }, [dispatch, name, onCloseModalButtonClick]);
  
    const onSaveCardButtonClick = useCallback(() => {
      dispatch(addCardTC(id, question, answer));
      onCloseModalButtonClick();
    }, [dispatch, id, question, answer, onCloseModalButtonClick]); */
    return <></>;
  }
);
