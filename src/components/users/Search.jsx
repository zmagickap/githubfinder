import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

// Function components receive propgs as param
//	But we can also destruct, as done here (to avoid needing props.xxx)
const Search = () => {
	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);

	const [text, setText] = useState('');

	const handleChange = e => {
		setText(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (text === '') {
			alertContext.setAlert('Please enter a search value', 'light');
		} else {
			githubContext.searchUsers(text);
			setText('');
		}
	};

	const handleFocus = e => {
		alertContext.RemoveAlert();
	};

	return (
		<div>
			<form action='' className='form' onSubmit={handleSubmit}>
				<input
					type='text'
					name='text'
					id=''
					placeholder='Search Users...'
					value={text}
					onChange={handleChange}
					onFocus={handleFocus}
				/>
				<input
					type='submit'
					value='Search'
					className='btn btn-dark btn-block'
				/>
			</form>

			{githubContext.users.length > 0 && (
				<button
					className='btn btn-light btn-block'
					onClick={githubContext.clearUsers}
				>
					Clear Results
				</button>
			)}
		</div>
	);
};

export default Search;
