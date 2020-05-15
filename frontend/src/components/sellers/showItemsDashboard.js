import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import { setGetitems } from '../../redux/actions/sellerActions';
import { useSelector, useDispatch } from 'react-redux'
const ShowItemsDashboard = () => {

   // const dispatch = useDispatch()
    const [_data, set_data] = React.useState([]);
    useEffect(() => {
        const url = '/api/item/getItems';

        axios.get(url)
            .then(res => {
            console.log(res.data);
            //dispatch(setGetitems(res.data))
            set_data(res.data)
            })
            .catch((e) => console.log(e));
        
        console.log(_data)
    },[])

    return(
            <div>
              <br/> <br/>
              <div class="row mx-md-n5">
                        { _data && _data.map((items) => (
                            <div class = "col px-md-3">
                                <div class="p-3 border rounded text-center" className='item_box' key={items._id}>
                                <p>Item Name: {items.name}</p> 
                                <p>Price: {items.price}</p>
                                <p>Description: {items.description}</p>
                                <p>Quantity: {items.quantity}</p>
                                <Button>Edit</Button> <br/> <br/>
                                <Button variant="danger"> Delete </Button>
                            </div>
                        </div>
                        ))
                        }
                </div>
            </div>
        )
}
        
export default ShowItemsDashboard; 

