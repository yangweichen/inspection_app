import axios from 'axios';
import { browserHistory } from 'react-router';

/* -----------------    ACTIONS     ------------------ */

export const SET_USER = 'SET_USER'

/* ------------   ACTION CREATORS     ------------------ */

export const setUser = user => ({ type: SET_USER, user })

/* ------------       REDUCER     ------------------ */

const initialUser = {};
export default function reducer(currentUser = initialUser, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return currentUser;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const login = (email, displayErr) => dispatch => {
  axios.post('/api/auth/login', { email })
    .then(res => {
      dispatch(setUser(res.data));
      browserHistory.push('/home');
    })
    .catch(err => {
      console.error('Unable to log in', err)
      displayErr(err.response.data.error);
    });
}
