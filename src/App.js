import React, { Fragment, Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

// Pages
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component {
	state = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null
	};

	// async componentDidMount() {
	// 	this.setState({ loading: true });
	// 	const res = await axios.get(
	// 		`https://api.github.com/users?
	//     client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
	//     &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	);
	// 	this.setState({
	// 		users: res.data,
	// 		loading: false
	// 	});
	// }

	// Get group of GH Users
	searchUsers = async text => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({
			users: res.data.items,
			loading: false
		});
	};

	// Get Single GH User
	getUser = async username => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}?
		client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
		&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({
			user: res.data,
			loading: false
		});
	};

	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};

	// Get Users Repos
	getUserRepos = async username => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
		client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
		&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({
			repos: res.data,
			loading: false
		});
	};

	setAlert = (msg, type) => {
		if (msg === '') {
			this.setState({ alert: null });
		} else {
			this.setState({ alert: { msg, type } });
		}
	};

	render() {
		const { users, user, repos, loading } = this.state;
		return (
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Alert alert={this.state.alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={props => (
									<Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={users.length > 0}
											setAlert={this.setAlert}
										/>
										<Users loading={loading} users={users} />
									</Fragment>
								)}
							></Route>

							<Route exact path='/about' component={About} />

							<Route
								exact
								path='/user/:login'
								render={props => (
									<User
										{...props}
										getUser={this.getUser}
										getUserRepos={this.getUserRepos}
										user={user}
										repos={repos}
										loading={loading}
									/>
								)}
							></Route>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
