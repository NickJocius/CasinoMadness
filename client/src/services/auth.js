import axios from 'axios';

// send authtoken to backend within headers
export const createOrUpdateUser = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {
        headers: {
            authtoken,
        },
    });
};

// get current user
export const currentUser = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/current-user`, {}, {
        headers: {
            authtoken,
        },
    });
};

// get current admin
export const currentAdmin = async (authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/current-admin`, {}, {
        headers: {
            authtoken,
        },
    });
};