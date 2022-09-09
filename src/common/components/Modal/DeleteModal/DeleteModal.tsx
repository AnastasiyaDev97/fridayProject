import { FC, memo } from 'react';
import { modalActionType, modalEntityType } from 'enum/Modals';
import s from './../ModalContainer/ModalContainer.module.scss';
type DeleteModalType = {
  modalAction: modalActionType;
  modalEntity: modalEntityType;
};

export const DeleteModal: FC<DeleteModalType> = memo(
  ({ modalAction, modalEntity }) => {
    const { Delete } = modalActionType;
    if (modalAction !== Delete) {
      return null;
    }

    return (
      <span className={s.span}>
        Do you really want to remove this `{modalEntity}`?
        <br />
        All cards will be excluded from this course
      </span>
    );
  }
);
