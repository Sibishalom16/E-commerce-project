// store.js
import { configureStore } from '@reduxjs/toolkit';


// 1. Define initial state for user
const initialUserState = {
    email: localStorage.getItem('userEmail') || '',
};


// 2. Create the user reducer
const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            localStorage.setItem('userEmail', action.payload);
            return {
                ...state,
                email: action.payload,
            };
        case 'LOGOUT':
            localStorage.removeItem('userEmail');
            return {
                ...state,
                email: '',
            };
        default:
            return state;
    }
};


// 3. Create and export the store using Redux Toolkit
export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});


// export default store;
