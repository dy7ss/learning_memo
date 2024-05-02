const LAMBDA_DOMAIN = import.meta.env.VITE_Lambda_Domain

export const URL = {
    // 学習メモ取得API
    MEMO_GET: LAMBDA_DOMAIN + "memo/get-list",
    // 学習メモ登録API
    MEMO_REGISTER: LAMBDA_DOMAIN + "memo/insert",
    // 学習メモ削除API
    MEMO_DELETE: LAMBDA_DOMAIN + "memo/delete",
    // 学習メモ編集API
    MEMO_EDIT: LAMBDA_DOMAIN + "memo/update"
}

// 1ページあたりの最大表示件数
export const PAGE_LIMIT = 10
