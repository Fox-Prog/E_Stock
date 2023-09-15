<template>
  <div>
        <v-app-bar 
        app
        style="background: linear-gradient(to top right, #212121, #263238);"
        location="bottom"
        >
        <template v-slot:prepend>
          <router-link to="/" style="text-decoration: none;">
            <Btn_cancel></Btn_cancel>
          </router-link>
        </template>
        
        <template v-slot:append>
          <router-link to="/" style="text-decoration: none;">
            <Btn_done
            v-if="form"
            type="submit"
            @click="addCatt"
            ></Btn_done>
          </router-link>
          </template>
        </v-app-bar>
              
        <div class="img_font">
          <img :src="imgPath" alt="background_img">
        </div>
  
        <div class="Cat-formulaire">
          <v-form
            v-model="form"
          >
            <v-text-field
              class="mb-3"
              v-model="name"
              :rules= "[required, unicName, longName]"
              clearable
              color="color_catt"
              label="Name"
              variant="outlined"
              prepend-icon="mdi-rename-box"
            ></v-text-field>


            <v-color-picker
              v-model="colorToPick"
              :immediate="true"
              hide-inputs
              color="grey-darken-3"
              width="100%"
              height="250px"
              rounded="xl"
            ></v-color-picker>

          </v-form>
        </div>
  </div>
</template>
  















<script setup>

  import Btn_done from "@/components/bigBTN/done.vue";
  import Btn_cancel from "@/components/bigBTN/cancel.vue";
  import { useStore } from "vuex"
  const store = useStore()

  import { ref } from "vue"

  import { addCategoryLocal } from '@/components/CategoryFunctions/addCategory.js'
  import { addCategoryVuex } from '@/components/CategoryFunctions/addCategory.js'

 

  const form = ref(false)
  const name = ref(null)
  const imgPath = '/images/bgNew.jpg'
  let colorToPick = ref(null)

  
  function required(v) {
      return !!v || 'Field is required'
  }

  function unicName(v) {
    const cattExist = store.state.catts.some(catt => catt.name === v)
    if (cattExist) {
      return 'This name already exists'
    }
    return true
  }

  function longName(v){
    if(v.length > 15){
      return 'Max 15 caracters'
    }
    return true
  }


  function addCatt() {

    if(colorToPick.value === '#FFFFFF'){
      colorToPick.value = '#2E7D32'
    }

    const id = Date.now()
    addCategoryVuex(store, Date.now(), name.value, colorToPick.value)
    addCategoryLocal(id, name.value, colorToPick.value)
  }

  
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

  .img_font img {
    width: 100%;
    height: 90%;
    object-fit: cover;
  }
  
  .Cat-formulaire {
    position: relative;
    margin-left: 10vw;
    margin-right: 10vw;
    margin-top: 20vh;

    padding-left: 5vw;
    padding-right: 5vw;
    padding-top: 5vh;
    padding-bottom: 5vh;

    border-radius: 15px;

    background: linear-gradient(to bottom left, #616161, #BDBDBD, #616161);
    box-shadow: 0px 0px 30px 0px rgb(0, 0, 0, .2);

    z-index: 2;
  }

</style>