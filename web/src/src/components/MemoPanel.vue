<script setup lang="ts">
import { useComposition } from "@/composition";
const { open_delete_modal } = useComposition();
const props = defineProps(['item'])
</script>

<template>
    <details>
        <summary>
            {{ item.subject_name }} {{ item.category }}<span />
        </summary>

        <ul>
            <li><strong><span class="column_name">学習日</span></strong> {{ item.study_date }}</li>
            <li><strong><span class="column_name">学習時間</span></strong> {{ item.used_time }}</li>
            <li><strong><span class="column_name">備考</span></strong>{{ item.remarks }}</li>
            <li>memoid: {{ item.memo_id }}</li>
            <li>
                <div :class="$style.icons_line">
                    <!-- 親画面にメモIDとモーダル表示フラグtrueの情報を渡す -->
                    <img :class="$style.icon" src="@/assets/icon_garbagecan.svg" height="20"
                        @click="open_delete_modal(item.memo_id)">
                    <img :class="$style.icon" src="@/assets/icon_edit.svg" height="20">
                </div>
            </li>
        </ul>
    </details>
</template>
<style module>
.icons_line {
    text-align: right;
}

.icon {
    margin-left: 10px;
}

.icon:hover {
    cursor: pointer;
}
</style>
