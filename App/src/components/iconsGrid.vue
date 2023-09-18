<template>
    <div class="icon-grid" v-if="download">
      <div
         class="icon-item"
         v-for="icon in icons"
         :key="icon.id"
      >
         <img :src="icon.images[128]" alt="icon">
      </div>
   </div>

   <h1 v-if="empty">Aucun résultat</h1>
</template>


<script setup>
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

// VARIABLES
let icons = ref([])
let download = ref(false)
let empty = ref(false)

let search = computed(() => store.state.searchIcons)
let color = computed(()=> store.state.colorIcons)
let shape = computed(()=> store.state.shapeIcons)
let trigger = computed(()=> store.state.trigger)

watch(trigger, getFlaticon)







// API
const Key = "VsGVik2wurGtyQ57M81GVhWf67AbgFcoAr0bW7yKkfAmOBAs"
let token = null

// GET icons
async function getFlaticon(){
    try{
    
      await fetch('https://api.flaticon.com/v3/app/authentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apikey: Key      //paramètre
        })
      }).then(response => {
        if(!response.ok){
          throw new Error('La demande d\'authentification a échoué')
        }
        return (response.json())
      }).then(authResponse => {
        token = authResponse.data.token
      })
    
    } catch(error){
      console.log('Echec: ',error)
    }

    const headers = new Headers({
      'Accept':'application/json',
      'Authorization': `Bearer ${token}`
    })

    let request = null
    async function createRequest (){
        if(color.value && shape.value){
            request = `https://api.flaticon.com/v3/search/icons?q=${search.value.toLowerCase()}&styleColor=${color.value.toLowerCase()}&styleShape=${shape.value.toLowerCase()}`
        } else if (color.value){
            request = `https://api.flaticon.com/v3/search/icons?q=${search.value.toLowerCase()}&styleColor=${color.value.toLowerCase()}`
            } else if(shape.value){
                request = `https://api.flaticon.com/v3/search/icons?q=${search.value.toLowerCase()}&styleShape=${shape.value.toLowerCase()}`
            } else {
                request = `https://api.flaticon.com/v3/search/icons?q=${search.value.toLowerCase()}`
            }
    }
    
    await createRequest()
    console.log('request: ', request);

    await fetch(request, {
      method: 'GET',
      headers: headers 
    }).then(response => {
      if (!response.ok) {
        throw new Error('La requête a échoué')
      }
      return response.json()
    }).then(response => {
      icons.value = response.data
      if(icons.length === 0){
         empty = true
      }
      download.value = true
      
    }).catch(error => {
      console.error('Erreur:', error)
    })
    
  }
    

</script>


<style>

.icon-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* Crée une grille de 4 colonnes égales */
  gap: 16px; /* Espace entre les éléments */
}

.icon-item {
  text-align: center;
  padding: 5px;
  border: 1px solid #ccc;
}

/* Styles supplémentaires pour les images, par exemple pour définir la largeur maximale */
.icon-item img {
  max-width: 100%;
}
    
</style>