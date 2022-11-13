import React, {useEffect, useState} from 'react';
import styles from './NewStories.module.scss';
import {Story} from '../../common/components/Story/Story';
import {setStories} from './newStories-reducer';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {Preloader} from '../../common/components/Preloader/Preloader';
import {Button} from '../../common/components/Button/Button';
import {useHistory} from 'react-router-dom';

export const NewStories = () => {

    const history = useHistory();
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const status = useAppSelector(state => state.app.status)
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

    const onClickUpdateHandler = () => setUpdate(!update)

    if (!isInitialized) {
        return <Preloader/>
    }

    return <div className={styles.storiesComponent}>

        <header className={styles.storiesHeader}>
            <h1 className={styles.title}>Hacker News</h1>
            <Button onClick={onClickUpdateHandler} disabled={status === 'loading'}>Update news list</Button>
        </header>

        <div>
            {stories?.map((el, index) => {

                const onClickStoryHandler = () => history.push(`/story/${el.id}`)

                return <div
                    key={index}
                    onClick={onClickStoryHandler}
                    className={styles.storyBox}
                >
                    <Story
                        title={el.title}
                        score={el.score}
                        nameUser={el.by}
                        time={el.time}
                    />
                </div>
            })}
        </div>

    </div>
}