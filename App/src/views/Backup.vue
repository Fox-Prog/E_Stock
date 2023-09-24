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

    <v-card class="bc_formulaire">
        <div class="btn">
            <button class="btn_up_down" @click="openExFile">
                <h3>Save</h3>
                <img src="/images/save.png" alt="Do Backup" title="Do Backup">
            </button>
            <button class="btn_up_down">
                <h3>Restore</h3>
                <img src="/images/restore.png" alt="Restored Backup" title="Restored Backup">
            </button>
        </div>
    </v-card>

</template>









<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex'
const store = useStore()

import Btn_cancel from '@/components/bigBTN/cancel.vue'
import { backup } from '@/components/backup/backup.js'

const imgPath = "/images/bgBackup.png"

function openExFile() {
  const inputElement = document.createElement("input");
  inputElement.type = "file";
  inputElement.setAttribute("webkitdirectory", true);
  inputElement.setAttribute("directory", true);
  inputElement.multiple = false;

  inputElement.addEventListener("change", (event) => {
    const selectedFolder = event.target.files[0];

    if(selectedFolder){
      const folderPath = selectedFolder.path
      console.log("Dossier sélectionné :", selectedFolder);
      console.log("Chemin :", folderPath);
    }
  });

  inputElement.click();
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

.bc_formulaire {
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