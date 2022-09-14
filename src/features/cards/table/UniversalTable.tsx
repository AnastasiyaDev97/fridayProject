import { memo, ReactElement } from 'react';
import style from './UniversalTable.module.scss';
import { TableRow } from './TableRow/TableRow';
import classNames from 'classnames';
import { EMPTY_STRING } from '../../../constants';

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
  itemName: 'packs' | 'cards';
  tableTitles: { title: string; value: string }[];
  tableItems: ItemValues[];
  onSetSortingClick: (sortName: string, direction: 'up' | 'down') => void;
};

export const UniversalTable = memo(
  ({
    tableTitles,
    tableItems,
    onSetSortingClick,
    itemName,
  }: TablePropsType) => {
    return (
      <table className={style.table}>
        <thead>
          <tr>
            {tableTitles.map(({ title, value }, i) => {
              const onUpSortTitleClick = () => {
                onSetSortingClick(value, 'up');
              };
              const onDownSortTitleClick = () => {
                onSetSortingClick(value, 'down');
              };

              return (
                <th key={title} className={style.tableHeader}>
                  <div className={style.headerContent}>
                    <span>{title}</span>
                    <div
                      onClick={onDownSortTitleClick}
                      className={classNames(style.sortArrow, style.sortArrowUp)}
                    />
                    <div
                      onClick={onUpSortTitleClick}
                      className={classNames(
                        style.sortArrow,
                        style.sortArrowDown
                      )}
                    />
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
          {tableItems.map((row) => {
            return (
              <TableRow key={row.id} itemValues={row} itemName={itemName} />
            );
          })}
        </tbody>
      </table>
    );
  }
);
