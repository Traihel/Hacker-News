import React, {useEffect, useState} from 'react';
import styles from './Comment.module.scss';
import {CommentType, hackerNewsAPI} from '../../../api/api';
import {setAppStatus} from '../../../app/app-reducer';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {Button} from '../../../common/components/Button/Button';
import {useTime} from '../../../common/hooks/useTime';

type CommentPropsType = {
    comment: CommentType
}

export const Comment = ({comment}: CommentPropsType) => {

    const dispatch = useAppDispatch()

    const [value, srtValue] = useState<CommentType[] | null>(null)
    const [update, setUpdate] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            if (comment.kids && update) {
                dispatch(setAppStatus({status: 'loading'}))
                const resComment = await Promise.all(
                    comment.kids.map(async (el) => {
                        const resStory = await hackerNewsAPI.getStory(el)
                        return resStory.data
                    }))
                srtValue(resComment)
                dispatch(setAppStatus({status: 'idle'}))
            }
        })()
        return () => {
            srtValue(null)
        }
    }, [update])

    const onClickCommentHandler = async () => setUpdate(!update)

    const finaleTime = useTime(comment.time)

    return <div className={styles.commentComponent}>

        <div className={styles.commentBox}>

            <div className={styles.title} dangerouslySetInnerHTML={{__html: comment.text}}/>

            <div className={styles.commentInfo}>
                {comment.kids &&
                    <Button className={styles.button} onClick={onClickCommentHandler}>
                        Comments: {comment.kids.length} {value ? <span>&#9650;</span> : <span>&#9660;</span>}
                    </Button>
                }
                <span>by {comment.by} posted on {finaleTime}</span>
            </div>

        </div>

        {value?.map(el => <Comment key={el.id} comment={el}/>)}

    </div>
}