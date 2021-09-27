import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../stores/store";
import axios from "axios";
import {
    USERS_PROPS, USERS_RES, API_USER_PROPS, USER_RES, WGROUPS_RES, PGROUPS_RES, 
    IGROUPS_RES, API_GROUP_INVITE_PROPS, GROUP_INVITE_RES, EDIT_USER_RES, 
    REGISTER_USER_PROPS, REGISTER_USER_RES, USER_VALIDATE_RES, 
    UPDATE_USER_PROPS, UPDATE_USER_RES 
} from '../../types/usersTypes';
import generateFormData from "../../../functions/generateFormData";

const webUrl = process.env.REACT_APP_MSA_WEB_URL;
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
 export const fetchAsyncGetUser = createAsyncThunk<USER_RES, API_USER_PROPS>(
    "user",
    async (props: API_USER_PROPS) => {
        try {
            const res = await axios.get(`${apiUrl}/users/${props.id}`, {
                headers: {
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as USER_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as USER_RES;
        }
    }
);

/**
 * 参加歓迎中グループ情報取得の非同期関数
 */
 export const fetchAsyncGetWelcomeGroups = createAsyncThunk<WGROUPS_RES, API_USER_PROPS>(
    "welcome_groups",
    async (props: API_USER_PROPS) => {
        try {
            const res = await axios.get(`${apiUrl}/users/${props.id}/wgroups`, {
                headers: {
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as WGROUPS_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as WGROUPS_RES;
        }
    }
);

/**
 * 参加中グループ情報取得の非同期関数
 */
 export const fetchAsyncGetParticipatingGroups = createAsyncThunk<PGROUPS_RES, API_USER_PROPS>(
    "participating_groups",
    async (props: API_USER_PROPS) => {
        try {
            const res = await axios.get(`${apiUrl}/users/${props.id}/pgroups`, {
                headers: {
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as PGROUPS_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as PGROUPS_RES;
        }
    }
);

/**
 * 招待用グループ情報取得の非同期関数
 */
 export const fetchAsyncGetInviteGroups = createAsyncThunk<IGROUPS_RES, API_USER_PROPS>(
    "invite_groups",
    async (props: API_USER_PROPS) => {
        try {
            const res = await axios.get(`${apiUrl}/users/${props.id}/igroups`, {
                headers: {
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as IGROUPS_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as IGROUPS_RES;
        }
    }
);

/**
 * グループ招待用の非同期関数
 */
 export const fetchAsyncPostInviteGroup = createAsyncThunk<GROUP_INVITE_RES, API_GROUP_INVITE_PROPS>(
    "group_invite",
    async (props: API_GROUP_INVITE_PROPS) => {
        try {
            const res = await axios.post(`${apiUrl}/groups/${props.group_id}/history`, props, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as GROUP_INVITE_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as GROUP_INVITE_RES;
        }
    }
);

/**
 * 編集用ユーザ情報取得の非同期関数
 */
 export const fetchAsyncGetEditUser = createAsyncThunk<EDIT_USER_RES, API_USER_PROPS>(
    "edituser",
    async (props: API_USER_PROPS) => {
        try {
            const res = await axios.get(`${apiUrl}/users/${props.id}/edit`, {
                headers: {
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as EDIT_USER_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as EDIT_USER_RES;
        }
    }
);

/**
 * ユーザ登録のバリデーションチェック非同期関数
 */
 export const fetchAsyncPostUserValidation = createAsyncThunk<USER_VALIDATE_RES, REGISTER_USER_PROPS>(
    "validation",
    async (props: REGISTER_USER_PROPS) => {
        try {
            const fd = generateFormData<REGISTER_USER_PROPS>(props);
            if(!props.image_file) {
                // 画像が設定されていない場合はFormDataから除去
                fd.delete('image_file');
            }

            const res = await axios.post(`${webUrl}/validate`, fd, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as USER_VALIDATE_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return err.response.data as USER_VALIDATE_RES;
        }
    }
);

/**
 * ユーザ登録処理の非同期関数
 */
 export const fetchAsyncPostUser = createAsyncThunk<REGISTER_USER_RES, REGISTER_USER_PROPS>(
    "register",
    async (props: REGISTER_USER_PROPS) => {
        try {
            const fd = generateFormData<REGISTER_USER_PROPS>(props);
            if(!props.image_file) {
                // 画像が設定されていない場合はFormDataから除去
                fd.delete('image_file');
            }

            const res = await axios.post(`${webUrl}/register`, fd, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as REGISTER_USER_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return err.response.data as REGISTER_USER_RES;
        }
    }
);

/**
 * ユーザ更新処理の非同期関数
 */
 export const fetchAsyncPostEditUser = createAsyncThunk<UPDATE_USER_RES, UPDATE_USER_PROPS>(
    "update",
    async (props: UPDATE_USER_PROPS) => {
        try {
            const fd = generateFormData<UPDATE_USER_PROPS>(props);
            if(!props.image_file) {
                // 画像が設定されていない場合はFormDataから除去
                fd.delete('image_file');
            }
            // 編集フラグを設定
            fd.append('register_mode', 'edit');

            const res = await axios.post(`${apiUrl}/users/${props.id}`, fd, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as UPDATE_USER_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return err.response.data as UPDATE_USER_RES;
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
        // 招待用グループ
        igroups: [
            {
                id: 0,
                name: "",
                image_file: "",
                image_url: "",
                private_flg: 0
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
            // 招待用グループ
            ig_currentpage: 0,
            ig_lastpage: 0,
        },
        validation: {
            errors: {
                name: [''],
                email: [''],
                password: [''],
                password_confirmation: [''],
                image_file: ['']
            },
            validate_status: '',
        },
        edituser: {
            id: 0,
            name: "",
            email: "",
            hobby: "",
            gender: 0,
            description: "",
            status: 1,
            image_file: "",
            image_url: "",
        }
    },
    reducers: {
        // バリデーションのリセット
        fetchResetValidation(state, action: PayloadAction<USER_VALIDATE_RES>) {
            state.validation = action.payload;
        },
    },
    // 非同期関数の後処理を設定
    extraReducers: (builder) => {
        // ユーザ一覧取得処理
        builder.addCase(fetchAsyncGetUsers.fulfilled, (state, action: PayloadAction<USERS_RES>) => {
            if(!action.payload.error_message) {
                state.users = action.payload.users.data;
                state.page.ui_currentpage = action.payload.users.current_page;
                state.page.ui_lastpage = action.payload.users.last_page;
            }
        });
        // ユーザ詳細情報取得処理
        builder.addCase(fetchAsyncGetUser.fulfilled, (state, action: PayloadAction<USER_RES>) => {
            if(!action.payload.error_message) {
                state.user = action.payload.user;
            }
        });
        // 参加歓迎中グループ情報取得処理
        builder.addCase(fetchAsyncGetWelcomeGroups.fulfilled, (state, action: PayloadAction<WGROUPS_RES>) => {
            if(!action.payload.error_message) {
                state.wgroups = action.payload.wgroups.data;
                state.page.wg_currentpage = action.payload.wgroups.current_page;
                state.page.wg_lastpage = action.payload.wgroups.last_page;
            }
        });
        // 参加中グループ情報取得処理
        builder.addCase(fetchAsyncGetParticipatingGroups.fulfilled, (state, action: PayloadAction<PGROUPS_RES>) => {
            if(!action.payload.error_message) {
                state.pgroups = action.payload.pgroups.data;
                state.page.pg_currentpage = action.payload.pgroups.current_page;
                state.page.pg_lastpage = action.payload.pgroups.last_page;
            }
        });
        // 招待用グループ情報取得処理
        builder.addCase(fetchAsyncGetInviteGroups.fulfilled, (state, action: PayloadAction<IGROUPS_RES>) => {
            if(!action.payload.error_message) {
                state.igroups = action.payload.igroups.data;
                state.page.ig_currentpage = action.payload.igroups.current_page;
                state.page.ig_lastpage = action.payload.igroups.last_page;
            }
        });
        // グループ招待後の処理
        builder.addCase(fetchAsyncPostInviteGroup.fulfilled, (state, action: PayloadAction<GROUP_INVITE_RES>) => {
            if(!action.payload.error_message) {
                return {
                    ...state,
                    pgroups: [...state.pgroups, action.payload.group],
                };
            }
        });
        // 編集用ユーザ情報取得処理
        builder.addCase(fetchAsyncGetEditUser.fulfilled, (state, action: PayloadAction<EDIT_USER_RES>) => {
            if(!action.payload.error_message) {
                state.edituser = action.payload.edituser;
            }
        });
        // バリデーション結果取得処理
        builder.addCase(fetchAsyncPostUserValidation.fulfilled, (state, action: PayloadAction<USER_VALIDATE_RES>) => {
            state.validation = action.payload;
        });
        // ユーザ更新後のユーザ情報取得処理
        builder.addCase(fetchAsyncPostEditUser.fulfilled, (state, action: PayloadAction<UPDATE_USER_RES>) => {
            if(!action.payload.error_message) {
                state.edituser = action.payload.edituser;
            }
        });
    },
});

export const {
    fetchResetValidation
} = userSlice.actions;

export const selectUsers = (state: RootState) => state.user.users;
export const selectUser = (state: RootState) => state.user.user;
export const selectWgoups = (state: RootState) => state.user.wgroups;
export const selectPgoups = (state: RootState) => state.user.pgroups;
export const selectIgoups = (state: RootState) => state.user.igroups;
export const selectEditUser = (state: RootState) => state.user.edituser;
export const selectUserValidation = (state: RootState) => state.user.validation;

export default userSlice.reducer;