import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {setCommentsData, setStory, setStoryData} from './storyPage-reducer';
import {useTime} from '../../common/hooks/useTime';
import {Comment} from './Comment/Comment';
import {Preloader} from '../../common/components/Preloader/Preloader';

export const StoryPage = () => {

    const {storyID} = useParams<{ storyID: string }>()
    const history = useHistory();

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const story = useAppSelector(state => state.storyPage.story)
    const comments = useAppSelector(state => state.storyPage.comments)

    const finaleTime = useTime(story?.time as number)

    const [update, setUpdate] = useState<boolean>(false)

    useEffect(() => {
        dispatch(setStory(+storyID))

    }, [update])

    useEffect(() => {
        return () => {
            dispatch(setStoryData(null))
            dispatch(setCommentsData(null))
        }
    }, [])

    const onClickBackHandler = () => history.push('/newStories')

    const onClickUpdateHandler = () => setUpdate(!update)

    if (!isInitialized) {
        return <Preloader/>
    }

    return <div>
        <button onClick={onClickBackHandler}>Назад</button>
        <button onClick={onClickUpdateHandler}>обновить</button>
        {story &&
            <div>
                <div>{story?.url}</div>
                <div>{story?.title}</div>
                <div>{finaleTime}</div>
                <div>{story?.by}</div>
                <div>{story?.kids ? story?.kids.length : 0}</div>

                {comments?.map(el => <Comment key={el.id} comment={el}/>)}
            </div>
        }
    </div>
}