import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
	state = {
		text: ''
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		if (this.state.text === '') {
			this.props.setAlert('Please enter a search value', 'light');
		} else {
			this.props.searchUsers(this.state.text);
			this.setState({ text: '' });
		}
	};

	static propTypes = {
		searchUsers: PropTypes.func.isRequired,
		clearUsers: PropTypes.func.isRequired,
		showClear: PropTypes.bool.isRequired,
		setAlert: PropTypes.func.isRequired
	};

	handleFocus = e => {
		this.props.setAlert('', '');
	};

	render() {
		const { clearUsers, showClear } = this.props;
		return (
			<div>
				<form action='' className='form' onSubmit={this.handleSubmit}>
					<input
						type='text'
						name='text'
						id=''
						placeholder='Search Users...'
						value={this.state.text}
						onChange={this.handleChange}
						onFocus={this.handleFocus}
					/>
					<input
						type='submit'
						value='Search'
						className='btn btn-dark btn-block'
					/>
				</form>

				{showClear && (
					<button className='btn btn-light btn-block' onClick={clearUsers}>
						Clear Results
					</button>
				)}
			</div>
		);
	}
}

export default Search;
