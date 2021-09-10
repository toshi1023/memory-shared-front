/************************************************
 *  components用の型設定
 ************************************************/

/**
 * UserListData用のデータ型定義
 */
export interface USER_LIST_DATA {
    data: { 
        id: number,
        name: string,
        hobby: string,
        gender: number,
        description: string,
        status: number,
        image_file: string,
        image_url: string,
        families1: {
            user_id1: number,
            user_id2: number,
            created_at: string,
            updated_at: string,
        }[],
        families2: {
            user_id1: number,
            user_id2: number,
            created_at: string,
            updated_at: string,
        }[],
        message_relations1: {
            user_id1: number,
            user_id2: number,
            created_at: string,
            updated_at: string,
        }[],
        message_relations2: {
            user_id1: number,
            user_id2: number,
            created_at: string,
            updated_at: string,
        }[],
    }[]
}

/**
 * UserCard用のデータ型定義
 */
export interface USER_CARD {
    data: {
        id: number;
        name: string;
        hobby: string;
        gender: boolean;
        description: string | null;
        image_file: string;
        family_id: number | null;
        talk_id: number | null;
    }
}

/**
 * WelcomeGroupListData用のデータ型定義
 */
 export interface WELCOME_GROUP_LIST_DATA {
    data: {
        id: number,
        name: string;
        image_file: string;
        participants: number;
        album_count: number;
    }[]
}

export interface GROUP_LIST_DATA {
    data: {
        id: number;
        name: string;
        image_file: string;
    }[]
}

/**
 * GroupModal用のデータ型定義
 */
 export interface GROUP_MODAL {
    data: {
        user_id: number;
    }
    open: boolean;
    callback: (value: boolean) => void;
}

/************************************************
 *  slice用の型設定
 ************************************************/

/**
 * users用のデータ型定義
 */
 export interface USERS_PROPS {
    s_namelike: string | null,
    o_name: string,
    o_created_at: string
}
/**
 * AsyncThunk用(users用)
 */
export interface USERS_RES {
    users: {
        data: {
            id: number,
            name: string,
            hobby: string,
            gender: number,
            description: string,
            status: number,
            image_file: string,
            image_url: string,
            families1: {
                user_id1: number,
                user_id2: number,
                created_at: string,
                updated_at: string,
            }[],
            families2: {
                user_id1: number,
                user_id2: number,
                created_at: string,
                updated_at: string,
            }[],
            message_relations1: {
                user_id1: number,
                user_id2: number,
                created_at: string,
                updated_at: string,
            }[],
            message_relations2: {
                user_id1: number,
                user_id2: number,
                created_at: string,
                updated_at: string,
            }[],
        }[],
        current_page: number,
        last_page: number,
    }

    error_message: string,
}