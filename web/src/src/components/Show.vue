<script setup>
import axios from "axios";
import { reactive } from "vue";
import { onMounted } from "vue";

const url = "http://localhost:3000/db_show";
const url_search = "http://localhost:3000/db_search"


const memos = reactive({
  result: ""
})

const search_word = reactive({
  subject_name: ""
})

const getData = async () => {
  let result = await axios.get(url);
  console.log("exec getData3")
  console.log(result)
  return result
};

const searchData = async () => {
  let result = await axios.get(url_search, {
    params: {
      subject_name: search_word.subject_name
    }
  });
  console.log(result)
  return result
};

const clickSearchButton = async () => {
  const result = await searchData()
  memos.result = result.data

};

const init_memos = async () => {
  const result = await getData()
  memos.result = result.data
}

onMounted(async () => {
  console.log("on mount")
  await init_memos()
})

</script>

<template>

<input type="text" v-model="search_word.subject_name">
<button @click="clickSearchButton">search</button>


  <div v-for="(item, index) in memos.result">
    {{ item.subject_name }} {{ item.used_time }}
  </div>
</template>

