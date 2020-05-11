import React, {Component} from "react";
// import axios from "axios";
// import {useHistory} from "react-router-dom";
import './css_files/ItemDescription.css';

const ItemDescription = () => {

    const [items] = React.useState([]);


//Returning Item Description Page
    return (
        <div class="itemPage">
            <div class="header">
            <h1>Item's Description</h1>
            </div>
            <div class="row">
            <button class="button1"> Back </button>
            </div>
            <div class="row">
                <div class="col-1">
                <img className="imgbox" src={require('./images/mocha.png')}></img>
                <h2 class="center">Mocha</h2>
                    <p>“Minutes later the waitress brought back a cup the size of a soup bowl filled with steaming chocolate-flavored coffee and topped with whipped cream and chocolate shavings. Tianna realized she hadn't eaten anything since the bite of muffin early in the morning.
                        She sipped the brew, enjoying the rich, sweet taste, and listened to Serena recite a poem about her demon lover. It made Tianna think more than ever that Serena was some kind of witch or worse. How could she know so much about temptation and choosing between good and evil? The words sent chills through Tianna.”
                        ― Lynne Ewing, The Lost One </p>
                </div>
                <div class="col-2">
                    <button class="button"> Buy Now! </button>
                    <p class="rcorner1"> Counter: # Buyers are watching</p>
                </div>

                {/* Newsfeed */}
                <aside>
                <h2>Newsfeed:</h2>
                    <h4>Date    new update occurred</h4>    
                </aside>
            </div>
            <div class="row">
            <div>
                <p class="rcorner"> Counter: # People Bought this product</p>
            </div>
            </div>
        </div>
    );
};


export default ItemDescription;

