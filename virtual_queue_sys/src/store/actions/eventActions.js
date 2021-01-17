import axios from "axios";

const base_url = 'http://127.0.0.1:5000'
export const createEvent = (event) => {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: base_url + "/event",
            data: { ...event, user_id: localStorage.getItem('user') },

        }).then(res => {
            console.log('createEvent', res)
        }).catch(err => {
            console.log('createEventError', err.response)

        })
    }

}