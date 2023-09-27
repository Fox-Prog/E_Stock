<template>
    <v-btn
        variant="flat" 
        :title="t.ttBtn_Create"
        style="
            background: linear-gradient(to top right, #CFD8DC, #ECEFF1);
            font-size: 20px;"
        icon="mdi-plus"
    ></v-btn> 
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
const store = useStore()
const t = computed(() => store.state.lg)

</script>