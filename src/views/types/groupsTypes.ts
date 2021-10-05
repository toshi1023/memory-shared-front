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
        }[],
        group_histories: {
            id: number,
            group_id: number,
            user_id: number,
            status: number
        }[]
    }
}

/**
 * UserListData用のデータ型定義
 */
 export interface USER_LIST_DATA {
    data: { 
        id: number,
        name: string,
        image_file: string,
        image_url: string,
    }[]
}

/**
 * AlbumListData用のデータ型定義
 */
 export interface ALBUM_LIST_DATA {
    data: { 
        id: number,
        name: string,
        group_id: number,
        image_file: string,
        image_url: string,
        host_user_id: number
    }[]
}

/**
 * PostModal用のデータ型定義
 */
export interface POST_MODAL {
    data: {
        content: string;
    }
    open: boolean;
    callback: (value: boolean) => void;
}
export interface MODAL_DATA {
    content: string;
}

/**
 * Register(Formik)用のデータ型定義
 */
 export interface FORMIK_RGROUP {
    name: string,
    description: string,
    private_flg: number,
    welcome_flg: number,
    image_file: File | null,
    host_user_id: number
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

/**
 * group用のデータ型定義
 */
 export interface API_GROUP_PROPS {
    id: number
}
/**
 * AsyncThunk用(group用)
 */
export interface GROUP_RES {
    group: {
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
        }[],
        group_histories: {
            id: number,
            group_id: number,
            user_id: number,
            status: number
        }[]
    },

    error_message: string,
}

/**
 * AsyncThunk用(pusers用)
 */
 export interface PUSERS_RES {
    pusers: {
        data: {
            id: number,
            name: string,
            image_file: string,
            image_url: string,
        }[],
        current_page: number,
        last_page: number,
    },

    error_message: string,
}

/**
 * AsyncThunk用(albums用)
 */
 export interface ALBUMS_RES {
    albums: {
        data: {
            id: number,
            name: string,
            group_id: number,
            image_file: string,
            image_url: string,
            host_user_id: number
        }[],
        current_page: number,
        last_page: number,
    },

    error_message: string,
}

/**
 * AsyncThunk用(posts用)
 */
 export interface POSTS_RES {
    posts: {
        data: {
            id: number,
            content: string,
            user_id: number,
            group_id: number,
            update_user_id: number,
            created_at: string,
            updated_at: string,
            deleted_at: null,
            user: {
                id: number,
                name: string,
                image_file: string,
                image_url: string
            }
        }[],
        current_page: number,
        last_page: number,
    },

    error_message: string,
}

/**
 * comments用のデータ型定義
 */
export interface COMMENTS_PROPS {
    id: number,
    post_id: number
}
/**
 * AsyncThunk用(comments用)
 */
export interface COMMENTS_RES {
    comments: {
        data: {
            id: number,
            content: string,
            user_id: number,
            post_id: number,
            update_user_id: number,
            created_at: string,
            updated_at: string,
            deleted_at: null,
            user: {
                id: number,
                name: string,
                image_file: string,
                image_url: string
            }
        }[],
        current_page: number,
        last_page: number,
    },

    error_message: string,
}

/**
 * register/validation用のデータ型定義
 */
 export interface REGISTER_GROUP_PROPS {
    name: string,
    description: string,
    private_flg: number,
    welcome_flg: number,
    image_file: File | null,
    host_user_id: number
}
/**
 * AsyncThunk用(register用)
 */
export interface REGISTER_GROUP_RES {
    info_message: string,
    error_message: string,
}
/**
 * AsyncThunk用(registervalidation/updatevalidation用)
 */
 export interface GROUP_VALIDATE_RES {
    errors: {
        name: string[],
        image_file: string[],
        host_user_id: string[]
    }

    validate_status: string
}