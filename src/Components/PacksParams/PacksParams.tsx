import { FC, memo, useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

import style from './PacksParams.module.scss';

import { RangeSlider } from 'components/RangeSlider';
import { SuperButton } from 'components/SuperButton';
import { EMPTY_STRING } from 'constants/index';
import { toggleShowUserPacksAC } from 'store/reducers/packs-reducer';
import { AppRootStateType } from 'store/store';
import { Nullable } from 'types/Nullable';
import { ReturnComponentType } from 'types/ReturnComponentType';

type PacksParamsPropsT = {
  currentMinCardsValue: number;
  currentMaxCardsValue: Nullable<number>;
};

export const PacksParams: FC<PacksParamsPropsT> = memo(
  ({ currentMinCardsValue, currentMaxCardsValue }): ReturnComponentType => {
    const dispatch = useDispatch();
    let [searchParams, setSearchParams] = useSearchParams();

    const user_id = useSelector<AppRootStateType, string>(state => state.profile._id);

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
          currentMinCardsValue={currentMinCardsValue}
          currentMaxCardsValue={currentMaxCardsValue}
        />
      </div>
    );
  },
);
