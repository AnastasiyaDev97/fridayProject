import {RootReducerType} from "../store/store";
import { PackType} from "../dal/apiTypes";

export const getPacks=(state:RootReducerType):Array<PackType>=>state.packs.cardPacks