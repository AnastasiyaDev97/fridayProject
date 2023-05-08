import { memo, useState, useEffect } from 'react';

import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import style from './Cards.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { Preloader, Rating, SuperButton, Table, Pagination } from 'components';
import { AddModal } from 'components/Modal';
import { CARD_TABLE_FIELDS, PAGE_COUNT } from 'constants/table';
import { useGetCardsQuery } from 'dal/cards';
import { CardType } from 'dal/cards/types';
import { convertDateFormat } from 'utils/handles';

type CardsForTableType = {
  id: string;
  userId: string;
  cardsPackId: string;
  tableValues: { question: string; answer: string; updated: string; rating: JSX.Element };
}[];

const Cards = memo((): ReturnComponentType => {
  const params = useParams<'id'>();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const cardsPack_id = params.id;

  const sortCards = searchParams.get('sortcards') || '0updated';
  const currentPage = Number(searchParams.get('pagecards')) || 1;

  const [cards, setcards] = useState<CardsForTableType>();

  const {
    data: cardsData,
    /* error: cardsError, */
    isSuccess: isCardsSuccess,
    isLoading: isCardsLoading,
    /* isError: isCardsError, */
  } = useGetCardsQuery(
    { cardsPack_id, page: currentPage, sortCards, pageCount: PAGE_COUNT },
    { skip: !cardsPack_id },
  );

  const onTitleGoBackClick = (): void => {
    navigate(-1);
  };

  useEffect(() => {
    if (isCardsSuccess && cardsData?.cards) {
      const formattedCardsForTable = cardsData.cards.map(
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
  }, [isCardsSuccess, cardsData]);

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
          <SuperButton className={style.addButton}>Add card</SuperButton>
        </AddModal>

        <Table tableTitles={CARD_TABLE_FIELDS} tableItems={cards} itemName="cards" />
        <Pagination
          totalItemCount={cardsData.cardsTotalCount}
          currentPage={currentPage}
          itemName="cards"
        />
      </div>
    );
  }

  return null;
});

export default Cards;
