<template>
    <v-btn
        :title="t.ttBtnBack"
        :disabled="!jsonLoaded"
        id="btn-back"
        icon="mdi-chevron-left"
        elevation="10"
        variant="flat"
        @click="store.dispatch('setFlatForm', false)"
    ></v-btn>
    <v-card style="background-color: #212121db; border-radius: 20px; height: 100vh;">
        <div>
            <!-- Search form -->
            <div class="search_form_icons">
                <v-form
                    :disabled="!jsonLoaded"
                >
                    <div class="entry">
                        <!-- Search -->
                        <v-text-field
                            class="mx-5"
                            clearable
                            @input="page=1, callIcons()"
                            v-model="search"
                            :label="t.labelSearch"
                            variant="outlined"
                        ></v-text-field>
    
                        <!-- Selectors options -->
                        <div class="selectors">
                            <v-select
                                class="ms-5 mr-1"
                                menu-icon="mdi-format-color-fill"
                                variant="outlined"
                                v-model="color"
                                @update:model-value="page=1, callIcons()"
                                :items="colors"
                                label="Color"
                            ></v-select>
                            <v-select
                                class="mr-5 ms-1"
                                menu-icon="mdi-draw"
                                variant="outlined"
                                v-model="shape"
                                @update:model-value="page=1, callIcons()"
                                :items="shapes"
                                label="Shape"
                            ></v-select>
                        </div>
                    </div>
                </v-form>

                <v-divider v-if="multiPage"></v-divider>

                <div 
                    class="navigation"
                    v-if="multiPage"    
                >

                    <!-- LEFT (-) -->
                    <v-btn  
                        :title="t.ttBtn_PreviousPage"
                        width="100px"
                        height="30px"
                        rounded="sm"
                        variant="tonal"
                        icon="mdi-chevron-left"
                        @click="pageDown()"
                    ></v-btn>
                    <h4>{{ `Page ${currentPage}/${maxPage}` }}</h4>
                    <!-- RIGHT (+) -->
                    <v-btn
                        :title="t.ttBtn_NextPage"
                        width="100px"
                        height="30px"
                        rounded="sm"
                        variant="tonal"
                        icon="mdi-chevron-right"
                        @click="pageUp()"
                    ></v-btn>
                </div>
            </div>    
            
            <div class="fixe" v-if="loaderBar">
                <div class="mobile"></div>
            </div>

            <iconsGrid></iconsGrid>
        </div>
    </v-card>
</template>






<script setup>

import { computed, ref, onBeforeUnmount } from 'vue'

import { useStore } from 'vuex'
const store = useStore()
import { getTranslate } from '@/multilanguage/lang.js' 
const t = getTranslate()

import iconsGrid from '@/components/Flaticon/iconsGrid.vue'
const colors = ['All', 'Black', 'Color', 'Gradient']
const shapes = ['All', 'Outline', 'Fill', 'Lineal-color', 'Hand-drawn']

let search = ref("")
let color = ref(colors[0])
let shape = ref(shapes[0])
let page = ref(1)
let trigger = computed(()=> store.state.trigger)

let multiPage = computed(() => maxPage.value >= 2)
let currentPage = computed(() => store.state.currentPage)
let maxPage = computed(() => store.state.maxPage)

let tempoID
const loaderBar = ref(false)
let jsonLoaded = computed(() => store.state.jsonLoaded)

function pageDown(){
    if(page.value > 1){
        page.value--
        callIcons()
    }
}

function pageUp(){
    if(page.value < maxPage.value){
        page.value++
        callIcons()
    }
}


function callIcons() {
    loaderBar.value = true
    clearTimeout(tempoID)

    tempoID = setTimeout(() => {
        // Check empty search
        const regex = /^\s*$/
        if(!regex.test(search.value)){
            let values = {
            search: search.value,
            color: color.value,
            shape: shape.value,
            page: page.value
            }
            store.dispatch('callIcons', values)
            store.dispatch('setTrigger', !trigger.value)
        }
        loaderBar.value = false
    }, 1000);
}


onBeforeUnmount(() => {
    let pageValues = {
        currentPage: 0,
        maxPage: 0
    }
    store.dispatch('setPages', pageValues)
})

</script>






<style>

#btn-back {
    position: absolute;
    top: -15px;
    left: -15px;
    z-index: 2;
    background: linear-gradient(to bottom left, #bdbdbd, #616161);
    font-size: 20px;
}

.search_form_icons {
  position: relative;
  margin-left: 3vw;
  margin-right: 3vw;
  margin-top: 2vh;

  padding-top: 2vh;

  border-radius: 5px;

  background: linear-gradient(to bottom left, #616161, #bdbdbd, #616161);
  box-shadow: 0px 0px 30px 0px rgb(0, 0, 0, 0.2);

  z-index: 2;
}

.selectors {
    display: flex;
}


.navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
}


.fixe {
    position: relative;
    height: 3px;
    background-color: #212121;
    margin-left: 3vw;
    margin-right: 3vw;
    border-radius: 5px;
    overflow: hidden;
}

.mobile {
    position: absolute;
    width: 150px;
    height: 3px;
    background-color: #f9f7f781;
    animation: slide 1.5s forwards infinite;
}
@keyframes slide {
    0% {left: -100%;}
    100% {left: 100%;}
}


</style>