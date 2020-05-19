import React from 'react'
import AddItemsDashboard from './addItemsDashboard'
import ShowItemsDashboard from './showItemsDashboard'
import { Button } from 'react-bootstrap'

const SellersDashboard = () => {
    
    //True = sell page, False = list page
    const [addItem_page_state, set_addPage_state] = React.useState(false);  
    const [showItem_page_state, set_showPage_state] = React.useState(true);

        const add_pg_state = () => {
            set_addPage_state(true);
            set_showPage_state(false);
        }

        const items_pg_state = () => {
            set_showPage_state(true);
            set_addPage_state(false)
        }

        return(
            <div>
                <div> <br/>
                    <Button onClick={add_pg_state}>Add Items</Button> &emsp;
                    <Button onClick={items_pg_state}>List Items</Button> &emsp;
                </div> 

                <div>
                    {addItem_page_state && <AddItemsDashboard/>}
                    {showItem_page_state && <ShowItemsDashboard/>}
                </div>
            </div>
        )
    
  }
    

export default SellersDashboard;