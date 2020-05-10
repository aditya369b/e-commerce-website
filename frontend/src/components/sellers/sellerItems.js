import React, { Component } from 'react'
import SellerDashboard from './SellerDashboard'
import ItemsDashboard from './ItemsDashboard'
import { Button } from 'react-bootstrap'

const SellerItems = () => {
    
    //True = sell page, False = list page
  const [page_state, set_page_state] = React.useState(true);  

    const pg_state = () => {
        if (page_state == false){
        set_page_state(true);
        }
        if (page_state == true){
        set_page_state(false);
        }
    }

    if(page_state == true){
        return(
            <div>
                <div>
                    <button onClick={pg_state}>List Items</button>
                    <ItemsDashboard/>
                </div> 
            </div>
        )
    
    }
    if(page_state == false){
        return(
            <div>
                <div>
                    <button onClick={pg_state}>Sell Items</button>
                    <SellerDashboard/>
                </div> 
            </div>
        )
    }
}

export default SellerItems;