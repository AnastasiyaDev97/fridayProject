import { memo, useCallback, useMemo, useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import type { URLSearchParamsInit } from 'react-router-dom';

import { AddModal } from '../Modal/AddModal';

import style from './PacksList.module.scss';

import { Nullable } from 'common/types/Nullable';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { Pagination, SuperButton, SuperInputText, Table } from 'components';
import { EMPTY_STRING } from 'constants/index';
import { PACK_TABLE_FIELDS } from 'constants/table';
import { PackType } from 'dal/packs/types';
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
    const [searchParams, setSearchParams] = useSearchParams();

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
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        packName: text,
      } as URLSearchParamsInit);
    }, [text, searchParams, setSearchParams]);

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
          itemName={'packs'}
        />
        <Pagination
          totalItemCount={totalItemCount}
          currentPage={currentPage}
          itemName="packs"
        />
      </div>
    );
  },
);
