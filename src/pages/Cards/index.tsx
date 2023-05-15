import { memo, useState, useEffect } from 'react';

import {
  useNavigate,
  useParams,
  useSearchParams,
  createSearchParams,
  useLocation,
} from 'react-router-dom';

import style from './Cards.module.scss';

import { ReturnComponentType } from 'common/types';
import { Rating, SuperButton, Table, Pagination } from 'components';
import { AddModal } from 'components/Modal';
import { CARD_TABLE_FIELDS, PAGE_COUNT } from 'constants/table';
import { useGetCardsQuery } from 'dal/cards';
import { CardType } from 'dal/cards/types';
import { useResponseHandler } from 'hooks/useResponseHandler';
import { convertDateFormat } from 'utils';

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
  const location = useLocation();

  const cardsPack_id = params.id;

  const sortCards = searchParams.get('sort') || '0updated';
  const currentPage = Number(searchParams.get('page')) || 1;

  const uriParams = location?.state?.packs;

  const [cards, setcards] = useState<CardsForTableType>();

  const {
    data: cardsData,
    isSuccess,
    isLoading,
    isError,
  } = useGetCardsQuery(
    { cardsPack_id, page: currentPage, sortCards, pageCount: PAGE_COUNT },
    { skip: !cardsPack_id },
  );

  const onTitleGoBackClick = (): void => {
    navigate({
      pathname: '/packs',
      search: `?${createSearchParams(uriParams)}`,
    });
  };

  useResponseHandler({
    isLoading,
    isSuccess,
    isError,
  });

  useEffect(() => {
    if (isSuccess && cardsData?.cards) {
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
  }, [isSuccess, cardsData]);

  if (isSuccess && cards) {
    return (
      <div className={style.wrapper}>
        <h2 onClick={onTitleGoBackClick} className={`${style.cursor} ${style.title}`}>
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
        />
      </div>
    );
  }

  return null;
});

export default Cards;
