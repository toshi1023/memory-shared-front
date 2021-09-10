import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../stores/store";
import axios from "axios";

const webUrl = process.env.REACT_APP_MSA_WEB_URL;

/**
 * Sanctum用のToken取得用非同期関数
 */
export const fetchAsyncGetToken = createAsyncThunk(
    "sanctum",
    async () => {
        try {
            const res = await axios.get(`${webUrl}/sanctum/csrf-cookie`, {
                headers: {
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data;
        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return err.response.data
        }
    }
);

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
        // 現在のURL管理
        currentUrl: '/'
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
        fetchGetInfoMessages(state, action: PayloadAction<string>) {
            state.infoMessages = action.payload;
        },
        // errorメッセージの取得
        fetchGetErrorMessages(state, action: PayloadAction<string>) {
            state.errorMessages = action.payload;
        },
        fetchGetUrl(state, action: PayloadAction<string>) {
            state.currentUrl = action.payload;
        }
    }
})

export const {
    fetchCredStart,
    fetchCredEnd,
    fetchGetInfoMessages,
    fetchGetErrorMessages,
    fetchGetUrl
} = appSlice.actions;

export const selectLoading = (state: RootState) => state.app.isLoading;
export const selectInfoMessage = (state: RootState) => state.app.infoMessages;
export const selectErrorMessage = (state: RootState) => state.app.errorMessages;
export const selectUrl = (state: RootState) => state.app.currentUrl;

export default appSlice.reducer