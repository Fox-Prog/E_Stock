// Insert into Vuex


export function addComponent(store, id, name, description, quantity, category, imgName, imgBody, localDB){
    let newComponent = {
        id: id,
        name: name,
        description: description,
        quantity: quantity,
        category: category,
        imgName: imgName,
        imgBody: imgBody
    }
    store.dispatch("addComposant", newComponent)

    if(localDB){
        addComponentLocal(id, name, description, quantity, category, imgName, imgBody)
    }
}



// Insert into IndexedDB

function addComponentLocal(id, name, description, quantity, category, imgName, imgBody){
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

            componentDB.put({
                id: id, 
                name: name, 
                description: description,
                quantity: quantity,
                category: category,
                imgName: imgName,
                imgBody: imgBody
            })

            transaction.oncomplete = (() => {
                db.close()
              })
        })
    } catch (err){
        console.error("Error with IndexedDB: ", err)
    }
}



// Insert into MySQL DB