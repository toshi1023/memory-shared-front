import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../stores/store";
import axios from "axios";
import {
    USERS_PROPS, USERS_RES 
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
            // ユーザ一覧
            ui_currentpage: 0,
            ui_lastpage: 0,
            // ユーザ詳細
            ud_currentpage: 0,
            ud_lastpage: 0,
        }
    },
    reducers: {},
    // 非同期関数の後処理を設定
    extraReducers: (builder) => {
        // プロフィール取得処理
        builder.addCase(fetchAsyncGetUsers.fulfilled, (state, action: PayloadAction<USERS_RES>) => {
            state.users = action.payload.users.data;
            state.page.ui_currentpage = action.payload.users.current_page;
            state.page.ui_lastpage = action.payload.users.last_page;
        });
    },
});

export const selectUsers = (state: RootState) => state.user.users;

export default userSlice.reducer;