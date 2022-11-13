import React from 'react';
import {useHistory} from 'react-router-dom';
import {useTime} from '../../../common/hooks/useTime';

type StoryPropsType = {
    id: number
    title: string
    score: number
    nameUser: string
    time: number
}

export const Story = ({id, title, score, nameUser, time}: StoryPropsType) => {

    const history = useHistory();

    const finaleTime = useTime(time)

    const onClickHandler = () => history.push(`/story/${id}`)

    return <div onClick={onClickHandler}>
        <div dangerouslySetInnerHTML={{__html: title}} />
        <span>{score}</span> | <span>{nameUser}</span> | <span>{finaleTime}</span>
    </div>
}