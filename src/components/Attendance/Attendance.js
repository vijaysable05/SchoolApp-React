import React from 'react';

import {AttendanceContainer, TitleContainer, UpperContainer, BottomContainer} from './AttendanceStyles.js';

import Button from '../Button/Button.js';

import ViewAttendance from '../ViewAttendance/ViewAttendance.js';
import AddAttendance from '../AddAttendance/AddAttendance.js';
import Holidays from '../Holidays/Holidays.js';

class Attendance extends React.Component {
	constructor() {
		super()
		this.state = {
			viewAttendance: true,
			addAttendance: false,
			weeklyOff: false,
			holidays: false
		}
	}

	changeViewAttendance = () => {
		this.setState({viewAttendance: true,
			addAttendance: false, weeklyOff: false,
			holidays: false})
	}

	changeAddAttendance = () => {
		this.setState({viewAttendance: false,
			addAttendance: true, weeklyOff: false,
			holidays: false})
	}

	// changeWeeklyOff = () => {
	// 	this.setState({viewAttendance: false,
	// 		addAttendance: false, weeklyOff: true,
	// 		holidays: false})
	// }

	changeHolidays = () => {
		this.setState({viewAttendance: false,
			addAttendance: false, weeklyOff: false,
			holidays: true})
	}

	
	render() {
		return (
			<AttendanceContainer>
				<TitleContainer>
					<span> Attendance </span>
				</TitleContainer>
				{
					this.props.student ? 
					<UpperContainer>
						<Button type="button" name="View Attendance" handleClick={this.changeViewAttendance}/>
						<Button type="button" name="Holidays" handleClick={this.changeHolidays}/>
					</UpperContainer> : 
					<UpperContainer>
						<Button type="button" name="View Attendance" handleClick={this.changeViewAttendance}/>
						<Button type="button" name="Add Attendance" handleClick={this.changeAddAttendance}/>
						<Button type="button" name="Holidays" handleClick={this.changeHolidays}/>
					</UpperContainer>
				}
				<BottomContainer>
					{
						this.state.viewAttendance ? <ViewAttendance student={this.props.student} admin={this.props.admin} /> :
						this.state.addAttendance ? <AddAttendance admin={this.props.admin} /> :
						this.state.holidays ? <Holidays admin={this.props.admin} /> : null
					}
				</BottomContainer>
			</AttendanceContainer>
			)
	}
}




export default Attendance;


// <Button type="button" name="Weekly Off" handleClick={this.changeAddAttendance}/>
