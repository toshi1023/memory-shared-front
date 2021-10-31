import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../stores/store";
import axios from "axios";
import { API_GROUP_PROPS } from "../../types/groupsTypes";
import { ALBUM_VALIDATE_RES, API_ALBUM_PROPS, REGISTER_ALBUM_PROPS, REGISTER_ALBUM_RES } from "../../types/albumsTypes";
import generateFormData from "../../../functions/generateFormData";

const apiUrl = process.env.REACT_APP_MSA_API_URL;

/**
 * アルバム登録のバリデーションチェック非同期関数
 */
export const fetchAsyncPostAlbumValidation = createAsyncThunk<ALBUM_VALIDATE_RES, REGISTER_ALBUM_PROPS>(
    "registervalidation",
    async (props: REGISTER_ALBUM_PROPS) => {
        try {
            const fd = generateFormData<REGISTER_ALBUM_PROPS>(props);
            if(!props.image_file) {
                // 画像が設定されていない場合はFormDataから除去
                fd.delete('image_file');
            }

            const res = await axios.post(`${apiUrl}/groups/${props.group_id}/albums/validate`, fd, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as ALBUM_VALIDATE_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            return err.response.data as ALBUM_VALIDATE_RES;
        }
    }
);

/**
 * アルバム登録取得の非同期関数
 */
 export const fetchAsyncPostAlbum = createAsyncThunk<REGISTER_ALBUM_RES, REGISTER_ALBUM_PROPS>(
    "register",
    async (props: REGISTER_ALBUM_PROPS) => {
        try {
            const fd = generateFormData<REGISTER_ALBUM_PROPS>(props);
            if(!props.image_file) {
                // 画像が設定されていない場合はFormDataから除去
                fd.delete('image_file');
            }
            const res = await axios.post(`${apiUrl}/groups/${props.group_id}/albums`, fd, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as REGISTER_ALBUM_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as REGISTER_ALBUM_RES;
        }
    }
);

export const albumSlice = createSlice({
    name: "album",
    initialState: {
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
        validation: {
            errors: {
                name: [''],
                image_file: [''],
                host_user_id: ['']
            },
            validate_status: '',
        },
        page: {
            // アルバム一覧
            a_currentpage: 0,
            a_lastpage: 0,
            // 画像一覧
            i_currentpage: 0,
            i_lastpage: 0,
            // 動画一覧
            v_currentpage: 0,
            v_lastpage: 0
        }
    },
    reducers: {
        // バリデーションのリセット
        fetchResetValidation(state, action: PayloadAction<ALBUM_VALIDATE_RES>) {
            state.validation = action.payload;
        },
    },
    // 非同期関数の後処理を設定
    extraReducers: (builder) => {
        // バリデーション結果取得処理
        builder.addCase(fetchAsyncPostAlbumValidation.fulfilled, (state, action: PayloadAction<ALBUM_VALIDATE_RES>) => {
            state.validation = action.payload;
        });
    },
});

export const {
    fetchResetValidation
} = albumSlice.actions;

export const selectAlbumValidation = (state: RootState) => state.album.validation;

export default albumSlice.reducer;