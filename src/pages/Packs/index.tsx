import { memo } from 'react';

import { useSearchParams } from 'react-router-dom';

import style from './Packs.module.scss';

import { PacksList, PacksParams } from 'components';
import { SORT_CARDS_TYPE } from 'constants/data';
import { PAGE_COUNT } from 'constants/table';
import { useGetPacksQuery } from 'dal/packs';

const Packs = memo(() => {
  const [searchParams] = useSearchParams();

  const actualPackName = searchParams.get('name');
  const currentPage = Number(searchParams.get('page')) || 1;
  const min = Number(searchParams.get('min'));
  const max = Number(searchParams.get('max'));
  const sortPacks = searchParams.get('sort') || SORT_CARDS_TYPE.updatedUP;
  const userId = searchParams.get('userId') || '';

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
    pageCount: PAGE_COUNT,
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
        />
      </div>
    );
  }

  return null;
});

export default Packs;
