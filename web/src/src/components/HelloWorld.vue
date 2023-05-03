<script setup>
import axios from "axios";
import { reactive } from "vue";
import { onMounted } from "vue";

const url = "http://localhost:3000/db_show";
const url2 = "http://localhost:3000/db_insert";
const url3 = "http://localhost:3000/db_insert2";

defineProps({
  msg: String,
})
const data = reactive({
  task_name: "",
  is_done: "",
});
const data2 = reactive({
  subject_name: "",
  used_time: ""
})
const insert_form = reactive({
  subject_name: "",
  used_time: ""
})

const memos = reactive({
  result: ""
})


const getData = async () => {
  let result = await axios.get(url);
  data.responses = result.data;
};

const getData2 = async () => {
  let result = await axios.get(url2);
  data2.responses = result.data;
};

const getData3 = async () => {
  let result = await axios.get(url);
  console.log("exec getData3")
  console.log(result)
  return result
};

const init_memos = async () => {
  console.log("start init_memos")
  const result = await getData3()
  memos.result = result.data
}

onMounted(async () => {
  console.log("on mount")
  await init_memos()
})


</script>

<template>
  <h1>{{ msg }}</h1>
  <input type="text" v-model="data.keyWord" @input="inputPrompt" />

  <div v-for="(item, index) in memos.result">
    {{ item.subject_name }} {{ item.used_time }}
  </div>
</template>
