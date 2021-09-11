import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../stores/store";
import axios from "axios";
import {
    USERS_PROPS, USERS_RES, USER_INFO_PROPS, USER_INFO_RES, 
} from '../../types/usersTypes';

const apiUrl = process.env.REACT_APP_MSA_API_URL;

/**
 * ユーザ一覧取得の非同期関数
 */
 export const fetchAsyncGetUsers = createAsyncThunk<USERS_RES, USERS_PROPS>(
    "users",
    async (props: USERS_PROPS) => {
          try {
              // 検索条件によってURLを変更
              let url = `${apiUrl}/users?name@like=${props.s_namelike}`;
              if(props.o_name) url = url + `&sort_name=${props.o_name}`;
              if(props.o_created_at) url = url + `&sort_created_at=${props.o_created_at}`;

              const res = await axios.get(url, {
                  headers: {
                      "Accept": "application/json"
                  },
                  withCredentials: true
              });
              
              return res.data as USERS_RES;
  
          } catch (err: any) {
              if (!err.response) {
                  throw err
              }
              
              return err.response.data as USERS_RES;
          }
    }
);

/**
 * ユーザ詳細情報取得の非同期関数
 */
 export const fetchAsyncGetUserInfo = createAsyncThunk<USER_INFO_RES, USER_INFO_PROPS>(
    "user_info",
    async (props: USER_INFO_PROPS) => {
          try {
              const res = await axios.get(`${apiUrl}/users/${props.id}`, {
                  headers: {
                      "Accept": "application/json"
                  },
                  withCredentials: true
              });
              
              return res.data as USER_INFO_RES;
  
          } catch (err: any) {
              if (!err.response) {
                  throw err
              }
              
              return err.response.data as USER_INFO_RES;
          }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState: {
        // ユーザ一覧を管理
        users: [
            {
                id: 0,
                name: "",
                hobby: "",
                gender: 0,
                description: "",
                status: 1,
                image_file: "",
                image_url: "",
                families1: [
                    {
                        user_id1: 0,
                        user_id2: 0,
                        created_at: '',
                        updated_at: '',
                    }
                ],
                families2: [
                    {
                        user_id1: 0,
                        user_id2: 0,
                        created_at: '',
                        updated_at: '',
                    }
                ],
                message_relations1: [
                    {
                        user_id1: 0,
                        user_id2: 0,
                        created_at: '',
                        updated_at: '',
                    }
                ],
                message_relations2: [
                    {
                        user_id1: 0,
                        user_id2: 0,
                        created_at: '',
                        updated_at: '',
                    }
                ],
            }
        ],
        // ユーザ詳細情報を管理
        user: {
            id: 0,
            name: "",
            hobby: "",
            gender: 0,
            description: "",
            status: 1,
            image_file: "",
            image_url: "",
            families1: [
                {
                    user_id1: 0,
                    user_id2: 0,
                    created_at: '',
                    updated_at: '',
                }
            ],
            families2: [
                {
                    user_id1: 0,
                    user_id2: 0,
                    created_at: '',
                    updated_at: '',
                }
            ],
            message_relations1: [
                {
                    user_id1: 0,
                    user_id2: 0,
                    created_at: '',
                    updated_at: '',
                }
            ],
            message_relations2: [
                {
                    user_id1: 0,
                    user_id2: 0,
                    created_at: '',
                    updated_at: '',
                }
            ],
        },
        // 参加歓迎中グループ
        wgroups: [
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
        // 参加中グループ
        pgroups: [
            {
                id: 0,
                name: "",
                image_file: "",
                image_url: ""
            }
        ],
        page: {
            // ユーザ一覧
            ui_currentpage: 0,
            ui_lastpage: 0,
            // 参加歓迎中グループ
            wg_currentpage: 0,
            wg_lastpage: 0,
            // 参加中グループ
            pg_currentpage: 0,
            pg_lastpage: 0,
        }
    },
    reducers: {},
    // 非同期関数の後処理を設定
    extraReducers: (builder) => {
        // ユーザ一覧取得処理
        builder.addCase(fetchAsyncGetUsers.fulfilled, (state, action: PayloadAction<USERS_RES>) => {
            state.users = action.payload.users.data;
            state.page.ui_currentpage = action.payload.users.current_page;
            state.page.ui_lastpage = action.payload.users.last_page;
        });
        // ユーザ詳細情報取得処理
        builder.addCase(fetchAsyncGetUserInfo.fulfilled, (state, action: PayloadAction<USER_INFO_RES>) => {
            // ユーザ詳細情報取得
            state.user = action.payload.user;
            
            // 参加歓迎中グループの取得
            state.wgroups = action.payload.wgroups.data;
            state.page.wg_currentpage = action.payload.wgroups.current_page;
            state.page.wg_lastpage = action.payload.wgroups.last_page;
            
            // 参加中のグループを取得
            state.pgroups = action.payload.pgroups.data;
            state.page.pg_currentpage = action.payload.pgroups.current_page;
            state.page.pg_lastpage = action.payload.pgroups.last_page;
        });
    },
});

export const selectUsers = (state: RootState) => state.user.users;
export const selectUser = (state: RootState) => state.user.user;
export const selectWgoups = (state: RootState) => state.user.wgroups;
export const selectPgoups = (state: RootState) => state.user.pgroups;

export default userSlice.reducer;