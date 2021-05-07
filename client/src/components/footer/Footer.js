import React from 'react';
import { Link } from 'react-router-dom'


const Footer = () => {

    const currentYear = () => {
        let cYear = new Date().getFullYear();
        return cYear;
    }

    return (
        <div className={`w-full bg-black bg-moneypile bg-fixed bg-bottom bg-no-repeat bg-20`}>
            <div className={`w-full grid grid-cols-1 md:grid-cols-2 bg-black bg-opacity-80`}>
                <div className={`flex flex-col items-center py-2 font-bangers text-red-blood`}>
                    <Link exact to="/" className={`hover:underline`}>Home</Link>
                    <Link exact to="/contact" className={`hover:underline`}>Contact Us</Link>
                    <Link exact to="#" className={`hover:underline`}>Credits</Link>
                </div>
                <div className={`flex flex-col items-center py-2 font-bangers text-red-blood`}>
                    <Link className={`hover:underline`}>Support</Link>
                    <Link className={`hover:underline`}>ResonanceWeb</Link>
                    <Link className={`hover:underline`}>Unsubscribe</Link>
                </div>
            </div>
            <div className={`flex justify-center py-3 font-bangers text-red-blood bg-black bg-opacity-80`}>
                <span className="text-center">&copy; {currentYear()} Resonance Web Design, Inc. All rights reserved.</span>
            </div>
        </div>

    );
};

export default Footer;
