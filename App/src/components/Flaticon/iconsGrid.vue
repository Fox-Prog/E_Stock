<template>
    <div class="icon-grid">
      <button
         class="icon-item-n"
         v-for="icon in icons"
         :key="icon.id"
         @click="addIcon"
      >
        <img :src="icon.url" :alt="icon.name" :title="`${icon.name}, ${icon.color}, ${icon.shape}`" width="128" height="128">
      </button>
   </div>

   <!-- Empty -->
   <div 
    class="error" 
    v-if="empty"
    >
    <img :src="imgNoResult" alt="no_result_img" width="512" height="512">
    <h1>{{ t.h1_NoResult }}</h1>
   </div>

   <!-- Offline -->
   <div 
    class="error" 
    v-if="!online"
    >
    <img :src="imgOffline" alt="offline_img" width="512" height="512">
    <h1>{{ t.h1_Offline }}</h1>
   </div>

   <!-- Json error -->
   <div 
    class="error" 
    v-if="errLoadJson"
    >
    <img :src="imgOffline" alt="offline_img" width="512" height="512">
    <h1>{{ t.h1_ErrorJson }}</h1>
    <h3>{{ t.h3_checkConnect }}</h3>
   </div>

   <!-- Loader animation -->
   <div 
    class="loaderIcons-font"
    v-if="loader"
  >
   <div class="loaderIcons"></div>
  </div>

</template>









<script setup>
import { computed, watch, ref, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
import { getTranslate } from '@/multilanguage/lang.js' 
const t = getTranslate()

// VARIABLES
const imgNoResult = "/images/wind.webp"
const imgOffline = "/images/offline.webp"

let icons = ref([])
let empty = ref(false)
let loader = ref(true)
let errLoadJson = ref(false)

let online = ref(navigator.onLine)
function updateOnlineStatus(){
  resetIcons()
  online.value = navigator.onLine
  loadIcons()
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

watch(trigger, loadIcons)

let jsonData

async function getJson(){
  if(online.value){
    store.dispatch('setJsonLoaded', false)
  
    const delay = 12000
  
    const controleur = new AbortController()
    const timeoutID = setTimeout(() => controleur.abort(), delay)
  
    // Fetch request -- GET JSON
    try {
      const jsonReq = fetch("/icons.json", {
        method: 'GET',
        signal: controleur.signal
      })
  
      const res = await jsonReq
  
      if(!res.ok){ throw new Error('Request failed'), errLoadJson.value = true }
  
      jsonData = await res.json() 
     
    
    } catch(err){
      console.log("Request json error: ")
      console.error(err)
      errLoadJson.value = true
  
    } finally {
      loader.value = false 
      store.dispatch('setJsonLoaded', true)
      clearTimeout(timeoutID)
    }
  } else {
    loader.value = false
  }
}


// Load icons
async function loadIcons(){
  icons.value = await getIcons()
}

// Get icons from json
async function getIcons(){

  const search = params.value.search.toLowerCase()

  if(online.value){
    let word = ""
    if(search !== null){
      if(search.length > 1){
        word = search.substring(1)
      } else {
        word = search
      }

      let wordMatch = await jsonData.filter(icon => icon.name.includes(word))
      let result = getOptions(wordMatch)
      let resultSort = sortBySimilarity(params.value.search, result)

      const nbrIcons = resultSort.length
    
      if(nbrIcons <= 0){
        empty.value = true
      } else {
        empty.value = false
      }
    
      if(nbrIcons > 100){
        let icMax = ((params.value.page)*100)
        let icMin = icMax - 100
    
        setPages(params.value.page, Math.round(nbrIcons/100))
        return resultSort.slice(icMin, icMax)
      } else {
        setPages(params.value.page, Math.round(nbrIcons/100))
        return resultSort
      }
      
    } else {  // Search value == "" or " "
      resetIcons()
    }
  }

  return []
}




function getOptions(wordMatch){
  let colorMatch = null
  let shapeMatch = null
  if(params.value.color !== 'All' && params.value.shape !== 'All'){ // IF color + shape
    
    colorMatch = wordMatch.filter(icon => icon.color === params.value.color.toLowerCase())
    shapeMatch = colorMatch.filter(icon => icon.shape === params.value.shape.toLowerCase())
    return shapeMatch

  } else if(params.value.color !== 'All'){  // IF just color
    
    colorMatch = wordMatch.filter(icon => icon.color === params.value.color.toLowerCase())
    return colorMatch

  } else if(params.value.shape !== 'All'){  // IF just shape
      shapeMatch = wordMatch.filter(icon => icon.shape === params.value.shape.toLowerCase())
      return shapeMatch
  }

  return wordMatch
}




// Algorithme of Levenshtein
function calculateSimilarity(search, word) {
  const m = search.length;
  const n = word.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0) dp[i][j] = j;
      else if (j === 0) dp[i][j] = i;
      else if (search[i - 1] === word[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else
        dp[i][j] =
          1 +
          Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  return dp[m][n];
}

function sortBySimilarity(search, icons) {
  // Calculez les scores de correspondance pour chaque mot
  const scoredIcon = icons.map(icon => ({
    icon: icon,
    similarity: calculateSimilarity(search, icon.name)
  }));

  // Triez les mots en fonction de leur score de correspondance
  scoredIcon.sort((a, b) => a.similarity - b.similarity);

  // Récupérez les mots triés
  const sortedIcon = scoredIcon.map(item => item.icon);

  return sortedIcon;
}







function resetIcons(){
  empty.value = false
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




onMounted(async () => {
  window.addEventListener('online', updateOnlineStatus, {passive: true})
  window.addEventListener('offline', updateOnlineStatus, {passive: true})
  await getJson()
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


.icon-item-n {
  text-align: center;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.51);
  border-radius: 10px;
  overflow: hidden;
}

.icon-item-n:hover {
  background-color: rgba(255, 255, 255, 0.715);
  box-shadow: 0px 0px 3px 0px rgb(251 250 250);
  transform: translateY(-5px);
}

.icon-item-n img {
  max-width: 100%;
  height: auto;
}


.loaderIcons-font {
  margin-left: 50%;
  transform: translateX(-50%);
  align-content: center;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.166);
  border-radius: 50%;
  width: 80px;
  height: 80px;
}


.loaderIcons {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #212121;
  border-radius: 50%;
  border-top: 3px solid #9b9a9a;
  animation: spin 2s forwards infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
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