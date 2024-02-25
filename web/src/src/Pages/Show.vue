<script setup lang="ts">
import { onMounted } from "vue";
import { useComposition } from "@/composition";
import MemoPanel from "@/components/MemoPanel.vue";
import DeleteModal from "@/Pages/delete_modal.vue"
import { useMemoStore } from '@/stores/memo';

const { update_page, init_memos, clickSearchButton } = useComposition();

const memoStore = useMemoStore()
const memos = memoStore.memos;
const search_word = memoStore.search_word;


onMounted(async () => {
  await init_memos(memos)
})

</script>

<template>
  <div class="show_content">
    <p>
      <input type="text" v-model="search_word.subject_name">
      <button @click="clickSearchButton(memos, search_word)">search</button>
    </p>
    <div v-for="(item, index) in memos.this_page_record">
      <MemoPanel :item="item"></MemoPanel>
    </div>

    <br>
    <hr><br>
    <div class="pagination_link_list">
      <div class="pagination_link_element" v-if="memos.max_page_num > 1" @click="update_page(memos, memos.result_all, 1)">
        ≪
      </div>
      <div v-for="page_num in memos.max_page_num">
        <div class="pagenation_plain_element" v-if="page_num == memos.open_page_num">{{ page_num }}</div>
        <div v-else class="pagination_link_element" @click="update_page(memos, memos.result_all, page_num)">{{ page_num }}
        </div>
      </div>
      <div class="pagination_link_element" v-if="memos.max_page_num > 1"
        @click="update_page(memos, memos.result_all, memos.max_page_num)">≫</div>
    </div>
  </div>
  <DeleteModal></DeleteModal>
</template>

