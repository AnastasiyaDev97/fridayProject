import { memo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { SkeletonTableRow, TableRow } from '../TableRow';

import style from './Table.module.scss';
import { CommonFieldsValuesType, SortingDirecionType, TablePropsType } from './types';

import { ReturnComponentType } from 'common/types';
import { SortingButton } from 'components';
import { generateArray } from 'utils';

const SKELETON_TABLE_ITEMS = generateArray(7);

export const Table = memo(
  ({ tableTitles, tableItems, itemName }: TablePropsType): ReturnComponentType => {
    const [searchParams] = useSearchParams();

    const sortItems = searchParams.get('sort');

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

    const onToggleSortClick = (buttonTitle: CommonFieldsValuesType): void => {
      if (buttonTitle === sortingField) {
        setSortingDirection(state => {
          if (state === '0') {
            return '1';
          }

          return '0';
        });
      } else {
        setSortingField(buttonTitle);
      }
    };

    return (
      <table className={style.table}>
        <thead>
          <tr>
            {tableTitles.map(({ title, value }) => {
              return (
                <th
                  key={title}
                  className={`${style.tableHeader}  ${
                    title === 'Count' ? style.smallWidth : ''
                  }`}
                >
                  <SortingButton
                    sortingFieldNameFromProps={value}
                    sortingField={sortingField}
                    sortingDirection={sortingDirection}
                    onToggleSortClick={onToggleSortClick}
                  >
                    <div className={style.headerContent}>
                      <span className={style.tableTitle}>{title}</span>
                    </div>
                  </SortingButton>
                </th>
              );
            })}
            <th className={style.tableHeader}>
              <span>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableItems &&
            tableItems.map(row => {
              return <TableRow key={row.id} itemValues={row} itemName={itemName} />;
            })}
          {!tableItems &&
            SKELETON_TABLE_ITEMS.map(row => {
              return <SkeletonTableRow key={row} colSpan={tableTitles?.length + 1} />;
            })}
        </tbody>
      </table>
    );
  },
);
