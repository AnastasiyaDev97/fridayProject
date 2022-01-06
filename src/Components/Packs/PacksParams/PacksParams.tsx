import s from './PacksParams.module.scss'
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {setNewMinMaxValues} from "../../../store/reducers/packs-reducer";
import {memo, useCallback} from "react";
import {RangeSlider} from "../../../features/cards/rangeSlider/RangeSlider";

type PacksParamsPropsT = {
    minValueForRangeSlider: number
    maxValueForRangeSlider: number
    onToggleShowCardsModeClick: (isOnlyMyCardShouldShown: boolean) => void
}

export const PacksParams = memo((props: PacksParamsPropsT) => {
    console.log('packparams')
    const dispatch = useDispatch()

    const onShowMyCardsClick = useCallback(() => {
        props.onToggleShowCardsModeClick(true)
    }, [props.onToggleShowCardsModeClick])

    const onShowAllCardsClick = useCallback(() => {
        props.onToggleShowCardsModeClick(false)
    }, [props.onToggleShowCardsModeClick])

    const handleChangeCardsCountChange = useCallback((minValue: number, maxValue: number) => {
        dispatch(setNewMinMaxValues(minValue, maxValue))
    }, [dispatch])

    return (
        <div className={s.wrapper}>
            <h4>Show packs cards</h4>
            <div className={s.btnsWrapper}><SuperButton onClick={onShowMyCardsClick}>My</SuperButton>
                <SuperButton onClick={onShowAllCardsClick}>All</SuperButton></div>
            <RangeSlider minValueForRangeSlider={props.minValueForRangeSlider}
                         maxValueForRangeSlider={props.maxValueForRangeSlider}
                         onChangeCardsCountsChange={handleChangeCardsCountChange}
            />
        </div>
    )
})