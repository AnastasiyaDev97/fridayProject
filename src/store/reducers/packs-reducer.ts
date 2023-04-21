import { Nullable } from '../../common/types/Nullable';
import { getPacksResponseType } from '../../dal/packs/types';

import { ActionsType } from './AC types/types';

type initialStateType = getPacksResponseType & {
  min: number;
  max: Nullable<number>;
  sortPacks: string;
  packName: Nullable<string>;
  user_id: Nullable<string>;
};

// const initialState = {
//   page: 1,
//   /*   cardPacks: [] as Array<PackType>,*/
//   /* cardPacksTotalCount: 0,*/
//   maxCardsCount: 0,
//   minCardsCount: 0,
//   pageCount: 7,
//   min: 0,
//   max: null,
//   sortPacks: '0updated',
//   packName: EMPTY_STRING,
//   user_id: null,
// } as initialStateType;

export const packsReducer = (
  state: initialStateType /* = initialState */,
  action: ActionsType,
): initialStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS':
      /*  case 'PACKS/CHANGE-SEARCH-PACK-NAME': */
      /*     case 'PACKS/CHANGE-PAGE': */
      /*     case 'SET-RESPONSE-INFO-NEW-PASS': */
      /*     case 'PACKS/TOGGLE-SHOW-USER-PACKS': */
      /*     case 'PACKS/SET-NEW-MIN-MAX-VALUE': */
      /*     case 'PACKS/SET-SORTING-FILTER': */
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const setPacksAC = (payload: getPacksResponseType) =>
  ({
    type: 'PACKS/SET-PACKS',
    payload,
  } as const);

/* export const changePageAC = (page: number) => {
  return {
    type: 'PACKS/CHANGE-PAGE',
    payload: { page },
  } as const;
};

export const setNewMinMaxValues = (min: number, max: number) => {
  return {
    type: 'PACKS/SET-NEW-MIN-MAX-VALUE',
    payload: { min, max },
  } as const;
};
 */
/* const setSortingFilter = (sortPacks: string) =>
  ({
    type: 'PACKS/SET-SORTING-FILTER',
    payload: { sortPacks },
  } as const);
const changeSearchPackNameAC = (packName: string) =>
  ({
    type: 'PACKS/CHANGE-SEARCH-PACK-NAME',
    payload: { packName },
  } as const);

const toggleShowUserPacksAC = (user_id: string) =>
  ({
    type: 'PACKS/TOGGLE-SHOW-USER-PACKS',
    payload: { user_id },
  } as const); */
