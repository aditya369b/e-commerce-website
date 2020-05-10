import React, {Component} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import './css_files/ItemDescription.css';

const ItemDescription = () => {

    const [items] = React.useState([]);


//Returning Item Description Page
    return (
        <div>
            <Button OnClick={() => {history.goBack()} }>Back</Button>
            <div class="ItemDescription">
                <h2 class="title">Item's Page</h2>
            </div>
            

        </div>
    )
};


export default ItemDescription;