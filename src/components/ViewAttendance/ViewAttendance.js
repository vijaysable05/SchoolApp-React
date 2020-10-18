import React from 'react';

import {ViewAttendanceContainer, UpperContainer, BottomContainer} from './ViewAttendanceStyles.js';

import Button from '../Button/Button.js';

import AttendanceTable from '../AttendanceTable/AttendanceTable.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';

class ViewAttendance extends React.Component {
	constructor() {
		super()
		this.state = {
			student: true,
			staff: false,
			self: false
		}
	}

	handleChange = () => {
		this.setState({
			student: true,
			staff: false,
			self: false
		})
	}

	handleChange2 = () => {
		this.setState({
			student: false,
			staff: true,
			self: false
		})
	}

	handleChange3 = () => {
		this.setState({
			student: false,
			staff: false,
			self: true
		})
	}

	componentDidMount() {
		if(this.props.currentUser.hasOwnProperty('student')) {
			this.setState({student: false,
			staff: false,
			self: true})
		}
	}

	
	render() {
		return (
			<ViewAttendanceContainer>
			{
				this.props.student ? null :
				<UpperContainer>
				{
					this.props.admin ? 
					<React.Fragment>
					<Button type="button" name="Student" handleClick={this.handleChange}/>
					<Button type="button" name="Staff" handleClick={this.handleChange2}/>
					</React.Fragment>
					:
					<React.Fragment>
					<Button type="button" name="Self" handleClick={this.handleChange3}/>
					<Button type="button" name="Students" handleClick={this.handleChange}/>
					</React.Fragment>
				}
				</UpperContainer>
			}
				<BottomContainer>
					<AttendanceTable student={this.state.student} staff={this.state.staff} self={this.state.self}/>
				</BottomContainer>
			</ViewAttendanceContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(ViewAttendance);
