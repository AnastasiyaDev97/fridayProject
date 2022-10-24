import { FC, memo, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import s from './Packs.module.scss';

import { withRedirect } from 'common/hoc/withRedirect';
import { PacksList } from 'components/PacksList';
import { PacksParams } from 'components/PacksParams/PacksParams';
import { PackType } from 'dal/packs/types';
import { getCurrentPage } from 'selectors/getCurrentPage';
import { getPacks } from 'selectors/getPacks';
import { AppRootStateType } from 'store/store';
import { getPacksTC } from 'store/thunks/packs';
import { Nullable } from 'types/Nullable';

type PacksT = {};

const Packs: FC<PacksT> = memo(() => {
  const dispatch = useDispatch();

  let [searchParams] = useSearchParams();

  const packs = useSelector<AppRootStateType, Array<PackType>>(getPacks);
  const currentPage = useSelector<AppRootStateType, number>(getCurrentPage);
  const totalItemCount = useSelector<AppRootStateType, number>(
    state => state.packs.cardPacksTotalCount,
  );
  const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount);
  const currentMinCardsValue = useSelector<AppRootStateType, number>(
    state => state.packs.min,
  );
  const currentMaxCardsValue = useSelector<AppRootStateType, Nullable<number>>(
    state => state.packs.max,
  );
  const sortPacks = useSelector<AppRootStateType, string>(state => state.packs.sortPacks);
  const user_id = useSelector<AppRootStateType, Nullable<string>>(
    state => state.packs.user_id,
  );

  let actualPackName = searchParams.get('packName');

  useEffect(() => {
    let idOfTimeout = setTimeout(() => {
      dispatch(getPacksTC(actualPackName));
    }, 1000);

    return () => {
      clearTimeout(idOfTimeout);
    };
  }, [
    dispatch,
    currentPage,
    currentMinCardsValue,
    currentMaxCardsValue,
    user_id,
    sortPacks,
    actualPackName,
  ]);

  if (!packs) {
    return null;
  }

  return (
    <div className={s.wrapper}>
      <PacksParams
        currentMinCardsValue={currentMinCardsValue}
        currentMaxCardsValue={currentMaxCardsValue}
      />
      <PacksList
        packs={packs}
        currentPage={currentPage}
        totalItemCount={totalItemCount}
        pageCount={pageCount}
        sortPacks={sortPacks}
        actualPackName={actualPackName}
      />
    </div>
  );
});

export default withRedirect(Packs);
