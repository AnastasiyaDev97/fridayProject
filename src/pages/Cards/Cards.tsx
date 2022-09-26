import { FC, memo, useCallback, useEffect, useMemo } from 'react';
import style from './Cards.module.scss';
import Pagination from '../../Components/pagination/Pagination';
import { convertDateFormat } from '../../utils/handles';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from '../../store/store';
import {
  changePageCardsAC,
  resetCardsAC,
  setSortingFilterCards,
} from '../../store/reducers/cards-reducer';
import { UniversalTable } from '../../Components/Table/UniversalTable';
import { useNavigate, useParams } from 'react-router-dom';
import { CardType } from '../../dal/cards/types';
import { Rating } from '../../Components/Rating/Rating';
import { getCardsTC } from '../../store/thunks/cards';
import { COMPONENT_NAME } from '../../enum/ComponentName';
import { CARD_TABLE_FIELDS } from 'constants/table';
import { AddModal } from './../../Components/Modal/AddModal/index';
import { withRedirect } from 'common/hoc/withRedirect';
import { PORTION_SIZE } from 'constants/index';
import SuperButton from 'Components/TestComponents/components/c2-SuperButton/SuperButton';
import Preloader from 'Components/Preloader/Preloader';

type CardsT = {};

const Cards: FC<CardsT> = memo(() => {
  const dispatch = useDispatch();

  const params = useParams<'id'>();
  const cardsPack_id = params.id;

  const navigate = useNavigate();

  const cards = useSelector<RootReducerType, Array<CardType>>(
    (state) => state.cards.cards
  );
  const sortCards = useSelector<RootReducerType, string>(
    (state) => state.cards.sortCards
  );
  const totalItemCount = useSelector<RootReducerType, number>(
    (state) => state.cards.cardsTotalCount
  );
  const pageCount = useSelector<RootReducerType, number>(
    (state) => state.cards.pageCount
  );
  const currentPage = useSelector<RootReducerType, number>(
    (state) => state.cards.page
  );

  const cardsForTable = useMemo(() => {
    return cards.map(
      ({ question, answer, updated, grade, _id, user_id, cardsPack_id }) => {
        updated = convertDateFormat(updated);
        let rating = <Rating grade={grade} />;
        return {
          id: _id,
          userId: user_id,
          cardsPackId: cardsPack_id,
          tableValues: { question, answer, updated, rating },
        };
      }
    );
  }, [cards]);

  useEffect(() => {
    let idOfTimeout = setTimeout(() => {
      if (cardsPack_id) {
        dispatch(getCardsTC({ cardsPack_id, page: currentPage, sortCards }));
      }
    }, 1000);

    return () => {
      clearTimeout(idOfTimeout);
      dispatch(resetCardsAC());
    };
  }, [dispatch, currentPage, sortCards]);

  const handleSetSortingClick = useCallback(
    (sortName: string, direction: 'up' | 'down') => {
      dispatch(
        setSortingFilterCards(
          direction === 'up' ? `1${sortName}` : `0${sortName}`
        )
      );
    },
    [dispatch]
  );

  const handleChangePageClick = useCallback(
    (page: number) => {
      dispatch(changePageCardsAC(page));
    },
    [dispatch]
  );

  const onTitleGoBackClick = () => {
    navigate(-1);
  };

  const onAddButtonClick = () => {
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
          <UniversalTable
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
