import { FC, memo, useCallback /* , useEffect */ } from 'react';

import { useSearchParams } from 'react-router-dom';
import type { URLSearchParamsInit } from 'react-router-dom';

import style from './PacksParams.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { RangeSlider } from 'components/RangeSlider';
import { SuperButton } from 'components/SuperButton';
import { /* useAppDispatch, */ useAppSelector } from 'store';

type PacksParamsPropsT = {
  currentMinCardsValue: number;
  currentMaxCardsValue: number;
  maxCardsCount: number;
};

export const PacksParams: FC<PacksParamsPropsT> = memo(
  ({
    currentMinCardsValue,
    currentMaxCardsValue,
    maxCardsCount,
  }: PacksParamsPropsT): ReturnComponentType => {
    /*     const dispatch = useAppDispatch(); */
    const [searchParams, setSearchParams] = useSearchParams();

    const userId = useAppSelector(state => state.profile._id);

    const onShowMyCardsClick = useCallback(() => {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        userId,
      } as URLSearchParamsInit);
    }, [userId, searchParams, setSearchParams]);

    const onShowAllCardsClick = useCallback(() => {
      const searchParamsObject = { ...Object.fromEntries([...searchParams]) };

      delete searchParamsObject.userId;

      setSearchParams(searchParamsObject as URLSearchParamsInit);
    }, [setSearchParams, searchParams]);

    const handleChangeCardsCountChange = useCallback(
      (min: number, max: number) => {
        setSearchParams({
          ...Object.fromEntries([...searchParams]),
          min: min.toString(),
          max: max.toString(),
        } as URLSearchParamsInit);
      },
      [setSearchParams, searchParams],
    );

    return (
      <div className={style.wrapper}>
        <h4 className={style.title}>Show packs cards</h4>

        <div className={style.btnsWrapper}>
          <SuperButton onClick={onShowMyCardsClick}>My</SuperButton>
          <SuperButton onClick={onShowAllCardsClick}>All</SuperButton>
        </div>

        <RangeSlider
          currentMinSliderValue={currentMinCardsValue}
          currentMaxSliderValue={currentMaxCardsValue}
          maxSliderCount={maxCardsCount}
          onSliderValuesChange={handleChangeCardsCountChange}
        />
      </div>
    );
  },
);
