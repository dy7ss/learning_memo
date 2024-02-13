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
            <input type="button" value="登録する" @click="insertData(insert_form)" />
        </form>

    </div>

    <hr>
    <br><br><br><br>
</template>


<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, integer, maxLength } from '@vuelidate/validators'
import { useComposition } from "@/composition";
import { useMemoStore } from '@/stores/memo';
import '@vuepic/vue-datepicker/dist/main.css'

const memoStore = useMemoStore()

const { insertData } = useComposition();

const insert_form = memoStore.register_form;

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

const v$ = useVuelidate(rules, insert_form)

</script>
