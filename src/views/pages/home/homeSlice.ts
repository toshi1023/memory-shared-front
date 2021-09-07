import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../stores/store";
import axios from "axios";
import { LOGIN_PROPS, LOGIN_RES, LOGOUT_PROPS, LOGOUT_RES } from "../../types/homeTypes";

const webUrl = process.env.REACT_APP_MSA_WEB_URL;

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

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        // Loginしているユーザを管理
        myprofile: {
            id: 0,
            nickName: "",
            userProfile: 0,
            created_on: "",
            img: "",
        },
        // 存在する全プロフィールを管理
        profiles: [
            {
            id: 0,
            nickName: "",
            userProfile: 0,
            created_on: "",
            img: "",
            },
        ],
    },
    reducers: {
      
    },
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
    },
});

export default homeSlice.reducer;