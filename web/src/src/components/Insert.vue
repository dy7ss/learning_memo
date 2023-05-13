<script setup>
import axios from "axios";
import { reactive } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, integer, maxLength} from '@vuelidate/validators'

const url2 = "http://localhost:3000/db_insert";


const insert_form = reactive({
    subject_name: "",
    used_time: ""
})
const rules = {
    subject_name: {
        required,
        maxLength: maxLength(10)
    },
    used_time: {
        required,
        integer
    },
}

const v$ = useVuelidate(rules, insert_form)

const error_flag = reactive({
    status_code: ""
})

const insertData = async () => {
    const isFormCorrect = await v$.value.$validate()
    if (!isFormCorrect) {
        alert("不適切な値が入力されています")
        return
    }

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
        <div :class="{ error: v$.subject_name.$errors.length }"></div>
        項目名<input type="text" v-model="insert_form.subject_name" /><br>
        <div class="input-errors" v-for="error of v$.subject_name.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
        学習時間<input type="text" v-model="insert_form.used_time" />
        <div class="input-errors" v-for="error of v$.used_time.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
        <div v-if="error_flag.status_code">
            不正な値が入力されました。
        </div>
        <input type="button" value="登録する" @click="insertData" />
    </form>
</template>
