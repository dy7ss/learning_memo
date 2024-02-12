import { defineStore } from 'pinia'
import type { Memos } from "@/types/Memos";

export const useMemoStore = defineStore('memo', {
    state: () => {
        return {
            memos: {
                open_page_num: 1,
                result_all: [],
                this_page_record: [],
                max_page_num: 1
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
            }
        }
    },
    actions: {
        init_store() {
            this.init_memos()
            this.init_search_word()
            this.init_registerd_form()
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

        }
    }
})
