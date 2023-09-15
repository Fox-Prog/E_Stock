const prefix = 'V1'
const cache_files = [
    'http://localhost:8080/index.html',
    'http://localhost:8080/manifest.json',

    'http://localhost:8080/icons/ico.ico',
    'http://localhost:8080/icons/icon512.png',
    'http://localhost:8080/icons/icon192.png',

    'http://localhost:8080/images/bgNew.jpg',
    'http://localhost:8080/images/chip.png',
    'http://localhost:8080/images/empty.png',

    'http://localhost:8080/js/chunk-vendors.js',
    'http://localhost:8080/js/app.js',
    'http://localhost:8080/js/webfontloader.js',
    'http://localhost:8080/fonts/materialdesignicons-webfont.68358e87.woff2',
    'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap',
    'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.woff2',
    'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2',
    'https://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1MmgVxIIzI.woff2',
    'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fBBc4.woff2',
    'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc4.woff2'
]




// Ecoute l'évenement install sur le sw
self.addEventListener('install', (event) => {  
    // Active directement le sw
    self.skipWaiting()

    // Met en pause l'install du sw et attend la résolution de la promise
    event.waitUntil((async () => {
        const cache = await caches.open(prefix) // Ouvre le cache avec la clé de cache = prefix
        await cache.addAll(cache_files)

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
    
    // console.log(`${prefix} Fetching: ${event.request.url}, Mode: ${event.request.mode}`)

    if(event.request.mode === 'navigate'){      // Intercepte la requête pour ajouter des comportements
        console.log("NAVIGATE")
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
    } else if(cache_files.includes(event.request.url)){     // Si le fichiers requeté est déjà dans le cache
        console.log("FIND")
        event.respondWith(caches.match(event.request))
    } else {
        console.log("NOT FIND")
        console.log(event.request.url)
    }
})

