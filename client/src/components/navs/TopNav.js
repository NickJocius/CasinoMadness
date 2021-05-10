import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import { FaBars } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import madLogo from '../../assets/images/madnesslogo.png';

const TopNav = () => {

    let dispatch = useDispatch();
    let { user } = useSelector((state) => ({ ...state }));
    let history = useHistory();

    const [toggled, setToggled] = useState(false);

    const logout = () => {

        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null
        });
        history.push('/login');
    }

    const handleToggled = (e) => {
        e.preventDefault();
        setToggled(!toggled);
    }

    return (
        <nav className={`bg-black flex flex-wrap items-center justify-between p-5 m-0 sticky top-0 z-50`}>

            <div className={`flex md:hidden`}>
                <button id={`hamburgerBtn`} onClick={handleToggled}>
                    <FaBars className={`hamburger toggle block`} />
                </button>
            </div>
            <div className={`${!toggled ? 'hidden' : 'absolute top-5 left-0'} bg-black md:flex w-full md:w-full text-center text-bold mt-5 md:mt-0 border-t-2 border-red-blood md:border-none`}>
                <img src={madLogo} alt="Madness Logo" className={`object-scale-down h-30 w-20 inline-block`} />
                <Link to="/" className="hover:animate-bounce block md:inline-block text-white hover:text-red-blood px-3 py-3 border-b-2 border-red-blood md:border-none font-bangers">Home</Link>
                <Link to="/" className="block md:inline-block text-white hover:text-red-blood px-3 py-3 border-b-2 border-red-blood md:border-none font-bangers">Games</Link>
                <div className={`bg-black md:flex md:justify-end md:w-full md:flex-shrink w-full text-center`}>
                    {!user && (
                        <>
                            <Link to="/login" className="block md:inline-block text-white hover:text-red-blood px-3 py-3 border-b-2 border-red-blood md:border-none font-bangers">Login</Link>
                            <Link to="/register" className="block md:inline-block text-white hover:text-red-blood px-3 py-3 border-b-2 border-red-blood md:border-none font-bangers">Register</Link>
                        </>
                    )}
                    {user && (
                        <button className={`block w-full md:w-auto md:mr-4 md:inline-block text-white hover:text-red-blood px-3 py-3 border-b-2 border-red-blood md:border-none font-bangers`} onClick={logout}>Logout</button>
                    )}

                </div>
            </div>

        </nav>
    );
};

export default TopNav;
