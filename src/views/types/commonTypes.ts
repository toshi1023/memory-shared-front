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