<template>
  <div class="Cp-card">
    <div class="Cp-top">

      <div class="Cp-imgBox">
        <div class="Cp-imgContainer" v-if="showImg">
          <img
            :src="composant.img ? composant.img : imgDefault" 
            alt="Component_image">
        </div>
      </div>
      
      <div class="Cp-btn_name">
        <v-dialog
          v-model="showDescription"
          width="auto"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              variant="text"
              title="showDescription"
              v-bind="props"
            >
            <h2>{{ composant.name }}</h2>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              {{ composant.description }}
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" block @click="showDescription = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div id="Cp-nbr_contained"
      :style="{color: composant.quantity === 0 ? '#B71C1C' : 'black'}"
      >
        <h2>{{ composant.quantity }}</h2>
      </div>
    </div>

    <v-expand-transition>
      <div
        class="Cp-options"
        v-if="expand"
      >
        <div class="Cp-btn">
          <btn_delete
            @click="deleteComposant(composant)"
          ></btn_delete>
          
          <v-dialog
              v-model="dialog"
              width="1024"
              persistent
          >
            <template v-slot:activator="{ props }">
              <!-- Bouton modifier -->
              <btn_set
                v-bind="props"
                @click="check_catts"
              ></btn_set>
            </template>

            <!-- Panneau de modification du composant -->
            <v-card                       
              class="Cp-modiForm"
              elevation="10"
            >
              <v-form
                v-model="form"
              >

                <v-file-input
                  class="ma-5"
                  @change="changeImgFile"
                  label="Pictures"
                  variant="outlined"
                  color="color_component"
                  prepend-icon="mdi-image"
                ></v-file-input>

                <v-text-field
                class="ma-5"
                clearable
                label= 'Name'
                v-model="composant.name"
                :rules= "[required]"
                variant="outlined"
                prepend-icon="mdi-rename-box"
                color="color_component"
                ></v-text-field>

                <v-text-field
                class="ma-5"
                clearable
                label= 'Description'
                v-model="composant.description"
                variant="outlined"
                prepend-icon="mdi-text-box"
                color="color_component"
                ></v-text-field>

                <v-text-field
                class="ma-5"
                label= 'Quantity'
                v-model="composant.quantity"
                :rules= "[required, nbrPositif]"
                variant="outlined"
                prepend-icon="mdi-plus-minus-variant"
                color="color_component"
                type="number"
                min="1"
                ></v-text-field>

                <v-combobox
                  v-if="kat"
                  class="ma-5"
                  v-model="cattName"
                  clearable
                  variant="outlined"
                  prepend-icon="mdi-shape"
                  color="color_component"
                  label="Category"
                  :items="store.state.catts.map(catt => catt.name)"
                ></v-combobox>
                
              </v-form>

              <v-card-actions>
                <v-btn
                  block
                  type="submit"
                  prepend-icon="mdi-content-save-edit-outline"
                  :disabled="!form"
                  @click="dialog=false, setNewCatt()"
                >Save</v-btn>
              </v-card-actions>
              
            </v-card> 
          </v-dialog>
        </div>

        <div id="category"
          v-if="composant.category"
          :style="{backgroundColor: store.getters.getCattColor(composant.category)}"
        >
          {{ store.getters.getCattName(composant.category) }}
        </div>

        <div class="Cp-btn">
          <v-btn
            class="CP-ico-btn"
            variant="tonal"
            title="less"
            icon="mdi-minus"
            size="x-small"
            rounded="sm"
            elevation="3"
            @click="composant.quantity > 0 ? composant.quantity -- : composant.quantity"
            @mouseleave="setComponentLocal(
              composant,
              composant.name,
              composant.description,
              composant.quantity,
              composant.category,
              composant.img
            )"
          ></v-btn>
          <v-btn
            class="CP-ico-btn"
            variant="tonal"
            title="more"
            icon="mdi-plus"
            size="x-small"
            rounded="sm"
            elevation="3"
            @click="composant.quantity ++"
            @mouseleave="setComponentLocal(
              composant,
              composant.name,
              composant.description,
              composant.quantity,
              composant.category,
              composant.img
            )"
          ></v-btn>
        </div>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-btn 
        block
        variant="text"
        :title="expand ? 'hideDetails' : 'showDetails'"
        :icon="expand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        density="compact"
        rounded="sm"
        @click="expand = !expand"
    ></v-btn>
  </div>
</template>
  











<script setup>

  import { computed, ref } from 'vue'
  import store from '@/store'

  import { setComponentLocal } from '@/components/ComponentFunctions/setComponent.js'
  import { deleteComponentLocal } from '@/components/ComponentFunctions/deleteComponent.js'
  import { addCategoryVuex } from "./CategoryFunctions/addCategory.js"
  import { addCategoryLocal } from "./CategoryFunctions/addCategory.js"

  import btn_set from '@/components/littleBTN/set.vue'
  import btn_delete from '@/components/littleBTN/delete.vue'

  const props = defineProps(['composant'])
  const imgDefault = '/images/chip.png'
  const expand = ref(false)
  const showDescription = ref(false)
  const dialog = ref(false)
  let kat = ref(false)
  let form = ref(false)
  let showImg = computed(() => store.state.showImg)

  let cattName = ref(store.getters.getCattName(props.composant.category))
  
  function nbrPositif(v){
    if (v <= 0){
      return 'No negative numbers'
    }
    return true
  }
  function required(v) {
    return !!v || 'Field is required'
  }

  function check_catts(){
    if(store.state.catts.length > 0){
      kat.value = true
    }
  }

  function deleteComposant (composantToDelete){
    const index = store.state.composants.findIndex(
      (composant) => composant === composantToDelete)

    if (index !== -1) {
      store.dispatch('deleteComposant', index)
      deleteComponentLocal(composantToDelete)
    }
  }



  function changeImgFile(event){
    const file = event.target.files[0]
    if (file){
      readFile(file)
    }
  }

  function readFile(file){
    const reader = new FileReader()

    reader.onload = (event) => {
      props.composant.img = event.target.result
    }
    reader.readAsDataURL(file)
  }

  function setNewCatt(){
    if(cattName.value !== null){
      let targetCatt = store.state.catts.find(catt => catt.name === cattName.value)

      props.composant.category = targetCatt.id
      setComponentLocal(          // SET Local DB
        props.composant,
        props.composant.name,
        props.composant.description,
        props.composant.quantity,
        targetCatt.id,
        props.composant.img
      )
    }
    else {
      const noCatt = store.state.catts.find(catt => catt.id === 123454321)
      if(noCatt){
        props.composant.category = 123454321
        setComponentLocal(          // SET Local DB
          props.composant,
          props.composant.name,
          props.composant.description,
          props.composant.quantity,
          123454321,
          props.composant.img
        )
      }
      else {
        addCategoryVuex(store, 123454321, 'No Category', '#546E7A')    // CREATE Vuex
        addCategoryLocal(123454321, 'No Category', '#546E7A')   // CREATE Local DB

        props.composant.category = 123454321
      }
    }
  }
    
</script>
  













<style>
  .Cp-card {
    background: linear-gradient(to bottom, #424242, #616161ad, #424242);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin: 2vh 4vw 2vh 4vw;
  }
  .Cp-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding: 0 3px 0 3px;
  }

  .Cp-imgBox {
    min-height: 50px;
  }
  
  .Cp-imgContainer {
    display: flex;
    margin: 5px;
    border-radius: 10px;
    min-width: 80px;
    min-height: 80px;
    max-width: 10vw;
    max-height: 10vw;
    overflow: hidden;
    align-items: center;
    justify-content: center;
  }
  .Cp-imgContainer img {
    border-radius: 10px;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  

  .Cp-btn_name {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  #Cp-nbr_contained {
    display: flex;
    justify-content: flex-end;
    background-color: rgb(117, 117, 117);
    margin-right:10px;
    padding: 3px;
    border-radius: 5px;
  }
  .Cp-options {
    display: flex;
    justify-content: space-between;
    padding-left: 1vw;
    padding-right: 3px;
  }
  .Cp-btn {
    display: flex;
    justify-content: space-between;
    width: 100px;
    padding: 0 10px 0 10px;
    margin: 15px 0 10px 0;
  }
  .Cp-ico-btn .v-icon{
    font-size: 25px;
  }

  #category {
    height: 30px;
    border-radius: 5px;
    margin: 15px 0 10px 0;
    padding: 3px;
  }
  .Cp-modiForm{
    background: linear-gradient(to bottom left, #616161, #BDBDBD, #616161);
  }
</style>
  