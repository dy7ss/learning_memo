<script setup>
import axios from "axios";
import { reactive } from "vue";

const url2 = "http://localhost:3000/db_insert";

const insert_form = reactive({
    subject_name: "",
    used_time: ""
})

const insertData = async () => {
    let result = await axios.get(url2, {
        params: {
            subject_name: insert_form.subject_name,
            used_time: insert_form.used_time
        }
    });
};
</script>

<template>
    <p>データ登録</p>
    <form>
        項目名<input type="text" v-model="insert_form.subject_name" /><br>
        学習時間<input type="text" v-model="insert_form.used_time" />
        <input type="button" value="INSERT!" @click="insertData" />
    </form>
</template>
