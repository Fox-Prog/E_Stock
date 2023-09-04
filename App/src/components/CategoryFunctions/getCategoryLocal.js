import { addCategoryVuex } from '@/components/CategoryFunctions/addCategoryVuex.js'


export async function getCategoryLocal(store){
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB
    
    return new Promise((resolve, reject) => {
        try{
            const request = indexedDB.open("ESS", 1)

            request.onerror = (err) => {
                console.error("Error with IndexedDB: ", err)
                reject(err)
            }

            request.onsuccess = (() => {
                const db = request.result
                const transaction = db.transaction("category", "readonly")
                const categoryDB = transaction.objectStore("category")

                const requestAllData = categoryDB.getAll()

                requestAllData.onerror = (err) => {
                    console.error("Error with IndexedDB: ", err)
                    reject(err)
                }

                requestAllData.onsuccess = (() => {
                    const data = requestAllData.result
                    for(let r in data){
                        addCategoryVuex(store, data[r].id, data[r].name, data[r].color)
                        resolve()   
                    }
                })
            })



        } catch(err){
            console.error("Error with IndexedDB: ", err)
            reject(err)
        }
    })
}