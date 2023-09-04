

export function setComponentLocal(component, newName, newDescription, newQuantity, newCategory, newImg){
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

            const requestComponentID = componentDB.get(component.id)

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
                component.img = newImg

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