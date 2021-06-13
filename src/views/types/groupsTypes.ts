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