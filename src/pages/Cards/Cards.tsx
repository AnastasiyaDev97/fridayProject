import { FC, memo, useCallback, useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import style from './Cards.module.scss';

import { withRedirect } from 'common/hoc/withRedirect';
import { AddModal } from 'components/Modal/AddModal';
import { Pagination } from 'components/Pagination';
import { Preloader } from 'components/Preloader';
import { Rating } from 'components/Rating/Rating';
import { SuperButton } from 'components/SuperButton/SuperButton';
import { Table } from 'components/Table';
import { PORTION_SIZE } from 'constants/index';
import { CARD_TABLE_FIELDS } from 'constants/table';
import { CardType } from 'dal/cards/types';
import { COMPONENT_NAME } from 'enums/ComponentName';
import {
  changePageCardsAC,
  resetCardsAC,
  setSortingFilterCards,
} from 'store/reducers/cards-reducer';
import { AppRootStateType } from 'store/store';
import { getCardsTC } from 'store/thunks/cards';
import { ReturnComponentType } from 'types/ReturnComponentType';
import { convertDateFormat } from 'utils/handles';

type CardsT = {};

const TIMER_VALUE = 1000;

const Cards: FC<CardsT> = memo((): ReturnComponentType => {
  const dispatch = useDispatch();

  const params = useParams<'id'>();
  const cardsPack_id = params.id;

  const navigate = useNavigate();

  const cards = useSelector<AppRootStateType, Array<CardType>>(
    state => state.cards.cards,
  );
  const sortCards = useSelector<AppRootStateType, string>(state => state.cards.sortCards);
  const totalItemCount = useSelector<AppRootStateType, number>(
    state => state.cards.cardsTotalCount,
  );
  const pageCount = useSelector<AppRootStateType, number>(state => state.cards.pageCount);
  const currentPage = useSelector<AppRootStateType, number>(state => state.cards.page);

  const cardsForTable = useMemo(() => {
    return cards.map(
      ({ question, answer, updated, grade, _id, user_id, cardsPack_id }) => {
        const convertedToDateUpdated = convertDateFormat(updated);

        const rating = <Rating grade={grade} />;

        return {
          id: _id,
          userId: user_id,
          cardsPackId: cardsPack_id,
          tableValues: { question, answer, updated: convertedToDateUpdated, rating },
        };
      },
    );
  }, [cards]);

  useEffect(() => {
    const idOfTimeout = setTimeout(() => {
      if (cardsPack_id) {
        dispatch(getCardsTC({ cardsPack_id, page: currentPage, sortCards }));
      }
    }, TIMER_VALUE);

    return () => {
      clearTimeout(idOfTimeout);
      dispatch(resetCardsAC());
    };
  }, [dispatch, currentPage, sortCards]);

  const handleSetSortingClick = useCallback(
    (sortName: string, direction: 'up' | 'down') => {
      dispatch(
        setSortingFilterCards(direction === 'up' ? `1${sortName}` : `0${sortName}`),
      );
    },
    [dispatch],
  );

  const handleChangePageClick = useCallback(
    (page: number) => {
      dispatch(changePageCardsAC(page));
    },
    [dispatch],
  );

  const onTitleGoBackClick = (): void => {
    navigate(-1);
  };

  const onAddButtonClick = (): void => {
    handleChangePageClick(1);
    handleSetSortingClick('updated', 'down');
  };

  if (cards[0]?._id === '') {
    return <Preloader />;
  }

  return (
    <div className={style.wrapper}>
      <h2 onClick={onTitleGoBackClick} className={style.cursor}>
        &#8592; Pack Name
      </h2>
      <AddModal itemName="cards" cardsPackId={cardsPack_id}>
        {' '}
        <SuperButton onClick={onAddButtonClick} className={style.addButton}>
          Add card
        </SuperButton>
      </AddModal>

      {!!cards?.length && (
        <>
          <Table
            tableTitles={CARD_TABLE_FIELDS}
            tableItems={cardsForTable}
            onSetSortingClick={handleSetSortingClick}
            itemName={COMPONENT_NAME.CARDS}
          />
          <Pagination
            totalItemCount={totalItemCount}
            pageCount={pageCount}
            currentPage={currentPage}
            onChangePageClick={handleChangePageClick}
            portionSize={PORTION_SIZE}
          />
        </>
      )}
    </div>
  );
});

export default withRedirect(Cards);
