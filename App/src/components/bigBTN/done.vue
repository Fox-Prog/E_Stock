<template>
    <v-btn
        variant="flat"
        :title="t.ttBtn_Done"
        color="color_btn_check"
        icon="mdi-check"
    ></v-btn>

</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
const store = useStore()
import { getTranslate } from '@/multilanguage/lang.js' 
const t = getTranslate()

</script>