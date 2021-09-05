import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from '../views/pages/appSlice';
import homeReducer from '../views/pages/home/homeSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    home: homeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// TypeScriptではdispatchに対しても型を定義する必要があり、コンポーネントで利用するには必須の設定
// storeのdispatch型を受け取ってAppDispatchという型に定義してエクスポート
export type AppDispatch = typeof store.dispatch;