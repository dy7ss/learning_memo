import { defineStore } from 'pinia'
import type { Memos } from "@/types/Memos";

export const useMemoStore = defineStore('memo', {
    state: () => {
        return {
            memos: {
                open_page_num: 1,
                result_all: [],
                this_page_record: [],
                max_page_num: 1,
            },
            search_word: {
                subject_name: ""
            },
            register_form: {
                subject_name: "",
                used_time: "",
                study_date: new Date(),
                category: "",
                remarks: ""
            },
            delete_modal: {
                is_display: false,
                target_memo_id: ""
            },
            edit_modal: {
                is_display: false,
                target_memo_id: ""
            }

        }
    },
    actions: {
        init_store() {
            this.init_memos()
            this.init_search_word()
            this.init_registerd_form()
            this.init_delete_modal()
            this.init_edit_modal()
        },
        init_memos() {
            this.memos.open_page_num = 1
            this.memos.result_all = []
            this.memos.this_page_record = []
            this.memos.max_page_num = 1
        },
        init_search_word() {
            this.search_word.subject_name = ""
        },
        init_registerd_form() {
            this.register_form.subject_name = ""
            this.register_form.used_time = ""
            this.register_form.study_date = new Date()
            this.register_form.category = ""
            this.register_form.remarks = ""
        },
        init_delete_modal() {
            this.delete_modal.is_display = false
            // 仮の値
            this.delete_modal.target_memo_id = ""
        },
        init_edit_modal() {
            this.edit_modal.is_display = false
            // 仮の値
            this.edit_modal.target_memo_id = ""
        }

    }
})
