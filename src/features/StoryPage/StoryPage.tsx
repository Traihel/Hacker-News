import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../common/hooks/useAppSelector';

export const StoryPage = () => {

    const {storyID} = useParams<{storyID: string}>()

    const stories = useAppSelector(state => state.newStories.stories)

    const story = stories ? stories.find(el => el.id === +storyID) : null

    useEffect(() =>{
        if (!story) {

        }

    }, [])

    console.log(story)

    return <div>
        {storyID} |
        StoryPage
    </div>
}