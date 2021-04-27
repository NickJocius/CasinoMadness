export const loadProfile = (user, values, getUserProfile, setValues, setLoading, dispatch) => {
    let id = user._id;
    setLoading(true);
    getUserProfile(id, user.token)
        .then((res) => {
            setLoading(false);
            dispatch({
                type: 'GET_PROFILE',
                payload: res.data
            });
            setValues({ ...values, ...res.data });
        }).catch((err) => {
            setLoading(false);
            console.log(err.message);
        })

}