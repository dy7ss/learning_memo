<template>
    <div v-if="editModal.is_display" class="modal">
        <div class="modal-content">
            <span class="close" @click="close_modal()">&times;</span>
            <p>
                <img :class="$style.icon" src="@/assets/icon_memo.svg" height="20">
                
                <input type="text" v-model="editModal.target_memo_info.subject_name" placeholder="">
            </p>
            <p>
                <img :class="$style.icon" src="@/assets/icon_folder.svg" height="20">
                 <input type="text" v-model="editModal.target_memo_info.category" placeholder="">
            </p>
            <p>
                <img :class="$style.icon" src="@/assets/icon_calendar.svg" height="20">
                <input type="text" v-model="editModal.target_memo_info.study_date" placeholder="">
            </p>
            <p>
                <img :class="$style.icon" src="@/assets/icon_clock.svg" height="20">
                <input type="text" v-model="editModal.target_memo_info.used_time" placeholder="">(分)
            </p>
            <p>
                <img :class="$style.icon" src="@/assets/icon_edit.svg" height="20">
                <textarea name="kansou" rows="4" cols="30" v-model="editModal.target_memo_info.remarks"></textarea>
            </p>
            <p><Button :name="button_name" @click="edit_memo(editModal)"></Button></p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useComposition } from "@/composition";
import Button from "@/components/Button.vue";

import { useMemoStore } from '@/stores/memo';

const { edit_memo } = useComposition();

const memoStore = useMemoStore()
const button_name = "修正する"

const editModal = memoStore.edit_modal

const close_modal = function () {
    editModal.is_display = !editModal.is_display
}

</script>
<style scoped>
.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #00000066
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

p{
    border-bottom: 1px dashed #7B61FF;
    text-align: left;
    padding:12px;
    color: #7B61FF
}

textarea{
    color:#7B61FF;
    border:none;
    font-size: 15px;
}

input{
    color:#7B61FF;
    border:none;
    font-size: 15px;
    /* border-bottom: 1px dashed #7B61FF; */
}
</style>

<style module>
.icon {
    margin-left: 5px;
    margin-right: 5px;
}
</style>
