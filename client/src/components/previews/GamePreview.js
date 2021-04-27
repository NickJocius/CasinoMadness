import React from 'react';
import { Link } from 'react-router-dom';

const GamePreview = ({ msg, theme, img, route }) => {
    return (

        <div className={`max-w-sm rounded overflow-hidden shadow-lg bg-white`}>
            <img className={`w-full h-3/6`} src={`${process.env.PUBLIC_URL}/images/${img}`} alt={`${img}`} />
            <div className={`px-6 py-4`}>
                <div className={`font-bold text-xl mb-2`}>{theme}</div>
                <p className={`text-gray-700 text-base`}>
                    {msg}
                </p>
            </div>
            <div className={`px-6 pt-4 pb-2`}>
                <Link to={`${route}`}><span className={`inline-block bg-black text-azure rounded-full px-3 py-1 text-sm`}>Play</span></Link>
            </div>
        </div>

    );
};

export default GamePreview;
