import {configureStore} from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import themeReducer from './features/themeSlice'
import { loadState , saveState } from './utils/localStorage'

const preloadedState = loadState()

const store = configureStore({
    reducer: {
        counter: counterReducer,
        theme: themeReducer,
    },
    preloadedState,
})
store.subscribe(()  => {
    saveState({
        counter: store.getState().counter,
        theme: store.getState().theme,
    })
})
export default store