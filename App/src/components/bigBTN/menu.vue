<template>
    <v-app-bar-nav-icon 
        variant="flat" 
        :title="t.ttBtn_Menu"
        style="
            background: linear-gradient(to top right, #CFD8DC, #ECEFF1); 
            font-size: 20px;"
    ></v-app-bar-nav-icon>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
const store = useStore()
const t = computed(() => store.state.lg)

</script>