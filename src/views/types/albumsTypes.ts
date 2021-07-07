/**
 * MediaListData用のデータ型定義
 */
 export interface MEDIA_LIST_DATA {
    data: { 
        id: number;
        image_file: string;
        title: string;
        // image: {
        //     id: number;
        //     image_file: string;
        //     title: string;
        // },
        // movie: {
        //     id: number;
        //     image_file: string;
        //     title: string;
        // }
    }[]
}