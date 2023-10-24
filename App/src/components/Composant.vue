<template>
  <div class="Cp-card">

    <button class="Cp-btn-selector-off" v-if="selector && !selected" @click="selectOn"></button>

    <button class="Cp-btn-selector-on" v-if="selector && selected" @click="selectOff">
      <h1>{{ countSelected }}</h1>
    </button>

    <div class="Cp-top" @touchstart="tStart" @touchend="tEnd">
      <div class="Cp-imgBox">
        <div class="Cp-imgContainer" v-if="showImg">
          <img :src="composant.imgBody" alt="Component_image" />
        </div>
      </div>

      <div class="Cp-btn_name">
        <v-dialog v-model="showDescription" width="auto">
          <template v-slot:activator="{ props }">
            <v-btn variant="text" :title="t.ttBtn_ShowDescription" v-bind="props">
              <h2 id="Cp-name">{{ composant.name }}</h2>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              {{ composant.description }}
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" block @click="showDescription = false"
                >{{ t.ctBtn_Close }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div
        id="Cp-nbr_contained"
        :style="{ color: composant.quantity === 0 ? '#B71C1C' : 'black' }"
      >
        <h2>{{ composant.quantity }}</h2>
      </div>
    </div>

    <v-expand-transition>
      <div class="Cp-options" v-if="expand">
        <div class="Cp-btn">
          <!-- DELETE -->
          <btn_delete @click="deleteComponent(store, composant)"></btn_delete>

          <!-- SET -->
          <btn_set @click="setComponent"></btn_set>
        </div>

        <div
          id="category"
          v-if="composant.category"
          :style="{
            backgroundColor: store.getters.getCattColor(composant.category),
          }"
        >
          {{ store.getters.getCattName(composant.category) }}
        </div>

        <div class="Cp-btn">
          <v-btn
            class="CP-ico-btn"
            variant="tonal"
            :title="t.ttBtn_Minus"
            icon="mdi-minus"
            size="x-small"
            rounded="sm"
            elevation="3"
            @click="
              composant.quantity > 0 ? composant.quantity-- : composant.quantity,
              setComponentLocal(
                composant.id,
                composant.name,
                composant.description,
                composant.quantity,
                composant.category,
                composant.imgName,
                composant.imgBody
              )
            "
          ></v-btn>
          <v-btn
            class="CP-ico-btn"
            variant="tonal"
            :title="t.ttBtn_Plus"
            icon="mdi-plus"
            size="x-small"
            rounded="sm"
            elevation="3"
            @click="composant.quantity++,
            setComponentLocal(
                composant.id,
                composant.name,
                composant.description,
                composant.quantity,
                composant.category,
                composant.imgName,
                composant.imgBody
              )
            "
          ></v-btn>
        </div>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-btn
      :disabled="selector"
      block
      variant="text"
      :title="expand ? t.ttBtn_ExpandFalse : t.ttBtn_ExpandTrue"
      :icon="expand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
      density="compact"
      rounded="sm"
      @click="expand = !expand"
    ></v-btn>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

import { useStore } from "vuex";
const store = useStore();
import { getTranslate } from '@/multilanguage/lang.js' 
const t = getTranslate()

import { useRouter } from "vue-router";
const router = useRouter();

import btn_set from "@/components/littleBTN/set.vue";
import btn_delete from "@/components/littleBTN/delete.vue";

const props = defineProps(["composant", "selector", "componentsList"]);
const emit = defineEmits(["touch1200"])
const expand = ref(false);
const showDescription = ref(false);
const showImg = computed(() => store.state.showImg)

// Delete
import { deleteComponent } from "@/components/ComponentFunctions/deleteComponent.js";

// Set component
import { setComponentLocal } from "@/components/ComponentFunctions/setComponent.js";

function setComponent() {
  store.dispatch("setComponentToSet", props.composant);
  router.push("/CSComponent");
}

// Multiselection
const selected = ref(false)

watch(() => props.selector, () => {
  selected.value = false
})

function selectOn(){
  selected.value = !selected.value
  store.dispatch('selectComponent', props.composant)
}
function selectOff(){
  selected.value = !selected.value
  store.dispatch('selectComponent', props.composant)
}

const countSelected = computed(() => {
  return props.componentsList.indexOf(props.composant) + 1
})


// Tactile multiselections
let timer
function tStart(){
  timer = setTimeout(() => {
    emit('touch1200')
  }, 1200)
}

function tEnd(){
  clearTimeout(timer)
}


</script>











<style>
.Cp-card {
  position: relative;
  background: linear-gradient(to bottom, #424242, #616161ad, #424242);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin: 2vh 4vw 2vh 4vw;
  overflow: hidden;
}
.Cp-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding: 0 3px 0 3px;
}

.Cp-imgBox {
  min-width: 80px;
  min-height: 50px;
  margin-right: 10px;
}

.Cp-imgContainer {
  display: flex;
  margin: 5px;
  border-radius: 10px;
  min-width: 80px;
  min-height: 80px;
  max-width: 10vw;
  max-height: 10vw;
  overflow: hidden;
  align-items: center;
  justify-content: center;
}
.Cp-imgContainer img {
  border-radius: 5px;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.Cp-btn_name {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-width: 40vw;
  overflow: hidden;
}
.Cp-btn_name .v-btn {
  height: 50px;
}
.Cp-btn_name .v-btn__content {
  white-space: normal;
}

#Cp-name {
  max-width: 40vw;
  max-height: 50px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  color: rgb(219, 219, 219);
}
@media screen and (max-width: 860px) {
  #Cp-name {font-size: 14px;}
}
@media screen and (max-width: 680px) {
  #Cp-name {font-size: 11px;}
}

#Cp-nbr_contained {
  display: flex;
  justify-content: flex-end;
  background-color: rgb(117, 117, 117);
  margin-right: 5px;
  margin-left: 10px;
  padding: 3px;
  border-radius: 5px;
}
.Cp-options {
  display: flex;
  justify-content: space-between;
  padding-left: 1vw;
  padding-right: 3px;
}
.Cp-btn {
  display: flex;
  justify-content: space-between;
  width: 100px;
  padding: 0 10px 0 10px;
  margin: 15px 0 10px 0;
}
.Cp-ico-btn .v-icon {
  font-size: 25px;
}

#category {
  height: 30px;
  border-radius: 5px;
  margin: 15px 0 10px 0;
  padding: 3px;
}
.Cp-modiForm {
  background: linear-gradient(to bottom left, #616161, #bdbdbd, #616161);
}

h2 {
  text-transform: none;
}


.Cp-btn-selector-off {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 2;
}
.Cp-btn-selector-off:hover {
  background-color: rgba(255, 255, 255, 0.115);
}

.Cp-btn-selector-on {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(253, 253, 253, 0.677);
  z-index: 2;
}
.Cp-btn-selector-on:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
