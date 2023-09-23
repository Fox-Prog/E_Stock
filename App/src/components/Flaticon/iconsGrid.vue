<template>
    <div class="icon-grid">
      <button
         class="icon-item"
         v-for="icon in icons"
         :key="icon.id"
         @click="addIcon"
      >
        <img :src="icon.src" :alt="icon.name" :title="icon.name">
      </button>
   </div>

   <!-- Empty -->
   <div 
    class="error" 
    v-if="empty"
    >
    <img :src="imgNoResult" alt="no_result_img">
    <h1>No result</h1>
   </div>

   <!-- Offline -->
   <div 
    class="error" 
    v-if="!online"
    >
    <img :src="imgOffline" alt="offline_img">
    <h1>Offline</h1>
   </div>

</template>









<script setup>
import { computed, watch, ref, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

// VARIABLES
const imgNoResult = "/images/wind.png"
const imgOffline = "/images/offline.png"

let icons = ref([])
let empty = ref(false)

let online = ref(navigator.onLine)
function updateOnlineStatus(){
  resetIcons()
  online.value = navigator.onLine
  getIcons()
}

let params = computed(() => {
  return {
    search: store.state.searchIcons,
    color: store.state.colorIcons,
    shape: store.state.shapeIcons,
    page: store.state.page
  }
})

let trigger = computed(()=> store.state.trigger)

watch(trigger, getIcons)

// Get icons from json
import jsonData from '@/assets/colors_outline_icons.json'
async function getIcons(){

  const regex = /^\s*$/
  let word = params.value.search
  word = regex.test(word) ? null : word

  if(online.value){
    if(word !== null){
      let result = await jsonData.filter(icon => icon.name.includes(word))
      const nbrIcons = result.length
    
      if(nbrIcons <= 0){
        empty.value = true
      } else {
        empty.value = false
      }
    
      if(nbrIcons > 200){
        let icMax = ((params.value.page)*200)
        let icMin = icMax - 200
    
        icons.value = result.slice(icMin, icMax)
      } else {
        icons.value = result
      }
    
      setPages(params.value.page, Math.round(nbrIcons/200))
      
    } else {  // Search value == "" or " "
      resetIcons()
    }
  }
}

function resetIcons(){
  icons.value = []
  setPages(0, 0)
}

function setPages(current, max){
  let pageValues = {
    currentPage: current,
    maxPage: max
  }
  store.dispatch('setPages', pageValues)
}



// Get image -- create base64 from url
async function imageTo64(url){
  try{
    // Get blob from url
    const res = await fetch(url)

    if(!res.ok){ throw new Error('Error, status: ', res.status)}

    const blob = await res.blob()

    // Base64 from blob
    const base64 = await blobToBase64(blob)
    return base64
  
  } catch(error){
    console.log(error)
  }
}
// -----------------------------------
function blobToBase64(blob){
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      resolve(reader.result)
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsDataURL(blob)
  })
}
// -----------------------------------
function addIcon(event){
  
  imageTo64(event.target.src)
  .then((base64) => {
    let imgFile = {
      name: event.target.alt,
      body: base64
    }
    store.dispatch('setImg', imgFile)
    store.dispatch('setFlatForm', false)
  })
  .catch((error) => {
    console.log(error)
  })
}




onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

onBeforeUnmount(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})

</script>










<style>

.icon-grid {
  display: grid;
  margin-top: 40px;
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



.error {
  margin-left: 50%;
  transform: translateX(-50%);
  text-align: center;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.166);
  border-radius: 10px;

  min-width: 30vh;
  max-width: 50vh;
  height: auto;
}

.error img {
  border-radius: 10px;
  width: 100%;
  height: auto;
  object-fit: cover;
}

    
</style>