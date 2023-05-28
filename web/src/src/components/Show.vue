<script setup lang="ts">
import axios from "axios";
import { reactive } from "vue";
import { onMounted } from "vue";

const url = "http://localhost:3000/db_show";
const url_search = "http://localhost:3000/db_search"
const PAGE_LIMIT = 10

interface Result {
  subject_name: string,
  used_time: number
}

interface Memos {
  open_page_num:number,
  result_all:Result[],
  this_page_record: Result[],
  max_page_num: number
}


const memos = reactive<Memos>({
  open_page_num: 1,
  result_all: [],
  this_page_record: [],
  max_page_num: 1
})

const calc_max_page_num = function (result_all) {
  return Math.ceil(result_all.length / PAGE_LIMIT)
}

const get_page_record = function (result_all: Result[], open_page_num: number) {
  const record_count = result_all.length

  // 最大ページ数
  const max_page_num = Math.ceil(record_count / PAGE_LIMIT)
  // 存在しないページ番号が押下されたとき
  if (open_page_num > max_page_num) {
    // pass
  }
  // ページネーションが発生するとき
  
  // 取得するレコードの開始地点
  const pagenation_start = (open_page_num -1) * PAGE_LIMIT

  // 指定したページ番号で表示するレコード
  const this_page_record = result_all.slice(pagenation_start, pagenation_start + PAGE_LIMIT)

  return this_page_record
}

// 押下されたページ番号に対して、表示するレコードを切り替える
const update_page_record = async (result_all, open_page_num) => {
  memos.this_page_record = await get_page_record (result_all, open_page_num)
}


// 画面項目
const search_word = reactive({
  subject_name: ""
})

const getData = async () => {
  let result = await axios.get(url);
  return result
};

// 検索処理
const searchData = async () => {
  let result = await axios.get(url_search, {
    params: {
      subject_name: search_word.subject_name
    }
  });
  return result
};

// 検索ボタンを押下したときの処理
const clickSearchButton = async () => {
  const result = await searchData()
  memos.result_all = result.data
  console.log("result_all_clicksearchbutton", memos.result_all)
  const page_max_num = await calc_max_page_num(memos.result_all)
  console.log("pagemaxnum", page_max_num)
  update_page_record(memos.result_all, 1)
  memos.max_page_num = page_max_num

};

const init_memos = async () => {
  const result = await getData()
  memos.result_all = result.data
  const page_max_num = await calc_max_page_num(memos.result_all)
  console.log(page_max_num)
  memos.max_page_num = page_max_num
}

onMounted(async () => {
  await init_memos()
})

</script>

<template>

<p>
<input type="text" v-model="search_word.subject_name">
<button @click="clickSearchButton">search</button>
</p>
  {{ memos.max_page_num }}

  <div v-for="(item, index) in memos.this_page_record">
    {{ item.subject_name }} {{ item.used_time }}
  </div>

  <br><hr><br>
  <div v-for="page_num in memos.max_page_num">
    <div @click="update_page_record(memos.result_all, page_num)">{{ page_num }}</div>
  </div>


</template>

