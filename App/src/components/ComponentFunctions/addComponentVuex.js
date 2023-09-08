// Insert into Vuex


export function addComponentVuex(store, id, name, description, quantity, category, img){
    let newComponent = {
        id: id,
        name: name,
        description: description,
        quantity: quantity,
        category: category,
        img: img
    }
    store.dispatch("addComposant", newComponent)
}