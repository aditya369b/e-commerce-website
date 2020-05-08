import React from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import './Purchases.css'


const Purchases = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);
    const [purchases, setPurchases] = React.useState(
        {date1:["item1", "item2"], date2:["item1", "item2"]}
        ); //dumby object for now, change to null when properly plugged into database

    //Get the User's Items from Database
    axios.get('/api/inventory/getItem') //This need to be connected to real url for getting the items
    .then(res =>{
        setLoading(false);
        setPurchases(res.data);
    })
    .catch(console.log);

    
    //Create html for each purchase
    function purchaseByDate(dates){
        const date = purchases[dates];
        return(
            date.forEach(item =>{
                return(
                    <div class="item">{date[item]}</div>
                );
            })
        );
    };
    //Create list of purchases by date
    const dateList = Object.keys(purchases).map(dates =>{
        return(
            <div class="date" value={dates}>
                {dates}

                <div class="items">{Object.keys(purchases[dates]).map(item =>{
                    return (
                        <div class="item">{purchases[dates][item]}</div>
                    );
                })}</div>

            </div>
        );
    });



    //Component Returned
    return(
        <div class="purchaseComponent">
            <Button onClick={() => {history.goBack()} }>Back</Button>
            <h2>Purchase History</h2>
            {loading === true && <h4>Loading Purchase History...</h4>}
            {dateList}
        </div>
    );
};

export default Purchases;