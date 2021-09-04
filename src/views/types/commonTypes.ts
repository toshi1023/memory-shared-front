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