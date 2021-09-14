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
        id: number;
        name: string;
        image_file: string;
        status_type: string | null;
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