import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'


function saveToLocalStorage(state) {
    if (localStorage.getItem('login')) {
        try {
            const serializedState = JSON.stringify(state)
            localStorage.setItem('state', serializedState)
        } catch (error) {
            console.log(error);
        }
    } else {
        localStorage.clear();
    }

}
function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (error) {
        console.log(error);
        return undefined
    }
}

const persistedState = loadFromLocalStorage()
const store = createStore(rootReducer, persistedState,
    applyMiddleware(thunk.withExtraArgument()),

);
store.subscribe(() => saveToLocalStorage(store.getState()))


export default store;