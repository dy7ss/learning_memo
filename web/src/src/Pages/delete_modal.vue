<template>
    <div v-if="deleteModal.is_display" class="modal">
        <div class="modal-content">
            <span class="close" @click="close_modal()">&times;</span>
            <p>削除しますか？</p>
            <p>{{ deleteModal }}</p>
            <p>
                <Button :name="button_name" @click="delete_memo(deleteModal)"></Button>
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useComposition } from "@/composition";
import Button from "@/components/Button.vue";

import { useMemoStore } from '@/stores/memo';

const { delete_memo } = useComposition();

const memoStore = useMemoStore()
const button_name = "削除する"

const deleteModal = memoStore.delete_modal

const close_modal = function () {
    deleteModal.is_display = !deleteModal.is_display
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
