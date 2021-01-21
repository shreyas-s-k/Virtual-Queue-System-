const initState = {
    createEvent_status: false,
    event_id: null,
    event_date: null,
    event_slots: [],
    events: [],
    eventDetails: null,
    bookStatus: null,
    participants: [],
    loading: false,
    eventerr: null,
    userEvents: []

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
                loading: false,
                eventerr: action.err.response
            }
        case 'CREATE_SLOT_SUCCESS':
            return {
                ...state,
                loading: false
            }
        case 'CREATE_SLOT_ERROR':
            return {
                ...state,
                loading: false,
                eventerr: action.err.response
            }
        case 'VIEW_SLOT_SUCCESS':
            return {
                ...state,
                event_slots: action.res.data,
                loading: false,

            }
        case 'HOST_SUCCESS':
            return {
                ...state,
                createEvent_status: false,
                event_id: null,
                event_date: null,
                event_slots: [],
                loading: false,

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
                participants: [],
                loading: false,
                userEvents: []


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
                loading: false,
                eventerr: action.err.response
            }
        case 'VIEW_PARTICIPANTS':
            return {
                ...state,
                participants: action.res.data,
                loading: false,
            }
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        case 'VIEW_PARTICIPANT_EVENTS':
            return {
                ...state,
                loading: false,
                userEvents: action.res.data
            }
        case 'VIEW_PARTICIPANT_EVENTS_ERROR':
            return state
        default: return state
    }

}

export default eventReducer