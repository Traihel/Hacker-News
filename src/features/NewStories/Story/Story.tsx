import React from 'react';
import {useHistory} from 'react-router-dom';

type StoryPropsType = {
    id: number
    title: string | undefined
    score: number
    nameUser: string
    time: number
}

export const Story = ({id, title, score, nameUser, time}: StoryPropsType) => {

    const history = useHistory();

    const onClickHandler = () => history.push(`/story/${id}`)

    const refTime = new Date(time * 1000);
    const finaleTime = `${refTime.getDate()}.${refTime.getMonth() + 1}.${refTime.getFullYear()}`

    return <div onClick={onClickHandler}>
        <span>{title}</span> | <span>{score}</span> | <span>{nameUser}</span> | <span>{finaleTime}</span>
    </div>
}