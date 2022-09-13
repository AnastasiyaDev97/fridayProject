import s from './PacksList.module.scss';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { UniversalTable } from '../../features/cards/table/UniversalTable';
import Paginator from '../pagination/Pagination';
import { useDispatch } from 'react-redux';
import {
  changePageAC,
  changeSearchPackNameAC,
  setSortingFilter,
} from '../../store/reducers/packs-reducer';
import { convertDateFormat } from '../../utils/handles';
import SuperInputText from '../TestComponents/components/c1-SuperInputText/SuperInputText';
import SuperButton from '../TestComponents/components/c2-SuperButton/SuperButton';
import { UseSetTimeoutEffect } from '../../common/hooks/customUseEffect';
import { PackType } from '../../dal/packs/types';

import { COMPONENT_NAME } from '../../enum/ComponentName';
import { Nullable } from 'types/Nullable';
import { PACK_TABLE_FIELDS } from 'constants/table';

type PackListPropsType = {
  packs: Array<PackType>;
  currentPage: number;
  totalItemCount: number;
  pageCount: number;
  sortPacks: string;
  actualPackName: Nullable<string>;
};

export const PacksList = memo(
  ({
    packs,
    currentPage,
    totalItemCount,
    pageCount,
    sortPacks,
    actualPackName,
  }: PackListPropsType) => {
    const dispatch = useDispatch();

    const [text, setText] = useState<string>(actualPackName || '');

    const portionSize = 10;

    const packsForTable = useMemo(() => {
      return packs.map(
        ({ cardsCount, user_name, name, updated, user_id, _id }) => {
          updated = convertDateFormat(updated);

          return {
            userId: user_id,
            id: _id,
            tableValues: {
              name,
              cardsCount,
              updated,
              user_name,
            },
          };
        }
      );
    }, [packs]);

    const handleSearchPack = useCallback(() => {
      dispatch(changeSearchPackNameAC(text));
    }, [dispatch, text]);

    UseSetTimeoutEffect(handleSearchPack, text, 2000);

    const handleChangePageClick = useCallback(
      (page: number) => {
        dispatch(changePageAC(page));
      },
      [dispatch]
    );

    const handleSetSortingClick = useCallback(
      (headerName: string) => {
        dispatch(
          setSortingFilter(
            sortPacks[0] === '0' ? `1${headerName}` : `0${headerName}`
          )
        );
      },
      [dispatch, sortPacks]
    );

    return (
      <div className={s.listWrapper} aria-disabled={true}>
        <h2>Packs List</h2>

        <div className={s.row}>
          <SuperInputText
            style={{ width: '60%' }}
            value={text}
            onChangeText={setText}
            onEnter={handleSearchPack}
          />
          <SuperButton
            style={{ width: '35%' }}
            /* onClick={handleAddPackButtonClick} */
          >
            Add new pack
          </SuperButton>
        </div>

        <UniversalTable
          tableItems={packsForTable}
          tableTitles={PACK_TABLE_FIELDS}
          onSetSortingClick={handleSetSortingClick}
          itemName={COMPONENT_NAME.PACKS}
        />
        <Paginator
          totalItemCount={totalItemCount}
          pageCount={pageCount}
          currentPage={currentPage}
          onChangePageClick={handleChangePageClick}
          portionSize={portionSize}
        />
      </div>
    );
  }
);
