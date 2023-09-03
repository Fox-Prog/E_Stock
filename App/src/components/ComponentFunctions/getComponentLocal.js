import { addComponentVuex } from '@/components/ComponentFunctions/addComponentVuex.js'


export async function getComponentLocal(store){
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
                const transaction = db.transaction("component", "readonly")
                const componentDB = transaction.objectStore("component")

                const requestAllData = componentDB.getAll()

                requestAllData.onsuccess = (() => {
                    const data = requestAllData.result
                    for(let r in data){
                        addComponentVuex(store, data[r].id, data[r].name, data[r].description, data[r].quantity, data[r].category, data[r].img)
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