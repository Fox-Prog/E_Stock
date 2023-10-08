<template>
  <v-navigation-drawer
    class="pt-5"
    v-model="drawer"
    app
    style="background: linear-gradient(to top left, #212121, #37474f, #212121)"
    elevation="20"
  >
    <v-text-field
      v-model="inputSearch"
      @input="updateSearchValue"
      @focus="resetSearchValue"
      clearable
      class="ma-5 ic_search"
      :label= "t.labelSearch"
      :title="t.tt_SearchBar"
      prepend-icon="mdi-magnify"
      variant="outlined"
      color="#78909C"
    ></v-text-field>

    <v-divider class="my-5" thickness="5"></v-divider>

    <v-list density="comfortable" role="group" nav>
      <h3>{{ t.h3_DisplayBtn }}</h3>
      <v-btn
      :disabled="selector"
        class="ma-5 btn_catt btn_drawer"
        icon="mdi-shape"
        variant="flat"
        :title="t.ttBtn_ShowCatt"
        @click="displayCatts"
      ></v-btn>
      <v-btn
        class="ma-5 btn_component btn_drawer"
        icon="mdi-all-inclusive"
        variant="flat"
        :title="t.ttBtn_ShowComp"
        @click="displayComposants"
      ></v-btn>

      <h3>{{ t.h3_ShowIcons }}</h3>
      <v-btn
        class="ma-5 btn_showImg btn_drawer"
        :icon="showImg ? 'mdi-image' : 'mdi-image-off'"
        variant="flat"
        :title="showImg ? t.ttBtn_HideIcons : t.ttBtn_ShowIcons"
        @click="toggleShowImg"
      >
        <v-icon :style="{ color: showImg ? '#FF6F00' : '#BF360C'}"></v-icon>
      </v-btn>

      <v-btn
        class="ma-5 btn_displayGrid btn_drawer"
        :icon="displayGrid ? 'mdi-view-headline' : 'mdi-view-grid-outline'"
        variant="flat"
        :title="displayGrid ? t.ttBtn_DisplayRows : t.ttBtn_DisplayGrid"
        @click="toggleDisplayGrid"
      ></v-btn>

      <h3>{{ t.h3_Sort }}</h3>
      <v-btn
        class="ma-5 btn_alphaSort btn_drawer"
        :icon="
          sortToAlpha
            ? 'mdi-order-alphabetical-descending'
            : 'mdi-order-alphabetical-ascending'
        "
        variant="flat"
        :title="sortToAlpha ? 'Z-A' : 'A-Z'"
        @click="alphaSort"
      ></v-btn>
      <v-btn
        class="ma-5 btn_recentlySort btn_drawer"
        :icon="
          sortToRecently
            ? 'mdi-sort-calendar-ascending'
            : 'mdi-sort-calendar-descending'
        "
        variant="flat"
        :title="sortToRecently ? t.ttBtn_SortLessRecent : t.ttBtn_SortMostRecent"
        @click="recentSort"
      ></v-btn>
      <v-btn
        class="ma-5 btn_recentlySort btn_drawer"
        :icon="
          sortToNumber
            ? 'mdi-sort-numeric-ascending'
            : 'mdi-sort-numeric-descending'
        "
        variant="flat"
        :title="sortToNumber ? t.ttBtn_SortLittle : t.ttBtn_SortMany"
        @click="numberSort"
      ></v-btn>

      <h3 v-if="showComposant">{{ t.h3_selectMode }}</h3>
      <div v-if="showComposant" style="display: flex; align-items: center;">
        <v-btn
          class="ma-5 btn_multiSelect btn_drawer"
          :icon="
            selector
              ? 'mdi-check-all'
              : 'mdi-check-all'
          "
          variant="flat"
          :title="selector ? t.ttBtn_Disable : t.ttBtn_Enable"
          @click="initMultiSelect"
        >
          <v-icon :style="{ color: selector ? '#558B2F' : '#D50000' }"></v-icon>
        </v-btn>

        <div style="
          padding: 5px;
          border-radius: 5px;
          background-color: rgba(102, 102, 102, 0.492);
        ">
          <p
            :style="{ color: selector ? '#558B2F' : '#D50000' }"
          >{{ selector ? t.ttBtn_Enable : t.ttBtn_Disable }}</p>
        </div>
      </div>








      <v-divider class="my-5" thickness="5"></v-divider>

      <div
        style="
          display: flex;
          align-items: center;
          justify-items: center;
        "
      >
        <h3 style="margin: 0;">{{ t.h3_Backup }}</h3>
        <v-icon
          class="mx-2"
          icon="mdi-cog"
          color="#212121"
          size="20"
        ></v-icon>
      </div>
      <v-btn
        class="ma-5 btn_bc btn_drawer"
        icon="mdi-harddisk"
        variant="flat"
        :title="t.h3_Backup"
        @click="router.push('/Backup')"
      ></v-btn>

      <v-divider class="my-5" thickness="5"></v-divider>

      <v-btn
        rounded="lg"
        variant="outlined"
        color="#78909C"
        block
        style="margin-bottom: 20px;"
        @click="router.push('/Settings')"
      >{{ t.ctBtn_Settings }}</v-btn>

    </v-list>
  </v-navigation-drawer>

  <div :class="showCategory ? 'backSpaceCatt' : 'backSpaceComponent'">
    <v-btn
    :disabled="selector"
      class="ma-1"
      style="font-size: 20px"
      variant="tonal"
      :title="showCategory ? t.ttBtn_ShowComp : t.ttBtn_ShowCatt"
      :icon="showCategory ? 'mdi-chevron-right' : 'mdi-chevron-left'"
      @click="
        showCategory
          ? store.dispatch('setSwipe', 'S_left')
          : store.dispatch('setSwipe', 'S_right')
      "
    ></v-btn>

    <div 
      class="catt-select" 
      v-if="selectedCatt && !selector"
      :style="{
        backgroundColor: store.getters.getCattColor(selectedCatt.id),
      }"
      ><h3>{{ selectedCatt.name }}</h3></div>

      <div
        class="catt-select" 
        style="background-color: rgba(150, 150, 150, 0.5); border-radius: 5px;"
        v-if="selector"
      >
        <v-btn
          class="mr-10"
          icon="mdi-close"
          color="red"
          variant="text"
          rounded="sm"
          size="sm"
          @click="initMultiSelect"
        ></v-btn>
        <h3>{{ `${countSelected} ${t.selectedCount}` }}</h3>
      </div>
  </div>

  <div class="empty"
    v-if="
      (showCategory && nbrCatt === 0) || (showComposant && nbrComposant === 0)
    "
  >
    <img :src="img_empty" alt="img_empty" width="512" height="512" />
    <h2 v-if="showCategory" style="color: rgb(177, 199, 226)">{{ t.noCatt }}</h2>
    <h2 v-if="showCategory" style="color: rgb(177, 199, 226)">{{ t.createFirstCatt }}</h2>

    <h2 v-if="showComposant" style="color: rgb(177, 199, 226)">{{ t.noComp }}</h2>
    <h2 v-if="showComposant" style="color: rgb(177, 199, 226)">{{ t.createFirstComp }}</h2>
  </div>

  <div class="grid-components" v-if="showComposant && displayGrid">
    <ComposantGrid
      v-for="composant in filteredComposants"
      :key="composant.id"
      :composant="composant"
      :selector="selector"
      :componentsList="componentsList"
    />
  </div>

  <div v-if="showComposant && !displayGrid">
    <Composant
      v-for="composant in filteredComposants"
      :key="composant.id"
      :composant="composant"
      :selector="selector"
      :componentsList="componentsList"
    />
  </div>

  <div class="catts_container" v-if="showCategory">
    <Category 
      v-for="catt in filteredCatts" 
      :key="catt.id" 
      :catt="catt" 
    />
  </div>

  <div class="catts_container_noCatt" v-if="showCategory && noCattContent">
    <Category 
      v-for="catt in noCatt" 
      :key="catt.id" 
      :catt="catt" 
    />
  </div>

  <v-app-bar
    app
    :style="
      showCategory ?
       'background: linear-gradient(to left, #37474F, #212121);'
        : 'background: linear-gradient(to left, #212121, #37474F);'
    "
    location="bottom"
  >
    <template v-slot:prepend>
      <Btn_menu @click="drawer = !drawer"></Btn_menu>
    </template>

    <router-link to="/CSComponent" style="text-decoration: none">
      <addCpBtn
        v-if="selectedCatt && !selector"
        style="font-size: 22px"
        @click="store.dispatch('setPreCatt', selectedCatt.name)"
      ></addCpBtn>
    </router-link>

    <!-- Delete all selections -->
    <v-dialog v-model="ckeckDelete" width="1024" persistent>

      <template v-slot:activator="{ props }">
        <!-- DELETE -->
        <BtnDeleteAll
          v-if="selector && componentsList.length > 0"
          v-bind="props"
          style="
            position: absolute;
            left: 50%;
            transform: translate(-50%);
          "
        ></BtnDeleteAll>
      </template>

      <!-- Check delete -->
      <v-card
        style="
          background: linear-gradient(
            to bottom,
            #424242,
            #616161,
            #424242
          );
          border-radius: 5px;
          width: 300px;
          margin-left: 50%;
          transform: translateX(-50%);
        "
      >
        <v-card-title style="text-align: center"
          >{{ t.textConfirmDeleteAll }}</v-card-title
        >
        <div
          style="
            display: flex;
            justify-content: center;
            padding: 4px;
            margin-top: 10px;
          "
        >
          <v-btn
            variant="text"
            style="width: 49%"
            @click="deleteAll(), (ckeckDelete = false)"
            >{{ t.ctBtn_DeleteYes }}</v-btn
          >
          <v-btn
            variant="text"
            style="width: 49%"
            @click="ckeckDelete = false"
            >{{ t.ctBtn_DeleteNo }}</v-btn
          >
        </div>
      </v-card>
    </v-dialog>

    <template v-slot:append>
      <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <Btn_new v-if="!selector" v-bind="props"></Btn_new>
        </template>

        <v-list
          style="
            padding-left: 10px;
            background: linear-gradient(to top left, #212121, #37474f, #212121);
            border-radius: 20px;
          "
          elevation="20"
        >
          <div>
            <div class="addChoice">
              <v-icon
                icon="mdi-shape-plus"
                size="40px"
                color="color_catt"
              ></v-icon>
              <router-link to="/CSCategory" style="text-decoration: none">
                <v-btn
                  class="btnChoice"
                  :title="t.ttBtn_CreateCatt"
                  style="
                    color: black;
                    background: linear-gradient(to top right, #1b5e20, #2e7d32);
                  "
                  >{{ t.ctBtn_CreateCatt }}</v-btn
                >
              </router-link>
            </div>

            <div class="addChoice">
              <v-icon
                icon="mdi-memory"
                size="40px"
                color="color_component"
              ></v-icon>
              <router-link to="/CSComponent" style="text-decoration: none">
                <v-btn
                  class="btnChoice"
                  :title="t.ttBtn_CreateComp"
                  style="
                    color: black;
                    background: linear-gradient(to top right, #01579b, #039be5);
                  "
                  >{{ t.ctBtn_CreateComp }}</v-btn
                >
              </router-link>
            </div>
          </div>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>











<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue"
import { useStore } from "vuex"
const store = useStore()
import { getTranslate } from '@/multilanguage/lang.js' 
const t = getTranslate()

import Btn_new from "@/components/bigBTN/new.vue";
import Btn_menu from "@/components/bigBTN/menu.vue";
import Composant from "@/components/Composant.vue";
import ComposantGrid from '@/components/ComposantGrid.vue';
import Category from "@/components/Category.vue";
import addCpBtn from "@/components/littleBTN/addCpBtn.vue";
import BtnDeleteAll from '@/components/bigBTN/deleteAll.vue';

const img_empty = "/images/empty.webp";

const drawer = ref(false);

const composants = computed(() => store.state.composants);
const catts = computed(() => store.state.catts);

let nbrCatt = computed(() => {
  return catts.value.length;
});
let nbrComposant = computed(() => {
  return composants.value.length;
});

let selectedCatt = computed(() => store.state.selectedCatt);
let showComposant = computed(() => store.state.showComposant);
let showCategory = computed(() => store.state.showCategory);
const noCatt = computed(() =>
  catts.value.filter((catt) => catt.id === 123454321)
);
let noCattContent = computed(() => {
  if (noCatt.value.length > 0) {
    return true;
  } else {
    return false;
  }
});

// Show and Display components
const showImg = ref(JSON.parse(localStorage.getItem('showImg')) || false)
const displayGrid = ref(JSON.parse(localStorage.getItem('displayGrid')) || false)

function toggleShowImg(){
  showImg.value = !showImg.value
  localStorage.setItem('showImg', JSON.stringify(showImg.value))
  store.dispatch('setShowImg', showImg.value)
}
function toggleDisplayGrid(){
  displayGrid.value = !displayGrid.value
  localStorage.setItem('displayGrid', JSON.stringify(displayGrid.value))
  componentsList.value = []
}


// Search field
let inputSearch = ref(null);
let searchValue = computed(() => store.state.searchValue);

function updateSearchValue() {
  store.dispatch("setSearchValue", inputSearch.value);
}
function resetSearchValue() {
  store.dispatch("setSearchValue", null);
  inputSearch.value = "";
}

// Component.filter
let filteredComposants = computed(() => {
  if (selectedCatt.value) {
    if (searchValue.value) {
      const fSearch = searchValue.value.toLowerCase();
      const selectCatt = composants.value.filter(
        (composant) => composant.category === selectedCatt.value.id
      );
      return selectCatt.filter((composant) =>
        composant.name.toLowerCase().startsWith(fSearch)
      );
    } else {
      return composants.value.filter(
        (composant) => composant.category === selectedCatt.value.id
      );
    }
  } else if (searchValue.value) {
    const fSearch = searchValue.value.toLowerCase();
    return composants.value.filter((composant) =>
      composant.name.toLowerCase().startsWith(fSearch)
    );
  } else {
    return composants.value;
  }
});

// Category.filter
let filteredCatts = computed(() => {
  if (searchValue.value) {
    const fSearch = searchValue.value.toLowerCase();
    const category = catts.value.filter((catt) => catt.id !== 123454321);
    return category.filter((catt) =>
      catt.name.toLowerCase().startsWith(fSearch)
    );
  } else {
    return catts.value.filter((catt) => catt.id !== 123454321);
  }
});

// Show component or category
function displayComposants() {
  resetSearchValue();
  store.dispatch("setSelectedCategory", null);
  store.dispatch("setShowComposant", true);
  store.dispatch("setShowCategory", false);
}

function displayCatts() {
  resetSearchValue();
  store.dispatch("setSelectedCategory", null);
  store.dispatch("setShowComposant", false);
  store.dispatch("setShowCategory", true);
}

// Sort
let sortToAlpha = ref(false);
let sortToRecently = ref(false);
let sortToNumber = ref(false);

function alphaSort() {
  if (sortToAlpha.value) {
    composants.value.sort((a, b) => {
      return b.name.localeCompare(a.name);
    });

    catts.value.sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
  } else {
    composants.value.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    catts.value.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }
  sortToAlpha.value = !sortToAlpha.value;
}

function recentSort() {
  if (sortToRecently.value) {
    composants.value.sort((a, b) => {
      return a.id - b.id;
    });
    catts.value.sort((a, b) => {
      return a.id - b.id;
    });
  } else {
    composants.value.sort((a, b) => {
      return b.id - a.id;
    });
    catts.value.sort((a, b) => {
      return b.id - a.id;
    });
  }
  sortToRecently.value = !sortToRecently.value;
}

function numberSort() {
  if (sortToNumber.value) {
    composants.value.sort((a, b) => {
      return a.quantity - b.quantity;
    });
  } else {
    composants.value.sort((a, b) => {
      return b.quantity - a.quantity;
    });
  }
  sortToNumber.value = !sortToNumber.value;
}

// Navigation
let swipeV = computed(() => store.state.swipe);

function swipe() {
  if (swipeV.value === "S_left") {
    if (showCategory.value === true) {
      displayComposants();
    }
  } else if (swipeV.value === "S_right") {
    if (showComposant.value === true) {
      displayCatts();
    }
  }
  store.dispatch("setSwipe", "");
}

watch(swipeV, swipe);

// Keyboard shortcut
import { useRouter } from "vue-router";
const router = useRouter();

function shortcut(event) {
  switch (event.key) {
    case "ArrowRight":
      store.dispatch("setSwipe", "S_left");
      break;

    case "ArrowLeft":
      store.dispatch("setSwipe", "S_right");
      break;
  }
}



// Multiselection
import { deleteComponent } from "@/components/ComponentFunctions/deleteComponent.js";

const selector = ref(false);
let componentsList = ref([])
let countSelected = computed(() => componentsList.value.length)

const component = computed(() => store.state.componentSelected)

watch(component, registerComponent)

function registerComponent(){
  if(component.value !== null){
    let id = component.value.id
    let ids = componentsList.value.map(c => c.id)

    if(ids.includes(id)){
      componentsList.value.splice(ids.indexOf(id), 1)
    } else {
      componentsList.value.push(component.value)
    }
     
    store.dispatch('selectComponent', null)
  }
}

function initMultiSelect(){
  selector.value = !selector.value
  componentsList.value = []
}

const ckeckDelete = ref(false)

function deleteAll(){
  componentsList.value.forEach((c) => {
    deleteComponent(store, c)
  })
  selector.value = false
}



// HOOK
onMounted(() => {
  window.addEventListener("keydown", shortcut, {passive: true});
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", shortcut);
});
</script>















<style>

.grid-components {
  display: grid;
  margin: 40px 20px 0 20px;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
}

.backSpaceCatt {
  display: flex;
  width: 100%;
  background: linear-gradient(to left, #37474f, #212121);
  justify-content: flex-end;
}
.backSpaceComponent {
  display: flex;
  width: 100%;
  background: linear-gradient(to left, #212121, #37474f);
  justify-content: flex-start;
}

.ic_search .v-icon {
  color: #78909C;
  font-size: 40px;
}

.btn_catt .v-icon {
  color: rgb(56, 142, 60); /* #2E7D32  green-darken-3*/
  font-size: 30px;
}
.btn_component .v-icon {
  color: rgb(3, 155, 229); /* #039be5 light-blue-darken-1 */
  font-size: 30px;
}
.btn_showImg {
  font-size: 20px;
}
.btn_displayGrid .v-icon{
  color: rgb(230, 81, 0); /* #E65100 orange-foncé-4 */
  font-size: 30px;
}
.btn_alphaSort .v-icon {
  color: rgb(123, 31, 162); /* #7B1FA2 purple-darken-2 */
  font-size: 30px;
}
.btn_recentlySort .v-icon {
  color: rgb(123, 31, 162); /* #7B1FA2 purple-darken-2 */
  font-size: 30px;
}
.btn_multiSelect {
  font-size: 20px;
}

.btn_bc .v-icon {
  color: rgb(33, 4, 45); /* #7B1FA2 purple-darken-2 */
  font-size: 30px;
}

.btn_drawer {
  background: linear-gradient(to top right, #cfd8dc, #eceff1);
}

.empty {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 15%;

  display: flex;
  flex-direction: column;
  width: 50vh;

  height: auto;

  overflow: hidden;
  align-items: center;
  justify-content: space-between;
}

.empty img {
  border-radius: 10px;
  width: 80%;
  height: auto;
  object-fit: cover;
}

.catts_container {
  display: grid;
  align-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  padding: 0 3vw 0 3vw;
}
.catts_container_noCatt {
  display: flex;
  width: 100%;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: 0 3vw 0 3vw;
}

.addChoice {
  display: flex;
  margin: 8px;
  width: 200px;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}

.btnChoice {
  width: 150px;
  font-size: medium;
}

.catt-select {
  position: absolute;
  display: flex;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px;
  border-radius: 2px;
  margin-top: 10px;
}

.catt-select h3 {
  margin: 0;
}

@media screen and (max-width: 800px) {
  .grid-components {grid-template-columns: repeat(4, 1fr);}
}

@media screen and (max-width: 600px) {
  .empty img {
    width: 60%;
  }
  .empty h2 {
    font-size: 20px;
  }

  .grid-components {grid-template-columns: repeat(3, 1fr);}
}
</style>
