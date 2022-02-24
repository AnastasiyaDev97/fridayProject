import { useEffect} from "react";

import {useDispatch} from "react-redux";


export const UseSetTimeoutEffect = (callBack: () => void, dependencies:any, ms: number) => {

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('useeffSet')
        let idOfTimeout = setTimeout(() => {
            callBack()
        }, ms)
        return () => {

            clearTimeout(idOfTimeout)
        }
    }, [dispatch,dependencies,callBack,ms])
}