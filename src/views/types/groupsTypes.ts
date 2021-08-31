/**
 * GroupListData用のデータ型定義
 */
 export interface GROUP_LIST_DATA {
    data: { 
        id: number;
        name: string;
        image_file: string;
        status_type: string | null;
    }[]
}

/**
 * GroupCard用のデータ型定義
 */
export interface GROUP_CARD {
    data: {
        id: number;
        name: string;
        image_file: string;
        description: string;
        status_type: string | null;
        participants: number;
        album_count: number;
        private_flg: boolean;
        count: number;
    }
}

/**
 * UserListData用のデータ型定義
 */
 export interface USER_LIST_DATA {
    data: { 
        id: number;
        name: string;
        image_file: string;
        family_id: number | null;
        talk_id: number | null;
    }[]
}

/**
 * AlbumListData用のデータ型定義
 */
 export interface ALBUM_LIST_DATA {
    data: { 
        id: number;
        name: string;
        image_file: string;
    }[]
}

/**
 * PostModal用のデータ型定義
 */
export interface POST_MODAL {
    data: {
        id: number | null;
        content: string | null;
        user_id: number | null;
        user_name: string | null;
        updated_at: string | null;
        comment: {
            id: number;
            content: string;
            user_id: number;
            user_name: string;
            updated_at: string;
        }[] | null
    }
    open: boolean;
    callback: (value: boolean) => void;
}
export interface MODAL_DATA {
    id: number | null;
    content: string | null;
    user_id: number | null;
    user_name: string | null;
    updated_at: string | null;
    comment: {
        id: number;
        content: string;
        user_id: number;
        user_name: string;
        updated_at: string;
    }[] | null
}