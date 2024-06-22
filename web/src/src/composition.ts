import axios from "axios";
import type { Memo } from "@/types/Memo";
import type { RegisterForm } from "@/types/RegisterForm";
import { URL, PAGE_LIMIT } from "@/constants";
import { useMemoStore } from '@/stores/memo';
import { useAuthStore } from '@/stores/auth';
import { useVuelidate } from '@vuelidate/core'
import { required, integer, maxLength } from '@vuelidate/validators'

export const useComposition = function () {

    const memoStore = useMemoStore()
    const authStore = useAuthStore()

    const delete_modal_info = memoStore.delete_modal;

    const calc_max_page_num = function (result_all) {
        return Math.ceil(result_all.length / PAGE_LIMIT)
    }

    const get_page_record = function (result_all: Memo[], open_page_num: number) {
        const record_count = result_all.length

        // 最大ページ数
        const max_page_num = Math.ceil(record_count / PAGE_LIMIT)
        // 存在しないページ番号が押下されたとき
        if (open_page_num > max_page_num) {
            // pass
        }
        // ページネーションが発生するとき

        // 取得するレコードの開始地点
        const pagenation_start = (open_page_num - 1) * PAGE_LIMIT

        // 指定したページ番号で表示するレコード
        const this_page_record = result_all.slice(pagenation_start, pagenation_start + PAGE_LIMIT)

        return this_page_record
    }

    // 押下されたページ番号に対して、表示するレコードを切り替える
    const update_page = async (memos, result_all, open_page_num) => {
        // 表示対象となるレコードを更新する
        memos.this_page_record = await get_page_record(result_all, open_page_num)
        // 押下されているページ番号の情報を更新する
        memos.open_page_num = open_page_num
    }

    const getData = async () => {
        const headers = {
            authorization: authStore.token
        }
        let result = await axios.get(URL.MEMO,
            { headers: headers }
        );
        return result.data.result
    };

    // 検索処理
    const searchData = async (search_word) => {
        const headers = {
            authorization: authStore.token
        }
        const data = {
            subject_name: search_word.subject_name
        }
        let result = await axios.get(URL.MEMO,
            {
                headers: headers,
                params: data
            }
        );
        return result
    };

    const init_memos = async (memos) => {
        memos.result_all = await getData()
        update_page(memos, memos.result_all, 1)
        const page_max_num = await calc_max_page_num(memos.result_all)
        console.log(page_max_num)
        memos.max_page_num = page_max_num
    }

    // 検索ボタンを押下したときの処理
    const clickSearchButton = async (memos, search_word) => {
        const result = await searchData(search_word)
        memos.result_all = result.data.result;
        const page_max_num = await calc_max_page_num(memos.result_all)
        update_page(memos, memos.result_all, 1)
        memos.max_page_num = page_max_num
    };

    // TODO 関数名をあとで修正する
    const insertData = async (insert_form) => {

        const error_flag = {
            status_code: ""
        }
        const rules = {
            subject_name: {
                required,
                maxLength: maxLength(10)
            },
            used_time: {
                required,
                integer
            },
            category: {
                required,
                maxLength: maxLength(20)
            },
        }

        const v$ = useVuelidate(rules, insert_form)
        const isFormCorrect = await v$.value.$validate()

        if (!isFormCorrect) {
            alert("不適切な値が入力されています")
            return
        }

        let result;
        try {
            result = await register_memo(insert_form)
            error_flag.status_code = ""
        } catch (error: any) {
            if (error.response.status === 422) {
                error_flag.status_code = error.response.status
                console.log("422 error")
                alert("不適切な値が入力されています")
            }
        }

        clear_register_form()
    };

    const register_memo = async (form: RegisterForm) => {
        form.used_time = parseInt(form.used_time)
        // TODO: 画面で設定なしにすると現在時刻が設定される
        form.study_date = new Date(form.study_date).toISOString()

        let result = await axios.post(URL.MEMO, form);
        return result
    };

    const clear_register_form = () => {
        const memoStore = useMemoStore()
        memoStore.init_registerd_form()
    }

    const delete_memo = async (delete_modal: any) => {
        let result = await axios.delete(URL.MEMO + delete_modal.target_memo_id);
        return result
    };

    const edit_memo = async (edit_modal: any) => {
        const updated_date = Date.now()
        edit_modal.target_memo_info.updated_date = updated_date
        const p = edit_modal.target_memo_info
        const result = await axios.put(URL.MEMO + p.memo_id, p);
        return result
    };

    const open_delete_modal = async (memo_id: string) => {
        memoStore.delete_modal.is_display = true;
        memoStore.delete_modal.target_memo_id = memo_id
    }

    const open_edit_modal = async (memo_info: any) => {
        memoStore.edit_modal.is_display = true;
        memoStore.edit_modal.target_memo_info = memo_info;
    }

    // ログイン用
    // 検索処理
    const auth_register = async (user_id: string, password: string) => {
        let result = await axios.post(URL.AUTH, {
            user_id: user_id,
            password: password
        });
        return result
    };

    const login = async (user_id: string, password: string) => {
        let result = await axios.post(URL.LOGIN, {
            user_id: user_id,
            password: password
        })
        authStore.set_token(result.data)
        return result
    }

    return {
        calc_max_page_num,
        get_page_record,
        update_page,
        getData,
        searchData,
        init_memos,
        clickSearchButton,
        register_memo,
        clear_register_form,
        insertData,
        delete_memo,
        open_delete_modal,
        open_edit_modal,
        edit_memo,
        auth_register,
        login
    }
}
