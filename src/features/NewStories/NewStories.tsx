import React, {useEffect} from 'react';
import {Story} from './Story/Story';
import {setStories} from './newStories-reducer';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../common/hooks/useAppSelector';

export const NewStories = () => {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const stories = useAppSelector(state => state.newStories.stories)

    useEffect(() => {
        dispatch(setStories())
    }, [])

    return <div>
        {isInitialized ? <h1>ok</h1> : <h1>Loading...</h1>}

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