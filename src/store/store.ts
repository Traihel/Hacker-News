import {appReducer} from "../app/app-reducer"
import {newStoriesReducer} from '../features/NewStories/newStories-reducer';
import {storyPageReducer} from '../features/StoryPage/storyPage-reducer';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    app: appReducer,
    newStories: newStoriesReducer,
    storyPage: storyPageReducer
})

export const store = configureStore({reducer: rootReducer})

// Types
export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch