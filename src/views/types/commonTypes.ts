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
 * MobileMenuアイコン用のデータ型定義
 */
 export interface MOBILE_MENU_ICON {
    callback: (value: string) => void
}

/**
 * AppMainBar用のデータ型定義
 */
 export interface ICON_ACTIVE {
    home: boolean,
    user: boolean,
    group: boolean,
    news: boolean
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

/**
 * MessageComponent用のデータ型定義
 */
 export interface MESSEAGE_COMPONENT {
    infoOpen: boolean,
    errorOpen: boolean
}

/**
 * SingleImageRegister用のデータ型定義
 */
export interface SINGLE_IMAGE_REGISTER {
    data: string | null,
    callback: (value: File | null) => void,
}

/**
 * AsyncThunk用(nread_count用)のデータ型定義
 */
export interface NREAD_COUNT_RES {
    nread_count: number,
    error_message: string
}

/**
 * BasePagination用のデータ型定義
 */
 export interface BASE_PAGINATION {
    count: number,
    callback: (value: number) => void
}

/**
 * CircularCount用のデータ型定義
 */
export interface CIRCULAR_COUNT {
    data: number
}