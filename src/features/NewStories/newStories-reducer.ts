import {StoryType} from '../../api/api';
import {createSlice} from '@reduxjs/toolkit';
import {getStories} from './newStories-actions';

const initialState = {
    stories: null as StoryType[] | null,
}

const slice = createSlice({
    name: 'stories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStories.fulfilled, (state, action) => {
                state.stories = action.payload
            })
    }
})

export const newStoriesReducer = slice.reducer

// Types
export type InitialNewStoriesStateType = typeof initialState