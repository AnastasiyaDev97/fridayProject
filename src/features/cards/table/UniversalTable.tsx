import { memo, ReactElement } from 'react';
import style from './UniversalTable.module.scss';
import { TableRow } from './TableRow/TableRow';
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

  onSetSortingClick: (headerName: string) => void;
};

export const UniversalTable = memo(
  ({
    tableTitles,
    tableItems,
    onSetSortingClick,
    itemName,
  }: TablePropsType) => {
    /* const titlesOfHeaders = Object.entries(headers); */
    return (
      <table className={style.table}>
        <thead>
          <tr>
            {tableTitles.map(({ title, value }, i) => {
              /*   const classNameForSpanValue =
                key !== 'actions' ? style.value : EMPTY_STRING; */

              const onTitleClick = () => {
                /*    onSetSortingClick(key); */
              };

              return (
                <th
                  key={i}
                  onClick={onTitleClick}
                  className={style.tableHeader}
                >
                  <span className={style.value}>{title}</span>
                </th>
              );
            })}
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
