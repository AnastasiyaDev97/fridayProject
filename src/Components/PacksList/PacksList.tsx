import { memo, useCallback, useMemo, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

import { AddModal } from '../Modal/AddModal';

import style from './PacksList.module.scss';

import { Pagination } from 'components/Pagination';
import { SuperButton } from 'components/SuperButton';
import { SuperInputText } from 'components/SuperInputText';
import { Table } from 'components/Table';
import { EMPTY_STRING, PORTION_SIZE } from 'constants/index';
import { PACK_TABLE_FIELDS } from 'constants/table';
import { PackType } from 'dal/packs/types';
import { COMPONENT_NAME } from 'enums/ComponentName';
import {
  changePageAC,
  changeSearchPackNameAC,
  setNewMinMaxValues,
  setSortingFilter,
} from 'store/reducers/packs-reducer';
import { AppRootStateType } from 'store/store';
import { Nullable } from 'types/Nullable';
import { ReturnComponentType } from 'types/ReturnComponentType';
import { convertDateFormat } from 'utils/handles';

type PackListPropsType = {
  packs: Array<PackType>;
  currentPage: number;
  totalItemCount: number;
  pageCount: number;
  sortPacks: string;
  actualPackName: Nullable<string>;
};

const TIMER_VALUE = 2000;

export const PacksList = memo(
  ({
    packs,
    currentPage,
    totalItemCount,
    pageCount,
    actualPackName,
  }: PackListPropsType): ReturnComponentType => {
    const dispatch = useDispatch();
    let [searchParams, setSearchParams] = useSearchParams();

    const maxCardsCount = useSelector<AppRootStateType, number>(
      state => state.packs.maxCardsCount,
    );

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
      [dispatch, setSearchParams, searchParams],
    );

    const handleSetSortingClick = useCallback(
      (sortName: string, direction: 'up' | 'down') => {
        dispatch(setSortingFilter(direction === 'up' ? `1${sortName}` : `0${sortName}`));
      },
      [dispatch],
    );

    const onAddButtonClick = useCallback(() => {
      setText('');
      handleChangePageClick(1);
      handleSetSortingClick('updated', 'down');
      handleSearchPack();
      dispatch(setNewMinMaxValues(0, maxCardsCount));
    }, [
      dispatch,
      handleChangePageClick,
      handleSearchPack,
      handleSetSortingClick,
      maxCardsCount,
    ]);

    useEffect(() => {
      if (text === EMPTY_STRING && !actualPackName) {
        return;
      } else {
        let idOfTimeout = setTimeout(() => {
          handleSearchPack();
        }, TIMER_VALUE);

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
          <AddModal itemName="packs">
            <SuperButton onClick={onAddButtonClick} className={style.addButton}>
              Add pack
            </SuperButton>
          </AddModal>
        </div>

        <Table
          tableItems={packsForTable}
          tableTitles={PACK_TABLE_FIELDS}
          onSetSortingClick={handleSetSortingClick}
          itemName={COMPONENT_NAME.PACKS}
        />
        <Pagination
          totalItemCount={totalItemCount}
          pageCount={pageCount}
          currentPage={currentPage}
          onChangePageClick={handleChangePageClick}
          portionSize={PORTION_SIZE}
        />
      </div>
    );
  },
);
