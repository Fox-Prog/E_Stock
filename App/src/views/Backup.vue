<template>
    <v-app-bar
      app
      style="background: linear-gradient(to top right, #212121, #263238)"
      location="bottom"
    >
      <!-- Btn cancel -->
      <template v-slot:prepend>
        <router-link to="/" style="text-decoration: none">
          <Btn_cancel></Btn_cancel>
        </router-link>
      </template>
    </v-app-bar>

    <div class="img_font">
      <img :src="imgPath" alt="background_img" />
    </div>

    <v-card class="bc_form">
        <div class="btn">
            <button class="btn_up_down" :disabled="errBackup" @click="createBackup">
                <h3>Save</h3>
                <img src="/images/save.png" alt="Do Backup" title="Do Backup">
            </button>
            <button class="btn_up_down" :disabled="errBackup" @click="restoreBackup">
                <h3>Restore</h3>
                <img src="/images/restore.png" alt="Restored Backup" title="Restored Backup">
            </button>
        </div>
    </v-card>

    <v-card class="error_form" v-if="errBackup">
      <div id="error">
        <v-icon
          class="mr-2"
          size="35"
          icon="mdi-alert-circle-outline"
        ></v-icon>
        <h2>Backup error</h2>
        <v-btn
          class="ms-2"
          variant="tonal"
          rounded="lg"
          title="Details error"
          @click="showError = !showError"
        >Details</v-btn>
      </div>

      <div id="details" v-if="showError">
        <p>{{ detailsError }}</p>
      </div>
    </v-card>
</template>









<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex'
const store = useStore()

import Btn_cancel from '@/components/bigBTN/cancel.vue'

const imgPath = "/images/bgBackup.png"
let errBackup = ref(false)
let showError = ref(false)
let detailsError = ref("")

// Create backup
async function createBackup(){
  try{
    // Backup json
    const JSONfile = {
      components: store.state.composants,
      category: store.state.catts
    }
    const jsonStr = JSON.stringify(JSONfile);

    // Get date for name
    const now = new Date()
    const day = now.getDate().toString().padStart(2, '0')
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const year = now.getFullYear().toString()
    const nameFile = `Backup_E-Stock_${day}/${month}/${year}`

    // Downloading
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = nameFile;
    a.click()
  
  } catch(error){
    errBackup.value = true
    detailsError.value = error
    console.log(error)
  }
}




// Restore backup
import { deleteCategory } from "@/components/CategoryFunctions/deleteCategory.js"
import { deleteComponent } from "@/components/ComponentFunctions/deleteComponent.js"

import { addCategory } from "@/components/CategoryFunctions/addCategory.js"
import { addComponent } from "@/components/ComponentFunctions/addComponent.js"

async function restoreBackup(){
  try{
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = ".json";

    inputElement.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        if (file.type.includes("application/json")) {
          const reader = new FileReader()

          reader.onload = (event) => {
            const backup = JSON.parse(event.target.result);

            // Reset store + indexedDB
            const components = store.state.composants
            for(let c=0; c<components.length; c++){
              console.log(components[c]);
              deleteComponent(store, components[c])
            }

            const catts = store.state.catts
            for(let c=0; c<catts.length; c++){
              console.log(catts[c]);
              deleteCategory(store, catts[c])
            }

            // const catts = backup.category
            // const components = backup.components
            // for(let c in catts){
            //   const category = catts[c]
            //   addCategory(store, category.id, category.name, category.color, true)
            // }

            // for(let c in components){
            //   const component = components[c]
            //   addComponent(store, component.id, component.name, component.description, component.quantity, component.category, component.imgName, component.imgBody, true)
            // }
          }
          reader.readAsText(file);
        }
      }
    })
    inputElement.click();
  
  } catch(error){
    errBackup.value = true
    detailsError.value = error
    console.log(error)
  }
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

.bc_form {
  position: relative;
  margin-left: 10vw;
  margin-right: 10vw;
  margin-top: 20vh;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;

  border-radius: 20px;
  align-items: center;

  background-color: #212121db; 

  z-index: 2;
}
.error_form {
  position: relative;
  margin-left: 10vw;
  margin-right: 10vw;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;

  border-radius: 20px;
  align-items: center;

  background: linear-gradient(to bottom right, #af0b05e2, #cf560ae7);

  z-index: 2;
}
#error {
  display: flex;
  justify-content: center;
  justify-items: center;

}
#details {
  background-color: #07070727;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
}


.btn {
    display: flex;
    width: 100%;
    justify-content: space-around;
}

.btn_up_down {
    text-align: center;
    padding: 10px;
    margin: 10px;
    background-color: rgba(255, 255, 255, 0.51);
    border-radius: 10px;
    overflow: hidden;
    max-width: 250px;
    min-width: 80px;
}
.btn_up_down img {
    width: 100%;
}

.btn_up_down:hover {
    background-color: rgba(255, 255, 255, 0.715);
    box-shadow: 0px 0px 3px 0px rgb(251 250 250);
    transform: translateY(-5px);
}

h3 {
  color: black;
  margin-bottom: 10px;
}


    

</style>