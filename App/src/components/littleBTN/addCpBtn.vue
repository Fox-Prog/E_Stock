<template>
    <v-btn
        variant="tonal"
        :title="t.ttBtn_CreateCp"
        icon="mdi-memory"
        color="color_component"
        elevation="3"
    ></v-btn>
</template>


<script setup>

import { getTranslate } from '@/multilanguage/lang.js' 
const t = getTranslate()

</script>
