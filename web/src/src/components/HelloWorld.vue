<script setup>
import axios from "axios";
import { reactive } from "vue";

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

const getData = async () => {
  let result = await axios.get(url);
  data.responses = result.data;
};

const getData2 = async () => {
  let result = await axios.get(url2);
  data2.responses = result.data;
};

const insertData = async () => {
  let result = await axios.get(url3, {
    params: {
      subject_name: insert_form.subject_name,
      used_time: insert_form.used_time
    }
  });
  console.log("text1 is", insert_form)
};
</script>

<template>
  <h1>{{ msg }}</h1>
  <input type="text" v-model="data.keyWord" @input="inputPrompt" />

  <br><br><br><br><br>
  <button @click="getData2">db_insert</button>
  <hr>
  <!-- <div>data.responses:{{ data.responses }}</div> -->
  <div v-for="(item, index) in data2.responses">
    {{ item.subject_name }} {{ item.used_time }}
  </div>

  <button @click="getData">show_table</button>
  <hr>
  <div v-for="(item, index) in data.responses">
    {{ item.subject_name }} {{ item.used_time }}
  </div>
  <hr>

  <br><br><br><br><br><br><br>
  データ登録
  <form>
    項目名<input type="text" v-model="insert_form.subject_name" /><br>
    学習時間<input type="text" v-model="insert_form.used_time" />
    <input type="button" value="INSERT!" @click="insertData" />
  </form>
  {{ text1 }}
</template>
