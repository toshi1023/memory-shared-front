/************************************************
 *  components用の型設定
 ************************************************/

/**
 * ProfileCard用のデータ型定義
 */
export interface PROFILE_CARD {
    data: {
        id: number,
        name: string,
        hobby: string,
        gender: number,
        description: string,
        status: number,
        image_file: string,
        image_url: string,
    }
}

/**
 * FamilyList用のデータ型定義
 */
export interface FAMILY_LIST {
    data: {
        id: number,
        name: string,
        hobby: string,
        gender: number,
        description: string,
        status: number,
        image_file: string,
        image_url: string,
    }[],

    el: React.RefObject<HTMLDivElement | null>,

    page: {
        current_page: number,
        last_page: number,
    },

    callback: (page: number) => Promise<boolean>,
}

/**
 * GroupList用のデータ型定義
 */
export interface GROUP_LIST {
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
            name: string
        }[],
        group_histories: {
            id: number,
            group_id: number
        }[]
    }[],
    page: {
        current_page: number,
        last_page: number
    }
}

/**
 * TalkList用のデータ型定義
 */
 export interface TALK_LIST {
    data: {
        id: number,
        content: string,
        own_id: number,
        user_id: number,
        update_user_id: number,
        created_at: string,
        updated_at: string,
        deleted_at: null,
        otherid: number,
        messangers_id: number,
        mcount: number,
        other: {
            id: number,
            name: string,
            image_file: string,
            image_url: string
        }
    }[]
}

/**
 * AsyncThunk用(pusher用)
 */
 export interface PUSHER_TALK_RES {
    talk: {
        id: number,
        content: string,
        own_id: number,
        user_id: number,
        update_user_id: number,
        created_at: string,
        updated_at: string,
        deleted_at: null,
        own: {
            id: number,
            name: string,
            image_file: string,
            image_url: string
        },
        user: {
            id: number,
            name: string,
            image_file: string,
            image_url: string
        }
    }
}

/************************************************
 *  slice用の型設定
 ************************************************/

/**
 * login用のデータ型定義
 */
export interface LOGIN_PROPS {
    email: string,
    password: string
}
/**
 * AsyncThunk用
 */
export interface LOGIN_RES {
    info_message: string,
    error_message: string,

    id: number,
    name: string
}

/**
 * logout用のデータ型定義
 */
 export interface LOGOUT_PROPS {
    id: number
}
/**
 * AsyncThunk用
 */
export interface LOGOUT_RES {
    info_message: string,
    error_message: string
}

/**
 * api/users/*** 通信用のデータ型定義
 */
export interface API_USERS_PROPS {
    id: number
}
/**
 * AsyncThunk用(profile用)
 */
export interface PROFILE_RES {
    user: {
        id: number,
        name: string,
        hobby: string,
        gender: number,
        description: string,
        status: number,
        image_file: string,
        image_url: string,
    }

    error_message: string,
}

/**
 * family用のデータ型定義
 */
export interface FAMILY_PROPS {
    id: number,
    page: number | null
}
/**
 * AsyncThunk用(family用)
 */
export interface FAMILY_RES {
    families: {
        data: {
            id: number,
            name: string,
            hobby: string,
            gender: number,
            description: string,
            status: number,
            image_file: string,
            image_url: string,
        }[],
        current_page: number,
        last_page: number,
    },

    error_message: string,
}

/**
 * participant用のデータ型定義
 */
export interface PARTICIPANT_PROPS {
    id: number,
    page: number | null
}

/**
 * AsyncThunk用(participant用)
 */
export interface PARTICIPANT_RES {
    participants: {
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
 * AsyncThunk用(talklist用)
 */
export interface TALKLIST_RES {
    talklist: {
        data: {
            id: number,
            content: string,
            own_id: number,
            user_id: number,
            update_user_id: number,
            created_at: string,
            updated_at: string,
            deleted_at: null,
            otherid: number,
            messangers_id: number,
            mcount: number,
            other: {
                id: number,
                name: string,
                image_file: string,
                image_url: string
            }
        }[],
        current_page: number,
        last_page: number
    },

    error_message: string,
}

/**
 * talks用のデータ型定義
 */
export interface API_TALKS_PROPS {
    id: number,
    user_id: number
}
/**
 * AsyncThunk用(talks用)
 */
export interface TALKS_RES {
    talks: {
        data: {
            id: number,
            content: string,
            own_id: number,
            user_id: number,
            update_user_id: number,
            created_at: string,
            updated_at: string,
            deleted_at: null,
            own: {
                id: number,
                name: string,
                image_file: string,
                image_url: string
            },
            user: {
                id: number,
                name: string,
                image_file: string,
                image_url: string
            }
        }[],
        current_page: number,
        last_page: number
    },

    error_message: string,
}

/**
 * register_talk用のデータ型定義
 */
export interface REGISTER_TALK_PROPS {
    own_id: number,
    user_id: number,
    content: string
}
/**
 * AsyncThunk用(register_talk用)
 */
export interface REGISTER_TALK_RES {
    talk: {
        id: number,
        content: string,
        own_id: number,
        user_id: number,
        update_user_id: number,
        created_at: string,
        updated_at: string,
        deleted_at: null,
        own: {
            id: number,
            name: string,
            image_file: string,
            image_url: string
        },
        user: {
            id: number,
            name: string,
            image_file: string,
            image_url: string
        }
    },

    error_message: string,
}

/**
 * delete_mreads用のデータ型定義
 */
 export interface DELETE_MREADS_PROPS {
    user_id: number
}
/**
 * AsyncThunk用(delete_mreads用)
 */
export interface DELETE_MREADS_RES {
    error_message: string
}