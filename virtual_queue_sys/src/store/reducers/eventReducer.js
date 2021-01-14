const initState = {
    events: [{ id: 'e001', name: 'Thrissur Pooram', location: 'Thrissur', date: new Date(), time: '10:00:00', token_available: 1000 },
    { id: 'e001', name: 'Thrissur Pooram', location: 'Thrissur', date: new Date(), time: '10:00:00', token_available: 1000 },
    { id: 'e001', name: 'Thrissur Pooram', location: 'Thrissur', date: new Date(), time: '10:00:00', token_available: 1000 },
    { id: 'e001', name: 'Thrissur Pooram', location: 'Thrissur', date: new Date(), time: '10:00:00', token_available: 1000 },
    { id: 'e001', name: 'Thrissur Pooram', location: 'Thrissur', date: new Date(), time: '10:00:00', token_available: 0 },

    ]

}

const eventReducer = (state = initState, action) => {
    switch (action.type) {
        case 'DISPLAY':
            return state
        default: return state
    }

}

export default eventReducer