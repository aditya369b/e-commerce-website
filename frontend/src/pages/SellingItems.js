import React, {Component} from "react";
import './css_files/SellingItems.css';
import { connect } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import {
  setItems
} from "../redux/actions/itemsActions";
import { Redirect } from "react-router-dom"


/** Buyer/Seller  dashboard */ 

const SellingItems = () => {
  
  const [items, set_item] = React.useState([]);

  // possibly use for redux purposes
  const [price, set_item_price] = React.useState(0);
  const [quantity, set_item_quantity] = React.useState(0);
  const [description, set_item_description] = React.useState("");

  const get_item = () => {

    //more modification needed//
    //testing purposes only//
    const url = 'http://localhost:3004/api/inventory/getItem';
    const body = {
      params: {
        name: 'test_user'
      }
    }
    ////////////////////

    //axios.get
    axios.get(url, body)
    .then((response) => {
      // console.log(response.data);
      // set_item([...items, response.data]); //don't use, doubles inserts - need to figure out
      set_item(response.data);
      
    })
    .catch((e) => console.log(e));
  }
    
  return (
    <div className='SellingItem'>
      <img src={require('./images/mocha_small.png')}></img>
      <h1> Seller's Product Page </h1>
      <div>
        <br></br>
      {
        items.map((item, index) => (
          <div className='item_box' key={index}>
            <p>ID: {item._id}</p> 
            <p>Price:{item.price}</p> 
            <p>Description: {item.description}</p>
          </div>
        ))
      }
      </div>
      <button onClick={get_item}> Get User </button>
    </div>
  );
};

export default SellingItems;
