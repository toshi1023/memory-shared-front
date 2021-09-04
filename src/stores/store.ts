import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
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