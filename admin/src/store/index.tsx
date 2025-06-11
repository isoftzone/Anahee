import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import userRouter from './userSlice'
const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    user: userRouter,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
