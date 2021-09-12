import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../stores/store";
import axios from "axios";
import { 
    GROUPS_PROPS, GROUPS_RES 
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
            // グループ一覧
            gi_currentpage: 0,
            gi_lastpage: 0,
            // 参加歓迎中グループ
            wg_currentpage: 0,
            wg_lastpage: 0,
            // 参加中グループ
            pg_currentpage: 0,
            pg_lastpage: 0,
            // 招待用グループ
            ig_currentpage: 0,
            ig_lastpage: 0,
        }
    },
    reducers: {},
    // 非同期関数の後処理を設定
    extraReducers: (builder) => {
        // グループ一覧取得処理
        builder.addCase(fetchAsyncGetGroups.fulfilled, (state, action: PayloadAction<GROUPS_RES>) => {
            state.groups = action.payload.groups.data;
            state.page.gi_currentpage = action.payload.groups.current_page;
            state.page.gi_lastpage = action.payload.groups.last_page;
        });
    },
});

export const selectGroups = (state: RootState) => state.group.groups;

export default groupSlice.reducer;