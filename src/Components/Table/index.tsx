import { memo, ReactElement } from 'react';

import { TableRow } from '../TableRow';

import style from './Table.module.scss';

import { EntityType } from 'common/types/EntityType';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { SortingButton } from 'components';
import { TableFieldstype } from 'constants/table';

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
  tableTitles: TableFieldstype;
  tableItems: ItemValues[];
};

export const Table = memo(
  ({ tableTitles, tableItems, itemName }: TablePropsType): ReturnComponentType => {
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
                    sortingItemsName={itemName}
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
          {tableItems.map(row => {
            return <TableRow key={row.id} itemValues={row} itemName={itemName} />;
          })}
        </tbody>
      </table>
    );
  },
);
