/**
 * ProfileCard用のデータ型定義
 */
export interface PROFILE_CARD {
    data: {
        id: number,
        name: string;
        email: string;
        image_file: string;
        memo: string | null;
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
    }[]
}