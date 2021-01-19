const initState = {
    createEvent_status: false,
    event_id: null,
    event_date: null,
    event_slots: [],
    events: [],
    eventDetails: null,
    bookStatus: null,
    participants: [],
    loading: false

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
                event_slots: [],
                loading: false
            }
        case 'CREATE_EVENT_ERROR':
            return {
                ...state,
                loading: false
            }
        case 'CREATE_SLOT_SUCCESS':
            return {
                ...state,
                loading: false
            }
        case 'CREATE_SLOT_ERROR':
            return {
                ...state,
                loading: false
            }
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
                events: action.res.data,
                loading: false

            }
        case 'VIEW_EVENT_DETAILS':
            return {
                ...state,
                eventDetails: action.res.data,
                loading: false

            }
        case 'CLEAR_EVENTS':
            return {
                ...state,
                eventDetails: null,
                event_slots: [],
                bookStatus: null,
                participants: []


            }
        case 'BOOK_EVENT_SUCCESS':
            return {
                ...state,
                bookStatus: action.res.data,
                loading: false
            }
        case 'BOOK_EVENT_ERROR':
            return {
                ...state,
                loading: false
            }
        case 'VIEW_PARTICIPANTS':
            return {
                ...state,
                participants: action.res.data
            }
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        default: return state
    }

}

export default eventReducer