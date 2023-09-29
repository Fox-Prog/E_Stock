<template>
  <v-dialog v-model="cpMenu">
    <template v-slot:activator="{ props }">
      <button class="Cp-block" v-bind="props">
        <img :src="composant.imgBody" alt="Component_image" />
        <div class="Cp-block-info">
          <p>{{ composant.name }}</p>
          <p>{{ composant.quantity }}</p>
        </div>
      </button>
    </template>

    <div 
        id="categoryID" 
        :style="{
        backgroundColor: store.getters.getCattColor(composant.category),
      }"
    >
      {{ store.getters.getCattName(composant.category) }}
    </div>

    <v-card id="cp-menu">

        <p>{{ composant.description }}</p>
        <div style="display: flex; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; width: 80px;">
                <btn_set @click="setComponent"/>
                <btn_delete @click="deleteComponent(store, composant)"/>
            </div>
            <div style="display: flex; justify-content: space-between; width: 80px;">
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
    </v-card>
  </v-dialog>
</template>










<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const t = computed(() => store.state.lg);

import { useRouter } from "vue-router";
const router = useRouter();

import btn_set from "@/components/littleBTN/set.vue";
import btn_delete from "@/components/littleBTN/delete.vue";
// Delete
import { deleteComponent } from "@/components/ComponentFunctions/deleteComponent.js";

// Set component
import { setComponentLocal } from "@/components/ComponentFunctions/setComponent.js";

const props = defineProps(["composant"]);
let cpMenu = ref(false);

function setComponent() {
  store.dispatch("setComponentToSet", props.composant);
  router.push("/CSComponent");
}

</script>














<style>
.Cp-block {
  position: relative;
  border-radius: 5px;
  aspect-ratio: 1/1;
  overflow: hidden;
}
.Cp-block:hover {
  background-color: rgba(255, 255, 255, 0.715);
  box-shadow: 0px 0px 3px 0px rgb(251 250 250);
  transform: translateY(-5px);
}

.Cp-block img {
  border-radius: 5px;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.Cp-block-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.522);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.Cp-block-info p {
  font-size: 2vw;
  color: beige;
}

#cp-menu {
    background: linear-gradient(to bottom left, #908e8e, #bdbdbd);
    border-radius: 5px; 
    padding: 5px;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 80%;
}


#cp-menu p {
    text-align: center;
    padding: 5px;
    margin-bottom: 5px;
}

#categoryID {
    position: absolute;
    border-radius: 2px;
    top: -25px;
    left: 10%;
    transform: translateX(-10%);
    padding: 5px;
    text-align: center;
    font-size: medium;
    z-index: 2;
}

@media screen and (min-width: 600px) {
    #cp-menu {width: 50%;}
    #categoryID { left: 25%;}
}
</style>
