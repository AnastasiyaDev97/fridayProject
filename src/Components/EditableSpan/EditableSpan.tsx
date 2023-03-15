import { ChangeEvent, FC, KeyboardEvent, memo, useState } from 'react';

import style from './EditableSpan.module.scss';

import { SuperInputText } from 'components/SuperInputText';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

type editableSpanPropsType = {
  title: string;
  updateTitle: (newTitle: string) => void;
};
export const EditableSpan: FC<editableSpanPropsType> = memo(
  ({ title, updateTitle }): ReturnComponentType => {
    let [isEdit, toggleEdit] = useState(true);
    let [name, setName] = useState(title);

    const onActivateInputModeDblClick = (): void => {
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
      <span onDoubleClick={onActivateInputModeDblClick} className={style.span}>
        {name}
      </span>
    ) : (
      <SuperInputText
        value={name}
        onBlur={onInputActivateSpanModeBlur}
        autoFocus
        onChange={onInputUpdateTitleChange}
        className={style.input}
        onKeyPress={onInputActivateModePress}
      />
    );
  },
);
