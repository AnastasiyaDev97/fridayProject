import { memo, useCallback, useMemo, useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import type { URLSearchParamsInit } from 'react-router-dom';

import { AddModal } from '../Modal/AddModal';

import style from './PacksList.module.scss';

import { Nullable } from 'common/types/Nullable';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { Pagination } from 'components';
import { SuperButton } from 'components/SuperButton';
import { SuperInputText } from 'components/SuperInputText';
import { Table } from 'components/Table';
import { EMPTY_STRING, PORTION_SIZE } from 'constants/index';
import { PACK_TABLE_FIELDS } from 'constants/table';
import { PackType } from 'dal/packs/types';
import { useAppDispatch, useAppSelector } from 'store';
import { convertDateFormat } from 'utils/handles';

type PackListPropsType = {
  packs: Array<PackType>;
  currentPage: number;
  totalItemCount: number;
  sortPacks: string;
  actualPackName: Nullable<string>;
};

const TIMER_VALUE = 2000;

export const PacksList = memo(
  ({
    packs,
    currentPage,
    totalItemCount,
    actualPackName,
  }: PackListPropsType): ReturnComponentType => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);

    const [text, setText] = useState<string>(actualPackName || '');

    const packsForTable = useMemo(() => {
      return packs.map(({ cardsCount, user_name, name, updated, user_id, _id }) => {
        const convertedToDateUpdated = convertDateFormat(updated);

        return {
          userId: user_id,
          id: _id,
          tableValues: {
            name,
            cardsCount,
            updated: convertedToDateUpdated,
            user_name,
          },
        };
      });
    }, [packs]);

    const handleSearchPack = useCallback(() => {
      /*  dispatch(changeSearchPackNameAC(text)); */
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        packName: text,
      } as URLSearchParamsInit);
    }, [text, searchParams, setSearchParams]);

    const handleChangePageClick = useCallback(
      (page: number) => {
        setSearchParams({
          ...Object.fromEntries([...searchParams]),
          packPage: page.toString(),
        } as URLSearchParamsInit);
      },
      [setSearchParams, searchParams],
    );

    const handleSetSortingClick = useCallback(
      (/* sortName: string, direction: 'up' | 'down' */) => {
        /*   dispatch(setSortingFilter(direction === 'up' ? `1${sortName}` : `0${sortName}`)); */
      },
      [dispatch],
    );

    // const onModalAddButtonClick = useCallback(() => {
    //   setText('');
    //   handleChangePageClick(1);
    //   /*  handleSetSortingClick('updated', 'down'); */
    //   handleSearchPack();
    //   /* dispatch(setNewMinMaxValues(0, maxCardsCount)); */
    // }, [
    //   dispatch,
    //   handleChangePageClick,
    //   handleSearchPack,
    //   handleSetSortingClick,
    //   maxCardsCount,
    // ]);

    useEffect(() => {
      if (text === EMPTY_STRING && !actualPackName) {
        if (searchParams.has('packName')) {
          searchParams.delete('packName');
          setSearchParams(searchParams);
        } else {
          return;
        }
      } else {
        const idOfTimeout = setTimeout(() => {
          handleSearchPack();
        }, TIMER_VALUE);

        return () => {
          clearTimeout(idOfTimeout);
        };
      }
    }, [text, actualPackName, handleSearchPack, searchParams, setSearchParams]);

    useEffect(() => {
      if (searchParams.get('page')) {
        /* dispatch(changePageAC(Number(searchParams.get('page')))); */
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
            type="text"
          />
          <AddModal itemName="packs">
            <SuperButton className={style.addButton}>Add pack</SuperButton>
          </AddModal>
        </div>

        <Table
          tableItems={packsForTable}
          tableTitles={PACK_TABLE_FIELDS}
          onSetSortingClick={handleSetSortingClick}
          itemName={'packs'}
        />
        <Pagination
          totalItemCount={totalItemCount}
          currentPage={currentPage}
          onChangePageClick={handleChangePageClick}
          portionSize={PORTION_SIZE}
        />
      </div>
    );
  },
);
