import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../stores/store";
import axios from "axios";
import { 
    LOGIN_PROPS, LOGIN_RES, LOGOUT_PROPS, LOGOUT_RES, API_USERS_PROPS, PROFILE_RES, 
    FAMILY_RES, PARTICIPANT_RES, TALKLIST_RES 
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
export const fetchAsyncGetProfile = createAsyncThunk<PROFILE_RES, API_USERS_PROPS>(
    "profile",
    async (props: API_USERS_PROPS) => {
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
export const fetchAsyncGetFamily = createAsyncThunk<FAMILY_RES, API_USERS_PROPS>(
    "family",
    async (props: API_USERS_PROPS) => {
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

/**
 * 参加中グループ取得の非同期関数
 */
export const fetchAsyncGetParticipant = createAsyncThunk<PARTICIPANT_RES, API_USERS_PROPS>(
    "participant",
    async (props: API_USERS_PROPS) => {
          try {
              const res = await axios.get(`${apiUrl}/users/${props.id}/groups`, {
                  headers: {
                      "Accept": "application/json"
                  },
                  withCredentials: true
              });
              
              return res.data as PARTICIPANT_RES;
  
          } catch (err: any) {
              if (!err.response) {
                  throw err
              }
              
              return err.response.data as PARTICIPANT_RES;
          }
    }
);

/**
 * トーク一覧取得の非同期関数
 */
export const fetchAsyncGetTalklist = createAsyncThunk<TALKLIST_RES, API_USERS_PROPS>(
    "talklist",
    async (props: API_USERS_PROPS) => {
          try {
              const res = await axios.get(`${apiUrl}/users/${props.id}/messages`, {
                  headers: {
                      "Accept": "application/json"
                  },
                  withCredentials: true
              });
              
              return res.data as TALKLIST_RES;
  
          } catch (err: any) {
              if (!err.response) {
                  throw err
              }
              
              return err.response.data as TALKLIST_RES;
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
        participants: [
            {
                id: 0,
                name: "",
                description: "",
                private_flg: 0,
                welcome_flg: 0,
                image_file: "",
                image_url: "",
                host_user_id: 0,
                memo: "",
                update_user_id: 0,
                created_at: "",
                updated_at: "",
                deleted_at: null,
                albums: [
                    {
                        id: 0,
                        name: ''
                    }
                ],
                group_histories: [
                    {
                        id: 0,
                        group_id: 0
                    }
                ]
            }
        ],
        talklist: [
            {
                id: 0,
                content: '',
                own_id: 0,
                user_id: 0,
                update_user_id: 0,
                created_at: '',
                updated_at: '',
                deleted_at: null,
                otherid: 0,
                messangers_id: 0,
                other: {
                    id: 0,
                    name: '',
                    image_file: '',
                    image_url: ''
                }
            }
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
            if(action.payload.info_message) {
                localStorage.setItem('loginId', String(action.payload.id));
                localStorage.setItem('loginName', String(action.payload.name));
            }
        });
        // ログアウト処理
        builder.addCase(fetchAsyncLogout.fulfilled, (state, action: PayloadAction<LOGOUT_RES>) => {
            if(action.payload.info_message) {
                localStorage.removeItem('loginId');
                localStorage.removeItem('loginName');
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
        // 参加グループ取得処理
        builder.addCase(fetchAsyncGetParticipant.fulfilled, (state, action: PayloadAction<PARTICIPANT_RES>) => {
            state.participants = action.payload.participants.data;
            state.page.g_currentpage = action.payload.participants.current_page;
            state.page.g_lastpage = action.payload.participants.last_page;
        });
        // トーク一覧取得処理
        builder.addCase(fetchAsyncGetTalklist.fulfilled, (state, action: PayloadAction<TALKLIST_RES>) => {
            state.talklist = action.payload.talklist.data;
            state.page.g_currentpage = action.payload.talklist.current_page;
            state.page.g_lastpage = action.payload.talklist.last_page;
        });
    },
});

export const selectProfile = (state: RootState) => state.home.profile;
export const selectFamily = (state: RootState) => state.home.families;
export const selectParticipant = (state: RootState) => state.home.participants;
export const selectTalklist = (state: RootState) => state.home.talklist;
export const selectHomePage = (state: RootState) => state.home.page;

export default homeSlice.reducer;