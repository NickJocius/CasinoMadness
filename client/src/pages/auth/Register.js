import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


const Register = ({ history }) => {

    const [email, setEmail] = useState("");

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) {
            history.push("/");
        }
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(email, config)
        toast.success(`Email is sent to ${email}. Click the link to complete your registration.`);

        // save user email to local storage
        window.localStorage.setItem('emailForRegistration', email);

        // clear state
        setEmail("");

    };

    const registerForm = () => {
        return <form onSubmit={handleSubmit} className={`mt-8 space-y-6 outline-red-blood`}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="email" className={`sr-only`}>Email</label>
                    <input
                        id={`email`}
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="apperance-none rounded-non relative block w-full px-3 py-2 my-1"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="email"
                        autoFocus
                    />
                </div>
            </div>
            <button
                type="submit"
                className={`relative w-full flex justify-center border border-transparent my-2 bg-red-blood hover:bg-red-300 text-white font-bold py-2 px-4 rounded-full`}
            >
                Register
                </button>
        </form>
    };

    return (

        <div className="min-h-screen flex items-center justify-center">

            <div className={`max-w-md w-full space-y-8`}>

                <div>
                    <h4 className="text-center mt-6 text-5xl font-bangers font-extrabold">Register</h4>
                    <p className={`mt-2 text-center text-md text-red-700`}>Create a new Account.</p>
                </div>

                <div>
                    {registerForm()}
                </div>


            </div>
        </div>

    );

};

export default Register;

