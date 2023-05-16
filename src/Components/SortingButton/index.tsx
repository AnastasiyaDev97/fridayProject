import { useEffect, ReactNode, memo } from 'react';

import classNames from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import type { URLSearchParamsInit } from 'react-router-dom';

import style from './SortingButton.module.scss';

import { ReturnComponentType } from 'common/types';
import { CommonFieldsValuesType, SortingDirecionType } from 'components/Table/types';

type SortingButtonPropsType = {
  sortingFieldNameFromProps: CommonFieldsValuesType;
  sortingField: CommonFieldsValuesType;
  sortingDirection: SortingDirecionType;
  children: ReactNode;
  onToggleSortClick: (buttonTitle: CommonFieldsValuesType) => void;
};

export const SortingButton = memo(
  ({
    sortingFieldNameFromProps,
    sortingField,
    sortingDirection,
    children,
    onToggleSortClick,
  }: SortingButtonPropsType): ReturnComponentType => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const locationState = location?.state;

    const isSortingButtonExist = sortingField === sortingFieldNameFromProps;

    const clsName = sortingDirection === '0' ? style.sortArrowUp : style.sortArrowDown;

    const onSortButtonClick = (): void => {
      onToggleSortClick(sortingFieldNameFromProps);
    };

    useEffect(() => {
      if (isSortingButtonExist) {
        setSearchParams(
          {
            ...Object.fromEntries([...searchParams]),
            sort: sortingDirection + sortingField,
          } as URLSearchParamsInit,
          { state: locationState },
        );
      }
    }, [
      sortingField,
      sortingDirection,
      setSearchParams,
      searchParams,
      isSortingButtonExist,
      locationState,
    ]);

    return (
      <div className={style.sortButtons} onClick={onSortButtonClick}>
        {children}
        {isSortingButtonExist && <div className={classNames(style.sortArrow, clsName)} />}
      </div>
    );
  },
);
