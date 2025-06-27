import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from './slices/articleSlice'
import settingsReducer, { settingsSlice } from './slices/settingsSlice'

export const store = configureStore({
    reducer: {
        articles: articlesReducer,
        settings: settingsReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;