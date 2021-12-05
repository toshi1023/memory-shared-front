/************************************************
 *  components用の型設定
 ************************************************/

/**
 * ImageListData用のデータ型定義
 */
 export interface IMAGE_LIST_DATA {
    data: { 
        id: number,
        user_id: number,
        album_id: number,
        image_file: string,
        image_url: string,
        black_list: object,
        white_list: object,
        updated_user_id: number
    }[]

    callback: {
        function1: (value: number) => void,
        function2: (value: number) => void,
    }

    label: {
        label1: string,
        label2: string
    }
}

/**
 * VideoListData用のデータ型定義
 */
 export interface VIDEO_LIST_DATA {
    data: {
        id: number;
        src: string;
        type: string;
        title: string;
    }[]

    callback: {
        function1: (value: number) => void,
        function2: (value: number) => void,
    }

    label: {
        label1: string,
        label2: string
    }
}

/**
 * ModalSwiperImages用のデータ型定義
 */
 export interface MODAL_SWIPER_IMAGES {
    data: { 
        id: number,
        user_id: number,
        album_id: number,
        image_file: string,
        image_url: string,
        black_list: object,
        white_list: object,
        updated_user_id: number
    }[]

    index: number;
    open: boolean;
    callback: (value: boolean) => void;
}

/**
 * Register(Formik)用のデータ型定義
 */
export interface FORMIK_RALBUM {
    name: string,
    group_id: number,
    image_file: File | null,
    host_user_id: number
}
/**
 * Editer(Formik)用のデータ型定義
 */
export interface FORMIK_UALBUM {
    id: number,
    name: string,
    group_id: number,
    image_file: File | null,
    host_user_id: number
}

/************************************************
 *  slice用の型設定
 ************************************************/

/**
 * album用のデータ型定義
 */
 export interface API_ALBUM_PROPS {
    id: number
}

/**
 * album用のデータ型定義
 */
export interface ALBUM_PROPS {
    group_id: number,
    album_id: number
}
/**
 * AsyncThunk用(album用)
 */
export interface ALBUM_RES {
    album: {
        id: number,
        name: string,
        group_id: number,
        image_file: string,
        image_url: string,
        host_user_id: number
    },
    image: {
        data: {
            id: number,
            user_id: number,
            album_id: number,
            image_file: string,
            image_url: string,
            black_list: object,
            white_list: object,
            updated_user_id: number
        }[],
        current_page: number,
        last_page: number
    },
    video: {
        data: {
            id: number,
            user_id: number,
            album_id: number,
            image_file: string,
            image_url: string,
            black_list: object,
            white_list: object,
            updated_user_id: number
        }[],
        current_page: number,
        last_page: number
    },

    error_message: string,
}

/**
 * register用のデータ型定義
 */
export interface REGISTER_ALBUM_PROPS {
    name: string,
    group_id: number,
    image_file: File | null,
    host_user_id: number
}
/**
 * AsyncThunk用(register用)
 */
export interface REGISTER_ALBUM_RES {
    info_message: string,
    error_message: string,
}
/**
 * AsyncThunk用(registervalidation/updatevalidation用)
 */
export interface ALBUM_VALIDATE_RES {
    errors: {
        name: string[],
        image_file: string[],
        host_user_id: string[]
    }

    validate_status: string
}

/**
 * edit用のデータ型定義
 */
export interface EDIT_ALBUM_PROPS {
    id: number,
    group_id: number,
}
/**
 * AsyncThunk用(edit用)
 */
export interface EDIT_ALBUM_RES {
    album: {
        id: number,
        name: string,
        group_id: number,
        image_file: string,
        image_url: string,
        host_user_id: number
    },
    info_message: string,
    error_message: string,
}

/**
 * update用のデータ型定義
 */
export interface UPDATE_ALBUM_PROPS {
    id: number,
    name: string,
    group_id: number,
    image_file: File | null,
    host_user_id: number
}
/**
 * AsyncThunk用(update用)
 */
export interface UPDATE_ALBUM_RES {
    info_message: string,
    error_message: string,
}

/**
 * delete用のデータ型定義
 */
 export interface DELETE_ALBUM_PROPS {
    id: number,
    group_id: number
}
/**
 * AsyncThunk用(delete用)
 */
export interface DELETE_ALBUM_RES {
    info_message: string,
    error_message: string,
}