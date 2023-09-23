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

    <div class="Cp-formulaire">
      <v-form v-model="form">
        <!-- Image choice -->
        <div class="btn-container"
          >
          <v-icon icon="mdi-image" color="#424242"></v-icon>
          <!-- Local -->
          <v-btn                                  
            class="btn_add_img"
            title="addLocalIcon"
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
                title="addFlaticon"
                variant="tonal" 
                rounded="lg"
                icon="mdi-download"
                @click="store.dispatch('setFlatForm', true)"
                ></v-btn>
            </template>
            <Flaticon v-if="flatForm"></Flaticon>
          </v-dialog>
          

          <h5>{{ imgName }}</h5>
        </div>

        

        <!-- Name field -->
        <v-text-field
          v-model="name"
          :rules="[required]"
          clearable
          color="color_component"
          label="Name"
          variant="outlined"
          prepend-icon="mdi-rename-box"
        ></v-text-field>

        <!-- Description field -->
        <v-text-field
          v-model="description"
          clearable
          color="color_component"
          label="Description"
          variant="outlined"
          prepend-icon="mdi-text-box"
        ></v-text-field>

        <!-- Quantity field -->
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

        <!-- Category field -->
        <v-combobox
          v-if="kat"
          v-model="category"
          :rules="[cattExist]"
          clearable
          variant="outlined"
          prepend-icon="mdi-shape"
          color="color_component"
          label="Category"
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
import { useRouter } from "vue-router";
const router = useRouter();

import Btn_done from "@/components/bigBTN/done.vue";
import Btn_cancel from "@/components/bigBTN/cancel.vue";
import Flaticon from '@/components/Flaticon/Flaticon.vue';
let flatForm = computed(()=> store.state.flatForm);

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
  return !!v || "Field is required";
}

function nbrPositif(v) {
  if (v <= 0) {
    return "No negative numbers";
  }
  return true;
}

const listCattName = store.state.catts.map((catt) => catt.name);
function cattExist(v) {
  if (listCattName.includes(v) || v === null) {
    return true;
  } else {
    return "Unknown category";
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
      addCategory(store, 123454321, "No Category", "#546E7A", true);
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
  selectMode();
  checkCatts();
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", shortcut);
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

.Cp-formulaire {
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
}

h5 {
  margin-left: 20px;
}
</style>
