<script setup>
import axios from "axios";
import { reactive } from "vue";

const url = "http://localhost:3000/db_show";
const url2 = "http://localhost:3000/db_insert";

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

const getData2 = async () => {
  let result2 = await axios.get(url2);
  data.responses2 = result2.data;
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

  <br><br>
  <button @click="getData2">Request2</button>
</template>
