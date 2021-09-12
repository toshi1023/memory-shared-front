/************************************************
 *  components用の型設定
 ************************************************/

/**
 * GroupListData用のデータ型定義
 */
 export interface GROUP_LIST_DATA {
    data: { 
        id: number,
        name: string,
        description: string,
        private_flg: number,
        welcome_flg: number,
        image_file: string,
        image_url: string,
        host_user_id: number,
        memo: string,
        update_user_id: number,
        created_at: string,
        updated_at: string,
        deleted_at: null,
        users: {
            id: number,
            name: string,
            gender: number,
            image_file: string,
            image_url: string
            pivot: {
                group_id: number,
                user_id: number,
                status: number,
                created_at: string,
                updated_at: string,
            }
        }[]
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

/************************************************
 *  slice用の型設定
 ************************************************/

/**
 * groups用のデータ型定義
 */
 export interface GROUPS_PROPS {
    s_namelike: string | null,
    o_name: string,
    o_created_at: string
}
/**
 * AsyncThunk用(groups用)
 */
 export interface GROUPS_RES {
    groups: {
        data: {
            id: number,
            name: string,
            description: string,
            private_flg: number,
            welcome_flg: number,
            image_file: string,
            image_url: string,
            host_user_id: number,
            memo: string,
            update_user_id: number,
            created_at: string,
            updated_at: string,
            deleted_at: null,
            users: {
                id: number,
                name: string,
                gender: number,
                image_file: string,
                image_url: string
                pivot: {
                    group_id: number,
                    user_id: number,
                    status: number,
                    created_at: string,
                    updated_at: string,
                }
            }[]
        }[],
        current_page: number,
        last_page: number,
    },

    error_message: string,
}