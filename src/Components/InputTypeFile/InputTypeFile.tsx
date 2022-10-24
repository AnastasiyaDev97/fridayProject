import { ChangeEvent, FC, memo, useEffect, useState } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';

import style from './InputTypeFile.module.scss';

import defaultAva from 'common/assets/images/noavatar.png';
import { setErrorText } from 'store/reducers/app-reducer';
import { ReturnComponentType } from 'types/ReturnComponentType';

type InputFileTypeProps = {
  onUpdateAvatar: (newAvatar: string) => void;
  avatar: string;
};

const MAX_FILE_SIZE = 4000000;

export const InputTypeFile: FC<InputFileTypeProps> = memo(
  ({ onUpdateAvatar, avatar }): ReturnComponentType => {
    const dispatch = useDispatch();

    const [ava, setAva] = useState(avatar);
    const [isAvaBroken, setIsAvaBroken] = useState(false);

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      if (e.target.files && e.target.files.length) {
        const file = e.target.files[0];

        if (file?.size < MAX_FILE_SIZE) {
          convertFileToBase64(file, (file64: string) => {
            setAva(file64);
          });
        } else {
          dispatch(setErrorText('File is too large'));
        }
      }
    };

    const convertFileToBase64 = (file: File, callBack: (value: string) => void): void => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const file64 = reader.result as string;

        callBack(file64);
      };
      reader.readAsDataURL(file);
    };

    const errorHandler = (): void => {
      setIsAvaBroken(true);
      dispatch(setErrorText('Unsupported image format'));
    };

    useEffect(() => {
      onUpdateAvatar(ava);
    }, [ava, onUpdateAvatar]);

    return (
      <div className={style.inputFileBlock}>
        <img
          src={isAvaBroken ? defaultAva : ava}
          className={style.avatar}
          onError={errorHandler}
          alt="ava"
        />
        <label>
          <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
          <IconButton component="span" className={style.uploadIcon} color="inherit">
            <CloudUploadIcon sx={{ width: '100%', height: '100%' }} />
          </IconButton>
        </label>
      </div>
    );
  },
);
