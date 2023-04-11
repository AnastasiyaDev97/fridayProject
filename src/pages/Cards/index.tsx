import { memo, useCallback, useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { SuperButton } from './../../components/SuperButton/SuperButton';
import style from './Cards.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { AddModal } from 'components/Modal/AddModal';
import { Preloader } from 'components/Preloader';
import { Rating } from 'components/Rating';
import { Table } from 'components/Table';
import { CARD_TABLE_FIELDS } from 'constants/table';
import { useGetCardsQuery } from 'dal/cards';
import { CardType } from 'dal/cards/types';
import { convertDateFormat } from 'utils/handles';

export const Cards = memo((): ReturnComponentType => {
  const params = useParams<'id'>();
  const cardsPack_id = params.id;

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortCards, setSortCards] = useState<string>('');
  const [cards, setcards] = useState();

  /*   const sortCards = useAppSelector(state => state.cards.sortCards);
  const totalItemCount = useAppSelector(state => state.cards.cardsTotalCount);
  const pageCount = useAppSelector(state => state.cards.pageCount);
  const currentPage = useAppSelector(state => state.cards.page); */

  const {
    data: cardsData,
    /* error: cardsError, */
    isSuccess: isCardsSuccess,
    isLoading: isCardsLoading,
  } = useGetCardsQuery(
    { cardsPack_id, page: currentPage, sortCards },
    { skip: !cardsPack_id },
  );

  const handleSetSortingClick = useCallback(
    (sortName: string, direction: 'up' | 'down') => {
      setSortCards(direction === 'up' ? `1${sortName}` : `0${sortName}`);
    },
    [],
  );

  const handleChangePageClick = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const onTitleGoBackClick = (): void => {
    navigate(-1);
  };

  const onAddButtonClick = (): void => {
    handleChangePageClick(1);
    handleSetSortingClick('updated', 'down');
  };

  useEffect(() => {
    if (isCardsSuccess && !cards) {
      const formattedCardsForTable = cardsData.map(
        ({ question, answer, updated, grade, _id, user_id, cardsPack_id }: CardType) => {
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

      setcards(formattedCardsForTable);
    }
  }, [isCardsSuccess, cards, cardsData]);

  if (isCardsLoading) {
    return <Preloader />;
  }
  if (isCardsSuccess && cards) {
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

        <Table
          tableTitles={CARD_TABLE_FIELDS}
          tableItems={cards}
          onSetSortingClick={handleSetSortingClick}
          itemName="cards"
        />
        {/*  <Pagination
          totalItemCount={totalItemCount}
          pageCount={pageCount}
          currentPage={currentPage}
          onChangePageClick={handleChangePageClick}
          portionSize={PORTION_SIZE}
        /> */}
      </div>
    );
  }

  return null;
});