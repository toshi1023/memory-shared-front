import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { RootState } from '../stores/store';

/**
 * セッションチェック用のミドルウェア
 * ※サーバ側でセッションが切れている場合、強制ログアウトを実行
 * @param {*} store 
 */

const SessionCheck: Middleware = <S extends RootState>({ getState }: MiddlewareAPI<Dispatch, S>)  => 
    (next: Dispatch<AnyAction>) => (action: any): any => 
{
    // ログイン中にlocalStorage.loginIdを手動で削除した場合
    // if(!localStorage.loginId) {
    //     if(localStorage.loginId) {
    //         // localStorageのTokenとIDを削除(ログアウト処理)
    //         localStorage.removeItem("loginId");
    //     }
    //     // ログインページへ遷移
    //     window.location.href = '/login'
    // }

    // 次の処理へ移行
    next(action)
}

export default SessionCheck