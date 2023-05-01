<script setup>
import axios from "axios";
import { reactive } from "vue";

const url = "http://localhost:3000/db_show";
const url2 = "http://localhost:3000/db_insert";
<<<<<<< HEAD
const url3 = "http://localhost:3000/db_insert2";
=======
>>>>>>> 42a8203092a3d595bb85e85fd21531f6c9f669e4

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
<<<<<<< HEAD
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
=======
  let result2 = await axios.get(url2);
  data.responses2 = result2.data;
>>>>>>> 42a8203092a3d595bb85e85fd21531f6c9f669e4
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

<<<<<<< HEAD
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
=======
  <br><br>
  <button @click="getData2">Request2</button>
>>>>>>> 42a8203092a3d595bb85e85fd21531f6c9f669e4
</template>
