import { useState, useEffect, ReactNode, memo } from 'react';

import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import type { URLSearchParamsInit } from 'react-router-dom';

import style from './SortingButton.module.scss';

import { EntityType, ReturnComponentType } from 'common/types';
import { CardFieldsValuesType, PackFieldsValuesType } from 'constants/table';

type CommonFieldsValuesType = PackFieldsValuesType | CardFieldsValuesType;

type SortingDirecionType = '0' | '1';

type SortingButtonPropsType = {
  sortingFieldNameFromProps: CommonFieldsValuesType;
  children: ReactNode;
  sortingItemsName: EntityType;
};

export const SortingButton = memo(
  ({
    sortingFieldNameFromProps,
    children,
    sortingItemsName,
  }: SortingButtonPropsType): ReturnComponentType => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortItems = searchParams.get(`sort${sortingItemsName}`);

    const currentSortingField = (): CommonFieldsValuesType => {
      if (sortItems) {
        return sortItems.slice(1) as CommonFieldsValuesType;
      }

      return 'updated' as CommonFieldsValuesType;
    };

    const currentSortingDirection = (): SortingDirecionType => {
      if (sortItems) {
        return sortItems.slice(0, 1) as SortingDirecionType;
      }

      return '0' as SortingDirecionType;
    };

    const [sortingField, setSortingField] = useState<CommonFieldsValuesType>(
      currentSortingField(),
    );
    const [sortingDirection, setSortingDirection] = useState<SortingDirecionType>(
      currentSortingDirection(),
    );

    const isSortingButtonExist = sortingField === sortingFieldNameFromProps;

    const clsName = sortingDirection === '0' ? style.sortArrowUp : style.sortArrowDown;

    const onToggleSortClick = (): void => {
      if (isSortingButtonExist) {
        setSortingDirection(state => {
          if (state === '0') {
            return '1';
          }

          return '0';
        });
      } else {
        setSortingField(sortingFieldNameFromProps);
      }
    };

    useEffect(() => {
      if (isSortingButtonExist) {
        setSearchParams({
          ...Object.fromEntries([...searchParams]),
          [`sort${sortingItemsName}`]: sortingDirection + sortingField,
        } as URLSearchParamsInit);
      }
    }, [
      sortingField,
      sortingDirection,
      setSearchParams,
      searchParams,
      isSortingButtonExist,
      sortingItemsName,
    ]);

    return (
      <div className={style.sortButtons} onClick={onToggleSortClick}>
        {children}
        {isSortingButtonExist && <div className={classNames(style.sortArrow, clsName)} />}
      </div>
    );
  },
);
