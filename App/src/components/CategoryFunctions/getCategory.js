// Get since IndexedDB and insert into Vuex

import { addCategory } from '@/components/CategoryFunctions/addCategory.js'


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
                        addCategory(store, data[r].id, data[r].name, data[r].color, false) // CREATE Vuex only
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