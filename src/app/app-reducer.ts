const initialState = {
    status: 'idle' as RequestStatusType,
    error: ''
}

export const appReducer = (state = initialState, action: AppActionType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

// Actions
export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (error: string) => ({type: 'APP/SET-ERROR', error} as const)

// Types
export type InitialAppStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading'
export type AppActionType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>