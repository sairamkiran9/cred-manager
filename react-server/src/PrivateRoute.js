import { Route, Navigate } from 'react-router-dom';
import { fireAuth } from "./firebase";
// import { useAuthState } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';


function PrivateRoute({ children, ...rest }) {
  const [user] = useAuthState(fireAuth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;