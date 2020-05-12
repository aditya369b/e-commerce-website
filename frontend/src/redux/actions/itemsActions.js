export const setItems = items => ({
    type: 'USER_SET_ITEMS',
    items,
});
 

export const buyItem= (id, items) => (dispatch, getState) => {
    console.log("Buying item for item id" + id);        
    let itemLists = JSON.parse(JSON.stringify(items));
    let i = 0
    for (i = 0; i < itemLists.length; i++) {
        if (itemLists[i].id == id) {
            console.log("Buying the item for you")
            itemLists[i].itemCount = parseInt(itemLists[i].itemCount) - 1
            console.log(itemLists)
            dispatch(setItems(itemLists))
            break;
        }
        
    }

}

