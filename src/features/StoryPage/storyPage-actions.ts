import {createAsyncThunk} from '@reduxjs/toolkit';
import {CommentType, hackerNewsAPI, StoryType} from '../../api/api';
import {setAppIsInitialized, setAppStatus} from '../../app/app-reducer';
import {errorHandlerUtil} from '../../common/utils/errors-utils';


export const getStory = createAsyncThunk<StoryType, { storyId: number }>('storyPage/getStory', async (params, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const resStory = await hackerNewsAPI.getStory(params.storyId)
        if (resStory.data.kids) {
            dispatch(getComments({kidsId: resStory.data.kids}))
        }
        return resStory.data
    } catch (e) {
        errorHandlerUtil(e, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setAppIsInitialized({isInitialized: true}))
        dispatch(setAppStatus({status: 'idle'}))
    }
})

export const getComments = createAsyncThunk<CommentType[], { kidsId: number[] }>('storyPage/getComments', async (params, {
    dispatch,
    rejectWithValue
}) => {
    try {
        return (await Promise.all(
            params.kidsId.map(async (el) => {
                const resStory = await hackerNewsAPI.getStory(el)
                return resStory.data
            }))).filter(el => el !== null)
    } catch (e) {
        errorHandlerUtil(e, dispatch)
        return rejectWithValue(null)
    }
})