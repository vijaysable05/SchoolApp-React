import React from 'react';

import {StudentLeaveContainer} from './StudentLeaveStyles.js';

import Leave from '../Leave/Leave.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

class StudentLeave extends React.Component {
	constructor() {
		super()
		this.state = {
			leaves: null
		}
	}

	loadLeaves = async() => {
		this.setState({leaves: null})
		let url = null
		let array = []

		if(this.props.currentUser.hasOwnProperty('staff')) {

			url = `${process.env.REACT_APP_API_URL}/getstudentleaverequestsbyto/0/0/createdAt:asc?id=${this.props.currentUser.staff._id}&year=${this.props.year}`

		} else if(this.props.currentUser.hasOwnProperty('admin')) {

			url = `${process.env.REACT_APP_API_URL}/getstudentleaverequestsforadmin/0/0/createdAt:asc?year=${this.props.year}`
			
		}

		this.props.LoadingStart()
		const response = await fetch(url, {
			method: 'GET',
			headers: { 
		        "Content-type": "application/json; charset=UTF-8",
		        'Authorization': 'Bearer ' + this.props.currentUser.token
		    }
		})

		const data = await response.json()
		
		if(data.length > 0) {
			await data.forEach((dat) => {
				array.push({
					name: `${dat.from.firstname} ${dat.from.middlename} ${dat.from.lastname}`,
					class: `Class ${dat.from.class}: Division ${dat.from.division}`,
					title: dat.title,
					startdate: dat.startdate,
					enddate: dat.enddate,
					description: dat.description,
					status: dat.status,
					id: dat._id
				})
			})
			
			this.setState({leaves: array})
			this.props.LoadingEnd()

		} else {
			this.props.LoadingEnd()
			return;
		}
	}

	componentDidMount() {
		this.loadLeaves()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadLeaves()
		}
	}


	render() {
		return (
			this.props.isLoading ? <Spinner /> :
			<StudentLeaveContainer>
				<Leave role="Student's" leaves={this.state.leaves ? this.state.leaves : null}/>
			</StudentLeaveContainer>
			)
	}
}

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	year: state.user.year,
	isLoading: state.user.isLoading,
	classes: state.class.classes
})

const mapDispatchToProps = (dispatch) => ({
	LoadingStart: () => dispatch(LoadingStart()),
	LoadingEnd: () => dispatch(LoadingEnd())
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentLeave);