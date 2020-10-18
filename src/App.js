import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

import './App.css';

import HomePage from './pages/Homepage/HomePage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import AdminPage from './pages/AdminPage/AdminPage.js';
import TeacherPage from './pages/TeacherPage/TeacherPage.js';
import StudentPage from './pages/StudentPage/StudentPage.js';
import ContactPage from './pages/ContactPage/ContactPage.js';

// import {LogoutSuccess} from './redux/user/UserActions.js';

import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

const override = css`
  margin: 20% auto;
  color: blue;
`;

class App extends React.Component {
	constructor() {
		super()
		this.state = {

		}
	}

	// componentDidMount() {
	// 	this.props.LogoutSuccess()
	// }



	protectedRoutes = () => {

		if(this.props.currentUser) {
			if(this.props.currentUser.admin) {
				return <Route path='/admin' component={AdminPage} />
			} else if(this.props.currentUser.staff) {
				return <Route path='/teacher' component={TeacherPage} />
			} else if(this.props.currentUser.student) {
				return <Route path='/student' component={StudentPage} />
			} 
		}

	}

	returnLoader = () => {
		if(this.props.isFetching) {
			return <BounceLoader
			    css={override}
			    size={90}
			    color={"#2196f3"}
			    loading={this.props.isFetching} /> 
		}
	}

	renderPages = () => {
		if(this.props.currentUser) {

			if(this.props.currentUser.admin) {
				return <Redirect to="/admin" />
			} else if(this.props.currentUser.staff) {
				return <Redirect to="/teacher" />
			} else if(this.props.currentUser.student) {
				return <Redirect to="/student" />
			}

		} else {
			return <LoginPage />
		}
	}

	render() {
	  return (
	    <div className="App">
		    <Switch>
			    {
				  this.returnLoader()
			    }
			    <Route exact path='/' component={HomePage} />
			    <Route exact path='/contact' component={ContactPage} />
			    {
			      this.protectedRoutes()
			    }
			    <Route exact path='/login' render={this.renderPages}/>
				<Redirect to="/" />
		    </Switch>
	    </div>
	  )
	}
}

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	isFetching: state.user.isFetching
})

// const mapDispatchToProps = (dispatch) => ({
// 	LogoutSuccess: () => dispatch(LogoutSuccess())
// })

export default connect(mapStateToProps)(App);
