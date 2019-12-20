import React, { useReducer } from 'react';

import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types.js';

const AlertState = props => {
	const initialState = null;

	const [state, dispatch] = useReducer(AlertReducer, initialState);

	// Set Alert
	const setAlert = (msg, type) => {
		dispatch({
			type: SET_ALERT,
			payload: { msg, type }
		});
	};

	// Remove Alert
	const RemoveAlert = () => {
		dispatch({ type: REMOVE_ALERT });
	};

	// setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);

	return (
		<AlertContext.Provider
			value={{
				alert: state,
				setAlert,
				RemoveAlert
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
