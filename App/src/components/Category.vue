<template>
  <div class="Cat-card">
    <!-- Components count -->
    <v-badge :content="nbrComposant" :color="catt.color"></v-badge>

    <!-- Bouton principal -> Ouvre la catégorie -->
    <div class="Cat-top">
      <v-btn
        id="Cat-main-btn"
        variant="flat"
        :title="t.ttBtn_OpenCatt"
        elevation="10"
        rounded="sm"
        @click="displayCforC(catt)"
        @touchstart="longClic()"
        @touchend="resetLongClic()"
        :style="{ backgroundColor: catt.color }"
      >
        {{ catt.name }}
      </v-btn>
    </div>

    <!-- Panneau dépliant bas -->
    <v-expand-transition>
      <div class="Cat-options" v-if="expand">
        <div class="Cat-btn">
          <v-dialog v-model="ckeckDelete" width="1024" persistent>
            <template v-slot:activator="{ props }">
              <!-- DELETE -->
              <btn_delete v-bind="props"></btn_delete>
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
                >{{ t.textConfirmDelete }}</v-card-title
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
                  @click="deleteCategory(store, catt), (ckeckDelete = false)"
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

          <!-- New component -->
          <router-link to="/CSComponent" style="text-decoration: none">
            <addCpBtn
              @click="store.dispatch('setPreCatt', props.catt.name)"
            ></addCpBtn>
          </router-link>

          <!-- SET -->
          <btn_set @click="setCategory"></btn_set>
        </div>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-btn
      id="Cat-btn-expand"
      variant="text"
      :title="expand ? t.ttBtn_ExpandFalse : t.ttBtn_ExpandTrue"
      block
      :icon="expand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
      density="compact"
      rounded="sm"
      @click="expand = !expand"
    ></v-btn>
  </div>

  <!-- If category is empty -->
  <v-dialog v-model="emptyCatt" width="auto">
    <v-card color="bg_color_modules" elevation="20">
      <v-card-text style="color: black">{{ t.textCattEmpty }}</v-card-text>
      <v-card-actions>
        <v-btn block style="color: black" @click="emptyCatt = false"
          >{{ t.ctBtn_Close }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>








<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex"
const store = useStore()
const t = computed(() => store.state.lg)

import { useRouter } from "vue-router";
const router = useRouter();


import addCpBtn from "@/components/littleBTN/addCpBtn.vue";
import btn_set from "@/components/littleBTN/set.vue";
import btn_delete from "@/components/littleBTN/delete.vue";

const props = defineProps(["catt"]);

let expand = ref(false);
let ckeckDelete = ref(false);

let timeClic = ref(null);

let emptyCatt = ref(false);

const nbrComposant = computed(
  () =>
    store.state.composants.filter(
      (composant) => composant.category === props.catt.id
    ).length
);

// Open category
function displayCforC(v_catt) {
  if (nbrComposant.value > 0) {
    resetSearchValue();
    store.dispatch("setSelectedCategory", v_catt);
    store.dispatch("setShowComposant", true);
    store.dispatch("setShowCategory", false);
  } else {
    emptyCatt.value = true;
  }
}
function resetSearchValue() {
  store.dispatch("setSearchValue", null);
}

// Set touch screen
function longClic() {
  timeClic = setTimeout(() => {
    setCategory();
  }, 500);
}
function resetLongClic() {
  clearTimeout(timeClic);
}

// Set category
function setCategory() {
  store.dispatch("setCategoryToSet", props.catt);
  router.push("/CSCategory");
}

// Delete category
import { deleteCategory } from "@/components/CategoryFunctions/deleteCategory.js";
</script>












<style>
.Cat-card {
  background: linear-gradient(to bottom left, #424242, #616161ad, #424242);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  margin-top: 5vh;
  max-width: 90%;
  min-width: 70%;
  min-height: 10vh;

  font-size: 4vw;
}

.Cat-top {
  display: flex;
  align-items: center;
  align-content: center;
  padding: 2vh 2vw 2vh 2vw;
  min-height: 10vh;
  width: 100%;
}
.Cat-top .v-btn {
  text-transform: none;
}

#Cat-main-btn {
  width: 100%;
  min-height: 10vh;
  overflow: hidden;
}

.Cat-options {
  display: flex;
  justify-content: space-between;
  padding: 0 2px 0 2px;
}

.Cat-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px 10px 10px 10px;
}

.Cat-modiForm {
  background-color: rgb(117, 117, 117);
}

#Cat-btn-expand {
  max-height: 4vh;
}
</style>
