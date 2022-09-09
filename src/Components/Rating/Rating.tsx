import { FC, memo, ReactElement } from 'react';
import star from 'common/assets/svg/star.svg';
import fullStar from 'common/assets/svg/fullStar.svg';

type RatingProps = {
  grade: number;
};

export const Rating: FC<RatingProps> = memo(({ grade }) => {
  const STAR_COUNT = 5;
  let rating: ReactElement[] = [];

  for (let i = 0; i < STAR_COUNT; i++) {
    rating = [...rating, <Star selected={grade > i} />];
  }

  return <div>{rating}</div>;
});

type starPropsType = {
  selected: boolean;
};

export const Star = memo(({ selected }: starPropsType) => {
  return <img src={selected ? fullStar : star} alt="rating" />;
});
