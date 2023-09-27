<template>
    <v-btn
        class="Cat-ico-btn"
        variant="tonal"
        :title="t.ttBtn_Set"
        icon="mdi-pen"
        color="black"
        size="x-small"
        rounded="sm"
        elevation="3"
    ></v-btn>
</template>


<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
const store = useStore()
const t = computed(() => store.state.lg)

</script>


<style>
    .Cat-ico-btn .v-icon{
        font-size: 25px;
    }
</style>