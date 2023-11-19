<script setup>
import axios from "axios";
import { reactive } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, integer, maxLength } from '@vuelidate/validators'
import { onMounted } from "vue";

import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'



// const url2 = "http://localhost:3000/db_insert";
const url2 = "https://ubj37r7okf64u5rszmgni6f3ke0mspzc.lambda-url.us-east-1.on.aws/ ";


const insert_form = reactive({
    subject_name: "",
    used_time: "",
    study_date: new Date(),
    category: "",
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
    category: {
        required,
        maxLength: maxLength(20)
    },
}

// カレンダーのフォーマット修正
const format = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}/${month}/${day}`;
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
    try {
        // result = await axios.post(url2, {
        //     subject_name: insert_form.subject_name,
        //     used_time: insert_form.used_time,
        //     study_date: insert_form.study_date
        result = await axios.get(url2, {
            params: {
                subject_name: insert_form.subject_name,
                used_time: insert_form.used_time,
                study_date: insert_form.study_date,
                category: insert_form.category,
                remarks: insert_form.remarks,
            }
        });
        error_flag.status_code = ""
    } catch (error) {
        if (error.response.status === 422) {
            error_flag.status_code = error.response.status
            console.log("422 error")
            alert("不適切な値が入力されています")
        }
    }
};

</script>

<template>
    <p>データ登録</p>
    <div class="register_form">
        

        <form>
            <div class="row">
                <div :class="{ error: v$.subject_name.$errors.length }"></div>
                <div class="title">項目名</div>
                <input type="text" v-model="insert_form.subject_name" /><br>
                <div class="input-errors" v-for="error of v$.subject_name.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div class="row">
                <div class="title">カテゴリー</div>
                <input type="text" v-model="insert_form.category" /><br>
                <div class="input-errors" v-for="error of v$.category.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div class="row">
                <div class="title">学習時間</div>
                <input type="text" v-model="insert_form.used_time" /><br>
                <div class="input-errors" v-for="error of v$.used_time.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div class="row">
                <div class="title">学習日</div>
                <input type="date" id="start" name="trip-start" v-model="insert_form.study_date" />
                <br>
            </div>

            <div class="row">
                <div class="title">備考</div>
                <textarea id="story" name="story" rows="5" cols="33" v-model="insert_form.remarks"></textarea>
            </div>
            <br>
            <input type="button" value="登録する" @click="insertData" />
        </form>

    </div>

    <hr>
    <br><br><br><br>
</template>
