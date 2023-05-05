import { memo /* , useState, useCallback  */ } from 'react';

import { useSearchParams } from 'react-router-dom';

import style from './Packs.module.scss';

import { PacksList, PacksParams } from 'components';
import { useGetPacksQuery } from 'dal/packs';

const Packs = memo(() => {
  const [searchParams] = useSearchParams();

  const actualPackName = searchParams.get('packName');
  const currentPage = Number(searchParams.get('packPage')) || 1;
  const min = Number(searchParams.get('min')) || 0;
  const max = Number(searchParams.get('max')) || 0;
  const sortPacks = searchParams.get('sortPacks') || '0updated';
  const userId = searchParams.get('userId') || '';

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
    sortPacks: sortPacks,
  });

  if (isPacksSuccess) {
    return (
      <div className={style.wrapper}>
        <PacksParams
          currentMinCardsValue={min}
          currentMaxCardsValue={max}
          maxCardsCount={packs?.maxCardsCount}
        />
        <PacksList
          packs={packs?.cardPacks}
          currentPage={currentPage}
          totalItemCount={packs?.cardPacksTotalCount}
          sortPacks={sortPacks}
          actualPackName={actualPackName}
          /*  onAddPackButtonClick={onAddPackButtonClick} */
        />
      </div>
    );
  }

  return null;
});

export default Packs;
