<template>
  <v-app id="font">
    <v-main @touchstart="tStart" @touchend="tEnd">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();

import { computed, onMounted, watch, ref } from "vue";

import { getCategoryLocal } from "@/components/CategoryFunctions/getCategory.js";
import { getComponentLocal } from "@/components/ComponentFunctions/getComponent.js";
import { getLang } from "@/multilanguage/lang.js";
import { checkPattern } from "./assets/patterns.js";

// Surveillance du swipe

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let swipeThreshold = 60;

function tStart(event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}

function tEnd(event) {
  touchEndX = event.changedTouches[0].clientX;
  touchEndY = event.changedTouches[0].clientY;
  handleSwipe();
}

function handleSwipe() {
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Le swipe est horizontal
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        // Swipe vers la droite
        store.dispatch("setSwipe", "S_right");
      } else {
        // Swipe vers la gauche
        store.dispatch("setSwipe", "S_left");
      }
    }
  }
}

// Gestion bases de données

const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

function checkDB() {
  try {
    const request = indexedDB.open("ESS", 1);

    request.onerror = (err) => {
      console.error("Error with IndexedDB: ", err);
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      const CategoryTable = db.createObjectStore("category", { keyPath: "id" }); // CREATE TABLE
      CategoryTable.createIndex("category", ["category"], { unique: false }); // Préparation pour les requêtes

      const ComponentTable = db.createObjectStore("component", {
        keyPath: "id",
      });
      ComponentTable.createIndex("component", ["component"], { unique: false });
    };
  } catch (err) {
    console.error("Error with IndexedDB: ", err);
  }
}

// Gestion du bg pattern
import { getPatternUrl } from '@/assets/patterns.js'
let bgPattern = ref(`url("${getPatternUrl()}")`)

const trigPattern = computed(() => store.state.trigPattern)
watch(trigPattern, changePattern)

function changePattern(){
  bgPattern.value = `url("${getPatternUrl()}")`
}

const bgColor = "#212121";

onMounted(async () => {
  getLang();
  checkPattern();
  checkDB();
  await getCategoryLocal(store);
  await getComponentLocal(store);
});
</script>




<style>
#font {
  background-color: v-bind(bgColor);
  background-image: v-bind(bgPattern);
}

::-webkit-scrollbar {
  width: 6px; /* Largeur de la barre de défilement */
}

::-webkit-scrollbar-thumb {
  background-color: rgb(
    82,
    80,
    80
  ); /* Couleur de la poignée (le curseur de défilement) */
}

::-webkit-scrollbar-track {
  background-color: rgb(33, 33, 33); /* Couleur de la piste de défilement */
}
</style>
