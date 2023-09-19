<template>
    <div class="icon-grid">
      <button
         class="icon-item"
         v-for="icon in icons"
         :key="icon.id"
         @click="addIcon"
      >
        <img :src="icon.images[128]" alt="icon">
      </button>
   </div>

   <div 
    class="no-result" 
    v-if="empty"
  >
    <img :src="imgNoResult" alt="no_result_img">
    <h1>No result</h1>
   </div>
</template>









<script setup>
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

// VARIABLES
const imgNoResult = "/images/wind.png"

let icons = ref([])
let download = ref(false)
let empty = ref(false)

let params = computed(() => {
  return {
    search: store.state.searchIcons,
    color: store.state.colorIcons,
    shape: store.state.shapeIcons,
    page: store.state.page
  }
})

let trigger = computed(()=> store.state.trigger)

watch(trigger, getFlaticon)







// API
const Key = "VsGVik2wurGtyQ57M81GVhWf67AbgFcoAr0bW7yKkfAmOBAs"
let token = ""
let endTime = 0
let remainingHour = 0

// GET icons
async function getFlaticon(){
  remainingHour = (endTime - Date.now()/1000)/3600

  if(remainingHour <= 0){
    // Fetch request -- POST -- Authentication
    try {
      const req = await fetch(`https://api.flaticon.com/v3/app/authentication`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apikey: Key  //      <<< Parameters send
        })
      })
    
      if(!req.ok){ throw new Error('Request failed')}
    
      const res = await req.json()
      // Data processing
      token = res.data.token
      endTime = res.data.expires
      
    } catch(err){
        console.log("Request error: ")
        console.error(err)
    }
  }



  const headers = new Headers({
    'Accept':'application/json',
    'Authorization': `Bearer ${token}`
  })




  let request = null
  async function createRequest (){

    if(params.value.color !== 'All' && params.value.shape !== 'All'){
        request = `https://api.flaticon.com/v3/search/icons?q=${params.value.search.toLowerCase()}&styleColor=${params.value.color.toLowerCase()}&styleShape=${params.value.shape.toLowerCase()}&page=${params.value.page}`
    } else if (params.value.color !== 'All'){
        request = `https://api.flaticon.com/v3/search/icons?q=${params.value.search.toLowerCase()}&styleColor=${params.value.color.toLowerCase()}&page=${params.value.page}`
        } else if(params.value.shape !== 'All'){
            request = `https://api.flaticon.com/v3/search/icons?q=${params.value.search.toLowerCase()}&styleShape=${params.value.shape.toLowerCase()}&page=${params.value.page}`
        } else {
            request = `https://api.flaticon.com/v3/search/icons?q=${params.value.search.toLowerCase()}&page=${params.value.page}`
        }
  }
    



  await createRequest()

  // Fetch request -- GET
  try {
    const req = await fetch(request, { //    <<< Request URL
      method: 'GET',
      headers: headers
    })
  
    if(!req.ok){ throw new Error('Request failed')}
  
    const res = await req.json()
    // Data processing
    icons.value = res.data
    if(icons.value.length === 0){
         empty.value = true
    } else {
      empty.value = false
    }
    download.value = true

    // Metadata processing
    console.log(res.metadata);
    const currentPage = res.metadata.page
    const maxPage = Math.round((res.metadata.total)/100)

    let pageValues = {
      currentPage: currentPage,
      maxPage: maxPage
    }
    store.dispatch('setPages', pageValues)
     
  
  } catch(err){
    console.log("Request error: ")
    console.error(err)
  }
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
      name: params.value.search,
      body: base64
    }
    store.dispatch('setImg', imgFile)
    store.dispatch('setFlatForm', false)
  })
  .catch((error) => {
    console.log(error)
  })
}

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
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  overflow: hidden;
}

.icon-item:hover {
  background-color: rgba(255, 255, 255, 0.485);
  box-shadow: 0px 0px 3px 0px rgb(251 250 250);
  transform: translateY(-5px);
}

.icon-item img {
  max-width: 100%;
}



.no-result {
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

.no-result img {
  border-radius: 10px;
  width: 100%;
  height: auto;
  object-fit: cover;
}
    
</style>