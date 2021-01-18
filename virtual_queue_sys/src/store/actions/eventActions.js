import axios from "axios";

axios.defaults.withCredentials = true;

const base_url = "http://127.0.0.1:5000";
export const createEvent = (event) => {
    return (dispatch) => {
        axios({
            method: "POST",
            url: base_url + "/event",
            data: { ...event, user_id: localStorage.getItem("user") },
        })
            .then((res) => {
                console.log("createEvent", res);
                dispatch({ type: "CREATE_EVENT_SUCCESS", event });
            })
            .catch((err) => {
                console.log("createEventError", err.response);
            });
    };
};

export const createSlots = (slot, event_id) => {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: base_url + "/event/slot",
            data: slot,

        }).then(res => {
            console.log('createSlot', res)
            dispatch({ type: 'CREATE_SLOT_SUCCESS', })
            viewSlots(event_id, dispatch)
        }).catch(err => {
            console.log('createSlotError', err.response)

        })
    }

}

function viewSlots(event_id, dispatch) {
    console.log('ViewSlots fn', event_id);

    axios({
        method: 'GET',
        url: base_url + "/event/slot/" + event_id,


    }).then(res => {
        console.log('viewSlot', res)
        dispatch({ type: 'VIEW_SLOT_SUCCESS', res })
    }).catch(err => {
        console.log('viewSlotError', err.response)

    })


}

export const finishCreateEvent = () => {
    return (dispatch) => {
        dispatch({ type: "HOST_SUCCESS" });
    };
};


export const viewUserEvents = (user_id) => {
    return (dispatch) => {
        axios({
            method: 'GET',
            url: base_url + "/event/user/" + user_id,
        }).then(res => {
            console.log('ViewUserEvents', res);
            dispatch({ type: 'VIEW_USER_EVENTS', res })

        }).catch(err => {
            console.log('viewUserEventsError', err.response);
        })
    }
}


export const viewEventDetails = (event_id) => {
    return (dispatch) => {
        axios({
            method: 'GET',
            url: base_url + "/event/" + event_id,
        }).then(res => {
            console.log('ViewEventDetails', res);
            dispatch({ type: 'VIEW_EVENT_DETAILS', res })
            viewSlots(event_id, dispatch)

        }).catch(err => {
            console.log('ViewEventDetailsError', err.response);
        })
    }
}