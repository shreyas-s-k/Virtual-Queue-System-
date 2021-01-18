import React, { Component } from 'react'
import { userSignup } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Signup extends Component {
    state = {
        id: "",
        first_name: "",
        last_name: "",
        password: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.userSignup(this.state)
    }


    render() {
        console.log(this.props);
        if (this.props.login_status) { return <Redirect to='/' /> }
        return (
            <div className="container form-rounded col-sm-4 mt-5">

                <form className="form-control shadow" onSubmit={this.handleSubmit}>
                    <h4 className="col-sm-4 text-dark mt-2">Sign Up</h4>

                    <hr />
                    <input className="form-control textbox my-2 " type="text" id="id" placeholder="User ID" onChange={this.handleChange} required />
                    <div className="row input-control my-3">
                        <div className="col s12 m6 signup">
                            <input className="form-control textbox " type="text" id="first_name" placeholder="First Name" onChange={this.handleChange} required />
                        </div>
                        <div className="col s12 m5 offset-m1">
                            <input className="form-control textbox " type="text" id="last_name" placeholder="Last Name" onChange={this.handleChange} />
                        </div>
                    </div>
                    <input className="form-control textbox my-2 " type="password" id="password" placeholder="Password" onChange={this.handleChange} required />
                    <center className="d-grid gap-2"><hr /><button type="submit" className="btn btn-outline-success authbtn mt-3 mb-4 btn-block   " onClick={this.handleSubmit}>Sign Up</button></center>


                </form>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        login_status: state.auth.login_status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userSignup: (user) => dispatch(userSignup(user)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
