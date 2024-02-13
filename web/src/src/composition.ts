
import { ref } from 'vue';
import axios from "axios";
import type { Memo } from "@/types/Memo";
import type { RegisterForm } from "@/types/RegisterForm";
import { URL, PAGE_LIMIT } from "@/constants";
import { useMemoStore } from '@/stores/memo';
import { useVuelidate } from '@vuelidate/core'
import { required, integer, maxLength } from '@vuelidate/validators'

export const useComposition = function () {

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
        let result = await axios.get(URL.MEMO_GET);
        return result
    };

    // 検索処理
    const searchData = async (search_word) => {
        let result = await axios.get(URL.MEMO_GET, {
            params: {
                subject_name: search_word.subject_name
            }
        });
        return result
    };

    const init_memos = async (memos) => {
        const result = await getData()
        memos.result_all = result.data
        update_page(memos, memos.result_all, 1)
        const page_max_num = await calc_max_page_num(memos.result_all)
        console.log(page_max_num)
        memos.max_page_num = page_max_num
    }

    // 検索ボタンを押下したときの処理
    const clickSearchButton = async (memos, search_word) => {
        const result = await searchData(search_word)
        memos.result_all = result.data
        console.log("result_all_clicksearchbutton", memos.result_all)
        const page_max_num = await calc_max_page_num(memos.result_all)
        console.log("pagemaxnum", page_max_num)
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
        let result = await axios.get(URL.MEMO_REGISTER, {
            params: form
        });
        return result
    };

    const clear_register_form = () => {
        const memoStore = useMemoStore()
        memoStore.init_registerd_form()
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
        insertData
    }
}
