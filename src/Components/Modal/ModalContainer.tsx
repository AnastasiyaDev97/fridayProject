import { memo, useState, MouseEvent, ReactNode } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

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

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle sx={{ color: 'rgba(0, 0, 0, 0.87)' }} id="alert-dialog-title">
            {modalTitle}
          </DialogTitle>
          <DialogContent
            sx={{
              marginBottom: '10px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {open && children}
          </DialogContent>
          <DialogActions>
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
          </DialogActions>
        </Dialog>
      </div>
    );
  },
);
