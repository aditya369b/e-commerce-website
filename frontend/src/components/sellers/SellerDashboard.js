import React, {  useState } from 'react';
import axios from 'axios';

const SellerDashboard = () => {

    const [item, set_item] = React.useState([]);

    const handler = (e) => {
        // alert("Price: " + item.item_price + " Name: " + item.item_name + " Quantity: " + item.item_quantity + " Description: " + item.item_description);
        e.preventDefault();
        axios.post("http://localhost:3004/api/inventory/create", item)
        .then(res  => console.log(res))
        .catch(err => {
            if(err.response){
                console.log("Response error")
            }
            else if(err.request){
                console.log("request error")
            }
        });    
      }

      return (
        <form onSubmit={handler}>
          <div>
            <div>
              <input type='text' placeholder="item Name" value={item.username} onChange={e => set_item({... item, username: e.target.value})}/>
            </div>
            <div>
              <input type='text' placeholder="item Name" value={item.name} onChange={e => set_item({... item, name: e.target.value})}/>
            </div>
            <div>
              <input type='text' placeholder="item Price"value={item.price} onChange={e => set_item({... item, price: e.target.value})}/>
            </div>
            <div>
              <input type='text' placeholder="item Quantity"value={item.desc} onChange={e => set_item({... item, desc: e.target.value})}/>
            </div>
            <div>
              <input type='text' placeholder="item Description"value={item.date} onChange={e => set_item({... item, date: Date()})}/>
            </div>
          </div>
          <div>
            <h4> Item Username - {item.username}</h4>
            <h4> Item Name - {item.name}</h4>
            <h4> Item Price - {item.item_price}</h4>
            <h4> Item Description - {item.item_description}</h4>
            <h4> Item Date - {item.date}</h4>
            <button type="submit">Submit</button>
          </div>
        </form>
      )
    
};

export default SellerDashboard;
