<template>
    <v-btn
        class="Cat-ico-btn"
        variant="tonal"
        :title="t.ttBtn_Delete"
        icon="mdi-delete"
        size="x-small"
        rounded="sm"
        elevation="3"
        color="red"
    ></v-btn>
</template>


<script setup>

import { getTranslate } from '@/multilanguage/lang.js' 
const t = getTranslate()

</script>


<style>
    .Cat-ico-btn .v-icon{
        font-size: 25px;
    }
</style>