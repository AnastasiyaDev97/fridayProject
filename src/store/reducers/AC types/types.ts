import { isAuthToggleAC } from '../login-reducer';
import { setProfileAC } from '../profile-reducer';
import { registerStatusAC } from '../registration-reducer';
import { getUsersAC, changePageUsersAC } from '../users-reducer';
import {
  addEmailAC,
  SetResponseInfoForgotPassAC,
  SetResponseInfoNewPassAC,
} from '../passwordRecovery-reducer';
import {
  changePageAC,
  changeSearchPackNameAC,
  setNewMinMaxValues,
  setPacksAC,
  setSortingFilter,
  toggleShowUserPacksAC,
} from '../packs-reducer';
import {
  setAppStatusAC,
  setErrorText,
  setIsInitializedAC,
} from '../app-reducer';
import {
  changePageCardsAC,
  setCardsAC,
  setCardsRatingAC,
  setSortingFilterCards,
} from '../cards-reducer';
import { setModalPropsAC, setModalTypeAC } from '../modal-reducer';

export type ActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof isAuthToggleAC>
  | ReturnType<typeof setProfileAC>
  | ReturnType<typeof setIsInitializedAC>
  | ReturnType<typeof setErrorText>
  | ReturnType<typeof registerStatusAC>
  | ReturnType<typeof SetResponseInfoForgotPassAC>
  | ReturnType<typeof addEmailAC>
  | ReturnType<typeof SetResponseInfoNewPassAC>
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof changePageAC>
  | ReturnType<typeof setNewMinMaxValues>
  | ReturnType<typeof setSortingFilter>
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof setSortingFilterCards>
  | ReturnType<typeof changePageCardsAC>
  | ReturnType<typeof changeSearchPackNameAC>
  | ReturnType<typeof setModalTypeAC>
  | ReturnType<typeof setModalPropsAC>
  | ReturnType<typeof setCardsRatingAC>
  | ReturnType<typeof toggleShowUserPacksAC>
  | ReturnType<typeof getUsersAC>
  | ReturnType<typeof changePageUsersAC>;
