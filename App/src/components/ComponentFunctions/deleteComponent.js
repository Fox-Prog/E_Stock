// Delete into Vuex
export function deleteComponent(store, componentToDelete){
    const index = store.state.composants.findIndex(
        c => c === componentToDelete)
    store.dispatch('deleteComposant', index)

    deleteComponentLocal(componentToDelete)
}


// Delete into IndexedBD

export function deleteComponentLocal(componentToDelete){
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB

    try{
        const request = indexedDB.open("ESS", 1);

        request.onerror = (err) => {
          console.error("Error with IndexedDB: ", err)
        }

        request.onsuccess = (() => {
            const db = request.result
            const transaction = db.transaction("component", "readwrite")
            const componentDB = transaction.objectStore("component")

            componentDB.delete(componentToDelete.id)

            transaction.oncomplete = (() => {
                db.close()
              })
        })
    } catch (err){
        console.error("Error with IndexedDB: ", err)
    }
}



// Reset before backup

export function resetAllComponents(){
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB

    try{
        const request = indexedDB.open("ESS", 1)

        request.onerror = (err) => {
          console.error("Error with IndexedDB: ", err)
        }

        request.onsuccess = (() => {
            const db = request.result
            const transaction = db.transaction("component", "readwrite")
            const componentDB = transaction.objectStore("component")

            const resetAll = componentDB.clear()

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