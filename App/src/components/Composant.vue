<template>
  <div class="Cp-card">
    <div class="Cp-top">

      <div class="Cp-imgBox">
        <div class="Cp-imgContainer" v-if="showImg">
          <img
            :src="composant.imgBody" 
            alt="Component_image">
        </div>
      </div>
      
      <div class="Cp-btn_name">
        <v-dialog
          v-model="showDescription"
          width="auto"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              variant="text"
              title="showDescription"
              v-bind="props"
            >
            <h2>{{ composant.name }}</h2>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              {{ composant.description }}
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" block @click="showDescription = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div id="Cp-nbr_contained"
      :style="{color: composant.quantity === 0 ? '#B71C1C' : 'black'}"
      >
        <h2>{{ composant.quantity }}</h2>
      </div>
    </div>

    <v-expand-transition>
      <div
        class="Cp-options"
        v-if="expand"
      >
        <div class="Cp-btn">
          <!-- DELETE -->
          <btn_delete
            @click="deleteComposant(composant)"
          ></btn_delete>

          <!-- SET -->
          <btn_set
            @click="setComponent"
          ></btn_set>
        </div>

        <div id="category"
          v-if="composant.category"
          :style="{backgroundColor: store.getters.getCattColor(composant.category)}"
        >
          {{ store.getters.getCattName(composant.category) }}
        </div>

        <div class="Cp-btn">
          <v-btn
            class="CP-ico-btn"
            variant="tonal"
            title="less"
            icon="mdi-minus"
            size="x-small"
            rounded="sm"
            elevation="3"
            @click="composant.quantity > 0 ? composant.quantity -- : composant.quantity"
            @mouseleave="setComponentLocal(
              composant.id,
              composant.name,
              composant.description,
              composant.quantity,
              composant.category,
              composant.imgName,
              composant.imgBody
            )"
          ></v-btn>
          <v-btn
            class="CP-ico-btn"
            variant="tonal"
            title="more"
            icon="mdi-plus"
            size="x-small"
            rounded="sm"
            elevation="3"
            @click="composant.quantity ++"
            @mouseleave="setComponentLocal(
              composant.id,
              composant.name,
              composant.description,
              composant.quantity,
              composant.category,
              composant.imgName,
              composant.imgBody
            )"
          ></v-btn>
        </div>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-btn 
        block
        variant="text"
        :title="expand ? 'hideDetails' : 'showDetails'"
        :icon="expand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        density="compact"
        rounded="sm"
        @click="expand = !expand"
    ></v-btn>
  </div>
</template>
  











<script setup>

  import { computed, ref } from 'vue'

  import { useStore } from "vuex"
  const store = useStore()

  import { useRouter } from 'vue-router'
  const router = useRouter()

  import btn_set from '@/components/littleBTN/set.vue'
  import btn_delete from '@/components/littleBTN/delete.vue'

  const props = defineProps(['composant'])
  const expand = ref(false)
  const showDescription = ref(false)
  let showImg = computed(() => store.state.showImg)


  // Delete
  function deleteComposant (composantToDelete){
    const index = store.state.composants.findIndex(
      (composant) => composant === composantToDelete)

    if (index !== -1) {
      store.dispatch('deleteComposant', index)
      deleteComponentLocal(composantToDelete)
    }
  }


  // Set component
  import { setComponentLocal } from '@/components/ComponentFunctions/setComponent.js'
  import { deleteComponentLocal } from '@/components/ComponentFunctions/deleteComponent.js'

  function setComponent(){
    store.dispatch('setComponentToSet', props.composant)
    router.push('/NewComponent')
  }


      
</script>
  













<style>
  .Cp-card {
    background: linear-gradient(to bottom, #424242, #616161ad, #424242);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin: 2vh 4vw 2vh 4vw;
  }
  .Cp-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding: 0 3px 0 3px;
  }

  .Cp-imgBox {
    min-height: 50px;
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
    border-radius: 10px;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  

  .Cp-btn_name {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  #Cp-nbr_contained {
    display: flex;
    justify-content: flex-end;
    background-color: rgb(117, 117, 117);
    margin-right:10px;
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
  .Cp-ico-btn .v-icon{
    font-size: 25px;
  }

  #category {
    height: 30px;
    border-radius: 5px;
    margin: 15px 0 10px 0;
    padding: 3px;
  }
  .Cp-modiForm{
    background: linear-gradient(to bottom left, #616161, #BDBDBD, #616161);
  }

  h2 {
    text-transform: none;
  }
</style>
  