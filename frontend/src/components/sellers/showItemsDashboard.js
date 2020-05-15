import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import * as actions from '../../redux/actions/sellerActions';
import { useSelector, useDispatch } from 'react-redux'
const ShowItemsDashboard = (props) => {

    const dispatch = useDispatch()
    const edit = useSelector(state => state.editItems)
    const update = useSelector(state => state.updateItems)
    const [_data, set_data] = React.useState([]);
    useEffect(() => {
        const url = '/api/item/getItems';

        axios.get(url)
            .then(res => {
            console.log(res.data);
            dispatch(setGetItems(res.data))
            set_data(res.data)
            })
            .catch((e) => console.log(e));
        
        console.log(_data)
    },[])

    return(
            <div>
              <br/> <br/>
                <div className="row mx-md-n5">
                        { _data && _data.map((items) => (
                            <div className = "col px-md-3" key={items._id}>
                                <div className="p-3 border rounded text-center" >
                                {update ? <input value= {props.itemName} onChange= {e => dispatch(actions.setItemName(e.target.value))} /> : <p>Item Name: {items.name}</p>} 
                                {update ? <input value= {props.itemPrice} onChange= {e => dispatch(actions.setItemPrice(e.target.value))} /> : <p>Price: {items.price}</p>}
                                {update ? <input value= {props.itemDescription} onChange= {e => dispatch(actions.setItemDescription(e.target.value))} /> : <p>Description: {items.description}</p>}
                                {update ? <input value= {props.itemQuantity} onChange= {e => dispatch(actions.setItemQuantity(e.target.value))} /> :<p>Quantity: {items.quantity}</p>}
                                
                                { edit && <div> <Button onClick = {() => {dispatch(actions.setEditItems()); dispatch(actions.setUpdateItems())}}> Edit </Button><br/><br/> </div>} 
                            
                                { update && <div> <Button onClick = {() => {dispatch(actions.setEditItems()); dispatch(actions.setUpdateItems())}}> Update </Button><br/><br/> </div>} 
                
                                <Button variant="danger"> Delete </Button>
                            </div>
                        </div>
                        ))
                        }
                </div>

            </div>
        )
}
        

const mapStateToProps = (state) => ({
    
    itemName: state.sellerReducer.itemName,
    itemPrice: state.sellerReducer.itemPrice,
    itemQuantity: state.sellerReducer.itemQuantity,
    itemDescription: state.sellerReducer.itemDescription,
    itemsAdded: state.sellerReducer.itemsAdded
    
})
export default ShowItemsDashboard; 

