<template>
    <v-btn
        id="btn-back"
        icon="mdi-chevron-left"
        elevation="10"
        variant="flat"
        @click="store.dispatch('setRecentForm', false)"
    ></v-btn>

    <v-card style="background-color: #212121db; border-radius: 20px;" height="100vh">
        <div class="icon-grid">
            <button
                class="icon-item"
                v-for="icon in icons"
                :key="icon.id"
                @click="addIcon"
            >
                <img :src="icon.body" :alt="icon.name" :title="icon.name">
            </button>
        </div>
    </v-card>
 
</template>






<script setup>
import { ref, onMounted } from 'vue'

import { useStore } from 'vuex'
const store = useStore()

const icons = ref([])

async function loadIcons(){
    const components = store.state.composants
    let unicValue = new Set()

    const tab = components.map((icon, index) => {
        return {
            id: index,
            name: icon.imgName,
            body: icon.imgBody
        }
    })

    icons.value = tab.filter(icon => {
        if(
            !unicValue.has(icon.body) && 
            !icon.body.includes("/images/chip.png")
        ){
            unicValue.add(icon.body)
            return true
        }
        return false
    })   

    icons.value.sort((a, b) => {
        return b.id - a.id
    })
}


function addIcon(event){
    console.log("event: ", event);
    let imgFile = {
        name: event.target.alt,
        body: event.target.src
    }
    console.log(imgFile);
    store.dispatch('setImg', imgFile)
    store.dispatch('setRecentForm', false)
}

onMounted(() => {
    loadIcons()
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

.icon-grid {
  display: grid;
  margin-top: 60px;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
}

.icon-item {
  text-align: center;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.51);
  border-radius: 10px;
  overflow: hidden;
}

.icon-item:hover {
  background-color: rgba(255, 255, 255, 0.715);
  box-shadow: 0px 0px 3px 0px rgb(251 250 250);
  transform: translateY(-5px);
}

.icon-item img {
  max-width: 100%;
}


</style>