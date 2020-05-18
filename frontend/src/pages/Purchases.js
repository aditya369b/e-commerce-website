import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Button, ListGroup} from "react-bootstrap";
import '../stylesheets/Purchases.css' //temporary css update


const Purchases = () => {
    const [loading, setLoading] = React.useState(false);

    const [showHomePage, setToHomePage] = React.useState(false);

    const [purchases, setPurchases] = React.useState(
        { date1: ["item1", "item2"], date2: ["itemA", "itemB", "itemC"], date3: ["item99"], date4: ["someitem"] }
    ); //dumby object for now, change to null when properly plugged into database

    //Get the User's Items from Database
    axios.get('/api/inventory/getItem') //This need to be connected to real url for getting the items
        .then(res => {
            setLoading(false);
            setPurchases(res.data);
        })
        .catch(console.log);


    //Create list of purchases by date
    const dateList = Object.keys(purchases).map(dates => {
        return (
            <ListGroup value={dates}>
                <h4>{dates}</h4>
                {Object.keys(purchases[dates]).map(item => {
                    return (
                        <ListGroup.Item>{purchases[dates][item]}</ListGroup.Item>
                    );
                })}
            </ListGroup>
        );
    });


    if (showHomePage) {
        return <Redirect to="/" />;
    }
    else
        //Component Returned
        return (
            <div>
                <Button variant="outline-primary" onClick={() => { setToHomePage(true) }}>Back</Button>
                <div>
                    <h2 class="title">Your Purchase History</h2>
                    {loading === true && <h4>Loading Purchase History...</h4>}
                    {dateList}
                </div>
            </div>
        );
};

export default Purchases;