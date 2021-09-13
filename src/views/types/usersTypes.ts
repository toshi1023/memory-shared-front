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
    }
}

/**
 * WelcomeGroupListData用のデータ型定義
 */
 export interface WELCOME_GROUP_LIST_DATA {
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
        albums: {
            id: number,
            name: string,
        }[],
        group_histories: {
            id: number,
            group_id: number
        }[]
    }[]
}

export interface GROUP_LIST_DATA {
    data: {
        id: number,
        name: string,
        image_file: string,
        image_url: string,
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

/**
 * user用のデータ型定義
 */
 export interface API_USER_PROPS {
    id: number
}
/**
 * AsyncThunk用(user用)
 */
export interface USER_RES {
    user: {
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
    },

    error_message: string,
}

/**
 * AsyncThunk用(wgroups用)
 */
export interface WGROUPS_RES {
    wgroups: {
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
            albums: {
                id: number,
                name: string,
            }[],
            group_histories: {
                id: number,
                group_id: number
            }[]
        }[],
        current_page: number,
        last_page: number,
    },

    error_message: string,
}

/**
 * AsyncThunk用(pgroups用)
 */
export interface PGROUPS_RES {
    pgroups: {
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
 * AsyncThunk用(igroups用)
 */
export interface IGROUPS_RES {
    igroups: {
        data: {
            id: number,
            name: string,
            image_file: string,
            image_url: string,
            private_flg: number,
        }[],
        current_page: number,
        last_page: number,
    },

    error_message: string,
}

/**
 * group_invite用のデータ型定義
 */
export interface API_GROUP_INVITE_PROPS {
    group_id: number,
    user_id: number,
    status: number
}
/**
 * AsyncThunk用(group_invite用)
 */
 export interface GROUP_INVITE_RES {
    group: {
        id: number,
        name: string,
        image_file: string,
        image_url: string,
    },

    info_message: string,
    error_message: string,
}

/**
 * AsyncThunk用(edituser用)
 */
 export interface EDIT_USER_RES {
    edituser: {
        id: number,
        name: string,
        email: string,
        hobby: string,
        gender: number,
        description: string,
        status: number,
        image_file: string,
        image_url: string,
    },

    error_message: string,
}