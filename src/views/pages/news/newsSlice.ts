import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../stores/store";
import axios from "axios";
import { NEWS_PROPS, NEWS_RES, NEWS_REDUCER, DELETE_NREADS_RES, DELETE_NREADS_PROPS } from "../../types/newsTypes";
import { 
    GROUPS_PROPS, GROUPS_RES, API_GROUP_PROPS, GROUP_RES, 
    PUSERS_RES, ALBUMS_RES, POSTS_RES, COMMENTS_PROPS, COMMENTS_RES  
} from "../../types/groupsTypes";

const apiUrl = process.env.REACT_APP_MSA_API_URL;

/**
 * ニュース一覧取得の非同期関数
 */
 export const fetchAsyncGetNews = createAsyncThunk<NEWS_RES>(
    "news",
    async () => {
        try {
            const res = await axios.get(`${apiUrl}/news`, {
                headers: {
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as NEWS_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as NEWS_RES;
        }
    }
);

/**
 * ニュース未読データ削除処理の非同期関数
 */
 export const fetchAsyncDeleteNreads = createAsyncThunk<DELETE_NREADS_RES, DELETE_NREADS_PROPS>(
    "delete_nreads",
    async (props) => {
        try {
            const res = await axios.post(`${apiUrl}/news/${props.id}/nread`, props, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as DELETE_NREADS_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as DELETE_NREADS_RES;
        }
    }
);

export const newsSlice = createSlice({
    name: "news",
    initialState: {
        // ニュース一覧を管理
        news: [
            {
                user_id: 0,
                news_id: 0,
                title: '',
                content: '',
                update_user_id: 0,
                created_at: '',
                updated_at: '',
                read_user_id: 0
            }
        ],
        // ニュース詳細
        newsinfo: {
            user_id: 0,
            news_id: 0,
            title: '',
            content: '',
            update_user_id: 0,
            created_at: '',
            updated_at: '',
            read_user_id: 0
        },
        page: {
            // ニュース一覧
            ni_currentpage: 0,
            ni_lastpage: 0,
        }
    },
    reducers: {
        // ニュース詳細の取得
        fetchGetNewsInfo(state, action: PayloadAction<NEWS_REDUCER>) {
            state.newsinfo = action.payload;
        },
    },
    // 非同期関数の後処理を設定
    extraReducers: (builder) => {
        // ニュース一覧取得処理
        builder.addCase(fetchAsyncGetNews.fulfilled, (state, action: PayloadAction<NEWS_RES>) => {
            if(!action.payload.error_message) {
                state.news = action.payload.news.data;
                state.page.ni_currentpage = action.payload.news.current_page;
                state.page.ni_lastpage = action.payload.news.last_page;
            }
        });
        // ニュース未読データ削除処理
        builder.addCase(fetchAsyncDeleteNreads.fulfilled, (state, action: PayloadAction<DELETE_NREADS_RES>) => {
            if(!action.payload.error_message) {
                return {
                    ...state,
                    news: state.news.map((news) =>
                        news.news_id === action.payload.news.news_id && news.user_id === action.payload.news.user_id ? 
                            action.payload.news 
                        : 
                            news
                    ),
                }
            }
        });
    },
});

export const {
    fetchGetNewsInfo
} = newsSlice.actions;

export const selectNews = (state: RootState) => state.news.news;
export const selectNewsInfo = (state: RootState) => state.news.newsinfo;

export default newsSlice.reducer;