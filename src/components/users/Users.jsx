import React from 'react';
import PropTypes from 'prop-types';

// Components
import UserItem from './Useritem';
import Spinner from '../layout/Spinner';

// loading and users is passed as props from app. We're destructuring here.
const Users = ({ loading, users }) => {
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

Users.propTypes = {
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
};

// CSS Grid
const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem'
};

export default Users;
