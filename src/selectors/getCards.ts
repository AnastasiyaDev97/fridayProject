import { CardType } from 'dal/cards/types';
import { RootReducerType } from '../store/store';

export const getCards = (state: RootReducerType): CardType[] =>
  state.cards.cards;
