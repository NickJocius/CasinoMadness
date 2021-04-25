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
        return <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter email"
                    autoFocus
                />
            </div>

            <div className="form-group  my-3">
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                />
            </div>


            <button
                onClick={handleSubmit}
                className={`bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full`}
                disabled={!email || password.length < 6}
            >
                <AiFillMail />
                <span>Login With Email/Password</span>
            </button>
        </form>
    };

    return (

        <div className="h-screen">
            <div className="row p-5 w-100">
                <div className="col-md-6 offset-md-3">
                    {!loading ? (
                        <h4 className="text-center">Login</h4>)
                        : (
                            <div className="d-flex justify-content-center align-content-center">
                                <img src={loadgif} alt="loading gif" className="m-auto" />
                            </div>

                        )}

                    {loginForm()}
                    <button
                        onClick={googleLogin}
                        className={`bg-red hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full`}
                    >
                        <AiFillGoogleCircle />
                        <span>Login With Google</span>
                    </button>
                    <div className="d-flex justify-content-center">
                        <Link to="/forgot/password" className="text-center">Forgot Password</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;