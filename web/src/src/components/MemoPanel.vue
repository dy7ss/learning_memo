<script setup lang="ts">

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
        </ul>

    </details>
</template>
