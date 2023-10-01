const prefix = 'V1'
const cache_files = [
    'http://localhost:8080/index.html',
    'http://localhost:8080/manifest.json',

    'http://localhost:8080/icons/ico.ico',
    'http://localhost:8080/icons/icon512.webp',
    'http://localhost:8080/icons/icon192.webp',

    'http://localhost:8080/images/bgNew.webp',
    'http://localhost:8080/images/bgBackup.webp',
    'http://localhost:8080/images/cog.webp',
    'http://localhost:8080/images/chip.webp',
    'http://localhost:8080/images/empty.webp',
    'http://localhost:8080/images/wind.webp',
    'http://localhost:8080/images/offline.webp',
    'http://localhost:8080/images/save.webp',
    'http://localhost:8080/images/restore.webp',
    'http://localhost:8080/images/flag/de.webp',
    'http://localhost:8080/images/flag/en.webp',
    'http://localhost:8080/images/flag/es.webp',
    'http://localhost:8080/images/flag/fr.webp',
    'http://localhost:8080/images/flag/it.webp',

    'http://localhost:8080/js/chunk-vendors.js',
    'http://localhost:8080/js/app.js',
    'http://localhost:8080/js/webfontloader.js',
    'http://localhost:8080/fonts/materialdesignicons-webfont.68358e87.woff2'
]



// Ecoute l'évenement install sur le sw
self.addEventListener('install', (event) => {  
    // Active directement le sw
    self.skipWaiting()

    // Met en pause l'install du sw et attend la résolution de la promise
    event.waitUntil((async () => {
        const cache = await caches.open(prefix) // Ouvre le cache avec la clé de cache = prefix
        try{
            await cache.addAll(cache_files)
        } catch(error){
            console.log(error);
        }

    })())   // Auto appel de la fonction ()

    console.log(`${prefix} Install`)
})







// Ecoute l'évenement activate sur le sw
self.addEventListener('activate', (event) => {  
    // Active directement le sw
    clients.claim() 

    event.waitUntil((async() => {
        const keys = await caches.keys()
        await Promise.all(                  // On attend que les anciennes clé soit supprmiées
            keys.map(key => {
                if(!key.includes(prefix)){
                    return caches.delete(key)
                }
            })
        )
    })()) // Auto appel de la fonction ()

    console.log(`${prefix} Activate`)
})




// Ecoute l'évenement fetch sur le sw
self.addEventListener('fetch', (event) => { 
    
    console.log(`${prefix} Fetching: ${event.request.url}, Mode: ${event.request.mode}`)

    if(event.request.mode === 'navigate'){      // Intercepte la requête pour ajouter des comportements
        event.respondWith((async () => {
            try {   
                // Online
                const preloadResponse = await event.preloadResponse
                if (preloadResponse){
                    return preloadResponse
                }

                return await fetch(event.request)      // Comportement habituel, charge l'app
            } catch(e) {
                // Offline
                const cache = await caches.open(prefix)     // Ouvre le cache avec la clé de cache = prefix
                return await cache.match('/index.html')   
            }
        })())   // Auto appel de la fonction ()

    } 
    else if(cache_files.includes(event.request.url) && !event.request.url.includes('.hot-update.')){     // Si le fichiers requeté est déjà dans le cache
        console.log("FROM CACHE")
        try{
            event.respondWith(caches.match(event.request))
        } catch(error){
            console.log(error)
        }
    } 

    if(event.request.url.includes('hot-update')){
        console.log("HOT-UPDATE...")
        try{
            return event
        
        } catch(error){
            console.log("hot-update error: ",error)
        }
    }
})


