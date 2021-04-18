import React from 'react';
import { Route } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import LoadingToRedirect from "./LoadingToRedirect";
import UserLayout from "../../layouts/UserLayout";

const UserRoute = ({ component: Component, children, ...rest }) => {

    // // Bring in user from redux 
    // const { user } = useSelector((state) => ({ ...state }));

    // without layout render
    // return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;

    // with layout render
    return (
        <Route
            {...rest}
            render={routeProps => (
                <UserLayout>
                    <Component
                        {...routeProps}
                    />
                </UserLayout>

            )}
        />
    )
};

export default UserRoute;
