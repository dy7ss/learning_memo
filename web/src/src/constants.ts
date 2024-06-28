const LAMBDA_DOMAIN = import.meta.env.VITE_Lambda_Domain

export const URL = {
    MEMO: LAMBDA_DOMAIN + "memo/",
    AUTH: LAMBDA_DOMAIN + "login/register/",
    LOGIN: LAMBDA_DOMAIN + "login/login"
}

// 1ページあたりの最大表示件数
export const PAGE_LIMIT = 10
