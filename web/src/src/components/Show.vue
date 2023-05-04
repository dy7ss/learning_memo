<script setup>
import axios from "axios";
import { reactive } from "vue";
import { onMounted } from "vue";

const url = "http://localhost:3000/db_show";

const memos = reactive({
  result: ""
})

const getData = async () => {
  let result = await axios.get(url);
  console.log("exec getData3")
  console.log(result)
  return result
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
  <div v-for="(item, index) in memos.result">
    {{ item.subject_name }} {{ item.used_time }}
  </div>
</template>
