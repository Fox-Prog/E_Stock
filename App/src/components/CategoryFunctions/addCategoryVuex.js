// Insert into Vuex


export function addCategoryVuex(store, id, name, color){
    let newCatt = {
        id: id,
        name: name,
        color: color
    }
    store.dispatch("addCatt", newCatt)
}