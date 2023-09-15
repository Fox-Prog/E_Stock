

import { setComponentLocal } from '@/components/ComponentFunctions/setComponent.js'
import { addCategoryLocal } from '@/components/CategoryFunctions/addCategory.js'
import { addCategoryVuex } from '@/components/CategoryFunctions/addCategory.js'

    
export function deleteCategory(store, cattToDelete){

    const nbrComposant = store.state.composants.filter(
        composant => composant.category === cattToDelete.id
        ).length

    const index = store.state.catts.findIndex(
        (catt) => catt === cattToDelete)

    if(cattToDelete.id !== 123454321){
        if (nbrComposant > 0){
            const composantToDelete = store.state.composants.filter(
                composant => composant.category === cattToDelete.id)
            
            for (let c in composantToDelete){
                    composantToDelete[c].category = 123454321            // SET Vuex
                    setComponentLocal(                               // SET Local DB
                        composantToDelete[c],
                        composantToDelete[c].name,
                        composantToDelete[c].description,
                        composantToDelete[c].quantity,
                        123454321,
                        composantToDelete[c].img
                    )
            }

            if(store.state.catts.find((catt) => catt.id === 123454321) === undefined){
                addCategoryVuex(store, 123454321, 'No Category', '#546E7A')    // CREATE Vuex
                addCategoryLocal(123454321, 'No Category', '#546E7A')   // CREATE Local DB
            }
        }

        if (index !== -1){
            store.dispatch('deleteCatt', index)
            deleteCategoryLocal(cattToDelete)
        }
    }
    else {
        if(nbrComposant === 0){       
            if (index !== -1){
                store.dispatch('deleteCatt', index) // DELETE Vuex
                deleteCategoryLocal(cattToDelete)   // DELETE Local DB
            }
        }
    }
}



// Delete into IndexedBD

function deleteCategoryLocal(cattToDelete){
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB

    try{
        const request = indexedDB.open("ESS", 1)

        request.onerror = (err) => {
          console.error("Error with IndexedDB: ", err)
        }

        request.onsuccess = (() => {
            const db = request.result
            const transaction = db.transaction("category", "readwrite")
            const categoryDB = transaction.objectStore("category")

            categoryDB.delete(cattToDelete.id)

            transaction.oncomplete = (() => {
                db.close()
              })
        })
    } catch (err){
        console.error("Error with IndexedDB: ", err)
    }
}


