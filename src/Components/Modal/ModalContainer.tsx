import SuperButton from 'Components/TestComponents/components/c2-SuperButton/SuperButton';
import { memo, ReactElement, useState } from 'react';
import { Nullable } from 'types/Nullable';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

type ModalContainerPropsType = {
  modalTitle: string;
  buttonTitle: string;
  children?: ReactElement;
  onActionButtonClick: () => void;
};

export const ModalContainer: React.FC<ModalContainerPropsType> = memo(
  ({
    modalTitle,
    buttonTitle,
    children,
    onActionButtonClick,
  }): Nullable<ReactElement> => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleActionClick = () => {
      onActionButtonClick();
      handleClose();
    };

    return (
      <div>
        <SuperButton onClick={handleClickOpen}>{buttonTitle}</SuperButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{modalTitle}</DialogTitle>
          <DialogContent>
            {children}
            {/* <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleActionClick} autoFocus>
              {buttonTitle}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
);
