import { memo, useState, MouseEvent, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import styles from './ModalContainer.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { SuperButton } from 'components/SuperButton';

type ModalContainerPropsType = {
  modalTitle: string;
  buttonTitle: string;
  children?: ReactNode;
  onActionButtonClick?: () => void;
  disabled?: boolean;
  style?: { padding?: string; marginBottom?: string };
  mainElement?: ReactNode;
  isActionModalButtonDisabled?: boolean;
};

export const ModalContainer = memo(
  ({
    modalTitle,
    buttonTitle,
    children,
    onActionButtonClick,
    disabled,
    style,
    mainElement,
    isActionModalButtonDisabled,
  }: ModalContainerPropsType): ReturnComponentType => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = (
      e: MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>,
    ): void => {
      e.stopPropagation();
      setOpen(true);
    };

    const handleClose = (): void => {
      setOpen(false);
    };

    const handleActionClick = (): void => {
      if (onActionButtonClick) {
        onActionButtonClick();
      }
      handleClose();
    };

    return (
      <div>
        {mainElement ? (
          <div
            onClick={e => handleClickOpen(e)}
            className={`${disabled ? styles.disabled : styles.active}`}
          >
            {mainElement}
          </div>
        ) : (
          <SuperButton
            onClick={e => handleClickOpen(e)}
            disabled={disabled}
            style={style}
          >
            {buttonTitle}
          </SuperButton>
        )}
        <Modal
          onClick={event => event.stopPropagation()}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.modalBox}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ color: 'rgba(0, 0, 0, 0.87)' }}
              id="modal-modal-title"
            >
              {modalTitle}
            </Typography>
            <div className={styles.modalDescription} id="modal-modal-description">
              {open && children}
            </div>
            <div className={styles.buttonWrapper}>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              {onActionButtonClick && (
                <Button
                  disabled={isActionModalButtonDisabled}
                  onClick={handleActionClick}
                  variant="outlined"
                >
                  {buttonTitle}
                </Button>
              )}
            </div>
          </Box>
        </Modal>
      </div>
    );
  },
);
