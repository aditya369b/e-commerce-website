import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'

const ItemsDashboard = () => {

    const [_data, set_data] = React.useState([]);

    useEffect (() => {

        //more modification needed//
        //testing purposes only/////
        const url = 'http://localhost:3004/api/inventory/getInfo';
        const body = {
          params: {
            name: 'test_user'
          }
        }
        
        axios.get(url, body)
        .then((response) => {
          set_data(response.data);
        })
        .catch((e) => console.log(e));
      })

    return(
            <div>
                <Table striped bordered hover>  
                    <thead>
                        <tr>
                            <th> Item Name </th> 
                            <th> Item Price </th> 
                            <th> Item Quantity </th> 
                            <th> Item Description </th> 
                        </tr>
                    </thead>    
                    <tbody>
                        {
                        _data.map((item, index) => (
                            <div className='item_box' key={index}>
                              <p>ID: {item.name}</p> 
                              <p>Price: {item.price}</p>
                              <p>Description: {item.desc}</p>
                              <p>Date Listed: {item.date}</p>
                              <p>URL: {item.URL}</p>
                            </div>
                        ))
                        }
                    </tbody>
                </Table>
                
            </div>
        )
}
        
export default ItemsDashboard; 

