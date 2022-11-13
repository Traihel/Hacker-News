import {setAppStatus} from "../../app/app-reducer"
import {AppThunk} from "../../store/store"
import {CommentType, hackerNewsAPI, StoryType} from '../../api/api';

const initialState = {
    story: null as StoryType | null,
    comments: null as CommentType[] | null
}

export const storyPageReducer = (state = initialState, action: StoryPageActionType): InitialStoryPageStateType => {
    switch (action.type) {
        case 'STORY-PAGE/SET-STORY-DATA':
            return {...state, story: action.date}
        case 'STORY-PAGE/SET-COMMENT-DATA':
            return {...state, comments: action.date}
        default:
            return state
    }
}

// Actions
export const setStoryData = (date: StoryType | null) => ({type: 'STORY-PAGE/SET-STORY-DATA', date} as const)

export const setCommentData = (date: CommentType[] | null) => ({type: 'STORY-PAGE/SET-COMMENT-DATA', date} as const)

// Thunks
export const setStory = (storyId: number): AppThunk => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const resStory = await hackerNewsAPI.getStory(storyId)
        dispatch(setStoryData(resStory.data))
        if (resStory.data.kids) {
            const resComment = await Promise.all(
                resStory.data.kids.map(async (el) => {
                    const resStory = await hackerNewsAPI.getStory(el)
                    return resStory.data
                }))
            dispatch(setCommentData(resComment))
        }
    } catch (e) {
        console.log('e')
    } finally {
        dispatch(setAppStatus('idle'))
    }
}

// Types
export type InitialStoryPageStateType = typeof initialState

export type StoryPageActionType =
    | ReturnType<typeof setStoryData>
    | ReturnType<typeof setCommentData>