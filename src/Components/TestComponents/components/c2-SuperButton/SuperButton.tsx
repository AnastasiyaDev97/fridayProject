import {ButtonHTMLAttributes, DetailedHTMLProps, FC, memo} from 'react'
import s from './SuperButton.module.scss'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

const SuperButton: FC<SuperButtonPropsType> = memo((
    {
        red, className,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    debugger
    const finalClassName = `${s.btn} ${red ? s.red : s.default} ${className}`
    console.log('button')
    return (
        <button
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
})

export default SuperButton
