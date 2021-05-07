import React from 'react';
import { Link } from 'react-router-dom';

const GamePreview = ({ msg, theme, img, route }) => {
    return (

        <div className={`transition duration-500 transform hover:-translate-y-1 hover:scale-105 hover:border-red-500 max-w-sm rounded overflow-hidden shadow-lg bg-white divide-y-2 divide-solid divide-red-blood`}>
            <img className={`w-full h-3/6 bg-black`} src={`${process.env.PUBLIC_URL}/images/${img}`} alt={`${img}`} />
            <div className={`px-6 py-4 h-2/6`}>
                <div className={`font-bold text-xl mb-2`}>{theme}</div>
                <p className={`text-gray-700 text-base`}>
                    {msg}
                </p>
            </div>
            <div className={`px-4 pt-2 pb-2 flex justify-center content-center container h-1/6 bg-gradient-to-r from-red-blood to-black`}>
                <Link to={`${route}`} className={`flex items-center`}><span className={`inline-block bg-black text-azure rounded-full px-3 py-1 text-md `}>Play</span></Link>
            </div>
        </div>

    );
};

export default GamePreview;
