import React, {useState} from 'react';
import styles from './Comment.module.scss';
import {CommentType, hackerNewsAPI} from '../../../api/api';
import {setAppStatus} from '../../../app/app-reducer';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';

type CommentPropsType = {
    comment: CommentType
}

export const Comment = ({comment}: CommentPropsType) => {

    const dispatch = useAppDispatch()

    const [value, srtValue] = useState<CommentType[] | null>(null)

    const onClickHandler = async () => {
        if (value) {
            srtValue(null)
        } else {
            if (comment.kids) {
                dispatch(setAppStatus('loading'))
                const resComment = await Promise.all(
                    comment.kids.map(async (el) => {
                        const resStory = await hackerNewsAPI.getStory(el)
                        return resStory.data
                    }))
                srtValue(resComment)
                dispatch(setAppStatus('idle'))
            }
        }
    }

    return <div className={styles.commentComponent}>
        <div dangerouslySetInnerHTML={{__html: comment.text}} />
        {comment.kids &&
            <div>
                <div>{comment.kids.length}</div>
                <div onClick={onClickHandler}>new comments</div>
            </div>
        }

        {value?.map(el => <Comment key={el.id} comment={el}/>)}

    </div>
}