import { FC, memo, useEffect } from 'react';
import s from './Packs.module.scss';
import { PacksParams } from '../../Components/PacksParams/PacksParams';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from '../../store/store';
import { getPacks } from '../../selectors/getPacks';
import { getCurrentPage } from '../../selectors/getCurrentPage';
import { Nullable } from '../../types/Nullable';
import { PackType } from '../../dal/packs/types';
import { withRedirect } from '../../common/hoc/withRedirect';
import { PacksList } from '../../Components/PacksList';
import { getPacksTC } from '../../store/thunks/packs';
import { useSearchParams } from 'react-router-dom';

type PacksT = {};

const Packs: FC<PacksT> = memo(() => {
  const dispatch = useDispatch();

  let [searchParams] = useSearchParams();

  const packs = useSelector<RootReducerType, Array<PackType>>(getPacks);
  const currentPage = useSelector<RootReducerType, number>(getCurrentPage);
  const totalItemCount = useSelector<RootReducerType, number>(
    (state) => state.packs.cardPacksTotalCount
  );
  const pageCount = useSelector<RootReducerType, number>(
    (state) => state.packs.pageCount
  );
  const minValueForRangeSlider = useSelector<RootReducerType, number>(
    (state) => state.packs.min
  );
  const maxValueForRangeSlider = useSelector<RootReducerType, number>(
    (state) => state.packs.max
  );
  const sortPacks = useSelector<RootReducerType, string>(
    (state) => state.packs.sortPacks
  );
  const user_id = useSelector<RootReducerType, Nullable<string>>(
    (state) => state.packs.user_id
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
    minValueForRangeSlider,
    maxValueForRangeSlider,
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
        minValueForRangeSlider={minValueForRangeSlider}
        maxValueForRangeSlider={maxValueForRangeSlider}
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
