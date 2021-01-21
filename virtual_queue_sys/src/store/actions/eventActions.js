import axios from "axios";

axios.defaults.withCredentials = true;

const base_url = process.env.REACT_APP_API_URL;
console.log(base_url);
export const createEvent = (event) => {
  return (dispatch) => {
    dispatch({ type: "LOADING", action: true });
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
        dispatch({ type: "CREATE_EVENT_ERROR", err });
        console.log("createEventError", err.response);
      });
  };
};

export const createSlots = (slot, event_id) => {
  return (dispatch) => {
    dispatch({ type: "LOADING", action: true });
    axios({
      method: "POST",
      url: base_url + "/event/slot",
      data: slot,
    })
      .then((res) => {
        console.log("createSlot", res);
        dispatch({ type: "CREATE_SLOT_SUCCESS" });
        viewSlots(event_id, dispatch);
      })
      .catch((err) => {
        dispatch({ type: "CREATE_SLOT_ERROR" });
        console.log("createSlotError", err.response);
      });
  };
};

function viewSlots(event_id, dispatch) {
  console.log("ViewSlots fn", event_id);

  axios({
    method: "GET",
    url: base_url + "/event/slot/" + event_id,
  })
    .then((res) => {
      console.log("viewSlot", res);
      dispatch({ type: "VIEW_SLOT_SUCCESS", res });
    })
    .catch((err) => {
      console.log("viewSlotError", err.response);
    });
}

export const finishCreateEvent = () => {
  return (dispatch) => {
    dispatch({ type: "HOST_SUCCESS" });
  };
};

export const viewUserEvents = (user_id) => {
  return (dispatch) => {
    dispatch({ type: "LOADING", action: true });
    axios({
      method: "GET",
      url: base_url + "/event/user/" + user_id,
    })
      .then((res) => {
        console.log("ViewUserEvents", res);
        dispatch({ type: "VIEW_USER_EVENTS", res });
      })
      .catch((err) => {
        console.log("viewUserEventsError", err.response);
      });
  };
};

export const viewEventDetails = (event_id) => {
  return (dispatch) => {
    dispatch({ type: "LOADING", action: true });
    axios({
      method: "GET",
      url: base_url + "/event/" + event_id,
    })
      .then((res) => {
        console.log("ViewEventDetails", res);
        viewSlots(event_id, dispatch);
        dispatch({ type: "VIEW_EVENT_DETAILS", res });
      })
      .catch((err) => {
        console.log("ViewEventDetailsError", err.response);
      });
  };
};

export const clearEvents = () => {
  return (dispatch) => {
    dispatch({ type: "CLEAR_EVENTS" });
  };
};

export const bookEvent = (slot_details) => {
  return (dispatch) => {
    dispatch({ type: "LOADING", action: true });
    axios({
      method: "POST",
      url: base_url + "/event/attend",
      data: { ...slot_details, user_id: localStorage.getItem("user") },
    })
      .then((res) => {
        console.log("bookEvent", res);
        dispatch({ type: "BOOK_EVENT_SUCCESS", res });
      })
      .catch((err) => {
        dispatch({ type: "BOOK_EVENT_ERROR", err });
        console.log("bookEventError", err.response);
      });
  };
};

export const viewParticipants = (event_id) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: base_url + "/event/participants/" + event_id,
    })
      .then((res) => {
        console.log("ViewParticipants", res);
        dispatch({ type: "VIEW_PARTICIPANTS", res });
      })
      .catch((err) => {
        console.log("viewParticipantsError", err.response);
      });
  };
};

export const viewParticipantEvents = (user_id) => {
  return (dispatch) => {
    dispatch({ type: "LOADING", action: true });
    axios({
      method: "GET",
      url: base_url + "/event/registered-events/" + user_id,
    })
      .then((res) => {
        console.log("ViewPartitcipantEvents", res);
        dispatch({ type: "VIEW_PARTICIPANT_EVENTS", res });
      })
      .catch((err) => {
        console.log("viewPartitcipantEventsError", err.response);
        dispatch({ type: "VIEW_PARTICIPANT_EVENTS_ERROR", err });
      });
  };
};
