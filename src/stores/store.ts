import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useSelector as rawUseSelector, TypedUseSelectorHook } from 'react-redux';
import SessionCheck from '../middleware/sessionCheck';
import appReducer from '../views/pages/appSlice';
import homeReducer from '../views/pages/home/homeSlice';
import userReducer from '../views/pages/users/userSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    home: homeReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        // correctly typed middlewares can just be used
      ).concat(
        // セッションチェック
        SessionCheck,
      )
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

// useSelectorに型を定義
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector