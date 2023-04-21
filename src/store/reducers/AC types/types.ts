/* import { setAppStatusAC, setErrorText, setIsInitializedAC } from '../app-reducer'; */
import {
  changePageCardsAC,
  setCardsAC,
  setCardsRatingAC,
  setSortingFilterCards,
  resetCardsAC,
} from '../cards-reducer';
import { isAuthToggleAC } from '../login-reducer';
import {
  /*   changePageAC, */
  /*   changeSearchPackNameAC, */
  /*   setNewMinMaxValues, */
  setPacksAC,
  /*   setSortingFilter,
  toggleShowUserPacksAC, */
} from '../packs-reducer';
import {
  addEmailAC,
  SetResponseInfoForgotPassAC,
  SetResponseInfoNewPassAC,
} from '../passwordRecovery-reducer';
/* import { setProfileAC } from '../profile-reducer';
import { registerStatusAC } from '../registration-reducer'; */
import { getUsersDataAC, changePageUsersAC } from '../users-reducer';

export type ActionsType =
  /*   | ReturnType<typeof setAppStatusAC> */
  | ReturnType<typeof isAuthToggleAC>
  /*   | ReturnType<typeof setProfileAC>
  | ReturnType<typeof setIsInitializedAC>
  | ReturnType<typeof setErrorText>
  | ReturnType<typeof registerStatusAC> */
  | ReturnType<typeof SetResponseInfoForgotPassAC>
  | ReturnType<typeof addEmailAC>
  | ReturnType<typeof SetResponseInfoNewPassAC>
  | ReturnType<typeof setPacksAC>
  /*   | ReturnType<typeof changePageAC>
  | ReturnType<typeof setNewMinMaxValues> */
  /*   | ReturnType<typeof setSortingFilter> */
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof setSortingFilterCards>
  | ReturnType<typeof changePageCardsAC>
  /*  | ReturnType<typeof changeSearchPackNameAC> */
  | ReturnType<typeof setCardsRatingAC>
  /*   | ReturnType<typeof toggleShowUserPacksAC> */
  | ReturnType<typeof getUsersDataAC>
  | ReturnType<typeof changePageUsersAC>
  | ReturnType<typeof resetCardsAC>;
