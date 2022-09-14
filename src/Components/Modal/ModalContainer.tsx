import SuperButton from 'Components/TestComponents/components/c2-SuperButton/SuperButton';
import { memo, ReactElement, useState } from 'react';
import { Nullable } from 'types/Nullable';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

type ModalContainerPropsType = {
  modalTitle: string;
  buttonTitle: string;
  children?: ReactElement;
  onActionButtonClick?: () => void;
  disabled?: boolean;
  style?: { padding?: string; marginBottom?: string };
};

export const ModalContainer: React.FC<ModalContainerPropsType> = memo(
  ({
    modalTitle,
    buttonTitle,
    children,
    onActionButtonClick,
    disabled,
    style,
  }): Nullable<ReactElement> => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleActionClick = () => {
      if (onActionButtonClick) {
        onActionButtonClick();
      }
      handleClose();
    };

    return (
      <div>
        <SuperButton
          onClick={handleClickOpen}
          disabled={disabled}
          style={style}
        >
          {buttonTitle}
        </SuperButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{modalTitle}</DialogTitle>
          <DialogContent sx={{ marginBottom: '10px' }}>
            {open && children}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {onActionButtonClick && (
              <Button onClick={handleActionClick} autoFocus>
                {buttonTitle}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
);
