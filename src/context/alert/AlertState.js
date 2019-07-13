import React, {useReducer} from 'react';
import alertReducer from './alertReducer';
import AlertContext from './alertContext';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  const initialState = null;

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //Set Alert
  const setAlert = (msg, cssType) => {
      dispatch({type: SET_ALERT, payload: {msg, cssType}});
      setTimeout(() => dispatch({type: REMOVE_ALERT})
      , 5000)
  }

  return <AlertContext.Provider value={
    {
      alert: state,
      setAlert
    }
  }>
  {props.children}
  </AlertContext.Provider>
}

export default AlertState;