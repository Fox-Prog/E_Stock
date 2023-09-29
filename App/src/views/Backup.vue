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
                <h3>{{ t.ctBtn_Save }}</h3>
                <img src="/images/save.png" alt="Do Backup" :title="t.ttBtn_GoBackup">
            </button>
            <button class="btn_up_down" :disabled="errBackup" @click="backupFile=null, restoreForm = true">
                <h3>{{ t.ctBtn_Restore }}</h3>
                <img src="/images/restore.png" alt="Restored Backup" :title="t.ttBtn_RestoreBackup">
            </button>
        </div>
        <!-- Restore options -->
        <div class="restoreForm" v-if="restoreForm">
          <v-form v-model="form" :disabled="errBackup">
            <!-- Backup src -->
            <v-file-input
              v-model="backupFile"
              variant="outlined"
              prepend-icon="mdi-file-code-outline"
              accept=".json"
              clearable
              :label="t.labelBackupFileInput"
            ></v-file-input>
            <!-- Alert Msg Backup options -->
            <div style="display: flex;" v-if="warning">
              <v-icon
                class="mr-4"
                icon="mdi-alert"
                color="#B71C1C"
                size="25"
              ></v-icon>
              <v-banner
                class="mb-2"
                rounded="lg"
                style="
                  padding: 5px; 
                  margin: 0;
                  text-align: center;
                  background: linear-gradient(to bottom right, #af0b05e2, #cf560ae7);
                "
              >
                <h3>{{ t.h3_warningBackup }}</h3>
                <h4>{{ t.h4_msgBackup }}</h4>
              </v-banner>
            </div>
            <!-- Backup options -->
            <v-select
              v-model="backupOptions"
              prepend-icon="mdi-cog"
              variant="outlined"
              :items="options"
            ></v-select>
            <!-- Go backup -->
            <div
              style="
                display: flex;
                justify-content: space-between;  
              "
            >
              <v-btn
                :title="t.ttBtn_StartBackup"
                color="green"
                :disabled="!form || errBackup"
                variant="elevated"
                rounded="lg"
                icon="mdi-check"
                 @click="restoreBackup"
              ></v-btn>
              <v-btn
                :title="t.ttBtn_CancelBackup"
                color="red"
                variant="elevated"
                rounded="lg"
                icon="mdi-close"
                 @click="restoreForm = false, resetError()"
              ></v-btn>
            </div>
          </v-form>
        </div>
    </v-card>

    <v-card class="error_form" v-if="errBackup">
      <div id="error">
        <v-icon
          class="mr-2"
          size="35"
          icon="mdi-alert-circle-outline"
        ></v-icon>
        <h2>{{ t.h2_BackupError }}</h2>
        <v-btn
          class="ms-2"
          :title="t.ttBtn_ShowErrorDetails"
          variant="tonal"
          rounded="lg"
          @click="showError = !showError"
        >{{ t.ctBtn_ShowErrorDetails }}</v-btn>
      </div>

      <div id="details" v-if="showError">
        <p>{{ detailsError }}</p>
      </div>
    </v-card>
</template>









<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const t = computed(() => store.state.lg)

import { useRouter } from 'vue-router'
const router = useRouter()

import Btn_cancel from '@/components/bigBTN/cancel.vue'

const imgPath = "/images/bgBackup.jpg"

let errBackup = ref(false)
let showError = ref(false)
let detailsError = ref("")
function resetError(){
  errBackup.value = false
  showError.value = false
  detailsError.value = ""
}


let restoreForm = ref(false)
const options = ["Added changes only", "Reset all before backup"]
let backupFile = ref(null)
let backupOptions = ref("Reset all before backup")
let form = computed(()=> {
  try{
    if(!backupFile.value){
      return false
    } else if(backupFile.value[0].type === "application/json"){
      return true    
    }
  } catch(err){
    console.log(err)
  }
})

let warning = computed(()=>{
  if(backupOptions.value === "Reset all before backup"){
    return true
  }
  return false
})




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
import { resetAllCategory } from "@/components/CategoryFunctions/deleteCategory.js"
import { resetAllComponents } from "@/components/ComponentFunctions/deleteComponent.js"

import { addCategory } from "@/components/CategoryFunctions/addCategory.js"
import { addComponent } from "@/components/ComponentFunctions/addComponent.js"

async function restoreBackup(){
  try{
    const file = backupFile.value[0]
    if (file) {
      if (file.type.includes("application/json")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const backup = JSON.parse(event.target.result);

          // Options restore changed only
          if(backupOptions.value === "Added changes only"){
            // Load backup
            const cattsApp = store.state.catts
            let vuex = cattsApp.map(c => c.id)

            const catts = backup.category
            for(let c in catts){
              const category = catts[c]
              if(!vuex.includes(category.id)){
                addCategory(store, category.id, category.name, category.color, true)
              }
            }
            const componentsApp = store.state.composants
            vuex = componentsApp.map(c => c.id)
            const components = backup.components
            for(let c in components){
              const component = components[c]
              if(!vuex.includes(component.id)){
                addComponent(store, component.id, component.name, component.description, component.quantity, component.category, component.imgName, component.imgBody, true)
              }
            }

          // Options reset and restore
          } else if (backupOptions.value === "Reset all before backup"){

            // Reset store + indexedDB
            store.dispatch('resetAll')
            resetAllComponents()
            resetAllCategory()

            // Load backup
            const catts = backup.category
            const components = backup.components
            for(let c in catts){
              const category = catts[c]
              addCategory(store, category.id, category.name, category.color, true)
            }

            for(let c in components){
              const component = components[c]
              addComponent(store, component.id, component.name, component.description, component.quantity, component.category, component.imgName, component.imgBody, true)
            }
          }
        }
        reader.readAsText(file);
      }
      router.push('/')

    } else {
      errBackup.value = true
      detailsError.value = "Error with backup file.json"
    }
  
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
  margin-left: 8vw;
  margin-right: 8vw;
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
  margin-left: 8vw;
  margin-right: 8vw;
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
    background: linear-gradient(to bottom left, #616161, #8e8b8b, #616161);
    border-radius: 10px;
    overflow: hidden;
    max-width: 250px;
    min-width: 80px;
}
.btn_up_down img {
    width: 100%;
}
@media screen and (max-width: 500px) {
  .btn_up_down h3 {
    font-size: 10px;
  }
}

.btn_up_down:hover {
  background: linear-gradient(to bottom left, #616161, #b7b5b5, #616161);
  box-shadow: 0px 0px 3px 0px rgb(251 250 250);
  transform: translateY(-5px);
}

h3 {
  color: black;
  margin-bottom: 15px;
}


.restoreForm {
  margin-top: 15px;
  padding: 20px;
  width: 100%;
  border-radius: 20px;
  background: linear-gradient(to bottom left, #616161, #8e8b8b, #616161);
}

.ajust-h3 {
  font-size: 0.8rem;
}

    

</style>