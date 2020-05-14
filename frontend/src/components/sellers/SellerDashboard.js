import React, { Component } from 'react';
import axios from 'axios';
import { Input,TextArea,Form,Button } from 'semantic-ui-react'

export default class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
                item_name: "",
                item_price: "",
                item_quantity: "",
                item_description: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        let name = e.target.id
        let val = e.target.value
        this.setState({ [name]: val })
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state)
            axios.post("/api/inventory/create",this.state)
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
    

    render() {
        return (        
        <Form onSubmit={this.handleSubmit}>

            <div>
                <Input label="Item Name" type="text" id="item_name" onChange={this.handleChange} value={this.state.item_name} />
            </div>
            <br />
            <div>
                
                <Input label="Item Price" type="text" id="item_price" onChange={this.handleChange} value={this.state.item_price} />
            </div>
            <br/>
            <div>
                
                <Input label="Item Quantity" type="text" id="item_quantity" onChange={this.handleChange} value={this.state.item_quantity}/>
            </div>
            <br />
            <div>
                
                <Form.Field control={TextArea} label="Item Description" style={{ width: 500 }} rows={3} id="item_description" onChange={this.handleChange} value={this.state.item_description}/>
            </div>
            <br />
            <div>
                <Button positive onClick={this.handleSubmit}>Add Item</Button>
            </div>
        </Form>);
    }
}
