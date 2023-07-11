import { rootReducer } from './reducers'

export type RootState = ReturnType<typeof rootReducer>

export type AppState = ReturnType<typeof rootReducer>
