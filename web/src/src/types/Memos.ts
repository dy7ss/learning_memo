import type { Memo } from "@/types/Memo";

export interface Memos {
    open_page_num: number,
    result_all: Memo[],
    this_page_record: Memo[],
    max_page_num: number
}
