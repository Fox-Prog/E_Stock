// Insert into Vuex


export function addCategoryVuex(store, id, name, color){
    let newCatt = {
        id: id,
        name: name,
        color: color
    }
    store.dispatch("addCatt", newCatt)
}




// Insert into IndexedDB

export function addCategoryLocal(id, name, color){
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

            categoryDB.put({
                id: id, 
                name: name, 
                color: color
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