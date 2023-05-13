<script setup>
import axios from "axios";
import { reactive } from "vue";

const url2 = "http://localhost:3000/db_insert";

const insert_form = reactive({
    subject_name: "",
    used_time: ""
})

const error_flag = reactive({
    status_code: ""
})

const insertData = async () => {
    let result;
    try{
        result = await axios.post(url2, {
        subject_name: insert_form.subject_name,
        used_time: insert_form.used_time
        });
        error_flag.status_code = ""
    } catch(error){
        if (error.response.status === 422){
            error_flag.status_code = error.response.status
            console.log("422 error")
        }
    }
};
</script>

<template>
    <p>データ登録</p>
    <form>
        項目名<input type="text" v-model="insert_form.subject_name" /><br>
        学習時間<input type="text" v-model="insert_form.used_time" />
        <input type="button" value="INSERT!" @click="insertData" />
        <div v-if="error_flag.status_code">
            不正な値が入力されました。
        </div>
    </form>
</template>
