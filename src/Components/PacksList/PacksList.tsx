import s from './PacksList.module.scss';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { UniversalTable } from '../../features/cards/table/UniversalTable';
import Paginator from '../pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
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

import { ModalContainer } from '../../common/components/Modal/ModalContainer/ModalContainer';
import { RootReducerType } from '../../store/store';
import { EMPTY_STRING } from '../../constants';
import { getCardsTC } from '../../store/thunks/cards';
import { COMPONENT_NAME } from '../../enum/ComponentName';
import { modalActionType, modalEntityType } from 'enum/Modals';
import { Nullable } from 'types/Nullable';
import { PACK_TABLE_FIELDS } from 'constants/table';

type PackListPropsType = {
  packs: Array<PackType>;
  currentPage: number;
  totalItemCount: number;
  pageCount: number;
  sortPacks: string;
  setModalData: (modalAction: modalActionType, id: string) => void;
  actualPackName: Nullable<string>;
};

export const PacksList = memo(
  ({
    packs,
    currentPage,
    totalItemCount,
    pageCount,
    sortPacks,
    setModalData,
    actualPackName,
  }: PackListPropsType) => {
    const dispatch = useDispatch();

    const modalEntity = useSelector<RootReducerType, modalEntityType>(
      (state) => state.modals.modalEntity
    );
    const id = useSelector<RootReducerType, string>((state) => state.modals.id);

    const [text, setText] = useState<string>(actualPackName || '');

    const portionSize = 10;

    const { Add, Delete, Update, Learn } = modalActionType;

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

    const packForModal = packs.find((pack) => pack._id === id);

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

    const handleAddPackButtonClick = useCallback(() => {
      setModalData(Add, EMPTY_STRING);
    }, [setModalData, Add]);

    const handleDeleteButtonClick = useCallback(
      (packId: string) => {
        setModalData(Delete, packId);
      },
      [setModalData, Delete]
    );

    const handleUpdatePackClick = useCallback(
      (packId: string) => {
        setModalData(Update, packId);
      },
      [setModalData, Update]
    );

    async function handleLearnPackClick(packId: string) {
      await dispatch(
        getCardsTC({ cardsPack_id: packId, max: 100, pageCount: 100 })
      );
      setModalData(Learn, packId);
    }

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
            onClick={handleAddPackButtonClick}
          >
            Add new pack
          </SuperButton>
        </div>

        {modalEntity && <ModalContainer pack={packForModal} />}

        <UniversalTable
          tableItems={packsForTable}
          tableTitles={PACK_TABLE_FIELDS}
          onSetSortingClick={handleSetSortingClick}
          itemName={COMPONENT_NAME.PACKS}
          onDeleteButtonClick={handleDeleteButtonClick}
          onUpdateButtonClick={handleUpdatePackClick}
          onLearnPackClick={handleLearnPackClick}
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
