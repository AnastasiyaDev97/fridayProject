import { Nullable } from '../../common/types/Nullable';
import { EMPTY_STRING } from '../../constants';

import { ActionsType } from './AC types/types';

const initialState = {
  responseInfoForgotPass: EMPTY_STRING,
  responseInfoNewPass: EMPTY_STRING,
  emailForRecovery: null as Nullable<string>,
};

type InitialStateType = typeof initialState;

export const passwordRecoveryReducer = (
  state: InitialStateType = initialState,
  action: ActionsType,
) => {
  switch (action.type) {
    case 'SET-RESPONSE-INFO-FORGOT-PASS':
    case 'SET-RESPONSE-INFO-NEW-PASS':
    case 'ADD-EMAIL':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const SetResponseInfoForgotPassAC = (responseInfoForgotPass: string) =>
  ({
    type: 'SET-RESPONSE-INFO-FORGOT-PASS',
    payload: { responseInfoForgotPass },
  } as const);

export const SetResponseInfoNewPassAC = (responseInfoNewPass: string) =>
  ({
    type: 'SET-RESPONSE-INFO-NEW-PASS',
    payload: { responseInfoNewPass },
  } as const);

export const addEmailAC = (emailForRecovery: string) =>
  ({
    type: 'ADD-EMAIL',
    payload: { emailForRecovery },
  } as const);
