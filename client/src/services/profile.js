import axios from 'axios';

export const createOrUpdateProfile = async (id, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-profile`, id, {
        headers: {
            authtoken,
        },
    });
};

export const updateProfile = async (id, newProfile, authtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/update-profile/:_${id}`, newProfile, {
        headers: {
            authtoken,
        },
    });
}


export const getUserProfile = async (id, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/current-profile`, id, {
        headers: {
            authtoken,
        },
    });
};