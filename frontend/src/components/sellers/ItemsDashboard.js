import React, { Component } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'

export default class ItemsDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        axios.post("/api/item/getInfo",{
            "username" : "aditya"
        })
        .then(items => { 
            
            this.setState({data: items.data.result})
        })
        .catch(err => console.log(err))
        console.log(this.state.data)
    }
    

    render() {
        const dataitems = this.state.data
        console.log(dataitems)

    return(
            <div>
                <Table striped bordered hover>  
                    <thead>
                        <tr>
                            <th> Item Name </th> 
                            <th> Item Price </th> 
                            <th> Item Date </th> 
                            <th> Item Description </th> 
                        </tr>
                    </thead>    
                    <tbody>
                        {this.state.data && dataitems.map((items) => (
                            <tr key= {items._id} >
                                <td> {items.itemDetails.itemName} </td> 
                                <td> {items.itemDetails.itemPrice} </td>
                                <td> {items.itemDetails.itemDate} </td>
                                <td>{items.itemDetails.itemDesc} </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                
            </div>
        )
    }
        
 }

