
// Set into Vuex
export function setComponent(store, id, name, description, quantity, category, imgName, imgBody){

    const playload = {id, name, description, quantity, category, imgName, imgBody}
    store.dispatch('setComponent', playload)

    setComponentLocal(id, name, description, quantity, category, imgName, imgBody)
}



// Set into IndexedDB
export function setComponentLocal(id, newName, newDescription, newQuantity, newCategory, newImgName, newImgBody){
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

            const requestComponentID = componentDB.get(id)

            requestComponentID.onerror = (err) => {
                console.error("Error with IndexedDB: ", err)
                reject(err)
            }

            requestComponentID.onsuccess = (() => {
                const component = requestComponentID.result

                component.name = newName
                component.description = newDescription
                component.quantity = newQuantity
                component.category = newCategory
                component.imgName = newImgName
                component.imgBody = newImgBody

                const updateComponent = componentDB.put(component)

                updateComponent.onerror = (err) => {
                    console.error("Error with IndexedDB: ", err)
                    reject(err)
                }
            })

            transaction.oncomplete = (() => {
                db.close()
              })
        })

    } catch (err){
        console.error("Error with IndexedDB: ", err)
    }
}




// Set into MySQL DB