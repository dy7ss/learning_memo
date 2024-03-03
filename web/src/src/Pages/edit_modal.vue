<template>
    <div v-if="editModal.is_display" class="modal">
        <div class="modal-content">
            <span class="close" @click="close_modal()">&times;</span>
            <p>this is edit modal</p>
            <p>{{ editModal }}</p>
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
</style>
