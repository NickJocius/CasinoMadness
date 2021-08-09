import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';



// destructure props history
const RegisterComplete = ({ history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');


    useEffect(() => {

        // Grab email from local storage
        setEmail(window.localStorage.getItem('emailForRegistration'));

    }, []);

    let dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation
        if (!email || !password) {
            toast.error("Email and Password is required");
            return;
        }
        // password length validation
        if (password.length > 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        // use firbase signInWithEmailLink
        try {

            const result = await auth.signInWithEmailLink(email, window.location.href);

            if (result.user.emailVerified) {
                // remove user email from local storage
                window.localStorage.removeItem('emailForRegistration');

                // get user id token and update user with password
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();

                // populate user in redux store
                createOrUpdateUser(idTokenResult.token)
                    .then(
                        (res) => {
                            dispatch({
                                type: 'LOGGED_IN_USER',

                                payload: {
                                    name: res.data.name,
                                    email: res.data.email,
                                    token: idTokenResult.token,
                                    role: res.data.role,
                                    _id: res.data._id,
                                },

                            });
                        }

                    )
                    .catch((err) => {
                        console.log(err.message);
                    })

                // redirect
                history.push('/');
            }

        } catch (error) {

            console.log(error);
            toast.error(error.message);

        }

    };

    const completeRegistrationForm = () => {
        return <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control"
                value={email}
                disabled
            />
            <input
                type="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
                placeholder="Enter your password"
            />


            <button
                type="submit"
                className={`relative w-full flex justify-center border border-transparent my-2 bg-red-blood hover:bg-red-300 text-white font-bold py-2 px-4 rounded-full`}
            >
                Complete Registration
            </button>
        </form>
    };

    return (

        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Registration Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    );
};

export default RegisterComplete;