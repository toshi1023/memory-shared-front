import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../stores/store";
import axios from "axios";
import { API_GROUP_PROPS } from "../../types/groupsTypes";
import { 
    ALBUM_PROPS, ALBUM_RES, ALBUM_VALIDATE_RES, API_ALBUM_PROPS, DELETE_ALBUM_PROPS, DELETE_ALBUM_RES, 
    EDIT_ALBUM_PROPS, EDIT_ALBUM_RES, REGISTER_ALBUM_PROPS, REGISTER_ALBUM_RES, UPDATE_ALBUM_PROPS, UPDATE_ALBUM_RES, 
    REGISTER_IMAGE_PROPS, REGISTER_IMAGE_RES, IMAGE_VALIDATE_RES, REGISTER_VIDEO_PROPS, REGISTER_VIDEO_RES, 
    DELETE_IMAGE_PROPS, DELETE_IMAGE_RES, IMAGES_PROPS, IMAGES_RES, VIDEOS_PROPS, VIDEOS_RES, DELETE_VIDEO_PROPS, DELETE_VIDEO_RES 
} from "../../types/albumsTypes";
import generateFormData from "../../../functions/generateFormData";

const apiUrl = process.env.REACT_APP_MSA_API_URL;

/**
 * アルバムの詳細情報取得の非同期関数
 */
export const fetchAsyncGetAlbum = createAsyncThunk<ALBUM_RES, ALBUM_PROPS>(
    "album",
    async (props: ALBUM_PROPS) => {
        try {
            const res = await axios.get(`${apiUrl}/groups/${props.group_id}/albums/${props.album_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as ALBUM_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as ALBUM_RES;
        }
    }
);

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
 * アルバム登録の非同期関数
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

/**
 * 編集用アルバム情報取得の非同期関数
 */
 export const fetchAsyncGetEditAlbum = createAsyncThunk<EDIT_ALBUM_RES, EDIT_ALBUM_PROPS>(
    "edit",
    async (props: EDIT_ALBUM_PROPS) => {
        try {
            const res = await axios.get(`${apiUrl}/groups/${props.group_id}/albums/${props.id}/edit`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as EDIT_ALBUM_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as EDIT_ALBUM_RES;
        }
    }
);

/**
 * アルバム更新の非同期関数
 */
 export const fetchAsyncPutAlbum = createAsyncThunk<UPDATE_ALBUM_RES, UPDATE_ALBUM_PROPS>(
    "update",
    async (props: UPDATE_ALBUM_PROPS) => {
        try {
            const fd = generateFormData<UPDATE_ALBUM_PROPS>(props);
            if(!props.image_file) {
                // 画像が設定されていない場合はFormDataから除去
                fd.delete('image_file');
            }
            const res = await axios.post(`${apiUrl}/groups/${props.group_id}/albums/${props.id}`, fd, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    'X-HTTP-Method-Override': 'PUT',
                },
                withCredentials: true
            });
            
            return res.data as UPDATE_ALBUM_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as UPDATE_ALBUM_RES;
        }
    }
);

/**
 * アルバム削除の非同期関数
 */
 export const fetchAsyncDeleteAlbum = createAsyncThunk<DELETE_ALBUM_RES, DELETE_ALBUM_PROPS>(
    "delete",
    async (props: DELETE_ALBUM_PROPS) => {
        try {
            const res = await axios.delete(`${apiUrl}/groups/${props.group_id}/albums/${props.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as DELETE_ALBUM_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as DELETE_ALBUM_RES;
        }
    }
);

/**
 * 画像情報取得の非同期関数
 */
 export const fetchAsyncGetImages = createAsyncThunk<IMAGES_RES, IMAGES_PROPS>(
    "images",
    async (props: IMAGES_PROPS) => {
        try {
            const res = await axios.get(`${apiUrl}/groups/${props.group_id}/albums/${props.album_id}/images?page=${props.page}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as IMAGES_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as IMAGES_RES;
        }
    }
);

/**
 * 画像保存用の非同期関数
 */
export const fetchAsyncPostUserImage = createAsyncThunk<REGISTER_IMAGE_RES, REGISTER_IMAGE_PROPS>(
    "register_image",
    async (props: REGISTER_IMAGE_PROPS) => {
        try {
            const fd = generateFormData<REGISTER_IMAGE_PROPS>(props);
            const res = await axios.post(`${apiUrl}/groups/${props.group_id}/albums/${props.album_id}/images`, fd, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as REGISTER_IMAGE_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as REGISTER_IMAGE_RES;
        }
    }
);

/**
 * 画像削除用の非同期関数
 */
export const fetchAsyncDeleteUserImage = createAsyncThunk<DELETE_IMAGE_RES, DELETE_IMAGE_PROPS>(
    "delete_image",
    async (props: DELETE_IMAGE_PROPS) => {
        try {
            const res = await axios.delete(`${apiUrl}/groups/${props.group_id}/albums/${props.album_id}/images/${props.image_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as DELETE_IMAGE_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as DELETE_IMAGE_RES;
        }
    }
);

/**
 * 動画情報取得の非同期関数
 */
 export const fetchAsyncGetVideos = createAsyncThunk<VIDEOS_RES, VIDEOS_PROPS>(
    "videos",
    async (props: VIDEOS_PROPS) => {
        try {
            const res = await axios.get(`${apiUrl}/groups/${props.group_id}/albums/${props.album_id}/videos?page=${props.page}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as VIDEOS_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as VIDEOS_RES;
        }
    }
);

/**
 * 動画保存用の非同期関数
 */
export const fetchAsyncPostUserVideo = createAsyncThunk<REGISTER_VIDEO_RES, REGISTER_VIDEO_PROPS>(
    "register_video",
    async (props: REGISTER_VIDEO_PROPS) => {
        try {
            const fd = generateFormData<REGISTER_VIDEO_PROPS>(props);
            const res = await axios.post(`${apiUrl}/groups/${props.group_id}/albums/${props.album_id}/videos`, fd, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as REGISTER_VIDEO_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as REGISTER_VIDEO_RES;
        }
    }
);

/**
 * 動画削除用の非同期関数
 */
 export const fetchAsyncDeleteUserVideo = createAsyncThunk<DELETE_VIDEO_RES, DELETE_VIDEO_PROPS>(
    "delete_video",
    async (props: DELETE_VIDEO_PROPS) => {
        try {
            const res = await axios.delete(`${apiUrl}/groups/${props.group_id}/albums/${props.album_id}/videos/${props.video_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            
            return res.data as DELETE_VIDEO_RES;

        } catch (err: any) {
            if (!err.response) {
                throw err
            }
            
            return err.response.data as DELETE_VIDEO_RES;
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
        album: {
            id: 0,
            name: '',
            group_id: 0,
            image_file: '',
            image_url: '',
            host_user_id: 0
        },
        images: [
            {
                id: 0,
                user_id: 0,
                album_id: 0,
                type: 0,
                image_file: '',
                image_url: '',
                black_list: {},
                white_list: {},
                updated_user_id: 0
            }
        ],
        videos: [
            {
                id: 0,
                user_id: 0,
                album_id: 0,
                type: 'video/mp4',
                image_file: '',
                video_url: '',
                black_list: {},
                white_list: {},
                updated_user_id: 0
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
        // 詳細用データ取得処理
        builder.addCase(fetchAsyncGetAlbum.fulfilled, (state, action: PayloadAction<ALBUM_RES>) => {
            state.album = action.payload.album;
        });
        // 画像データ取得処理
        builder.addCase(fetchAsyncGetImages.fulfilled, (state, action: PayloadAction<IMAGES_RES>) => {
            if(action.payload.images.current_page === 1) {
                state.images = action.payload.images.data;
            } else {
                state.images = state.images.concat(action.payload.images.data);
            }
            state.page.i_currentpage = action.payload.images.current_page;
            state.page.i_lastpage = action.payload.images.last_page;
        });
        // 動画データ取得処理
        builder.addCase(fetchAsyncGetVideos.fulfilled, (state, action: PayloadAction<VIDEOS_RES>) => {
            if(action.payload.videos.current_page === 1) {
                state.videos = action.payload.videos.data;
            } else {
                state.videos = state.videos.concat(action.payload.videos.data);
            }
            state.page.v_currentpage = action.payload.videos.current_page;
            state.page.v_lastpage = action.payload.videos.last_page;
        });
        // 編集用データ取得処理
        builder.addCase(fetchAsyncGetEditAlbum.fulfilled, (state, action: PayloadAction<EDIT_ALBUM_RES>) => {
            state.album = action.payload.album;
        });
        // バリデーション結果取得処理
        builder.addCase(fetchAsyncPostAlbumValidation.fulfilled, (state, action: PayloadAction<ALBUM_VALIDATE_RES>) => {
            state.validation = action.payload;
        });
    },
});

export const {
    fetchResetValidation
} = albumSlice.actions;

export const selectAlbum = (state: RootState) => state.album.album;
export const selectImages = (state: RootState) => state.album.images;
export const selectVideos = (state: RootState) => state.album.videos;
export const selectAlbumValidation = (state: RootState) => state.album.validation;
export const selectAlbumPages = (state: RootState) => state.album.page;

export default albumSlice.reducer;