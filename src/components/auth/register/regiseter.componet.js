import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const defaultForm = {
    name: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    gender: '',
    dob: '',
    address: '',

}

export default class RegiseterComponet extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            isSubmitting: false,
            isValidForm: false
        };
    }

    handelChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            data: {
                ...prevState.data,
                [name]: value
            }
        }), () => {
            this.validateForm(name);
        })
    }
    validateForm(fieldName) {
        let err;
        switch (fieldName) {
            case 'username':
                err = this.state.data[fieldName]
                    ? this.state.data[fieldName].length > 6
                        ? ''
                        : 'Username must be 6 characters'
                    : 'Username is required'
                break;
            case 'password':
                err = this.state.data[fieldName]
                    ? this.state.data[fieldName].length > 6
                        ? ''
                        : 'Weak Password'
                    : 'Password is required'
                break;
            case 'email':
                err = this.state.data[fieldName]
                    ? this.state.data[fieldName].includes('@')
                        ? ''
                        : 'Invalid Email'
                    : 'Email is required'
                break;
            default:
                break;
        }

        this.setState((pre) => ({
            error: {
                ...pre.error,
                [fieldName]: err
            }
        }), () => {
            //check for valid form or not    
            // check for valid form or not
            const { error } = this.state;
            const errors = Object
                .values(error)
                .filter(err => err);
            console.log('error is >>', errors);
            //    var abc= errors.filter(function(item,i){
            //         if(item){
            //             return true;
            //         }
            //     });
            //     console.log('abc ><>',abc);
            let isValidForm = errors.length === 0;
            this.setState({
                isValidForm
            });
        })
    }

    handelSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })

        axios.post('http://localhost:3030/api/new/register)',
            this.state.data,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                params: {},
                responseType: 'json'
            }
        )
            .then((data) => {
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(this.state.datanp)
                console.log('err should be handled properly', err)
                this.setState({
                    isSubmitting: false
                });
            })
    }


    render() {
        let btn = this.state.isSubmitting
            ? <button disabled={true} className="btn btn-info"> Submitting</button>
            : <button type="submit" className="btn btn-success" disabled={!this.state.isValidForm}>  Submit </button>
        return (
            <div>
                <h2>Regiseter</h2>
                <p> Plese provied required information</p>
                <form className="form-group" onSubmit={this.handelSubmit}>
                    <label>Name</label>
                    <input type="text" placeholder="Name" name="name" className="form-control" onChange={this.handelChange}></input>
                    <p className="danger">{this.state.error.name}</p>
                    <label>Username</label>
                    <input type="text" placeholder="Username" name="username" className="form-control" onChange={this.handelChange}></input>
                    <p className="danger">{this.state.error.username}</p>
                    <label>Email</label>
                    <input type="text" placeholder="Email" name="email" className="form-control" onChange={this.handelChange}></input>
                    <p className="danger">{this.state.error.email}</p>
                    <label>Password</label>
                    <input type="password" placeholder="********" name="password" className="form-control" onChange={this.handelChange}></input>
                    <p className="danger">{this.state.error.password}</p>
                    <label>Gender</label>
                    <ul>
                        <li><input type="radio" placeholder="Gender" name="gender" value="male" onChange={this.handelChange}></input>Male </li>
                        <li><input type="radio" placeholder="Gender" name="gender" value="female" onChange={this.handelChange}></input> Female</li>
                        <li><input type="radio" placeholder="Gender" name="gender" value="others" onChange={this.handelChange}></input> Others</li>
                    </ul>
                    <br></br>
                    <label>Address</label>
                    <input type="text" placeholder="Address" name="address" className="form-control" onChange={this.handelChange}></input>
                    <br></br>
                    <label>Phone Number</label>
                    <input type="text" placeholder="PhoneNumber" name="phoneNumber" className="form-control" onChange={this.handelChange}></input>
                    <br></br>
                    <label>Date of Birth</label>
                    <input type="text" placeholder="DOB" name="dob" className="form-control" onChange={this.handelChange}></input>
                    <br></br>
                    <br></br>
                    {btn}
                </form>
                <p>Already Registerd?</p>
                <p>Back to <Link to="/">login</Link></p>
            </div>
        )
    }
}
