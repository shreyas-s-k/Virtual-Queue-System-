import React, { Component } from 'react'

export class attendEvent extends Component {
    state = { name: '' }
    render() {
        return (
            <div className="conatiner">
                <form className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control"></input>
                </form>
            </div>
        )
    }
}

export default attendEvent
