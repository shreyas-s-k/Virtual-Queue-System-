const initState = {
    createEvent_status: false,
    event_id: null,
    event_date: null,
    event_slots: [],
    events: [],
    eventDetails: null

}

const eventReducer = (state = initState, action) => {
    switch (action.type) {
        case 'DISPLAY':
            return state
        case 'CREATE_EVENT_SUCCESS':
            return {
                ...state,
                createEvent_status: true,
                event_id: action.event.id,
                event_date: action.event.date,
                event_slots: []
            }
        case 'CREATE_SLOT_SUCCESS':
            return state
        case 'VIEW_SLOT_SUCCESS':
            return {
                ...state,
                event_slots: action.res.data
            }
        case 'HOST_SUCCESS':
            return {
                ...state,
                createEvent_status: false,
                event_id: null,
                event_date: null,
                event_slots: []

            }
        case 'VIEW_USER_EVENTS':
            return {
                ...state,
                events: action.res.data
            }
        case 'VIEW_EVENT_DETAILS':
            return {
                ...state,
                eventDetails: action.res.data

            }
        case 'CLEAR_EVENTS':
            return {
                ...state,
                eventDetails: null,
                event_slots: []


            }
        default: return state
    }

}

export default eventReducer