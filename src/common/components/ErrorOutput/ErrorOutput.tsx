import styles from './ErrorOutput.module.scss'
import {useAppSelector} from '../../hooks/useAppSelector';
import {useEffect, useState} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {SvgSelector} from '../SvgSelector/SvgSelector';
import {setAppError} from '../../../app/app-reducer';

export const ErrorOutput = () => {

    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.app.error)

    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

    const onClickHandler = () => {
        dispatch(setAppError({message: ''}))
        clearTimeout(timeoutId)
    }

    useEffect(() => {
        clearTimeout(timeoutId)
        if (error.message) {
            const timeoutId = setTimeout(() => {
                dispatch(setAppError({message: ''}))
            }, 7000)
            setTimeoutId(timeoutId)
        }
    }, [error])

    return <div className={styles.ErrorOutputComponent}>
        {error.message &&
            <div className={styles.error}>
                <div className={styles.h3}>
                    {error.message}
                </div>
                <div
                    className={styles.cross}
                    onClick={onClickHandler}
                >
                    <SvgSelector name={'cross'}/>
                </div>
            </div>
        }
    </div>
}