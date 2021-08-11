/**
 * NewsListData用のデータ型定義
 */
 export interface NEWS_LIST_DATA {
    data: { 
        id: number;
        title: string;
        content: string;
    }[]
}

/**
 * NewsCard用のデータ型定義
 */
 export interface NEWS_CARD {
    data: { 
        id: number;
        title: string;
        content: string;
    }
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