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