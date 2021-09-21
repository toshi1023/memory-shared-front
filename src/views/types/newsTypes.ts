/************************************************
 *  components用の型設定
 ************************************************/

/**
 * NewsListData用のデータ型定義
 */
 export interface NEWS_LIST_DATA {
    data: { 
        user_id: number,
        news_id: number,
        title: string,
        content: string,
        update_user_id: number,
        created_at: string,
        updated_at: string,
        read_user_id: number
    }[]
}

/**
 * GroupListData用のデータ型定義
 */
 export interface GROUP_LIST_DATA {
    data: { 
        id: number,
        user_id: number,
        group_id: number,
        status: number,
        memo: string,
        update_user_id: number,
        created_at: string,
        updated_at: string,
        deleted_at: null,
        group: {
            id: number,
            name: string,
            image_file: string,
            image_url: string
        }
    }[]
}

/************************************************
 *  slice用の型設定
 ************************************************/

/**
 * news用のデータ型定義
 */
 export interface NEWS_PROPS {
    id: number
}
/**
 * AsyncThunk用(news用)
 */
 export interface NEWS_RES {
    news: {
        data: {
            user_id: number,
            news_id: number,
            title: string,
            content: string,
            update_user_id: number,
            created_at: string,
            updated_at: string,
            read_user_id: number
        }[],
        current_page: number,
        last_page: number,
    },

    error_message: string,
}
/**
 * reducers用
 */
 export interface NEWS_REDUCER {
    user_id: number,
    news_id: number,
    title: string,
    content: string,
    update_user_id: number,
    created_at: string,
    updated_at: string,
    read_user_id: number
}

/**
 * delete_nreads用のデータ型定義
 */
 export interface DELETE_NREADS_PROPS {
    id: number,
    news_user_id: number,
    user_id: number
}
/**
 * AsyncThunk用(delete_nreads用)
 */
 export interface DELETE_NREADS_RES {
    news: {
        user_id: number,
        news_id: number,
        title: string,
        content: string,
        update_user_id: number,
        created_at: string,
        updated_at: string,
        read_user_id: number
    },

    error_message: string,
}

/**
 * AsyncThunk用(group_histories用)
 */
 export interface GROUP_HISTORIES_RES {
    group_histories: {
       id: number,
       user_id: number,
       group_id: number,
       status: number,
       memo: string,
       update_user_id: number,
       created_at: string,
       updated_at: string,
       deleted_at: null,
       group: {
           id: number,
           name: string,
           image_file: string,
           image_url: string
       }
    }[],

    error_message: string,
}