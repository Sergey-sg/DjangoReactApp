import React , { Component } from "react";
import CustomersService from "./CustomersService";


const customersService = new CustomersService();


class CustomerCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const params = parseInt(window.location.href.split('/')[4]);
        console.log(typeof params, params);
        if (params && typeof params === 'number') {
            console.log('in get customer')
            customersService.getCustomer(params).then((customer) => {
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
        const params = parseInt(window.location.href.split('/')[4]);
        if (params && typeof params === 'number') {
            this.handleUpdate(params);
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
                    <input className="form-control" type="text" ref="first_name" />

                    <label>Last Name:</label>
                    <input className="form-control" type="text" ref="last_name" />

                    <label>Phone:</label>
                    <input className="form-control" type="text" ref="phone" />

                    <label>Email:</label>
                    <input className="form-control" type="text" ref="email" />

                    <label>Address:</label>
                    <input className="form-control" type="text" ref="address" />

                    <label>Description:</label>
                    <textarea className="form-control" type="text" ref="description"></textarea>

                    <input className="btn btn-primary" type="submit" value="Submit"/>
                </div>    
            </form>
        );
    }
}

export default CustomerCreateUpdate;