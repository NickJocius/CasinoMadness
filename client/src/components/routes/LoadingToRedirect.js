import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    let history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        // redirect once count is equal to 0
        count === 0 && history.push("/");
        // cleanup
        return () => clearInterval(interval);
    }, [count, history]);

    return (
        <div className="Loading h-screen w-full flex content-center items-center justify-center p-5 text-center bg-gradient-to-r from-red-blood to-black">
            <p className={`font-nosifer font-bold text-white text-center text-5xl`}>Redirecting you in {count} seconds</p>
        </div>
    );
};

export default LoadingToRedirect;