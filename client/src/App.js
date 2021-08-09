import React, { useEffect, lazy, Fragment, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/auth';

const Home = lazy(() => import('./pages/home/Home'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Footer = lazy(() => import('./components/footer/Footer'));

// user routes
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const Poker = lazy(() => import('./pages/games/Poker'));
const BlackJack = lazy(() => import('./pages/games/BlackJack'));
const GothamSlots = lazy(() => import('./pages/games/GothamSlots'));

// admin routes

// AOS init
AOS.init();

function App() {

  const dispatch = useDispatch();

  // check firebase auth state
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(async (user) => {

      if (user) {

        // get user token
        const idTokenResult = await user.getIdTokenResult();

        // populate user in redux store
        currentUser(idTokenResult.token)
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
            }

          )
          .catch((err) => {
            console.log(err.message);
          })
      }
    });

    // clean up

    return () => unsubscribe();

  }, [dispatch])

  return (
    <div className="App">
      <Suspense fallback={
        <div className={`h-screen flex justify-center`}>
          <h2>ResonanceWebDesign</h2>
        </div>
      }>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <UserRoute exact path="/poker" component={Poker} />
            <UserRoute exact path="/blackjack" component={BlackJack} />
            <UserRoute exact path="/gothamslots" component={GothamSlots} />
          </Switch>
          <Footer />
        </Fragment>
      </Suspense>
    </div>

  );
}

export default App;
