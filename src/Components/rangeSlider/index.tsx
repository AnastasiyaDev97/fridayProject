import { FC, memo, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import style from './RangeSlider.module.scss';

import { ReturnComponentType } from 'common/types/ReturnComponentType';

type SliderPropsType = {
  currentMinSliderValue: number;
  currentMaxSliderValue: number;
  maxSliderCount: number;
  onSliderValuesChange: (min: number, max: number) => void;
};

export const RangeSlider: FC<SliderPropsType> = memo(
  ({
    currentMinSliderValue,
    currentMaxSliderValue,
    maxSliderCount,
    onSliderValuesChange,
  }: SliderPropsType): ReturnComponentType => {
    const [value, setValue] = useState<number[]>([
      currentMinSliderValue,
      currentMaxSliderValue || maxSliderCount,
    ]);

    const onSliderChange = (event: Event, newValue: number | number[]): void => {
      setValue(newValue as number[]);
    };

    useEffect(() => {
      const idOfTimeout = setTimeout(() => {
        onSliderValuesChange(value[0], value[1]);
      }, 1000);

      return () => {
        clearTimeout(idOfTimeout);
      };
    }, [value, onSliderValuesChange]);

    return (
      <Box sx={{ width: '80%' }}>
        <div className={style.sliderWrapper}>
          <Slider
            value={value}
            onChange={onSliderChange}
            valueLabelDisplay="auto"
            max={maxSliderCount}
          />
          <div className={style.sliderValues}>
            <span>0</span>
            <span>{maxSliderCount}</span>
          </div>
        </div>
      </Box>
    );
  },
);
