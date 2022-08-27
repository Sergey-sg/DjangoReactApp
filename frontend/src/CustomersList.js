import React, { Component } from 'react';
import CustomersService from './CustomersService';

const customersService = new CustomersService();

class CustomersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            nextPageURL: ''
        };
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        customersService.getCustomers().then(function (result) {
            this.setState({customers: result.data, nextPageURL: result.nextlink})
        });
    }

    handleDelete(e, pk) {
        customersService.deleteCustomer({pk: pk}).then(()=>{
            var newArr = this.state.customers.filter(function(obj) {
                return obj.pk !== pk;
            });
            this.setState({customers: newArr})
        });
    }

    nextPage(){
        customersService.getCustomersByURL(this.state.nextPageURL).then((result) => {
            this.setState({customers: result.data, nextPageURL: result.nextlink})
        });
    }

    render() {
        return (
            <div className='customers--list'>
                <table className='table'>
                    <thead key='thead'>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.customers.map( customer => 
                            <tr key={customer.pk}>
                                <td>{customer.pk}</td>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.email}</td>
                                <td>{customer.address}</td>
                                <td>{customer.description}</td>
                                <td>
                                    <button onClick={(e) => this.handleDelete(e, customer.pk) }>
                                        Delete
                                    </button>
                                    <a href={"/customer/" + customer.pk}>  {/* customers/ */}
                                        Update
                                    </a>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
                <button className='btn btn-primary' onClick={this.nextPage}>Next</button>
            </div>
        );
    }
}

export default CustomersList;