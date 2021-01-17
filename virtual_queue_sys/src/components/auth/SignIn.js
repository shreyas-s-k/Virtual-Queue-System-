import React, { Component } from 'react'
import { userLogin } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
    state = {
        id: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.userLogin(this.state)
    }
    render() {
        if (this.props.login_status) { return <Redirect to='/' /> }
        return (
            <div className="signin container form-rounded col-sm-3 mt-5">
                <form onSubmit={this.handleSubmit} className="form-control shadow">
                    <h4 className="col-sm-4 text-dark mt-2">Sign In</h4>
                    <hr />
                    <div className="input-control">
                        <input className="form-control textbox my-2 " type="text" id="id" placeholder="User ID" onChange={this.handleChange} required />
                        <input className="form-control textbox my-3" type="password" id="password" placeholder="Password" onChange={this.handleChange} required />
                        <center><hr /><button type="submit" className="btn btn-outline-success btn-block authbtn  mt-3 mb-4" onClick={this.handleSubmit}>Login</button></center>
                    </div>
                </form>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login_status: state.auth.login_status,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userLogin: (user) => dispatch(userLogin(user)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
