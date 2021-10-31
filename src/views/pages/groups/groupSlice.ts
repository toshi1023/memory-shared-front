import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../stores/store";
import axios from "axios";
import { 
    GROUPS_PROPS, GROUPS_RES, API_GROUP_PROPS, GROUP_RES, 
    PUSERS_RES, ALBUMS_RES, POSTS_RES, COMMENTS_PROPS, COMMENTS_RES, 
    REGISTER_GROUP_RES, REGISTER_GROUP_PROPS, GROUP_VALIDATE_RES, 
    UPDATE_GROUP_RES, UPDATE_GROUP_PROPS, REGISTER_POST_RES, REGISTER_POST_PROPS, 
    REGISTER_COMMENT_RES, REGISTER_COMMENT_PROPS, DELETE_COMMENT_RES, DELETE_COMMENT_PROPS, 
    DELETE_POST_RES, DELETE_POST_PROPS, REGISTER_HISTORY_RES, REGISTER_HISTORY_PROPS, GH_USERS_RES, GH_USERS_PROPS, UPDATE_HISTORY_PROPS, UPDATE_HISTORY_RES, DELETE_GROUP_RES
} from "../../types/groupsTypes";
import generateFormData from "../../../functions/generateFormData";

const apiUrl = process.env.REACT_APP_MSA_API_URL;

/**
 * グループ一覧取得の非同期関数
 */
export const fetchAsyncGetGroups = createAsyncThunk<GROUPS_RES, GROUPS_PROPS>(
    "groups",
    async (props: GROUPS_PROPS) => {
        try {
            // 検索条件によってURLを変更
            let url = `${apiUrl}/groups?name@like=${props.s_namelike}`;
            if(props.o_name) url = url + `&sort_name=${props.o_name}`;
            if(props.o_created_at) url = url + `&sort_created_at=${props.o_created_at}`;

            const res = await axios.get(url, {
                headers: {
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as GROUPS_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as GROUPS_RES;
        }
    }
);

/**
 * グループ詳細情報取得の非同期関数
 */
export const fetchAsyncGetGroup = createAsyncThunk<GROUP_RES, API_GROUP_PROPS>(
    "group",
    async (props: API_GROUP_PROPS) => {
        try {
            const res = await axios.get(`${apiUrl}/groups/${props.id}`, {
                headers: {
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as GROUP_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as GROUP_RES;
        }
    }
);

/**
 * グループ参加者情報取得の非同期関数
 */
export const fetchAsyncGetPusers = createAsyncThunk<PUSERS_RES, API_GROUP_PROPS>(
    "pusers",
    async (props: API_GROUP_PROPS) => {
        try {
            const res = await axios.get(`${apiUrl}/groups/${props.id}/users`, {
                headers: {
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as PUSERS_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as PUSERS_RES;
        }
    }
);

/**
 * グループ履歴申請者情報取得の非同期関数
 */
export const fetchAsyncGetGhUsers = createAsyncThunk<GH_USERS_RES, GH_USERS_PROPS>(
    "gh_users",
    async (props: GH_USERS_PROPS) => {
        try {
            const res = await axios.get(`${apiUrl}/history?group_id=${props.group_id}&status=${props.status}&sort_created_at=${props.sort_created_at}`, {
                headers: {
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as GH_USERS_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as GH_USERS_RES;
        }
    }
);

/**
 * アルバム一覧取得の非同期関数
 */
export const fetchAsyncGetAlbums = createAsyncThunk<ALBUMS_RES, API_GROUP_PROPS>(
    "albums",
    async (props: API_GROUP_PROPS) => {
        try {
            const res = await axios.get(`${apiUrl}/groups/${props.id}/albums`, {
                headers: {
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as ALBUMS_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as ALBUMS_RES;
        }
    }
);

/**
 * 投稿一覧取得の非同期関数
 */
export const fetchAsyncGetPosts = createAsyncThunk<POSTS_RES, API_GROUP_PROPS>(
    "posts",
    async (props: API_GROUP_PROPS) => {
        try {
            const res = await axios.get(`${apiUrl}/groups/${props.id}/posts`, {
                headers: {
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as POSTS_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as POSTS_RES;
        }
    }
);

/**
 * コメント一覧取得の非同期関数
 */
export const fetchAsyncGetComments = createAsyncThunk<COMMENTS_RES, COMMENTS_PROPS>(
    "comments",
    async (props: COMMENTS_PROPS) => {
        try {
            const res = await axios.get(`${apiUrl}/groups/${props.id}/posts/${props.post_id}/comments`, {
                headers: {
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as COMMENTS_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as COMMENTS_RES;
        }
    }
);

/**
 * グループ登録のバリデーションチェック非同期関数
 */
export const fetchAsyncPostGroupValidation = createAsyncThunk<GROUP_VALIDATE_RES, REGISTER_GROUP_PROPS>(
    "registervalidation",
    async (props: REGISTER_GROUP_PROPS) => {
        try {
            const fd = generateFormData<REGISTER_GROUP_PROPS>(props);
            if(!props.image_file) {
                // 画像が設定されていない場合はFormDataから除去
                fd.delete('image_file');
            }

            const res = await axios.post(`${apiUrl}/groups/validate`, fd, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as GROUP_VALIDATE_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return err.response.data as GROUP_VALIDATE_RES;
        }
    }
);

/**
 * グループ作成の非同期関数
 */
export const fetchAsyncPostGroup = createAsyncThunk<REGISTER_GROUP_RES, REGISTER_GROUP_PROPS>(
    "register",
    async (props: REGISTER_GROUP_PROPS) => {
        try {
            const fd = generateFormData<REGISTER_GROUP_PROPS>(props);
            if(!props.image_file) {
                // 画像が設定されていない場合はFormDataから除去
                fd.delete('image_file');
            }
            const res = await axios.post(`${apiUrl}/groups`, fd, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as REGISTER_GROUP_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as REGISTER_GROUP_RES;
        }
    }
);

/**
 * グループ更新の非同期関数
 */
export const fetchAsyncPostEditGroup = createAsyncThunk<UPDATE_GROUP_RES, UPDATE_GROUP_PROPS>(
    "update",
    async (props: UPDATE_GROUP_PROPS) => {
        try {
            const fd = generateFormData<UPDATE_GROUP_PROPS>(props);
            if(!props.image_file) {
                // 画像が設定されていない場合はFormDataから除去
                fd.delete('image_file');
            }
            const res = await axios.post(`${apiUrl}/groups/${props.id}`, fd, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    'X-HTTP-Method-Override': 'PUT',
                },
                withCredentials: true
            });
            
            return res.data as UPDATE_GROUP_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as UPDATE_GROUP_RES;
        }
    }
);

/**
 * グループ削除の非同期関数
 */
 export const fetchAsyncDeleteGroup = createAsyncThunk<DELETE_GROUP_RES, API_GROUP_PROPS>(
    "delete",
    async (props: API_GROUP_PROPS) => {
        try {
            const res = await axios.delete(`${apiUrl}/groups/${props.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as DELETE_GROUP_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as DELETE_GROUP_RES;
        }
    }
);

/**
 * グループ参加申請の非同期関数
 */
export const fetchAsyncPostGroupHistory = createAsyncThunk<REGISTER_HISTORY_RES, REGISTER_HISTORY_PROPS>(
    "history_register",
    async (props: REGISTER_HISTORY_PROPS) => {
        try {
            const fd = generateFormData<REGISTER_HISTORY_PROPS>(props);
            const res = await axios.post(`${apiUrl}/groups/${props.group_id}/history`, fd, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as REGISTER_HISTORY_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as REGISTER_HISTORY_RES;
        }
    }
);

/**
 * グループ参加申請の回答処理用非同期関数
 */
export const fetchAsyncPutGroupHistory = createAsyncThunk<UPDATE_HISTORY_RES, UPDATE_HISTORY_PROPS>(
    "history_update",
    async (props: UPDATE_HISTORY_PROPS) => {
        try {
            const res = await axios.post(`${apiUrl}/groups/${props.group_id}/history/${props.id}`, props, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    'X-HTTP-Method-Override': 'PUT',
                },
                withCredentials: true
            });
            
            return res.data as UPDATE_HISTORY_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as UPDATE_HISTORY_RES;
        }
    }
);

/**
 * 投稿作成の非同期関数
 */
export const fetchAsyncPostPost = createAsyncThunk<REGISTER_POST_RES, REGISTER_POST_PROPS>(
    "post_register",
    async (props: REGISTER_POST_PROPS) => {
        try {
            const fd = generateFormData<REGISTER_POST_PROPS>(props);

            const res = await axios.post(`${apiUrl}/groups/${props.group_id}/posts`, fd, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as REGISTER_POST_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as REGISTER_POST_RES;
        }
    }
);

/**
 * 投稿削除の非同期関数
 */
export const fetchAsyncDeletePost = createAsyncThunk<DELETE_POST_RES, DELETE_POST_PROPS>(
    "post_delete",
    async (props: DELETE_POST_PROPS) => {
        try {
            const res = await axios.delete(`${apiUrl}/groups/${props.group_id}/posts/${props.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as DELETE_POST_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as DELETE_POST_RES;
        }
    }
);

/**
 * コメント作成の非同期関数
 */
export const fetchAsyncPostComment = createAsyncThunk<REGISTER_COMMENT_RES, REGISTER_COMMENT_PROPS>(
    "comment_register",
    async (props: REGISTER_COMMENT_PROPS) => {
        try {
            const fd = generateFormData<REGISTER_COMMENT_PROPS>(props);
            // group_idは保存対象でないため、fdから除外
            fd.delete('group_id');

            const res = await axios.post(`${apiUrl}/groups/${props.group_id}/posts/${props.post_id}/comments`, fd, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as REGISTER_COMMENT_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as REGISTER_COMMENT_RES;
        }
    }
);

/**
 * コメント削除の非同期関数
 */
export const fetchAsyncDeleteComment = createAsyncThunk<DELETE_COMMENT_RES, DELETE_COMMENT_PROPS>(
    "comment_delete",
    async (props: DELETE_COMMENT_PROPS) => {
        try {
            const res = await axios.delete(`${apiUrl}/groups/${props.group_id}/posts/${props.post_id}/comments/${props.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as DELETE_COMMENT_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as DELETE_COMMENT_RES;
        }
    }
);

export const groupSlice = createSlice({
    name: "group",
    initialState: {
        // グループ一覧を管理
        groups: [
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
                users: [
                    {
                        id: 0,
                        name: '',
                        gender: 0,
                        image_file: '',
                        image_url: '',
                        pivot: {
                            group_id: 0,
                            user_id: 0,
                            status: 0,
                            created_at: '',
                            updated_at: '',
                        }
                }]
            }
        ],
        // グループ詳細を管理
        group: {
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
            users: [
                {
                    id: 0,
                    name: '',
                    gender: 0,
                    image_file: '',
                    image_url: '',
                    pivot: {
                        group_id: 0,
                        user_id: 0,
                        status: 0,
                        created_at: '',
                        updated_at: '',
                    }
                }
            ],
            group_histories: [
                {
                    id: 0,
                    group_id: 0,
                    user_id: 0,
                    status: 0
                }
            ]
        },
        editgroup: {
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
        },
        // 参加者詳細情報を管理
        pusers: [
            {
                id: 0,
                name: "",
                image_file: "",
                image_url: "",
            }
        ],
        // グループ履歴にあるユーザ情報を管理
        ghusers: [
            {
                id: 0,
                user_id: 0,
                group_id: 0,
                status: 1,
                memo: "",
                update_user_id: 0,
                created_at: "",
                updated_at: "",
                deleted_at: null,
                user: {
                    id: 0,
                    name: "",
                    image_file: "",
                    image_url: "",
                }
            }
        ],
        albums: [
            {
                id: 0,
                name: '',
                group_id: 0,
                image_file: '',
                image_url: '',
                host_user_id: 0
            }
        ],
        posts: [
            {
                id: 0,
                content: '',
                user_id: 0,
                group_id: 0,
                update_user_id: 0,
                created_at: '',
                updated_at: '',
                deleted_at: null,
                user: {
                    id: 0,
                    name: '',
                    image_file: '',
                    image_url: '',
                }
            }
        ],
        comments: [
            {
                id: 0,
                content: '',
                user_id: 0,
                post_id: 0,
                update_user_id: 0,
                created_at: '',
                updated_at: '',
                deleted_at: null,
                user: {
                    id: 0,
                    name: '',
                    image_file: '',
                    image_url: '',
                }
            }
        ],
        validation: {
            errors: {
                name: [''],
                image_file: [''],
                host_user_id: ['']
            },
            validate_status: '',
        },
        page: {
            // グループ一覧
            gi_currentpage: 0,
            gi_lastpage: 0,
            // 参加者一覧
            u_currentpage: 0,
            u_lastpage: 0,
            // アルバム一覧
            a_currentpage: 0,
            a_lastpage: 0,
            // 投稿一覧
            p_currentpage: 0,
            p_lastpage: 0,
        }
    },
    reducers: {
        // バリデーションのリセット
        fetchResetValidation(state, action: PayloadAction<GROUP_VALIDATE_RES>) {
            state.validation = action.payload;
        },
    },
    // 非同期関数の後処理を設定
    extraReducers: (builder) => {
        // グループ一覧取得処理
        builder.addCase(fetchAsyncGetGroups.fulfilled, (state, action: PayloadAction<GROUPS_RES>) => {
            if(!action.payload.error_message) {
                state.groups = action.payload.groups.data;
                state.page.gi_currentpage = action.payload.groups.current_page;
                state.page.gi_lastpage = action.payload.groups.last_page;
            }
        });
        // グループ詳細取得処理
        builder.addCase(fetchAsyncGetGroup.fulfilled, (state, action: PayloadAction<GROUP_RES>) => {
            if(!action.payload.error_message) {
                state.group = action.payload.group;
            }
        });
        // グループ参加者取得処理
        builder.addCase(fetchAsyncGetPusers.fulfilled, (state, action: PayloadAction<PUSERS_RES>) => {
            if(!action.payload.error_message) {
                state.pusers = action.payload.pusers.data;
                state.page.u_currentpage = action.payload.pusers.current_page;
                state.page.u_lastpage = action.payload.pusers.last_page;
            }
        });
        // グループ履歴申請者情報取得処理
        builder.addCase(fetchAsyncGetGhUsers.fulfilled, (state, action: PayloadAction<GH_USERS_RES>) => {
            if(!action.payload.error_message) {
                state.ghusers = action.payload.ghusers;
            }
        });
        // アルバム一覧取得処理
        builder.addCase(fetchAsyncGetAlbums.fulfilled, (state, action: PayloadAction<ALBUMS_RES>) => {
            if(!action.payload.error_message) {
                state.albums = action.payload.albums.data;
                state.page.a_currentpage = action.payload.albums.current_page;
                state.page.a_lastpage = action.payload.albums.last_page;
            }
        });
        // 投稿一覧取得処理
        builder.addCase(fetchAsyncGetPosts.fulfilled, (state, action: PayloadAction<POSTS_RES>) => {
            if(!action.payload.error_message) {
                state.posts = action.payload.posts.data;
                state.page.p_currentpage = action.payload.posts.current_page;
                state.page.p_lastpage = action.payload.posts.last_page;
            }
        });
        // コメント一覧取得処理
        builder.addCase(fetchAsyncGetComments.fulfilled, (state, action: PayloadAction<COMMENTS_RES>) => {
            if(!action.payload.error_message) {
                state.comments = action.payload.comments;
            }
        });
        // バリデーション結果取得処理
        builder.addCase(fetchAsyncPostGroupValidation.fulfilled, (state, action: PayloadAction<GROUP_VALIDATE_RES>) => {
            state.validation = action.payload;
        });
        // グループ参加申請後処理
        builder.addCase(fetchAsyncPostGroupHistory.fulfilled, (state, action: PayloadAction<REGISTER_HISTORY_RES>) => {
            if(!action.payload.error_message) {
                state.group = action.payload.group;
            }
        });
        // グループ参加申請承認・却下後処理
        builder.addCase(fetchAsyncPutGroupHistory.fulfilled, (state, action: PayloadAction<UPDATE_HISTORY_RES>) => {
            if(!action.payload.error_message) {
                // 承認されていない限りpusersは更新しない
                if(action.payload.pusers) state.pusers = action.payload.pusers.data;
                // 承認・却下のどちらでも申請中ユーザ一覧は変動する
                state.ghusers = action.payload.ghusers;
            }
        });
        // 投稿削除後処理
        builder.addCase(fetchAsyncDeletePost.fulfilled, (state, action: PayloadAction<DELETE_POST_RES>) => {
            if(!action.payload.error_message) {
                state.posts = action.payload.posts.data;
                state.page.p_currentpage = action.payload.posts.current_page;
                state.page.p_lastpage = action.payload.posts.last_page;
            }
        });
        // コメント登録後処理
        builder.addCase(fetchAsyncPostComment.fulfilled, (state, action: PayloadAction<REGISTER_COMMENT_RES>) => {
            if(!action.payload.error_message) {
                state.comments = action.payload.comments;
            }
        });
        // コメント削除後処理
        builder.addCase(fetchAsyncDeleteComment.fulfilled, (state, action: PayloadAction<DELETE_COMMENT_RES>) => {
            if(!action.payload.error_message) {
                state.comments = action.payload.comments;
            }
        });
    },
});

export const {
    fetchResetValidation
} = groupSlice.actions;

export const selectGroups = (state: RootState) => state.group.groups;
export const selectGroup = (state: RootState) => state.group.group;
export const selectPusers = (state: RootState) => state.group.pusers;
export const selectGhusers = (state: RootState) => state.group.ghusers;
export const selectAlbums = (state: RootState) => state.group.albums;
export const selectPosts = (state: RootState) => state.group.posts;
export const selectComments = (state: RootState) => state.group.comments;
export const selectGroupValidation = (state: RootState) => state.group.validation;

export default groupSlice.reducer;