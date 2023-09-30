<template>
    <v-btn
        variant="flat"
        :title="t.ttBtn_Cancel"
        color="color_btn_annuler"
        icon="mdi-window-close"
    ></v-btn>
</template>


<script setup>

import { getTranslate } from '@/multilanguage/lang.js' 
const t = getTranslate()

</script>