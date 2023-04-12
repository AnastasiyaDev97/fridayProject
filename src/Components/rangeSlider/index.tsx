import { FC, memo } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import style from './RangeSlider.module.scss';

import { Nullable } from 'common/types/Nullable';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { /* useAppDispatch, */ useAppSelector } from 'store';
/* import { setNewMinMaxValues } from 'store/reducers/packs-reducer'; */

type SliderPropsType = {
  currentMinCardsValue: number;
  currentMaxCardsValue: Nullable<number>;
};

export const RangeSlider: FC<SliderPropsType> = memo(
  ({
    currentMinCardsValue,
    currentMaxCardsValue,
  }: SliderPropsType): ReturnComponentType => {
    /* const dispatch = useAppDispatch(); */

    const maxValueForRangeSlider = useAppSelector(state => state.packs.maxCardsCount);

    const onSliderChange = (event: Event, newValue: number | number[]): void => {
      if (Array.isArray(newValue)) {
        /* dispatch(setNewMinMaxValues(newValue[0], newValue[1])); */
      }
    };

    return (
      <Box sx={{ width: '80%' }}>
        <div className={style.sliderWrapper}>
          <Slider
            value={[currentMinCardsValue, currentMaxCardsValue ?? maxValueForRangeSlider]}
            onChange={onSliderChange}
            valueLabelDisplay="auto"
            max={maxValueForRangeSlider}
          />
          <div className={style.sliderValues}>
            <span>{currentMinCardsValue}</span>
            <span>{currentMaxCardsValue ?? maxValueForRangeSlider}</span>
          </div>
        </div>
      </Box>
    );
  },
);
