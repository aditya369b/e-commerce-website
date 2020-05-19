import axios from "axios";

export const setItemName = itemName => {
    return {
        type: 'SET_ITEM_NAME',
        payload: {
            name: itemName
        }
    }
}

export const setItemPrice = itemPrice => {
    return {
        type: 'SET_ITEM_PRICE',
        payload: {
            price: itemPrice
        }
    }
}

export const setItemQuantity = itemQuantity => {
    return {
        type: 'SET_ITEM_QUANTITY',
        payload: {
            quantity: itemQuantity
        }
    }
}

export const setItemDescription = itemDescription => {
    return {
        type: 'SET_ITEM_DESCRIPTION',
        payload: {
            description: itemDescription
        }
    }
}

export const setItemsAdded = (status) => {
    return{
        type: 'SET_ITEMS_ADDED',
        payload: {
            Status: status
        }
    }
}

export const setGetitems = (data) => {
    return{
        type:'GET_ITEMS',
        payload: {
            items: data
        }
    }
}

export const addItem = (dispatch, getState) => {
    console.log(getState())
    console.log("IN ADD ITEMS")
    const todaysdate = new Date()
    const data= {
        username: 'sanjay',
        name: getState().sellerReducer.itemName,
        price: getState().sellerReducer.itemPrice,
        quantity: getState().sellerReducer.itemQuantity,
        description: getState().sellerReducer.itemDescription,
        date: todaysdate.toLocaleString()
    }
    axios.post("/api/item/create", data)
    .then(res =>{
        if(res.data.valid){
            dispatch(setItemsAdded('true'))
            console.log(getState())
        }
        else{
            dispatch(setItemsAdded('false'))
        }
    })
    .catch(err => console.log(err))
}


