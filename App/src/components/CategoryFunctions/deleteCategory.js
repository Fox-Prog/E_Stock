

import { setComponent } from '@/components/ComponentFunctions/setComponent.js'
import { addCategory } from '@/components/CategoryFunctions/addCategory.js'

// Delete into Vuex
export function deleteCategory(store, cattToDelete){

    const nbrComposant = store.state.composants.filter(
        composant => composant.category === cattToDelete.id
        ).length

    const index = store.state.catts.findIndex(
        c => c === cattToDelete)

    if(cattToDelete.id !== 123454321){
        if (nbrComposant > 0){
            const composantToSet = store.state.composants.filter(
                composant => composant.category === cattToDelete.id)
            
            for (let c in composantToSet){
                    setComponent(  
                        store,                             
                        composantToSet[c].id,
                        composantToSet[c].name,
                        composantToSet[c].description,
                        composantToSet[c].quantity,
                        123454321,
                        composantToSet[c].imgName,
                        composantToSet[c].imgBody,
                    )
            }

            if(store.state.catts.find((catt) => catt.id === 123454321) === undefined){
                addCategory(store, 123454321, 'No category', '#546E7A', true)    // CREATE Vuex + local
            }
        }

        if (index !== -1){
            store.dispatch('deleteCatt', index) // DELETE Vuex
            deleteCategoryLocal(cattToDelete)   // DELETE Local DB
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
        const request = indexedDB.open("ESS", 1);

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



// Reset before backup

export function resetAllCategory(){
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

            const resetAll = categoryDB.clear()

            resetAll.onerror = (()=>{
                console.error("Error with clear: ", err)
            })

            transaction.oncomplete = (() => {
                db.close()
              })
        })
    } catch (err){
        console.error("Error with IndexedDB: ", err)
    }
}
