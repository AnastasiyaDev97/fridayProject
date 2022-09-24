import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FC, memo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootReducerType } from '../../store/store';
import s from './RangeSlider.module.scss';
import { UseSetTimeoutEffect } from '../../common/hooks/customUseEffect';
import { Nullable } from 'types/Nullable';
import { setNewMinMaxValues } from 'store/reducers/packs-reducer';

type SliderPropsType = {
  currentMinCardsValue: number;
  currentMaxCardsValue: Nullable<number>;
};

export const RangeSlider: FC<SliderPropsType> = memo(
  ({ currentMinCardsValue, currentMaxCardsValue }) => {
    const dispatch = useDispatch();

    const maxValueForRangeSlider = useSelector<RootReducerType, number>(
      (state) => state.packs.maxCardsCount
    );

    const [value, setValue] = useState<number[]>([
      currentMinCardsValue,
      currentMaxCardsValue || maxValueForRangeSlider,
    ]);

    const onCardsCountChange = () => {
      dispatch(setNewMinMaxValues(value[0], value[1]));
    };

    UseSetTimeoutEffect(onCardsCountChange, value, 500);

    const onSliderChange = (event: Event, newValue: number | number[]) => {
      setValue(newValue as number[]);
    };

    return (
      <Box sx={{ width: '80%' }}>
        <div className={s.sliderWrapper}>
          <Slider
            value={value}
            onChange={onSliderChange}
            valueLabelDisplay="auto"
            max={maxValueForRangeSlider}
          />
          <div className={s.sliderValues}>
            <span>{currentMinCardsValue}</span>
            <span>{currentMaxCardsValue}</span>
          </div>
        </div>
      </Box>
    );
  }
);
