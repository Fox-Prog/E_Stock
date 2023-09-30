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
        <Btn_done v-if="form" type="submit" @click="pushComponent()"></Btn_done>
      </template>
    </v-app-bar>

    <div class="img_font">
      <img :src="imgPath" alt="background_img" />
    </div>

    <div class="Cp-form">
      <v-form v-model="form">
        <!-- Image choice -->
        <div class="btn-container"
          >
          <v-icon icon="mdi-image" color="#424242"></v-icon>
          <!-- Local -->
          <v-btn                                  
            class="btn_add_img"
            :title="t.ttBtn_AddLocalIcon"
            variant="tonal"
            rounded="lg"
            icon="mdi-folder-image"
            @click="openExFile"
            ></v-btn
          >
          <!-- Icons -->
          <v-dialog v-model="flatForm">
            <template v-slot:activator="{ props }">
              <v-btn 
                v-bind="props"
                class="btn_add_img" 
                :title="t.ttBtn_DownLoadIcon"
                variant="tonal" 
                rounded="lg"
                icon="mdi-download"
                @click="store.dispatch('setFlatForm', true)"
                ></v-btn>
            </template>
            <Flaticon v-if="flatForm"></Flaticon>
          </v-dialog>
          
           <!-- Recent -->
           <v-dialog v-model="recentForm">
            <template v-slot:activator="{ props }">
              <v-btn 
                v-if="floatBtn"
                v-bind="props"
                class="btn_history" 
                :title="t.ttBtn_RecentIcons"
                elevation="10"
                color="#9f9f9f"
                icon="mdi-history"
                @click="store.dispatch('setRecentForm', true)"
                ></v-btn>

                <v-btn 
                v-if="!floatBtn"
                v-bind="props"
                class="btn_add_img" 
                :title="t.ttBtn_RecentIcons"
                variant="tonal" 
                rounded="lg"
                icon="mdi-history"
                @click="store.dispatch('setRecentForm', true)"
                ></v-btn>
            </template>
            <recentIcons v-if="recentForm"></recentIcons >
          </v-dialog>

          <h5>{{ imgName }}</h5>
        </div>

        

        <!-- Name field -->
        <v-text-field
          v-model="name"
          :rules="[required, longName]"
          clearable
          color="color_component"
          :label="t.labelName"
          variant="outlined"
          prepend-icon="mdi-rename-box"
        ></v-text-field>

        <!-- Description field -->
        <v-text-field
          v-model="description"
          clearable
          color="color_component"
          :label="t.labelDescription"
          variant="outlined"
          prepend-icon="mdi-text-box"
        ></v-text-field>

        <!-- Quantity field -->
        <v-text-field
          v-model="quantity"
          :rules="[required, nbrPositif]"
          color="color_component"
          :label="t.labelQuantity"
          variant="outlined"
          prepend-icon="mdi-plus-minus-variant"
          type="number"
          min="1"
        ></v-text-field>

        <!-- Category field -->
        <v-combobox
          v-if="kat"
          v-model="category"
          :rules="[cattExist]"
          clearable
          variant="outlined"
          prepend-icon="mdi-shape"
          color="color_component"
          :label="t.labelCategory"
          :items="listCattName"
        ></v-combobox>
      </v-form>
    </div>
  </div>
</template>











<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const t = computed(() => store.state.lg)

import { useRouter } from "vue-router";
const router = useRouter();

import Btn_done from "@/components/bigBTN/done.vue";
import Btn_cancel from "@/components/bigBTN/cancel.vue";
import Flaticon from '@/components/Flaticon/Flaticon.vue';
let flatForm = computed(()=> store.state.flatForm);

import recentIcons from '@/components/Flaticon/recentIcons.vue';
let recentForm = computed(() => store.state.recentForm);

// VARIABLES
let form = ref(false);

const component = ref(null);
let name = ref(null);
let description = ref(null);
let quantity = ref(null);
let category = ref(store.state.preCatt);
let imgName = computed(()=> store.state.imgName);
let imgBody = computed(()=> store.state.imgBody);

let kat = ref(false);

let floatBtn = ref(false)
function updateFloatBtn(){
  const screenWidth = window.innerWidth
  floatBtn.value = screenWidth < 500 ? true : false
}

const imgPath = "/images/bgNew.jpg";

function checkCatts() {
  if (store.state.catts.length > 0) {
    kat.value = true;
  }
}

// SELECT MODE
const create = ref(true);

function selectMode() {
  create.value = !store.state.componentToSet;
  component.value = store.state.componentToSet;
  if (!create.value) {
    // <<< Set mode
    name.value = component.value.name;
    description.value = component.value.description;
    quantity.value = component.value.quantity;
    category.value = store.state.catts.find(
      (catt) => catt.id === component.value.category
    ).name;

    let imgFile = {
      name: component.value.imgName,
      body: component.value.imgBody
    }
    store.dispatch('setImg', imgFile)
  }
}

// Check input fields
function required(v) {
  return !!v || t.value.requireMsg;
}

function nbrPositif(v) {
  if (v <= 0) {
    return t.value.noNegativeNumber;
  }
  return true;
}

function longName(v) {
  if (v.length > 13) {
    return t.value.max13;
  }
  return true;
}

const listCattName = store.state.catts.map((catt) => catt.name);
function cattExist(v) {
  if (listCattName.includes(v) || v === null) {
    return true;
  } else {
    return t.value.unknownCategory;
  }
}

// Charge image local
function openExFile() {
  const inputElement = document.createElement("input");
  inputElement.type = "file";
  inputElement.accept = "image/*";

  inputElement.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.includes("image/")) {
        readFile(file);
      }
    }
  });

  inputElement.click();

  function readFile(file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      let imgFile = {
        name: file.name,
        body: event.target.result
      }
      store.dispatch('setImg', imgFile)
    };
    reader.readAsDataURL(file);
  }
}

// ADD or SET component
import { addComponent } from "@/components/ComponentFunctions/addComponent.js";
import { addCategory } from "@/components/CategoryFunctions/addCategory.js";
import { setComponent } from "@/components/ComponentFunctions/setComponent.js";

function pushComponent() {
  // Check categorie
  if (kat.value && category.value !== null) {
    let targetCatt = store.state.catts.find(
      (catt) => catt.name === category.value
    );
    category = targetCatt.id;
  } else if (category.value === null) {
    const noCatt = store.state.catts.find((catt) => catt.id === 123454321);
    if (noCatt) {
      category = noCatt.id;
    } else {
      addCategory(store, 123454321, 'No category', "#546E7A", true);
      category = 123454321;
    }
  }

  if (create.value) {
    // Create mode
    addComponent(
      store,
      Date.now(),
      name.value,
      description.value,
      quantity.value,
      category,
      imgName.value,
      imgBody.value,
      true
    );
  } else {
    // Set mode
    setComponent(
      store,
      component.value.id,
      name.value,
      description.value,
      quantity.value,
      category,
      imgName.value,
      imgBody.value
    );
  }

  router.push("/");
}

// Keyboard shortcut
function shortcut(event) {
  switch (event.key) {
    case "Escape":
      if(!flatForm.value){
        window.removeEventListener("keydown", shortcut);
        router.push("/");
        break;
      } else {
        store.dispatch('setFlatForm', false);
        break;
      }

    case "Enter":
      if (form.value === true && !flatForm.value) {
        pushComponent();
        window.removeEventListener("keydown", shortcut);
        router.push("/");
        break;
      }
  }
}

onMounted(() => {
  window.addEventListener("keydown", shortcut);
  window.addEventListener('resize', updateFloatBtn);
  updateFloatBtn();
  selectMode();
  checkCatts();
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", shortcut);
  window.removeEventListener('resize', updateFloatBtn)
  store.dispatch("setComponentToSet", null);
  store.dispatch("setPreCatt", null);
  let imgFile = {
    name: "Chip",
    body: "/images/chip.png"
  }
  store.dispatch("setImg", imgFile)
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

.Cp-form {
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

.btn-container {
  display: flex; 
  margin-bottom: 20px; 
  align-items: center;
  overflow: hidden;
}


.btn_add_img {
  margin-left: 15px;
}
.btn_add_img .v-icon {
  color: #424242;
  font-size: 25px;
}

.btn_history {  
  position: absolute;
  top: -25px;
  right: -25px;
}
.btn_history .v-icon {
  color: #424242;
  font-size: 25px;
}

h5 {
  margin-left: 20px;
}
</style>
