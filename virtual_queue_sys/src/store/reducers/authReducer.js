const initState = {
    regerr: null,
    login_status: false,
    autherr: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REG_SUCCESS':
            return state
        case 'REG_FAILED':
            return {
                ...state,
                regerr: action.err,
                loading: false
            }
        case 'AUTH_SUCCESS':
            return {
                ...state,
                login_status: true,
                autherr: null,
            }

        case 'AUTH_FAILED':
            return {
                ...state,
                autherr: action.err,

            }

        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                login_status: false
            }
        default: return state
    }
}

export default authReducer