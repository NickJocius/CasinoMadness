import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { AiFillMail, AiFillGoogleCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import loadgif from '../../assets/images/loading.gif';
import { createOrUpdateUser } from '../../functions/auth';


const Login = ({ history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) {
            history.push("/");
        }
    }, [user, history]);

    let dispatch = useDispatch();

    const roleBasedRedirect = (res) => {
        if (res.data.role === 'admin') {
            // history.push('/admin/dashboard');
            console.log('admin redirect');
        } else {
            history.push('/user/profile');
            console.log('user redirect');
        }
    }

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

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

                        roleBasedRedirect(res);
                    }

                )
                .catch((err) => {
                    console.log(err.message);
                })

        } catch (error) {

            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }

    };

    const googleLogin = async (e) => {
        auth.signInWithPopup(googleAuthProvider).then(async (result) => {
            const { user } = result
            const idTokenResult = await user.getIdTokenResult();
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

                        roleBasedRedirect(res);
                    }

                )
                .catch((err) => {
                    console.log(err.message);
                })

        })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            })
    };

    const loginForm = () => {
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
                        required
                        className="apperance-none rounded-non relative block w-full px-3 py-2 my-1"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter email"
                        autoFocus
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                        id={`password`}
                        name="password"
                        autoComplete="current-password"
                        required
                        type="password"
                        className="appearance-non rounded-none relative block w-full px-3 py-2 my-1"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                    </label>
                </div>
                <div className="text-sm">
                    <Link href="/forgot/password" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                    </Link>
                </div>
            </div>

            <div>
                <button
                    onClick={handleSubmit}
                    className={`group relative w-full flex justify-center border border-transparent my-2 bg-indigo-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full`}
                    disabled={!email || password.length < 6}
                >
                    <span className={`absolute left-2 inset-y-0 flex items-center pl-3 text-white`}><AiFillMail /></span>
                    <span>Login With Email/Password</span>
                </button>
            </div>

        </form>
    };

    return (

        <div className="min-h-screen flex items-center justify-center">

            <div className={`max-w-md w-full space-y-8`}>
                {!loading ? (
                    <div>
                        <h4 className="text-center mt-6 text-5xl font-bangers font-extrabold">Login</h4>
                        <p className={`mt-2 text-center text-md text-red-700`}>Login in to your account</p>
                    </div>
                )
                    : (
                        <div className="d-flex justify-content-center align-content-center">
                            <img src={loadgif} alt="loading gif" className="m-auto" />
                        </div>

                    )}
                <div>
                    {loginForm()}
                    <button
                        onClick={googleLogin}
                        className={`group relative w-full justify-center border border-transparent bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full`}
                    >
                        <span className={`absolute left-2 inset-y-0 flex items-center pl-3 text-white`}><AiFillGoogleCircle /></span>

                        <span>Login With Google</span>
                    </button>
                </div>
            </div>



        </div>

    );
};

export default Login;