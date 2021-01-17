const initState = {
    createEvent_status: false,
    event_id: null,
    event_date: null,
    event_slots: [],

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
                event_date: action.event.date
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
        default: return state
    }

}

export default eventReducer