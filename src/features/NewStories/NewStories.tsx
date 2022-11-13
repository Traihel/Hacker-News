import React, {useEffect, useState} from 'react';
import {Story} from './Story/Story';
import {setStories} from './newStories-reducer';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {Preloader} from '../../common/components/Preloader/Preloader';

export const NewStories = () => {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const stories = useAppSelector(state => state.newStories.stories)

    const [intervalId, setIntervalId] = useState<NodeJS.Timer>()
    const [update, setUpdate] = useState<boolean>(false)

    useEffect(() => {
        dispatch(setStories())
        clearInterval(intervalId)
        const interval = setInterval(() => {
            dispatch(setStories())
        }, 60000)
        setIntervalId(interval)

        return () => clearInterval(interval)
    }, [update])

    const onClickHandler = () => setUpdate(!update)

    if (!isInitialized) {
        return <Preloader/>
    }

    return <div>
        <button onClick={onClickHandler}>обновить</button>

        {stories && stories.map((el, index) => {
            return <Story
                key={el.id}
                id={el.id}
                title={el.title}
                score={el.score}
                nameUser={el.by}
                time={el.time}
            />
        })}
    </div>
}