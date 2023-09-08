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
          <Btn_check
          v-if="form"
          type="submit"
          @click="addComponent"
          ></Btn_check>
        </router-link>
        </template>
      </v-app-bar>
    
      <div class="img_font">
        <img :src="imgPath" alt="background_img">
      </div>

      <div class="Cp-formulaire">
        <v-form
          v-model="form"
        >

          <v-file-input
            @change="imgFile"
            label="Pictures"
            variant="outlined"
            color="color_component"
            prepend-icon="mdi-image"
          ></v-file-input>

          <v-text-field
          
          v-model="name"
          :rules= "[required]"
          clearable
          color="color_component"
          label="Name"
          variant="outlined"
          prepend-icon="mdi-rename-box"
          ></v-text-field>
          
          <v-text-field
          
          v-model="description"
          clearable
          color="color_component"
          label="Description"
          variant="outlined"
          prepend-icon="mdi-text-box"
          ></v-text-field>

          <v-text-field
          v-model="quantity"
          :rules="[required, nbrPositif]"
          color="color_component"
          label="Quantity"
          variant="outlined"
          prepend-icon="mdi-plus-minus-variant"
          type="number"
          min="1"
          ></v-text-field>

          <v-combobox
            v-if="kat"
            v-model="category"
            clearable
            variant="outlined"
            prepend-icon="mdi-shape"
            color="color_component"
            label="Category"
            :items="store.state.catts.map(catt => catt.name)"
          ></v-combobox>

        </v-form>
      </div>
  </div>
</template>










<script setup>

  import { ref, onMounted, computed } from 'vue'
  import store from '@/store';

  import Btn_check from "@/components/BTN_check.vue"
  import Btn_cancel from "@/components/BTN_cancel.vue"

  import { addComponentVuex } from '@/components/ComponentFunctions/addComponent.js'
  import { addComponentLocal } from '@/components/ComponentFunctions/addComponent.js'

  import { addCategoryVuex } from '@/components/CategoryFunctions/addCategory.js'
  import { addCategoryLocal } from '@/components/CategoryFunctions/addCategory.js'

  const form = ref(false)

  const name = ref(null)
  const description = ref(null)
  const quantity = ref(null)
  let category = ref(store.state.preCatt)
  let kat = ref(false)
  let img = ref(null)

  const imgPath = '/F2.jpg'

  function check_catts() {
    if (store.state.catts.length > 0){
      kat.value = true
    }
  }

  onMounted(() => {check_catts()})

  function required(v) {
    return !!v || 'Field is required'
  }


  function addComponent() {

    if(kat.value && category.value !== null){
      let targetCatt = store.state.catts.find(catt => catt.name === category.value)
      category = targetCatt.id
      store.dispatch('setPreCatt', null)
    }
    else if(category.value === null){
      const noCatt = store.state.catts.find(catt => catt.id === 123454321)
      if(noCatt){
        category = noCatt.id
      }
      else {
        
          addCategoryVuex(store, 123454321, 'No Category', '#546E7A')
          addCategoryLocal(123454321, 'No Category', '#546E7A')

          category = 123454321
      }
    }
      const id = Date.now()
      addComponentVuex(store, id, name.value, description.value, quantity.value, category, img)
      addComponentLocal(id, name.value, description.value, quantity.value, category, img)
  
    }
  


  function nbrPositif(v){
    if (v <= 0){
      return 'No negative numbers'
    }
    return true
  }

  function imgFile(event){
    const file = event.target.files[0]
    if (file){
      readFile(file)
    }
  }

  function readFile(file){
    const reader = new FileReader()

    reader.onload = (event) => {
      img = event.target.result
    }
    reader.readAsDataURL(file)
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

  .Cp-formulaire {
    position: relative;
    margin-left: 10vw;
    margin-right: 10vw;
    margin-top: 20vh;
    padding-left: 5vw;
    padding-right: 5vw;
    padding-top: 5vh;
    padding-bottom: 5vh;
    border-radius: 2vw;
    background: linear-gradient(to bottom left, #616161, #BDBDBD, #616161);
    box-shadow: 0px 0px 30px 0px rgb(0, 0, 0, .2);
    z-index: 2;
  }
  
</style>