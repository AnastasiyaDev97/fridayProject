import {isAuthToggleAC} from "../login-reducer";
import {setProfileAC} from "../profile-reducer";
import {registerStatusAC} from "../registration-reducer";
import {addEmailAC, SetResponseInfoForgotPassAC, SetResponseInfoNewPassAC} from "../passwordRecovery-reducer";
import {
    changePageAC,
    changeSearchPackNameAC,
    setNewMinMaxValues,
    setPacksAC,
    setSortingFilter,
    toggleShowCardsModeAC
} from "../packs-reducer";
import {setAppStatusAC, setErrorText, setIsInitializedAC} from "../app-reducer";
import {changePageCardsAC, setCardsAC, setSortingFilterCards} from "../cards-reducer";

export type ActionsType = ReturnType<typeof setAppStatusAC>
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
    | ReturnType<typeof toggleShowCardsModeAC>
    | ReturnType<typeof setSortingFilter>
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setSortingFilterCards>
    | ReturnType<typeof changePageCardsAC>
    | ReturnType<typeof changeSearchPackNameAC>
