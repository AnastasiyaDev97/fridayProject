import style from './PacksParams.module.scss'
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {setNewMinMaxValues, toggleShowUserPacksAC} from "../../../store/reducers/packs-reducer";
import {FC, memo, useCallback} from "react";
import {RangeSlider} from "../../../features/cards/rangeSlider/RangeSlider";
import {RootReducerType} from "../../../store/store";
import {EMPTY_STRING} from "../../../constants";

type PacksParamsPropsT = {
    minValueForRangeSlider: number
    maxValueForRangeSlider: number
}

export const PacksParams:FC<PacksParamsPropsT> = memo(({minValueForRangeSlider,maxValueForRangeSlider}) => {
    const dispatch = useDispatch()

    const user_id = useSelector<RootReducerType, string>(state => state.profile._id)

    const onShowMyCardsClick = useCallback(() => {
        dispatch(toggleShowUserPacksAC(user_id))
    }, [dispatch, user_id])

    const onShowAllCardsClick = useCallback(() => {
        dispatch(toggleShowUserPacksAC(EMPTY_STRING))
    }, [dispatch])

    const handleChangeCardsCountChange = useCallback((minValue: number, maxValue: number) => {
        dispatch(setNewMinMaxValues(minValue, maxValue))
    }, [dispatch])

    return (
        <div className={style.wrapper}>
            <h4>Show packs cards</h4>

            <div className={style.btnsWrapper}>
                <SuperButton onClick={onShowMyCardsClick}>My</SuperButton>
                <SuperButton onClick={onShowAllCardsClick}>All</SuperButton>
            </div>

            <RangeSlider minValueForRangeSlider={minValueForRangeSlider}
                         maxValueForRangeSlider={maxValueForRangeSlider}
                         onChangeCardsCountsChange={handleChangeCardsCountChange}/>
        </div>
    )
})