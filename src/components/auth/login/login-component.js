import React from 'react';
import './login-component.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
export class LoginComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {

            },
            error: {

            },
            isSubmitting: false,
            isValidForm: false,
            remember_me: false
        }
    }

    componentDidMount() {
        if (localStorage.getItem('remember_me')) {
            this.props.history.push('/dashboard');
        }
    }


    //either use handle change as an arrow function or bind it when calling it
    handleChange = (e) => {
        let { type, name, value, checked } = e.target;
        if (type === 'checkbox') {
            value = checked;
            this.rememberMe(value)
        }

        // this.setState({
        //     [name]: value
        // });
        this.setState((preState) => ({
            data: {
                ...preState.data,
                [name]: value
            }
        }), () => {
            // callback block
            this.validateForm(name);
        })

        // setState is used to change current state
        // anytime we call setState our render block is re called
        // this.state.username = e.target.value
    }



    rememberMe(val) {
        console.log('val>>', val)
        /// web storage
        localStorage.setItem('remember_me', val)
    }

    validateForm(fieldName) {
        let errMsg;
        switch (fieldName) {
            case 'username':
                errMsg = this.state[fieldName]
                    ? ''
                    : 'Username is required'
                break;
            case 'password':
                errMsg = this.state[fieldName]
                    ? this.state[fieldName].length > 6
                        ? ''
                        : 'Weak Password'
                    : 'Password is required'
                break;

            default:
                break;
        }

        this.setState((pre) => ({
            error: {
                ...pre.error,
                [fieldName]: errMsg
            }
        }))

    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })

        axios.post(
            'http://localhost:3030/api/new/login',
            this.state.data,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                params: {},
                responseType: 'json'
            }
        )
            .then(response => {
                console.log('success in axios call>>', response)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                this.props.history.push('/dashboard')

            })
            .catch(err => {
                console.log('failure in axios', err.response)
                this.setState({
                    isSubmitting: false
                })
            })
    };

    render() {
        let btn = this.state.isSubmitting
            ? <button disabled={true} className="btn btn-info">Loging in...</button>
            : <button type="submit" className="btn btn-success">  Login  </button>

        return <div className="container">
            <div className="row  justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center">Login</h2>
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <br></br>
                        <label htmlFor="username">Username</label>
                        <input className="form-control" id="username" type="text" placeholder="username" name="username" onChange={this.handleChange}></input>
                        <p className="danger">{this.state.usernameErr}</p>
                        <label htmlFor="password">Password</label>
                        <input className="form-control" id="password" type="password" placeholder="********" name="password" onChange={this.handleChange}></input>
                        <p className="danger">{this.state.passwordErr}</p>
                        <div className="form-check">
                            <input className="form-check-input" id="rememberME" type="checkbox" onChange={this.handleChange}></input>
                            <label htmlFor="rememberME">Rembember Me</label>
                        </div>
                        <br></br>
                        {btn}
                        <br></br>
                        <br></br>
                        <p>
                            <Link to="./index.html">forgot password?</Link>
                        </p>
                        <p>
                            Don't have an account? <Link to="/register"> Register here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    }
}