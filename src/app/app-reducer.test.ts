import {appReducer, InitialAppStateType, setAppError, setAppStatus} from "./app-reducer";

let state: InitialAppStateType

beforeEach(() => {
    state = {
        status: 'idle',
        error: '',
    }
})

test('set status', () => {
    const appReducer1 = appReducer(state, setAppStatus("loading"))
    expect(appReducer1.status).toBe("loading")
})

test('set error', () => {
    const appReducer1 = appReducer(state, setAppError('Error messages'))
    expect(appReducer1.error).toBe('Error messages')
})


