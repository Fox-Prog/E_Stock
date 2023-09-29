<template>
    <v-app-bar
      app
      style="background: linear-gradient(to top right, #212121, #263238)"
      location="bottom"
    >
      <!-- Btn done -->
      <template v-slot:append>
        <Btn_done @click="router.push('/')"></Btn_done>
      </template>
    </v-app-bar>

    <div class="img_font">
      <img :src="imgPath" alt="background_img" />
    </div>

    <div class="lg-form">
      <v-form>
        <div style="display: flex;">
          <v-select
              v-model="language"
              prepend-icon="mdi-translate"
              variant="outlined"
              :items="lgs"
              @update:model-value="setLang(store, language)"
          ></v-select> 

          <img
            id="flag"
            :src=flag 
            alt="flag"
           >
        </div>



      </v-form>
    </div>
</template>









<script setup>
import Btn_done from "@/components/bigBTN/done.vue";

import { ref, computed } from 'vue' 
import { useStore } from 'vuex'
const store = useStore()

import { useRouter } from "vue-router"
const router = useRouter()

const flags = [
  {
    name: 'en',
    img: 'images/en.png'
  },
  {
    name: 'fr',
    img: '/images/fr.png'
  }
]

const flag = computed(()=>{
  const selectedFlag = flags.find(flag => flag.name === store.state.lg.name)
  return selectedFlag.img
})


const imgPath = "/images/cog.jpg"
const lgSave = ref(store.state.lg.name)
const language = ref(lgSave.value)
const lgs = ['en', 'fr']

import { setLang } from '@/multilanguage/lang.js'


</script>









<style>
.img_font {
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 40vh;
  overflow: hidden;

  z-index: 1;
}

.lg-form {
  position: relative;
  margin-left: 10vw;
  margin-right: 10vw;
  margin-top: 20vh;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 5vh;
  padding-bottom: 5vh;
  border-radius: 20px;
  background: linear-gradient(to bottom left, #616161, #bdbdbd, #616161);
  box-shadow: 0px 0px 30px 0px rgb(0, 0, 0, 0.2);
  z-index: 2;
}

#flag {
  position: absolute;
  width: 60px;
  height: 60px;
  right: -30px;
  top: -30px;
}


</style>