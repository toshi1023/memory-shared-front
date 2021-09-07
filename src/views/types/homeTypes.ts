/************************************************
 *  components用の型設定
 ************************************************/

/**
 * ProfileCard用のデータ型定義
 */
export interface PROFILE_CARD {
    data: {
        id: number,
        name: string;
        email: string;
        image_file: string;
        hobby: string;
        gender: boolean;
        description: string | null;
    }
}

/**
 * FamilyList用のデータ型定義
 */
export interface FAMILY_LIST {
    data: {
        id: number,
        name: string;
        image_file: string;
    }[]
}

/**
 * GroupList用のデータ型定義
 */
export interface GROUP_LIST {
    data: {
        id: number,
        name: string;
        image_file: string;
        participants: number;
        album_count: number;
        private_flg: boolean;
    }[]
}

/**
 * TalkList用のデータ型定義
 */
 export interface TALK_LIST {
    data: {
        id: number,
        content: string;
        user_name: string;
        image_file: string;
    }[]
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
    user: number
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
