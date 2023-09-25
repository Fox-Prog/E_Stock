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
      label="Search"
      prepend-icon="mdi-magnify"
      variant="outlined"
    ></v-text-field>

    <v-list density="comfortable" role="group" nav>
      <h3>Display</h3>
      <v-btn
        class="ma-5 btn_catt btn_drawer"
        icon="mdi-shape"
        variant="flat"
        title="Show Category"
        @click="displayCatts"
      ></v-btn>
      <v-btn
        class="ma-5 btn_component btn_drawer"
        icon="mdi-all-inclusive"
        variant="flat"
        title="Show Component"
        @click="displayComposants"
      ></v-btn>

      <h3>Show</h3>
      <v-btn
        class="ma-5 btn_showImg btn_drawer"
        :icon="showImg ? 'mdi-image' : 'mdi-image-off'"
        variant="flat"
        :title="showImg ? 'Hide Icon' : 'Show Icon'"
        @click="setShowImg"
      >
        <v-icon :style="{ color: showImg ? '#FF6F00' : '#BF360C' }"></v-icon>
      </v-btn>

      <h3>Sort to</h3>
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
        :title="sortToRecently ? 'Less Recent' : 'Most Recent'"
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
        :title="sortToNumber ? 'Little' : 'Many'"
        @click="numberSort"
      ></v-btn>

      <v-divider class="my-5" thickness="5"></v-divider>

      <div
        style="
          display: flex;
          align-items: center;
          justify-items: center;
        "
      >
        <h3 style="margin: 0;">Backup</h3>
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
        title="Backup"
        @click="router.push('/Backup')"
      ></v-btn>
    </v-list>
  </v-navigation-drawer>

  <div :class="showCategory ? 'backSpaceCatt' : 'backSpaceComponent'">
    <v-btn
      class="ma-1"
      style="font-size: 20px"
      variant="tonal"
      :title="showCategory ? 'Show Components' : 'Show Category'"
      :icon="showCategory ? 'mdi-chevron-right' : 'mdi-chevron-left'"
      @click="
        showCategory
          ? store.dispatch('setSwipe', 'S_left')
          : store.dispatch('setSwipe', 'S_right')
      "
    ></v-btn>
  </div>



  <div
    class="empty"
    v-if="
      (showCategory && nbrCatt === 0) || (showComposant && nbrComposant === 0)
    "
  >
    <img :src="img_empty" alt="img_empty" />
    <h2 v-if="showCategory" style="color: rgb(177, 199, 226)">No category</h2>
    <h2 v-if="showComposant" style="color: rgb(177, 199, 226)">
      No components
    </h2>
    <h2 style="color: rgb(177, 199, 226)">Create the first</h2>
  </div>



  <div v-if="showComposant">
    <Composant
      v-for="composant in filteredComposants"
      :key="composant.id"
      :composant="composant"
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
        v-if="selectedCatt"
        style="font-size: 22px"
        @click="store.dispatch('setPreCatt', selectedCatt.name)"
      ></addCpBtn>
    </router-link>

    <template v-slot:append>
      <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <Btn_new v-bind="props"></Btn_new>
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
                  title="Create Category"
                  style="
                    color: black;
                    background: linear-gradient(to top right, #1b5e20, #2e7d32);
                  "
                  >Category</v-btn
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
                  title="Create Component"
                  style="
                    color: black;
                    background: linear-gradient(to top right, #01579b, #039be5);
                  "
                  >Component</v-btn
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
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";

import Btn_new from "@/components/bigBTN/new.vue";
import Btn_menu from "@/components/bigBTN/menu.vue";
import Composant from "@/components/Composant.vue";
import Category from "@/components/Category.vue";
import addCpBtn from "@/components/littleBTN/addCpBtn.vue";

const img_empty = "/images/empty.png";

const drawer = ref(false);
const store = useStore();
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

// Show or Not image
let showImg = computed(() => store.state.showImg);
function setShowImg() {
  store.dispatch("setShowImg", !showImg.value);
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

onMounted(() => {
  window.addEventListener("keydown", shortcut);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", shortcut);
});
</script>















<style>
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
  color: black;
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
.btn_alphaSort .v-icon {
  color: rgb(123, 31, 162); /* #7B1FA2 purple-darken-2 */
  font-size: 30px;
}
.btn_recentlySort .v-icon {
  color: rgb(123, 31, 162); /* #7B1FA2 purple-darken-2 */
  font-size: 30px;
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
  min-width: 30vh;
  max-width: 50vh;

  height: auto;

  overflow: hidden;
  align-items: center;
  justify-content: space-between;
}

.empty img {
  border-radius: 10px;
  width: 100%;
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
</style>
