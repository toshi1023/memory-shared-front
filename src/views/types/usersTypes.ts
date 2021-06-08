/**
 * ListData用のデータ型定義
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