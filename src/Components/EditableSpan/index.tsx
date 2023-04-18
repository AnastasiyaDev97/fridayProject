import { ChangeEvent, FC, KeyboardEvent, memo, useState } from 'react';

import style from './EditableSpan.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { SuperInputText } from 'components/SuperInputText';

type EditableSpanPropsType = {
  title: string;
  updateTitle: (newTitle: string) => void;
};
export const EditableSpan: FC<EditableSpanPropsType> = memo(
  ({ title, updateTitle }: EditableSpanPropsType): ReturnComponentType => {
    const [isEdit, toggleEdit] = useState(true);
    const [name, setName] = useState(title);

    const onActivateInputMode = (): void => {
      toggleEdit(false);
    };

    const onInputActivateSpanModeBlur = (): void => {
      toggleEdit(true);
      updateTitle(name);
    };

    const onInputActivateModePress = (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
        toggleEdit(true);
        updateTitle(name);
      }
    };

    const onInputUpdateTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      setName(e.currentTarget.value);
    };

    return isEdit ? (
      <span onClick={onActivateInputMode} className={style.textField}>
        {name}
      </span>
    ) : (
      <SuperInputText
        type="text"
        value={name}
        onBlur={onInputActivateSpanModeBlur}
        autoFocus
        onChange={onInputUpdateTitleChange}
        className={style.inputField}
        onKeyPress={onInputActivateModePress}
      />
    );
  },
);
