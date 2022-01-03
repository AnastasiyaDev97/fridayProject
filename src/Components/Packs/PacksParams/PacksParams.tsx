import s from './PacksParams.module.scss'
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import RangeSlider from "../../../features/cards/rangeSlider/RangeSlider";
import {setNewMinMaxValues} from "../../../store/reducers/packs-reducer";

type PacksParamsPropsT = {
    minValueForRangeSlider: number
    maxValueForRangeSlider: number
    onToggleShowCardsModeClick: (isMyCardShouldShown: boolean) => void
}

export const PacksParams = (props: PacksParamsPropsT) => {
    console.log('packparams')
    const dispatch = useDispatch()

    const onShowMyCardsClick = () => {
        props.onToggleShowCardsModeClick(true)
    }
    const onShowAllCardsClick = () => {
        props.onToggleShowCardsModeClick(false)
    }

    const handleChangeCardsCountChange = (minValue:number,maxValue:number) => {
        dispatch(setNewMinMaxValues(minValue,maxValue))
    }
    return (
        <div className={s.wrapper}>
            <h6>Show packs cards</h6>
            <div><SuperButton onClick={onShowMyCardsClick}>My</SuperButton>
                <SuperButton onClick={onShowAllCardsClick}>All</SuperButton></div>
            <RangeSlider minValueForRangeSlider={props.minValueForRangeSlider}
                         maxValueForRangeSlider={props.maxValueForRangeSlider}
                         onChangeCardsCountsChange={handleChangeCardsCountChange}
                         />
        </div>
    )
}