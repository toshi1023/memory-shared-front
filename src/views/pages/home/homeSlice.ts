import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../stores/store";
import axios from "axios";
import { LOGIN_PROPS } from "../../types/homeTypes";

const webUrl = process.env.REACT_APP_MSA_WEB_URL;

/**
 * Login時のToken取得用非同期関数
 */
export const fetchAsyncLogin = createAsyncThunk(
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
            
            return res.data;

            // axios.get(`${webUrl}/sanctum/csrf-cookie`).then((response) => {
            //     axios.post(`${webUrl}/login`, props, {
            //         headers: {
            //             "Content-Type": "application/json",
            //             "Accept": "application/json"
            //         },
            //         withCredentials: true
            //     }).then((res) => {
            //         return res.data;
            //     });
            // });

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data;
        }
  }
);

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        // info_message
        infoMessage: '',
        // error_message
        errorMessage: '',
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
        builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
            // console.log(action.payload);
            action.payload.error_message ? 
                state.errorMessage = action.payload.error_message
            : 
                state.infoMessage = action.payload.info_message
        });
    },
});

export const selectLoginInfom = (state: RootState) => state.home.infoMessage;
export const selectLoginErrm = (state: RootState) => state.home.errorMessage;

export default homeSlice.reducer;