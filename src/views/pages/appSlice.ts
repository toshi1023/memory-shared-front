import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../stores/store";
import axios from "axios";
import { NREAD_COUNT_RES } from "../types/commonTypes";

const webUrl = process.env.REACT_APP_MSA_WEB_URL;
const apiUrl = process.env.REACT_APP_MSA_API_URL;

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
 * ニュース未読数取得の非同期関数
 */
 export const fetchAsyncGetNreadCount = createAsyncThunk<NREAD_COUNT_RES>(
    "nread_count",
    async () => {
        try {
            const res = await axios.get(`${apiUrl}/nread`, {
                headers: {
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as NREAD_COUNT_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as NREAD_COUNT_RES;
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
        currentUrl: '/',
        // ニュースの未読数を管理(アイコンのBadge表示用)
        nreadCount: 0
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
        },
    },
    extraReducers: (builder) => {
        // ニュース未読数取得処理
        builder.addCase(fetchAsyncGetNreadCount.fulfilled, (state, action: PayloadAction<NREAD_COUNT_RES>) => {
            state.nreadCount = action.payload.nread_count;
        });
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
export const selectNreadCount = (state: RootState) => state.app.nreadCount;

export default appSlice.reducer