import React, { useContext } from 'react';
import GithubContext from '../../context/github/githubContext';

// Components
import UserItem from './Useritem';
import Spinner from '../layout/Spinner';

// loading and users is passed as props from app. We're destructuring here.
const Users = () => {
	const githubContext = useContext(GithubContext);
	const { users, loading } = githubContext;

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<div style={userStyle}>
				{users.map(user => (
					<UserItem key={user.id} user={user} />
				))}
			</div>
		);
	}
};

// CSS Grid
const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem'
};

export default Users;
