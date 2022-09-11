import { FC, memo, ReactElement, useState } from 'react';
import s from './Modal.module.scss';
import SuperButton from '../../../Components/TestComponents/components/c2-SuperButton/SuperButton';
import { Nullable } from '../../../types/Nullable';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { modalActionType } from '../../../enum/Modals';

export type ModalPropsType = {
  modalBody?: {
    title: string;
    btn: {
      title: string;
      callback: () => void;
    };
  };
  onCloseModalButtonClick: () => void;
  isActivePrevBtn: boolean;
  modalAction: modalActionType;
  onNextCardButtonClick: () => void;
};

export const Modal: FC<ModalPropsType> = memo(
  ({ children }): Nullable<ReactElement> => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open alert dialog
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
);
