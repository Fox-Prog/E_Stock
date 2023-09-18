<template>
    <div>
        <v-app-bar
            app
            style="background: linear-gradient(to top right, #212121, #263238)"
            location="bottom"
        >
            <!-- Btn cancel -->
            <template v-slot:prepend>
                <router-link to="/CSComponent" style="text-decoration: none">
                    <Btn_cancel></Btn_cancel>
                </router-link>
            </template>
        </v-app-bar>

        <!-- Search form -->
        <div class="search_form_icons">
            <v-form>
                <div class="entry">
                    <!-- Search -->
                    <v-text-field
                        class="mx-10"
                        clearable
                        @input="search ? showBtn = true : showBtn = false"
                        @blur="search ? showBtn = true : showBtn = false"
                        v-model="search"
                        label="Search"
                        variant="outlined"
                    ></v-text-field>

                    <!-- Selectors options -->
                    <div class="selectors">
                        <v-select
                            class="mx-10 selector"
                            clearable
                            menu-icon="mdi-format-color-fill"
                            variant="outlined"
                            v-model="color"
                            :items="colors"
                            label="Color"
                        ></v-select>
                        <v-select
                            class="mx-10 selector"
                            clearable
                            menu-icon="mdi-draw"
                            variant="outlined"
                            v-model="shape"
                            :items="shapes"
                            label="Shape"
                        ></v-select>
                    </div>
                </div>
            </v-form>
        </div>
        <v-btn
            class="mx-10"
            v-if="showBtn"
            id="btnCall"
            variant="tonal"
            elevation="15"
            icon="mdi-magnify"
            @click="callIcons"
        ></v-btn>

        <iconsGrid></iconsGrid>
    </div>
</template>






<script setup>
import { computed, ref } from 'vue'

import { useStore } from 'vuex'
const store = useStore()

import iconsGrid from '@/components/iconsGrid.vue'
import Btn_cancel from '@/components/bigBTN/cancel.vue'
const colors = ['Black', 'Color', 'Gradient']
const shapes = ['Outline', 'Fill', 'Lineal-color', 'Hand-drawn']

let search = ref(null)
let color = ref(null)
let shape = ref(null)
let trigger = computed(()=> store.state.trigger)

let showBtn = ref(false)
const callIcons = () => {
    let values = {
        search: search.value,
        color: color.value,
        shape: shape.value
    }
    store.dispatch('callIcons', values)
    store.dispatch('setTrigger', !trigger.value)
}

</script>






<style>

.search_form_icons {
  position: relative;
  margin-left: 3vw;
  margin-right: 3vw;
  margin-top: 2vh;

  padding-top: 2vh;

  border-radius: 15px;

  background: linear-gradient(to bottom left, #616161, #bdbdbd, #616161);
  box-shadow: 0px 0px 30px 0px rgb(0, 0, 0, 0.2);

  z-index: 2;
}

.selectors {
    display: flex;
}


#btnCall {
    /* margin-left: 50%;
    margin-top: 2px;
    transform: translateX(-50%); */
    width: 100px;
    height: 30px;
    border-radius: 5px;
    background-color: rgba(7, 102, 7, 0.696);
}



</style>