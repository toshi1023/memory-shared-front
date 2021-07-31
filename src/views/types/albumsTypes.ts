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

    callback: {
        function1: (value: number) => void,
        function2: (value: number) => void,
    }

    label: {
        label1: string,
        label2: string
    }
}