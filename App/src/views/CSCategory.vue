<template>
  <div>
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

      <!-- Btn done -->
      <template v-slot:append>
        <Btn_done v-if="form" type="submit" @click="pushCategory"></Btn_done>
      </template>
    </v-app-bar>

    <div class="img_font">
      <img :src="imgPath" alt="background_img" width="4000" height="4575" />
    </div>
    
    <div class="Cat-formulaire">
      <v-form v-model="form">
        <v-text-field
          class="mb-3"
          v-model="name"
          :rules="[required, unicName, longName]"
          clearable
          color="color_catt"
          :label="t.labelName"
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
import { ref, onMounted, onBeforeUnmount } from "vue";

import Btn_done from "@/components/bigBTN/done.vue";
import Btn_cancel from "@/components/bigBTN/cancel.vue";

import { useStore } from "vuex";
const store = useStore();
import { getTranslate } from '@/multilanguage/lang.js' 
const t = getTranslate()

import { useRouter } from "vue-router";
const router = useRouter();

// VARIABLES
const form = ref(false);
const imgPath = "/images/bgNew.webp";

const category = ref(null);
const name = ref(null);
let colorToPick = ref("#2E7D32");

// SELECT MODE
const create = ref(true);

function selectMode() {
  create.value = !store.state.categoryToSet;
  category.value = store.state.categoryToSet;
  if (!create.value) {
    // <<< Set mode
    name.value = category.value.name;
    colorToPick.value = category.value.color;
  }
}

// Check input fields
function required(v) {
  return !!v || t.requireMsg;
}

function unicName(v) {
  if (create.value) {
    // Create mode
    const cattExist = store.state.catts.some((catt) => catt.name === v);
    if (cattExist) {
      return t.nameAlreadyExists;
    }
    return true;
  } else {
    // Set mode
    const allCattNames = store.state.catts.map((catt) => catt.name);
    const filteredNames = allCattNames.filter((name) => name === v);
    if (filteredNames.length > 1) {
      return t.nameAlreadyExists;
    }
    return true;
  }
}

function longName(v) {
  if (v.length > 50) {
    return t.max50;
  }
  return true;
}

// ADD or SET category
import { addCategory } from "@/components/CategoryFunctions/addCategory.js";
import { setCategory } from "@/components/CategoryFunctions/setCategory.js";

function pushCategory() {
  if (create.value) {
    // Create mode
    addCategory(store, Date.now(), name.value, colorToPick.value, true);
  } else {
    // Set mode
    setCategory(store, category.value.id, name.value, colorToPick.value);
  }

  router.push("/");
}

// Keyboard shortcut
function shortcut(event) {
  switch (event.key) {
    case "Escape":
      window.removeEventListener("keydown", shortcut);
      router.push("/");
      break;

    case "Enter":
      if (form.value === true) {
        pushCategory();
        window.removeEventListener("keydown", shortcut);
        router.push("/");
        break;
      }
  }
}

onMounted(() => {
  window.addEventListener("keydown", shortcut, {passive: true});
  selectMode();
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", shortcut);
  store.dispatch("setCategoryToSet", null);
});
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

  border-radius: 20px;

  background: linear-gradient(to bottom left, #616161, #bdbdbd, #616161);
  box-shadow: 0px 0px 30px 0px rgb(0, 0, 0, 0.2);

  z-index: 2;
}
</style>
