<template>
    <v-btn
        variant="flat"
        :title="t.ttBtn_DeleteAll"
        color="color_btn_annuler"
        icon="mdi-delete"
    ></v-btn>
</template>


<script setup>

import { getTranslate } from '@/multilanguage/lang.js' 
const t = getTranslate()

</script>