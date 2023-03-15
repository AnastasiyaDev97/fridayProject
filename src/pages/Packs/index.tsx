import { memo /* , useState, useCallback  */ } from 'react';

import { useSearchParams } from 'react-router-dom';

import style from './Packs.module.scss';

import { PacksList } from 'components/PacksList';
import { PacksParams } from 'components/PacksParams/PacksParams';
import { useGetPacksQuery } from 'dal/packs';
import { useAppSelector } from 'store';

export const Packs = memo(() => {
  const [searchParams] = useSearchParams();
  const actualPackName = searchParams.get('packName');
  const currentPage = Number(searchParams.get('packPage'));
  const min = Number(searchParams.get('min')) || 0;
  const max = Number(searchParams.get('max')) || 0;
  const sortPacks = searchParams.get('sortPacks') || '';
  const userId = searchParams.get('userId') || '';

  const totalItemCount = useAppSelector(state => state.packs.cardPacksTotalCount);
  const pageCount = useAppSelector(state => state.packs.pageCount);

  /* const onAddPackButtonClick = useCallback(count => {
    setMaxCardsCount(count);
  }, []); */

  const {
    data: packs,
    isSuccess: isPacksSuccess,
    /* isLoading: isPacksLoading, */
  } = useGetPacksQuery({
    page: currentPage,
    min,
    max,
    packName: actualPackName,
    user_id: userId,
    sortPacks: sortPacks || '',
  });

  if (isPacksSuccess) {
    return (
      <div className={style.wrapper}>
        <PacksParams
          currentMinCardsValue={min}
          currentMaxCardsValue={max} /* maxCardsCount={maxCardsCount} */
        />
        <PacksList
          packs={packs?.cardPacks}
          currentPage={currentPage}
          totalItemCount={totalItemCount}
          pageCount={pageCount}
          sortPacks={sortPacks}
          actualPackName={actualPackName}
          /*  onAddPackButtonClick={onAddPackButtonClick} */
        />
      </div>
    );
  }

  return null;
});
