import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {memo, useState} from "react";
import {useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";
import s from './RangeSlider.module.scss'
import {UseSetTimeoutEffect} from "../../../common/hooks/customUseEffect";

type SliderPropsType = {
    minValueForRangeSlider: number
    maxValueForRangeSlider: number
    onChangeCardsCountsChange: (minValueForRangeSlider: number, maxValueForRangeSlider: number) => void
}


export const RangeSlider = memo((props: SliderPropsType) => {
        console.log('slider')
        const maxCardsCount = useSelector<RootReducerType, number>((state) => state.packs.maxCardsCount)
        const minCardsCount = useSelector<RootReducerType, number>((state) => state.packs.minCardsCount)

        const [value, setValue] = useState<number[]>([props.minValueForRangeSlider,
            props.maxValueForRangeSlider]);

        const changeCardsCount = () => {
            console.log('changeCardCount')
            props.onChangeCardsCountsChange(value[0], value[1])
        }


        UseSetTimeoutEffect(changeCardsCount, value, 500)

        const onSliderChange = (event: Event, newValue: number | number[]) => {
            setValue(newValue as number[]);
        };

        return (
            <Box sx={{width: '80%'}}>
                <div className={s.sliderWrapper}>
                    <Slider
                        value={value}
                        onChange={onSliderChange}
                        valueLabelDisplay="auto"
                        max={maxCardsCount}
                    />
                    <div className={s.sliderValues}>
                        <span>{minCardsCount}</span>
                        <span>{maxCardsCount}</span>
                    </div>
                </div>
            </Box>
        );
    }
)
