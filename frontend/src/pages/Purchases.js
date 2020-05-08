import React from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import './Purchases.css'


const Purchases = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);
    const [purchases, setPurchases] = React.useState(
        {p1:{name:1}, p2:{name:2}}
        ); //dumby object for now, change to null when properly plugged into database

    //Get the User's Items from Database
    axios.get('/api/inventory/getItem') //This url need to be connected to service
    .then(res =>{
        setLoading(false);
        setPurchases(res.data);
    })
    .catch(console.log);

    //Create list of purchases
    const list = Object.keys(purchases).map(item =>{
        return(
            <div class="item" value={item}>{purchases[item].name}</div>
        );
    })

    return(
        <div>
            <Button onClick={() => {history.goBack()} }>Back</Button>
            {loading === true && <h4>Loading Purchase History...</h4>}
            {list}
            <h2>Purchase History Page</h2>
        </div>
    );
};

export default Purchases;