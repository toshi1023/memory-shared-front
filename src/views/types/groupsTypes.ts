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