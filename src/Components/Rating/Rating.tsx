import { memo, ReactElement } from 'react';

import styles from './Rating.module.scss';

import { Icon } from 'components/Icon';
import { ReturnComponentType } from 'types/ReturnComponentType';

type RatingProps = {
  grade: number;
};

const STAR_COUNT = 5;

export const Rating = memo(({ grade }: RatingProps): ReturnComponentType => {
  let rating: ReactElement[] = [];

  for (let i = 0; i < STAR_COUNT; i++) {
    rating = [...rating, <Star key={i} selected={grade > i} />];
  }

  return <div>{rating}</div>;
});

type starPropsType = {
  selected: boolean;
};

export const Star = memo(({ selected }: starPropsType): ReturnComponentType => {
  return <Icon name={selected ? 'fullStar' : 'star'} className={styles.stars} />;
});
