/**
 * ImageListData用のデータ型定義
 */
 export interface IMAGE_LIST_DATA {
    data: { 
        id: number;
        image_file: string;
        title: string;
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

/**
 * VideoListData用のデータ型定義
 */
 export interface VIDEO_LIST_DATA {
    data: {
        id: number;
        src: string;
        type: string;
        title: string;
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