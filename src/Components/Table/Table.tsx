import { memo, ReactElement } from 'react';

import classNames from 'classnames';

import { TableRow } from '../TableRow/TableRow';

import style from './Table.module.scss';

import { EntityType } from 'common/types/DataType';
import { ReturnComponentType } from 'common/types/ReturnComponentType';

export type PackRowValues = {
  name?: string;
  cardsCount?: number;
  updated: string;
  user_name?: string;
};

export type CardRowValues = {
  question?: string;
  answer?: string;
  updated: string;
  rating?: ReactElement;
};

export type ItemValues = {
  userId: string;
  cardsPackId?: string;
  id: string;
  tableValues: CardRowValues & PackRowValues;
};

type TablePropsType = {
  itemName: EntityType;
  tableTitles: { title: string; value: string }[];
  tableItems: ItemValues[];
  onSetSortingClick: (sortName: string, direction: 'up' | 'down') => void;
};

export const Table = memo(
  ({
    tableTitles,
    tableItems,
    onSetSortingClick,
    itemName,
  }: TablePropsType): ReturnComponentType => {
    return (
      <table className={style.table}>
        <thead>
          <tr>
            {tableTitles.map(({ title, value }) => {
              const onUpSortTitleClick = (): void => {
                onSetSortingClick(value, 'up');
              };
              const onDownSortTitleClick = (): void => {
                onSetSortingClick(value, 'down');
              };

              return (
                <th
                  key={title}
                  className={`${style.tableHeader}  ${
                    title === 'Count' ? style.smallWidth : ''
                  }`}
                >
                  <div className={style.headerContent}>
                    <span className={style.tableTitle}>{title}</span>
                    <div className={style.sortButtons}>
                      <div
                        onClick={onDownSortTitleClick}
                        className={classNames(style.sortArrow, style.sortArrowUp)}
                      />
                      <div
                        onClick={onUpSortTitleClick}
                        className={classNames(style.sortArrow, style.sortArrowDown)}
                      />
                    </div>
                  </div>
                </th>
              );
            })}
            <th className={style.tableHeader}>
              <span>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableItems.map(row => {
            return <TableRow key={row.id} itemValues={row} itemName={itemName} />;
          })}
        </tbody>
      </table>
    );
  },
);
