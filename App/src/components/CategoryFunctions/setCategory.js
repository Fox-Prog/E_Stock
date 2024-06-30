// Set into Vuex
export function setCategory(store, id, newName, newColor){
    const playload = {
        id:id,
        name:newName,
        color:newColor
    }
    store.dispatch('setCategory', playload)

    setCategoryLocal(id, newName, newColor)
}

// Set into IndexedDB
export function setCategoryLocal(id, newName, newColor){
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

            const requestCategoryID = categoryDB.get(id)

            requestCategoryID.onerror = (err) => {
                console.error("Error with IndexedDB: ", err)
                reject(err)
            }

            requestCategoryID.onsuccess = (() => {
                const category = requestCategoryID.result

                category.name = newName
                category.color = newColor

                const updateCategory = categoryDB.put(category)

                updateCategory.onerror = (err) => {
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
