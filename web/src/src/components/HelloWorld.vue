<script setup>
import axios from "axios";
import { reactive } from "vue";

const url = "http://localhost:3000/db_show";

defineProps({
  msg: String,
})
const data = reactive({
  task_name: "",
  is_done: "",
});

const getData = async () => {
  let result = await axios.get(url);
  data.responses = result.data;
};
</script>

<template>
  <h1>{{ msg }}</h1>
  <input type="text" v-model="data.keyWord" @input="inputPrompt" />
  <button @click="getData">Request</button>
  <hr>
  <!-- <div>data.responses:{{ data.responses }}</div> -->
  <div v-for="(item, index) in data.responses">
    {{ item.task_name }} {{ item.is_done }}
  </div>
</template>
