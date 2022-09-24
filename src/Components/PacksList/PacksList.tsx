import style from './PacksList.module.scss';
import { memo, useCallback, useMemo, useState, useEffect } from 'react';
import { UniversalTable } from '../Table/UniversalTable';
import Paginator from '../pagination/Pagination';
import { useDispatch } from 'react-redux';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import {
  changePageAC,
  changeSearchPackNameAC,
  setSortingFilter,
} from '../../store/reducers/packs-reducer';
import { convertDateFormat } from '../../utils/handles';
import SuperInputText from '../TestComponents/components/c1-SuperInputText/SuperInputText';
import { PackType } from '../../dal/packs/types';

import { COMPONENT_NAME } from '../../enum/ComponentName';
import { Nullable } from 'types/Nullable';
import { PACK_TABLE_FIELDS } from 'constants/table';
import { AddModal } from './../Modal/AddModal/index';
import { EMPTY_STRING, PORTION_SIZE } from './../../constants/index';

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
    actualPackName,
  }: PackListPropsType) => {
    const dispatch = useDispatch();
    let [searchParams, setSearchParams] = useSearchParams();

    const [text, setText] = useState<string>(actualPackName || '');

    const styleForAddModalBtn = {
      padding: '1rem 5rem',
    };

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
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        packName: text,
      } as URLSearchParamsInit);
    }, [dispatch, text, searchParams, setSearchParams]);

    const handleChangePageClick = useCallback(
      (page: number) => {
        dispatch(changePageAC(page));
        setSearchParams({
          ...Object.fromEntries([...searchParams]),
          page: page.toString(),
        } as URLSearchParamsInit);
      },
      [dispatch, setSearchParams, searchParams]
    );

    const handleSetSortingClick = useCallback(
      (sortName: string, direction: 'up' | 'down') => {
        dispatch(
          setSortingFilter(direction === 'up' ? `1${sortName}` : `0${sortName}`)
        );
      },
      [dispatch]
    );

    useEffect(() => {
      if (text === EMPTY_STRING && !actualPackName) {
        return;
      } else {
        let idOfTimeout = setTimeout(() => {
          handleSearchPack();
        }, 2000);
        return () => {
          clearTimeout(idOfTimeout);
        };
      }
    }, [text, actualPackName, handleSearchPack]);

    useEffect(() => {
      if (searchParams.get('page')) {
        dispatch(changePageAC(Number(searchParams.get('page'))));
      }
    }, []);

    return (
      <div className={style.listWrapper} aria-disabled={true}>
        <h2 className={style.title}>Packs List</h2>

        <div className={style.row}>
          <SuperInputText
            value={text}
            onChangeText={setText}
            onEnter={handleSearchPack}
            placeholder="Search pack"
          />
          <AddModal itemName="packs" style={styleForAddModalBtn} />
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
          portionSize={PORTION_SIZE}
        />
      </div>
    );
  }
);
