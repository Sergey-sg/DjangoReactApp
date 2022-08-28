import React , { Component } from "react";
import CustomersService from "./CustomersService";

import { Link, useParams } from 'react-router-dom';

const customersService = new CustomersService();


class CustomerCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const {match: {params}} = this.props;
        if (params && params.pk) {
            customersService.getCustomer(params.pk).then((customer) => {
                this.refs.first_name.value = customer.first_name;
                this.refs.last_name.value = customer.last_name;
                this.refs.email.value = customer.email;
                this.refs.phone.value = customer.phone;
                this.refs.address.value = customer.address;
                this.refs.description.value = customer.description;
            });
        }
    }

    handleCreate(){
        customersService.createCustomer(
            {
                "first_name": this.refs.first_name.value,
                "last_name": this.refs.last_name.value,
                "email": this.refs.email.value,
                "phone": this.refs.phone.value,
                "address": this.refs.address.value,
                "description": this.refs.description.value,
            }).then((result)=>{
                alert("Customer created!");
            }).catch(()=>{
                alert("There was an error! Please re-check your form.");
            });
    }

    handleUpdate(pk){
        customersService.updateCustomer(
            {
                "pk": pk,
                "first_name": this.refs.first_name.value,
                "last_name": this.refs.last_name.value,
                "email": this.refs.email.value,
                "phone": this.refs.phone.value,
                "address": this.refs.address.value,
                "description": this.refs.description.value,
            }).then((result)=>{
                alert("Customer updated!")
            }).catch(()=>{
                alert("There was an error! Please re-check your form.")
            });
    }

    handleSubmit(event) {
        const { match: {params}} = this.props
        if (params && params.pk) {
            this.handleUpdate(params.pk);
        }
        else {
            this.handleCreate();
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input className="form-control" type="text" name="first_name" />

                    <label>Last Name:</label>
                    <input className="form-control" type="text" name="last_name" />

                    <label>Phone:</label>
                    <input className="form-control" type="text" name="phone" />

                    <label>Email:</label>
                    <input className="form-control" type="text" name="email" />

                    <label>Address:</label>
                    <input className="form-control" type="text" name="address" />

                    <label>Description:</label>
                    <textarea className="form-control" type="text" name="description"></textarea>

                    <input className="btn btn-primary" type="submit" value="Submit"/>
                </div>    
            </form>
        );
    }
}

export default CustomerCreateUpdate;