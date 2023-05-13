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

const insertData = async () => {
    console.log("fire")
    const isFormCorrect = await v$.value.$validate()
    console.log(isFormCorrect)
    console.log(v$.$errors)
    if (!isFormCorrect) {
        alert("不適切な値が入力されています")
        return
    }
    

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
        <div :class="{ error: v$.subject_name.$errors.length }"></div>
        項目名<input type="text" v-model="insert_form.subject_name" /><br>
        <div class="input-errors" v-for="error of v$.subject_name.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
        学習時間<input type="text" v-model="insert_form.used_time" />
        <div class="input-errors" v-for="error of v$.used_time.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
        <input type="button" value="登録する" @click="insertData" />
    </form>
</template>
