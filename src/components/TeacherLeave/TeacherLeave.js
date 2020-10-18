import React from 'react';

import {TeacherLeaveContainer} from './TeacherLeaveStyles.js';

import Leave from '../Leave/Leave.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

class TeacherLeave extends React.Component {
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

		if(this.props.currentUser.hasOwnProperty('admin')) {

			url = `${process.env.REACT_APP_API_URL}/getteacherleaverequestsbyto/0/0/createdAt:asc?id=${this.props.currentUser.admin._id}&year=${this.props.year}`

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
			<TeacherLeaveContainer>
				<Leave role="Teacher's" leaves={this.state.leaves ? this.state.leaves : null}/>
			</TeacherLeaveContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherLeave);