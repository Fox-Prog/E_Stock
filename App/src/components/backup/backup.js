

export async function backup(store){
    const components = store.state.composants
    const category = store.state.catts

    for(let c in components){
        console.log(components[c]);
    }
}