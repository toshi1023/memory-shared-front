/**
 * Search用のデータ型定義
 */
 export interface SEARCH<T> {
    callback: (key: T) => void,
    label: string
}

/**
 * MobileMenu用のデータ型定義
 */
export interface MOBILE_MENU {
    open: boolean
}

/**
 * MobileHeaderTab用のデータ型定義
 */
export interface MOBILE_HEADER_TAB {
    callback: {
        function1: (value: number) => void,
        function2: (value: number) => void,
    }

    label: {
        label1: string,
        label2: string
    }
    
}