import {RootReducerType} from "../store/store";
import {PackType} from "../dal/packs/types";


export const getPacks=(state:RootReducerType):PackType[]=>state.packs.cardPacks