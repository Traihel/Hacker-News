import {appReducer, InitialAppStateType, setAppError, setAppStatus, setIsInitialized} from "./app-reducer";

let state: InitialAppStateType

beforeEach(() => {
    state = {
        status: 'idle',
        isInitialized: false,
        error: '',
    }
})

test('set status', () => {
    const appReducer1 = appReducer(state, setAppStatus("loading"))
    expect(appReducer1.status).toBe("loading")
})

test('set in initialized', () => {
    const appReducer1 = appReducer(state, setIsInitialized(true))
    expect(appReducer1.isInitialized).toBe(true)
})

test('set error', () => {
    const appReducer1 = appReducer(state, setAppError('Error messages'))
    expect(appReducer1.error).toBe('Error messages')
})


