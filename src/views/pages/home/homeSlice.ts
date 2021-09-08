import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../stores/store";
import axios from "axios";
import { 
    LOGIN_PROPS, LOGIN_RES, LOGOUT_PROPS, LOGOUT_RES, PROFILE_PROPS, PROFILE_RES, 
    FAMILY_PROPS, FAMILY_RES 
} from "../../types/homeTypes";

const webUrl = process.env.REACT_APP_MSA_WEB_URL;
const apiUrl = process.env.REACT_APP_MSA_API_URL;

/**
 * Login時の非同期関数
 */
export const fetchAsyncLogin = createAsyncThunk<LOGIN_RES, LOGIN_PROPS>(
  "login",
  async (props: LOGIN_PROPS) => {
        try {
            const res = await axios.post(`${webUrl}/login`, props, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as LOGIN_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as LOGIN_RES;
        }
  }
);

/**
 * Logout時
 */
 export const fetchAsyncLogout = createAsyncThunk<LOGOUT_RES, LOGOUT_PROPS>(
    "logout",
    async (props: LOGOUT_PROPS) => {
          try {
              const res = await axios.post(`${webUrl}/logout`, props, {
                  headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                  },
                  withCredentials: true
              });
              
              return res.data as LOGOUT_RES;
  
          } catch (err: any) {
              if (!err.response) {
                  throw err
              }
              
              return err.response.data as LOGOUT_RES;
          }
    }
);

/**
 * プロフィール取得の非同期関数
 */
export const fetchAsyncGetProfile = createAsyncThunk<PROFILE_RES, PROFILE_PROPS>(
    "profile",
    async (props: PROFILE_PROPS) => {
          try {
              const res = await axios.get(`${apiUrl}/users/${props.id}`, {
                  headers: {
                      "Accept": "application/json"
                  },
                  withCredentials: true
              });
              
              return res.data as PROFILE_RES;
  
          } catch (err: any) {
              if (!err.response) {
                  throw err
              }
              
              return err.response.data as PROFILE_RES;
          }
    }
);

/**
 * ファミリー取得の非同期関数
 */
export const fetchAsyncGetFamily = createAsyncThunk<FAMILY_RES, FAMILY_PROPS>(
    "family",
    async (props: FAMILY_PROPS) => {
          try {
              const res = await axios.get(`${apiUrl}/users/${props.id}/families`, {
                  headers: {
                      "Accept": "application/json"
                  },
                  withCredentials: true
              });
              
              return res.data as FAMILY_RES;
  
          } catch (err: any) {
              if (!err.response) {
                  throw err
              }
              
              return err.response.data as FAMILY_RES;
          }
    }
);

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        // Loginしているユーザを管理
        profile: {
            id: 0,
            name: "",
            hobby: "",
            gender: 0,
            description: "",
            status: 1,
            image_file: "",
            image_url: "",
        },
        // ファミリーを管理
        families: [
            {
                id: 0,
                name: "",
                hobby: "",
                gender: 0,
                description: "",
                status: 1,
                image_file: "",
                image_url: "",
            },
        ],
        page: {
            // ファミリー
            f_currentpage: 0,
            f_lastpage: 0,
            // グループ
            g_currentpage: 0,
            g_lastpage: 0,
            // トーク
            t_currentpage: 0,
            t_lastpage: 0
        }
    },
    reducers: {},
    // 非同期関数の後処理を設定
    extraReducers: (builder) => {
        // ログイン処理
        builder.addCase(fetchAsyncLogin.fulfilled, (state, action: PayloadAction<LOGIN_RES>) => {
            if(action.payload.info_message) localStorage.setItem('loginId', String(action.payload.user));
        });
        // ログアウト処理
        builder.addCase(fetchAsyncLogout.fulfilled, (state, action: PayloadAction<LOGOUT_RES>) => {
            if(action.payload.info_message) {
                localStorage.removeItem('loginId');
                localStorage.setItem('infoMessage', action.payload.info_message);
            }
        });
        // プロフィール取得処理
        builder.addCase(fetchAsyncGetProfile.fulfilled, (state, action: PayloadAction<PROFILE_RES>) => {
            state.profile = action.payload.user;
        });
        // ファミリー取得処理
        builder.addCase(fetchAsyncGetFamily.fulfilled, (state, action: PayloadAction<FAMILY_RES>) => {
            state.families = action.payload.families.data;
            state.page.f_currentpage = action.payload.families.current_page;
            state.page.f_lastpage = action.payload.families.last_page;
        });
    },
});

export const selectProfile = (state: RootState) => state.home.profile;
export const selectFamily = (state: RootState) => state.home.families;
export const selectHomePage = (state: RootState) => state.home.page;

export default homeSlice.reducer;