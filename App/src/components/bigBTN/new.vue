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

import { getTranslate } from '@/multilanguage/lang.js' 
const t = getTranslate()

</script>