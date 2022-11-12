import {AppThunk} from "../../store/store"
import {hackerNewsAPI, RootStoryType} from '../../api/api';
import {setIsInitialized} from '../../app/app-reducer';

const initialState = {
    stories: null as RootStoryType[] | null,
}

export const newStoriesReducer = (state = initialState, action: NewStoriesActionType): InitialNewStoriesStateType => {
    switch (action.type) {
        case 'NEW-STORIES/SET-STORIES-DATA':
            return {...state, stories: action.date}
        default:
            return state
    }
}

// Actions
export const setStoriesData = (date: RootStoryType[]) => ({type: 'NEW-STORIES/SET-STORIES-DATA', date} as const)

// Thunks
export const setStories = (): AppThunk => async (dispatch) => {
    try {
        const resStories = (await hackerNewsAPI.getStories()).data.filter((el, index) => index < 100)
        const res = await Promise.all(
            resStories.map(async (el) => {
                const resStory = await hackerNewsAPI.getStory(el)
                return resStory.data
            }))
        dispatch(setStoriesData(res))
    } catch (e) {
        console.log('e')
    } finally {
        dispatch(setIsInitialized(true))
    }
}

// Types
export type InitialNewStoriesStateType = typeof initialState

export type NewStoriesActionType =
    | ReturnType<typeof setStoriesData>