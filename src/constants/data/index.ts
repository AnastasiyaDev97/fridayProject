import { LiteralObjectType } from 'common/types/LiteralObjectType';

export const SORT_CARDS_TYPE = {
  nameUP: '0name',
  nameDOWN: '1name',
  updatedUP: '0update',
  updateDOWN: '1update',
  answerUP: '0answer',
  answerDOWN: '1answer',
  questionUP: '0question',
  questionDOWN: '1question',
  gradeUP: '0grade',
  gradeDOWN: '1grade',
} as const;

export type SortCardType = LiteralObjectType<typeof SORT_CARDS_TYPE>;
