import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../stores/store";

/**
 * Slice(store)の設定
 */
 const appSlice = createSlice({
    name: 'app',
    // stateの初期状態
    initialState: {
        // isLoading: ローディングフラグを管理
        isLoading: false,
        // infoメッセージの管理
        infoMessages: '',
        // errorメッセージの管理
        errorMessages: '',
    },
    // Reducer (actionの処理を記述)
    reducers: {
        // Lodingの開始
        fetchCredStart(state) {
            state.isLoading = true;
        },
        // Lodingの終了
        fetchCredEnd(state) {
            state.isLoading = false;
        },
        // infoメッセージの取得
        fetchGetInfoMessages(state, action) {
            state.infoMessages = action.payload
        },
        // errorメッセージの取得
        fetchGetErrorMessages(state, action) {
            state.errorMessages = action.payload
        }
    }
})

export const {
    fetchCredStart,
    fetchCredEnd,
    fetchGetInfoMessages,
    fetchGetErrorMessages,
} = appSlice.actions;

export const selectLoading = (state: RootState) => state.app.isLoading;
export const selectInfoMessage = (state: RootState) => state.app.infoMessages;
export const selectErrorMessage = (state: RootState) => state.app.errorMessages;

export default appSlice.reducer