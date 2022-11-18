import {CommentType, StoryType} from '../../api/api';
import {createSlice} from '@reduxjs/toolkit';
import {getComments, getStory} from './storyPage-actions';

const initialState = {
    story: null as StoryType | null,
    comments: null as CommentType[] | null
}

const slice = createSlice({
    name: 'storyPage',
    initialState,
    reducers: {
        setStoryNull(state) {
            state.story = null
        },
        setCommentsNull(state) {
            state.comments = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStory.fulfilled, (state, action) => {
                state.story = action.payload
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.comments = action.payload
            })
    }
})

export const storyPageReducer = slice.reducer

export const {setStoryNull, setCommentsNull} = slice.actions

// Types
export type InitialStoryPageStateType = typeof initialState
