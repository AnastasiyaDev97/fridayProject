import { useEffect, ReactNode, memo } from 'react';

import classNames from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import type { URLSearchParamsInit } from 'react-router-dom';

import style from './SortingButton.module.scss';

import { ReturnComponentType } from 'common/types';
import { CommonFieldsValuesType, SortingDirecionType } from 'components/Table/types';
import { STATUS } from 'constants/app';
import { useAppSelector } from 'store';

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

    const status = useAppSelector(state => state.app.status);

    const locationState = location?.state;

    const isSortingButtonExist = sortingField === sortingFieldNameFromProps;

    const arrowClsName =
      sortingDirection === '0' ? style.sortArrowUp : style.sortArrowDown;
    const disableButtonClsName = status === STATUS.LOADING ? style.disabled : '';

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
      <div
        className={classNames(style.sortButtons, disableButtonClsName)}
        onClick={onSortButtonClick}
      >
        {children}
        {isSortingButtonExist && (
          <div className={classNames(style.sortArrow, arrowClsName)} />
        )}
      </div>
    );
  },
);
