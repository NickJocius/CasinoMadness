import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile, updateProfile } from '../../functions/profile';
import GameHeader from '../../components/headers/GameHeader';

// User InitialState
const initialState = {
    _id: '',
    bank: 0,
    wins: { slots: 0 },
    losses: { slots: 0 }
}

const GothamSlots = () => {

    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState(initialState);

    return (
        <main className={`w-full min-h-screen m-0 p-2 bg-black`}>
            <GameHeader title={"Gotham City Slots"} titleBG={"cardschips"} />

        </main>
    );
};

export default GothamSlots;
