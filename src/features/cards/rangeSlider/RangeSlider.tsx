import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {memo, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";
import s from './RangeSlider.module.scss'

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

        useEffect(() => {
                let idOfTimeout = setTimeout(() => {
                    props.onChangeCardsCountsChange(value[0], value[1])
                }, 0)
                return () => {
                    clearTimeout(idOfTimeout)
                }
            }, [value]
        )


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
