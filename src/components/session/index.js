import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// A personalized hook to initialize and monitor user auth from firebase
export const useAuthState = firebase => {
  const { auth } = firebase;
  const [state, setState] = useState(() => {
    const userAuth = auth.currentUser;
    return { initialize: !userAuth, userAuth };
  });

  useEffect(() => {
    // listen to firebase auth change
    const authListenner = () =>
      auth.onAuthStateChanged(auth =>
        setState({ initialize: false, userAuth: auth })
      );
    authListenner();
    return () => authListenner();
  }, [auth]);
  return state;
};

// personalized hook to retrive user from userContext
export const useSession = () => {
  const user = useSelector(state => state.user);
  return user;
};

// personalized hook to retrive user from userContext
export const useErrors = () => {
  const error = useSelector(state => state.error);
  return error;
};
export const useLoading = () => {
  const { loading } = useSelector(state => state.user);
  return loading;
};

export const useGetUserData = firebase => {
  const user = useSession();
  const [userData, setUserData] = useState('');
  useEffect(() => {
    const getUserData = async () => {
      firebase
        .user(user.uid)
        .once('value')
        .then(snapshot => setUserData(snapshot.val()));
    };
    if (user) getUserData();
  }, [user, firebase]);
  return userData;
};
