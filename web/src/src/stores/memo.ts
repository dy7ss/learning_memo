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
            }
        }
    },
    actions: {
        init_store() {
            this.init_memos()
            this.init_search_word()
        },
        init_memos() {
            this.memos.open_page_num = 1
            this.memos.result_all = []
            this.memos.this_page_record = []
            this.memos.max_page_num = 1
        },
        init_search_word() {
            this.search_word.subject_name = ""
        }
    }
})
