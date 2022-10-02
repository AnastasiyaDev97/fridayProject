import { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import defaultAva from '../../common/assets/images/noavatar.png';
import style from './InputTypeFile.module.scss';
import { useDispatch } from 'react-redux';
import { setErrorText } from 'store/reducers/app-reducer';

type InputFileTypeProps = {
  onUpdateAvatar: (newAvatar: string) => void;
  avatar: string;
};

export const InputTypeFile: FC<InputFileTypeProps> = memo(
  ({ onUpdateAvatar, avatar }) => {
    const dispatch = useDispatch();

    const [ava, setAva] = useState(avatar);
    const [isAvaBroken, setIsAvaBroken] = useState(false);

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length) {
        const file = e.target.files[0];
        if (file?.size < 4000000) {
          convertFileToBase64(file, (file64: string) => {
            setAva(file64);
          });
        } else {
          dispatch(setErrorText('File is too large'));
        }
      }
    };

    const convertFileToBase64 = (
      file: File,
      callBack: (value: string) => void
    ) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const file64 = reader.result as string;
        callBack(file64);
      };
      reader.readAsDataURL(file);
    };

    const errorHandler = () => {
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
          <input
            type="file"
            onChange={uploadHandler}
            style={{ display: 'none' }}
          />
          <IconButton
            component="span"
            className={style.uploadIcon}
            color="inherit"
          >
            <CloudUploadIcon sx={{ width: '100%', height: '100%' }} />
          </IconButton>
        </label>
      </div>
    );
  }
);
