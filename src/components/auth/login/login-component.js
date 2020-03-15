import React from 'react';
import './login-component.css'
export class LoginComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            usernameErr: '',
            passwordErr: '',
            isSubmitting: false,
            isValidForm: false,
            remember_me: false
        }
    }

    handleChange(e) {
        let { type, name, value, checked } = e.target;
        if (type === 'checkbox') {
            value = checked;
        }

        // this.setState({
        //     [name]: value
        // });
        this.setState((preState) => ({
            [name]: value
        }), () => {
            // callback block
            this.validateForm(name);
        })

        // setState is used to change current state
        // anytime we call setState our render block is re called
        // this.state.username = e.target.value
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

        this.setState({
            [fieldName + 'Err']: errMsg
        })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })
        setTimeout(() => {
            this.setState({
                isSubmitting: false
            })
        }, 2000)
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
                        <p className="danger">{this.state.usernameErr}</p>                        <br></br>
                        <label htmlFor="password">Password</label>
                        <input className="form-control" id="password" type="password" placeholder="password" name="password" onChange={this.handleChange}></input>
                        <p className="danger">{this.state.usernameErr}</p>                        <br></br>
                        <div className="form-check">
                            <input className="form-check-input" id="rememberME" type="checkbox" onChange={this.handleChange}></input>
                            <label htmlFor="rememberME">Rembember Me</label>
                        </div>
                        <br></br>
                        {btn}
                        <br></br>
                        <br></br>
                        <p>
                            <a href="./index.html">forgot password?</a>
                        </p>
                        <p>
                            Don't have an account? <a href="./index.html"> Register here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    }
}