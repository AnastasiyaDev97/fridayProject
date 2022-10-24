import {AppRootStateType} from "../store/store";
import {PackType} from "../dal/packs/types";


export const getPacks=(state:AppRootStateType):PackType[]=>state.packs.cardPacks