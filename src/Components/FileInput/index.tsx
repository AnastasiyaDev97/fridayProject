import { ChangeEvent, memo, useState } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';

import style from './FileInput.module.scss';

import defaultAva from 'common/assets/images/noavatar.png';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { setErrorText } from 'store/reducers/app';

const MAX_FILE_SIZE = 4000000;

type FileInputPropsType = {
  updateImage: (newAvatar: string) => void;
  image: string;
};

export const FileInput = memo(
  ({ updateImage, image }: FileInputPropsType): ReturnComponentType => {
    const dispatch = useDispatch();

    const [isImageBroken, setIsImageBroken] = useState(false);

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      if (e.target.files && e.target.files.length) {
        const file = e.target.files[0];

        if (file?.size < MAX_FILE_SIZE) {
          convertFileToBase64(file, (file64: string) => {
            updateImage(file64);
          });
        } else {
          dispatch(setErrorText({ errorText: 'File is too large' }));
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
      setIsImageBroken(true);
      dispatch(setErrorText({ errorText: 'Unsupported image format' }));
    };

    return (
      <div className={style.inputFileBlock}>
        <img
          src={isImageBroken ? defaultAva : image}
          className={style.avatar}
          onError={errorHandler}
          alt="avatar"
        />
        <label>
          <input
            type="file"
            onChange={uploadHandler}
            style={{ display: 'none' }}
            accept="image/*"
          />
          <IconButton component="span" className={style.uploadIcon} color="inherit">
            <CloudUploadIcon sx={{ width: '100%', height: '100%' }} />
          </IconButton>
        </label>
      </div>
    );
  },
);
