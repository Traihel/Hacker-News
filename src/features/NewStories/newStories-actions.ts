import {createAsyncThunk} from "@reduxjs/toolkit"
import {hackerNewsAPI, StoryType} from '../../api/api';
import {setAppIsInitialized, setAppStatus} from "../../app/app-reducer";
import {errorHandlerUtil} from "../../common/utils/errors-utils";

export const getStories = createAsyncThunk<StoryType[]>('stories/getStories', async (_, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const resStories = (await hackerNewsAPI.getStories()).data.filter((el, index) => index < 100)
        return (await Promise.all(
            resStories.map(async (el) => {
                const resStory = await hackerNewsAPI.getStory(el)
                return resStory.data
            }))).filter(el => el !== null)
    } catch (e) {
        errorHandlerUtil(e, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setAppIsInitialized({isInitialized: true}))
        dispatch(setAppStatus({status: 'idle'}))
    }
})