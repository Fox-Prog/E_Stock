
// Set into Vuex
export function setComponent(store, id, newName, newDescription, newQuantity, newCategory, newImgName, newImgBody){

    let playload = {
        id: id,
        name: newName,
        description: newDescription,
        quantity: newQuantity,
        category: newCategory,
        imgName: newImgName,
        imgBody: newImgBody
    }
    store.dispatch('setComponent', playload)

    setComponentLocal(id, newName, newDescription, newQuantity, newCategory, newImgName, newImgBody)
}



// Set into IndexedDB

export function setComponentLocal(id, newName, newDescription, newQuantity, newCategory, newImgName, newImgBody){
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