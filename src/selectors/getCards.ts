import { CardType } from 'dal/cards/types';
import { AppRootStateType } from '../store/store';

export const getCards = (state: AppRootStateType): CardType[] =>
  state.cards.cards;
