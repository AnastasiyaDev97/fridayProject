import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import style from './RangeSlider.module.scss';

import { ReturnComponentType } from 'common/types';

export const SkeletonRangeSlider = (): ReturnComponentType => {
  return (
    <Box sx={{ width: '80%' }}>
      <div className={style.sliderWrapper}>
        <Skeleton height={32} />
        <div className={style.sliderValues}>
          <Skeleton width={15} />
          <Skeleton width={15} />
        </div>
      </div>
    </Box>
  );
};
