<template>
    <div class="Cat-card">
        <!-- Compteur de composant -->
        <v-badge                            
            :content = "nbrComposant"
            :color="catt.color"
        ></v-badge>

        <!-- Bouton principal -> Ouvre la catégorie -->
        <div class="Cat-top">
            <v-btn
                id="Cat-main-btn"
                variant="flat"
                title="openCategory"
                elevation="10"
                rounded="lg"
                @click="displayCforC(catt)"
                @touchstart="longClic()"
                @touchend="resetLongClic()"
                :style="{ backgroundColor: catt.color }"
            >
                {{ catt.name }}
            </v-btn>           
        </div>
        
        <!-- Panneau dépliant bas -->
        <v-expand-transition>
            <div 
            class="Cat-options"
            v-if="expand"
            >
                <div class="Cat-btn">
                    <v-dialog
                        v-model="ckeckDelete"
                        width="1024"
                        persistent
                    >
                        <template v-slot:activator="{ props }">
                            <!-- Bouton supprimer -->
                            <btn_delete
                                v-bind="props"
                            ></btn_delete>
                        </template>

                        <!-- Fenêtre de vérification pour la suppression -->
                        <v-card
                            style="background: linear-gradient(to bottom, #424242, #616161, #424242); border-radius: 10px; border: 1px solid #E65100;"
                        >
                            <v-card-title
                                style="text-align: center;"
                            >Delete this category ?</v-card-title>
                            <v-card-subtitle
                                style="text-align: center;"
                            > <h2>"{{ catt.name }}"</h2> </v-card-subtitle>

                            <div class="Cat-btn_check_delete">
                                <v-btn
                                    variant="tonal"
                                    style="width: 49%;"
                                    @click="deleteCategory(store, catt), ckeckDelete = false"
                                >Yes</v-btn>
                                <v-btn
                                    variant="tonal"
                                    style="width: 49%;"
                                    @click="ckeckDelete = false"
                                >No</v-btn>
                            </div>
                        </v-card>
                    </v-dialog>

                    <!-- Bouton nouveau composant -->
                    <router-link to="/NewComponent" style="text-decoration: none;">
                        <v-btn
                            class="Cat-ico-btn"
                            variant="tonal"
                            title="addComponent"
                            icon="mdi-memory"
                            color="color_component"
                            elevation="3"
                            @click="store.dispatch('setPreCatt', props.catt.name)"
                        ></v-btn>
                    </router-link>

                    
                    <v-dialog
                        v-model="dialog"
                        width="1024"
                        persistent
                    >
                        <template v-slot:activator="{ props }">
                            <!-- Bouton modifier -->
                            <btn_set
                                v-bind="props"
                            ></btn_set>
                        </template>

                        <!-- Formulaire modification -->
                        <v-card
                            class="Cat-modiForm"
                            elevation="10"
                        >
                            <v-form
                                v-model="form"
                            >
                                <v-text-field
                                    class="ma-5"
                                    clearable
                                    label= 'Name'
                                    v-model="catt.name"
                                    :rules= "[required, unicName, longName]"
                                    variant="outlined"
                                    prepend-icon="mdi-rename-box"
                                    color="color_catt"
                                ></v-text-field>

                                <v-color-picker
                                    v-model="catt.color"
                                    :immediate="true"
                                    hide-inputs
                                    color="grey-darken-3"
                                    width="90%"
                                    height="250px"
                                    rounded="xl"
                                    style="transform: translateX(5%);"
                                ></v-color-picker>                                    
                            </v-form>
                            <v-card-actions>
                                <v-btn
                                    block
                                    type="submit"
                                    prepend-icon="mdi-content-save-edit-outline"
                                    :disabled="!form"
                                    @click="
                                        dialog=false, 
                                        expand=false, 
                                        setCategoryLocal(
                                            catt,
                                            catt.name,
                                            catt.color
                                        )"
                                    >Save</v-btn>
                            </v-card-actions>
                        </v-card> 
                    </v-dialog>
                </div>
            </div>
        </v-expand-transition>

        <v-divider></v-divider>

        <v-btn 
            id="Cat-btn-expand"
            variant="text"
            :title="expand ? 'hideDetails' : 'showDetails'"
            block
            :icon="expand ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            density="compact"
            rounded="sm"
            @click="expand = !expand"
        ></v-btn>
    </div>

    <!-- Message si la categorie est vide -->
    <v-dialog
        v-model="emptyCatt"
        width="auto"
    >
        <v-card
            color="bg_color_modules"
            elevation="20"
        >
            <v-card-text
                style="color: black;"
            >
                Category is empty
            </v-card-text>
            <v-card-actions>
                <v-btn
                    block
                    style="color: black;"
                    @click="emptyCatt = false"
                >Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    
</template>













<script setup>

    import { useStore } from "vuex"
    const store = useStore()

    import { ref, computed } from "vue"

    import { deleteCategory } from '@/components/CategoryFunctions/deleteCategory.js'
    import { setCategoryLocal } from "./CategoryFunctions/setCategory.js"

    import btn_set from '@/components/littleBTN/set.vue'
    import btn_delete from '@/components/littleBTN/delete.vue'

    const props = defineProps(['catt'])

    let expand = ref(false)
    let dialog = ref(false)
    let form = ref(false)
    let ckeckDelete = ref(false)

    let timeClic = ref(null)

    let emptyCatt = ref(false)

    const nbrComposant = computed(() => store.state.composants.filter(
        composant => composant.category === props.catt.id
        ).length)


    // Check input fields
    function required(v) {
        return !!v || 'Field is required'
    }

    function unicName(v) {
        const cattExisting = store.state.catts.map(catt => catt.name)
        const filterdNames = cattExisting.filter(name => name === v)
        if (filterdNames.length > 1) {
            return 'This name already exists'
        }
        return true
    }

    function longName(v){
        if(v.length > 15){
            return 'Max 15 caracters'
        }
        return true
    }
    

    // Open category
    function displayCforC(v_catt){
        if (nbrComposant.value > 0){
            store.dispatch('setSelectedCategory', v_catt)
            store.dispatch('setShowComposant', true)
            store.dispatch('setShowCategory', false)
        }
        else{
            emptyCatt.value = true
        }
    }


    // Set touch screen
    function longClic(){
        timeClic = setTimeout(() => {
            expand.value = true
            dialog.value = true
        }, 500)
    }
    function resetLongClic(){
        clearTimeout(timeClic)
    }

</script>












<style>
    .Cat-card {
        background: linear-gradient(to bottom left, #424242, #616161ad, #424242);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 10px;
        margin-top: 5vh;
        max-width: 90%;
        min-width: 70%;
        min-height: 10vh;

        font-size: 4vw;
    }

    .Cat-top {
        display: flex;
        align-items: center;
        align-content: center;
        padding: 2vh 2vw 2vh 2vw;
        min-height: 10vh;
        width: 100%;
    }
    .Cat-top .v-btn {
        text-transform: none;
    }

    #Cat-main-btn {
        width: 100%;
        min-height: 10vh;
        overflow: hidden;
    }

    .Cat-options {
        display: flex;
        justify-content: space-between;
        padding: 0 2px 0 2px;
    }

    .Cat-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 10px 10px 10px 10px;
    }

    .Cat-modiForm{
        background-color: rgb(117, 117, 117);
    }

    #Cat-btn-expand {
        max-height: 4vh;
    }

    .Cat-btn_check_delete {
        display: flex;
        justify-content: space-between;
        padding: 4px;
        margin-top: 10px;
    }


</style>