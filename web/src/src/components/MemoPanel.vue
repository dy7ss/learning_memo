<script setup lang="ts">
import { useComposition } from "@/composition";
const { open_delete_modal, open_edit_modal } = useComposition();

const props = defineProps(['item'])
</script>

<template>
    <details>
        <summary>
            {{ item.subject_name }} {{ item.category }}<span />
        </summary>

        <ul>
            <li><strong><span class="column_name">
                        <img :class="$style.icon" src="@/assets/icon_calendar.svg" height="20">
                    </span></strong> {{ item.study_date }}</li>
            <li><strong><span class="column_name">
                        <img :class="$style.icon" src="@/assets/icon_clock.svg" height="20">
                    </span></strong> {{ item.used_time }}</li>
            <li>{{ item.remarks }}</li>
            <li>memoid: {{ item.memo_id }}</li>
            <li>
                <div :class="$style.icons_line">
                    <!-- 親画面にメモIDとモーダル表示フラグtrueの情報を渡す -->
                    <img :class="[$style.icon, $style.clickable]" src="@/assets/icon_garbagecan.svg" height="20"
                        @click="open_delete_modal(item.memo_id)">
                    <img :class="[$style.clickable, $style.icon]" src="@/assets/icon_edit.svg" height="20"
                        @click="open_edit_modal(item)">
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
    /* margin-left: 10px; */
    margin-left: 5px;
    margin-right: 5px;
}

.clickable:hover {
    cursor: pointer;
}
</style>
