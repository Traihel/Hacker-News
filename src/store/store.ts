import {applyMiddleware, combineReducers, legacy_createStore } from "redux"
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk"
import {AppActionType, appReducer} from "../app/app-reducer"
import {NewStoriesActionType, newStoriesReducer} from '../features/NewStories/newStories-reducer';



const rootReducer = combineReducers({
    app: appReducer,
    newStories: newStoriesReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// Types
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppRootActionsType = AppActionType | NewStoriesActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>