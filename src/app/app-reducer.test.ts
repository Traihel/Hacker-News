import {appReducer, InitialAppStateType, setAppError, setAppStatus, setAppIsInitialized} from "./app-reducer";

let state: InitialAppStateType

beforeEach(() => {
    state = {
        status: 'idle',
        isInitialized: false,
        error: {message: ''},
    }
})

test('set status', () => {
    const appReducerTest = appReducer(state, setAppStatus({status: 'loading'}))
    expect(appReducerTest.status).toBe("loading")
})

test('set in initialized', () => {
    const appReducerTest = appReducer(state, setAppIsInitialized({isInitialized: true}))
    expect(appReducerTest.isInitialized).toBe(true)
})

test('set error', () => {
    const appReducerTest = appReducer(state, setAppError({message: 'Error messages'}))
    expect(appReducerTest.error?.message).toBe('Error messages')
})