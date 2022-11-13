import React from 'react';
import styles from './Story.module.scss';
import {useTime} from '../../hooks/useTime';

type StoryPropsType = {
    title: string
    score?: number
    nameUser: string
    time: number
    url?: string
    comments?: number
}

export const Story = ({title, score, nameUser, time, url, comments}: StoryPropsType) => {

    const finaleTime = useTime(time)

    return <div className={styles.storyComponent}>

        <div className={styles.titleBox}>
            <div className={styles.title} dangerouslySetInnerHTML={{__html: title}}/>
            {url && <a href={url} className={styles.link} target="_blank">Read source</a>}
        </div>

        <div className={styles.infoBox}>
            <span>by {nameUser} posted on {finaleTime}</span>
            {score && <span>Rating: {score}</span>}
            {comments !== undefined && <span>Comments: {comments}</span>}
        </div>

    </div>
}