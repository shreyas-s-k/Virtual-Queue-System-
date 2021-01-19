const initState = {
    regerr: null,
    login_status: false,
    autherr: null,
    loading: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REG_SUCCESS':
            return {
                ...state,
                loading: false
            }
        case 'REG_FAILED':
            return {
                ...state,
                regerr: action.err.response,
                loading: false

            }
        case 'AUTH_SUCCESS':
            return {
                ...state,
                login_status: true,
                autherr: null,
                loading: false
            }

        case 'AUTH_FAILED':
            return {
                ...state,
                autherr: action.err.response,
                loading: false

            }

        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                login_status: false,
                loading: false
            }
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        default: return state
    }
}

export default authReducer