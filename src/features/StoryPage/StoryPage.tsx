import React, {useEffect, useState} from 'react';
import styles from './StoryPage.module.scss';
import {useHistory, useParams} from 'react-router-dom';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {setCommentsNull, setStoryNull} from './storyPage-reducer';
import {Comment} from './Comment/Comment';
import {Preloader} from '../../common/components/Preloader/Preloader';
import {Button} from '../../common/components/Button/Button';
import {Story} from '../../common/components/Story/Story';
import {getStory} from './storyPage-actions';

export const StoryPage = () => {

    const {storyID} = useParams<{ storyID: string }>()
    const history = useHistory();

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const status = useAppSelector(state => state.app.status)
    const story = useAppSelector(state => state.storyPage.story)
    const comments = useAppSelector(state => state.storyPage.comments)

    const [update, setUpdate] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getStory({storyId: +storyID}))
    }, [update])

    useEffect(() => {
        return () => {
            dispatch(setStoryNull())
            dispatch(setCommentsNull())
        }
    }, [])

    const onClickBackHandler = () => history.push('/newStories')

    const onClickUpdateHandler = () => setUpdate(!update)

    if (!isInitialized) {
        return <Preloader/>
    }

    return <div className={styles.storyComponent}>

        <header className={styles.storyHeader}>
            <Button onClick={onClickBackHandler} disabled={status === 'loading'}>Back to news list</Button>
            <Button onClick={onClickUpdateHandler} disabled={status === 'loading'}>Update comments</Button>
        </header>

        {story &&
            <div>
                <Story
                    title={story.title}
                    nameUser={story.by}
                    time={story.time}
                    comments={story?.kids ? story.kids.length : 0}
                    url={story.url}
                />

                {comments && comments.map(el => <Comment key={el.id} comment={el}/>)}
            </div>
        }
    </div>
}