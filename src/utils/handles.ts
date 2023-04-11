import { ReactElement } from 'react';

import { CardType } from '../dal/cards/types';

const MAX_GRADE_BORDER = 6;

export const convertDateFormat = (dateAsString: string): string => {
  const date = new Date(dateAsString);

  return `${addZeroToDate(date.getDate())}.${addZeroToDate(
    date.getMonth() + 1,
  )}.${date.getFullYear()}`;
};

export const addZeroToDate = (date: number): number | string => {
  if (date.toString().length === 1) {
    return `0${date}`;
  }

  return date;
};

export const getCard = (cards: CardType[]): CardType => {
  const sum = cards.reduce(
    (acc, card) =>
      acc + (MAX_GRADE_BORDER - card.grade) * (MAX_GRADE_BORDER - card.grade),
    0,
  );
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum =
        acc.sum + (MAX_GRADE_BORDER - card.grade) * (MAX_GRADE_BORDER - card.grade);

      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 },
  );

  return cards[res.id + 1];
};
