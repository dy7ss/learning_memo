<script setup lang="ts">
import { useComposition } from "@/composition";
const { open_delete_modal } = useComposition();
const props = defineProps(['name'])

</script>
<button>

</button>
<template>
    <button :class="$style.button">{{ name }}</button>
</template>
<style module>
.button {
    margin: 10px;
    background-color: #7B61FF;
    border-radius: 10px;
    color: #fff;
    padding: 10px 20px;
}
</style>
