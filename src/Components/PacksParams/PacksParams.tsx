import { FC, memo, useCallback, useEffect } from 'react';
import style from './PacksParams.module.scss';
import SuperButton from '../TestComponents/components/c2-SuperButton/SuperButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNewMinMaxValues,
  toggleShowUserPacksAC,
} from '../../store/reducers/packs-reducer';
import { RangeSlider } from '../rangeSlider/RangeSlider';
import { RootReducerType } from '../../store/store';
import { EMPTY_STRING } from '../../constants';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

type PacksParamsPropsT = {
  minValueForRangeSlider: number;
  maxValueForRangeSlider: number;
};

export const PacksParams: FC<PacksParamsPropsT> = memo(
  ({ minValueForRangeSlider, maxValueForRangeSlider }) => {
    const dispatch = useDispatch();
    let [searchParams, setSearchParams] = useSearchParams();

    const user_id = useSelector<RootReducerType, string>(
      (state) => state.profile._id
    );

    const onShowMyCardsClick = useCallback(() => {
      dispatch(toggleShowUserPacksAC(user_id));
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        user: user_id,
      } as URLSearchParamsInit);
    }, [dispatch, user_id, searchParams, setSearchParams]);

    const onShowAllCardsClick = useCallback(() => {
      dispatch(toggleShowUserPacksAC(EMPTY_STRING));
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        user: '',
      } as URLSearchParamsInit);
    }, [dispatch, setSearchParams, searchParams]);

    const handleChangeCardsCountChange = useCallback(
      (minValue: number, maxValue: number) => {
        dispatch(setNewMinMaxValues(minValue, maxValue));
      },
      [dispatch]
    );

    useEffect(() => {
      if (searchParams.get('user')) {
        dispatch(toggleShowUserPacksAC(searchParams.get('user') as string));
      }
    }, []);

    return (
      <div className={style.wrapper}>
        <h4 className={style.title}>Show packs cards</h4>

        <div className={style.btnsWrapper}>
          <SuperButton onClick={onShowMyCardsClick}>My</SuperButton>
          <SuperButton onClick={onShowAllCardsClick}>All</SuperButton>
        </div>

        <RangeSlider
          minValueForRangeSlider={minValueForRangeSlider}
          maxValueForRangeSlider={maxValueForRangeSlider}
          onChangeCardsCountsChange={handleChangeCardsCountChange}
        />
      </div>
    );
  }
);
