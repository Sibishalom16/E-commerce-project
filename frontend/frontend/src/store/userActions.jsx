
export const setemail = (email) => ({
    type: 'SET_EMAIL',
    payload: email,
});

export const logoutUser = () => ({
    type: 'LOGOUT',
});