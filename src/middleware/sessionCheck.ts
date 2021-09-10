import { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux';
import { RootState } from '../stores/store';

/**
 * セッションチェック用のミドルウェア
 * ※サーバ側でセッションが切れている場合、強制ログアウトを実行
 * @param {*} store 
 */

const SessionCheck: Middleware = <S extends RootState>({ getState }: MiddlewareAPI<Dispatch, S>)  => 
    (next: Dispatch<Action>) => (action: any): any => 
{
    // セッション切れの場合
    if(action.payload !== undefined && action.payload.message === 'Unauthenticated.') {
        if(localStorage.loginId) {
            // localStorageのTokenとIDを削除(ログアウト処理)
            localStorage.removeItem("loginId");
        }
        // ログインページへ遷移
        window.location.href = '/login'
    }

    // 次の処理へ移行
    next(action)
}

export default SessionCheck