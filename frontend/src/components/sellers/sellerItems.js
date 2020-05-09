import React, { Component } from 'react'
import Dashboard from './SellerDashboard'
import ItemsDashboard from './ItemsDashboard'
import { Button } from 'react-bootstrap'

export default class SellerItems extends Component {
    constructor(props){
        super(props)
        this.state = {
            showForm: false,
            showItem: false
        }
        this.ShowForm = this.ShowForm.bind(this)
        this.ShowItem = this.ShowItem.bind(this)
    }

    ShowForm(e){
        this.setState({showForm: true})
        this.setState({showItem: false})
    }

    ShowItem(e){
        this.setState({showItem: true})
        this.setState({showForm: false})
    }


    render() {
        const showForm = this.state.showForm
        const showItem = this.state.showItem
        return (
            <div>
                <div>
                    <Button onClick={this.ShowForm}>ADD ITEMS</Button>
                     &emsp; &emsp;
                    <Button onClick={this.ShowItem}>SHOW ITEMS</Button>
                </div>            
                <br/>
                <div>
                    {showForm && 
                        <div>
                            <Dashboard/>
                        </div>
                    }

                    {showItem &&
                        <div>
                            <ItemsDashboard/>
                        </div>
                    }
                </div> 
                <br/>
                
            </div> 
        )
    }
}
