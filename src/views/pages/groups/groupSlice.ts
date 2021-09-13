import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../stores/store";
import axios from "axios";
import { 
    GROUPS_PROPS, GROUPS_RES, API_GROUP_PROPS, GROUP_RES, 
    PUSERS_RES, ALBUMS_RES 
} from "../../types/groupsTypes";

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
        // 参加者詳細情報を管理
        pusers: [
            {
                id: 0,
                name: "",
                image_file: "",
                image_url: "",
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
        page: {
            // グループ一覧
            gi_currentpage: 0,
            gi_lastpage: 0,
            // 参加者一覧
            u_currentpage: 0,
            u_lastpage: 0,
            // アルバム一覧
            a_currentpage: 0,
            a_lastpage: 0
        }
    },
    reducers: {},
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
        // アルバム一覧取得処理
        builder.addCase(fetchAsyncGetAlbums.fulfilled, (state, action: PayloadAction<ALBUMS_RES>) => {
            if(!action.payload.error_message) {
                state.albums = action.payload.albums.data;
                state.page.a_currentpage = action.payload.albums.current_page;
                state.page.a_lastpage = action.payload.albums.last_page;
            }
        });
    },
});

export const selectGroups = (state: RootState) => state.group.groups;
export const selectGroup = (state: RootState) => state.group.group;
export const selectPusers = (state: RootState) => state.group.pusers;
export const selectAlbums = (state: RootState) => state.group.albums;

export default groupSlice.reducer;