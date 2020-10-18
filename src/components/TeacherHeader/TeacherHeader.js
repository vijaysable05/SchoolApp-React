import React from 'react';

import {HeaderContainer, Title, Options, Option, Dropdown, SelectYear} from './TeacherHeaderStyles.js';

import Button from '../Button/Button.js';

import {connect} from 'react-redux';

import {LogoutStart, YearSelected} from '../../redux/user/UserActions.js';
import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import {SetClasses, SetClassesFail} from '../../redux/class/ClassActions.js';

import {Link} from 'react-router-dom';

class TeacherHeader extends React.Component {
	constructor() {
		super()
		this.state = {

		}
	}

	async componentDidMount() {
		if(!this.props.classes) {

			const year = document.getElementById("year")[0].value
			this.props.YearSelected(year)

			let url = `${process.env.REACT_APP_API_URL}/getclasses/0/0/createdAt:asc?year=${year}`
			let array = []

			if(this.props.currentUser.hasOwnProperty('staff')) {
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

					data.forEach((class1) => {
						array.push({class: class1.class, classid: class1._id, divisions: class1.divisions})
					})

					this.props.SetClasses(array)
					
				} else {
					this.props.SetClassesFail('Not able to fetch classes')
				}
				await this.props.LoadingEnd()
				
			}
		}
	}

	handleChange = async(e) => {
		this.props.YearSelected(e.target.value)
		window.localStorage.setItem('year', e.target.value)
		// this.props.YearSelected(year)

		let url = `${process.env.REACT_APP_API_URL}/getclasses/0/0/createdAt:asc?year=${e.target.value}`
		let array = []

		if(this.props.currentUser.hasOwnProperty('staff')) {
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

				data.forEach((class1) => {
					array.push({class: class1.class, classid: class1._id, divisions: class1.divisions})
				})

				this.props.SetClasses(array)
				
			} else {
				this.props.SetClassesFail('Not able to fetch classes')
			}
			await this.props.LoadingEnd()
			document.getElementById('year').value = window.localStorage.getItem('year')
		}
	}

	handleLogout = (e) => {
		const {currentUser, LogoutStart} = this.props

		LogoutStart(currentUser, currentUser.token)

	}


	render() {
	return (

		<HeaderContainer>
			<Title>
				<span><Link to="/teacher"> Teacher </Link></span>
			<SelectYear name="year" id="year" onChange={this.handleChange}>
			  <option value="2019">2019</option>
			  <option value="2020">2020</option>
			</SelectYear>
			</Title>
			<Options>
				<Dropdown>
				  Class
				  <div className="dropdown-content">
				    <Link to="/teacher/class">Class</Link>
				  </div>
				</Dropdown>
				<Dropdown>
				  Staff
				  <div className="dropdown-content">
				    <Link to="/teacher/viewstaff">View Staff</Link>
				  </div>
				</Dropdown>
				<Dropdown>
				  Student
				  <div className="dropdown-content">
				    <Link to="/teacher/viewstudents">View Students</Link>
				  </div>
				</Dropdown>
				<Dropdown>
				  Time Table
				  <div className="dropdown-content">
				    <Link to="/teacher/viewtimetable">View Time Table</Link>
				  </div>
				</Dropdown>
				<Dropdown>
				  Notice Board
				  <div className="dropdown-content">
				    <Link to="/teacher/viewnotifications">Notice Board</Link>
				  </div>
				</Dropdown>
				<Dropdown>
				  Leave
				  <div className="dropdown-content">
				    <Link to="/teacher/studentleave">Student's Leave</Link>
				    <Link to="/teacher/leaverequest">Leave Request</Link>
				    <Link to="/teacher/leavessent">Leave's Sent</Link>
				  </div>
				</Dropdown>
				<Dropdown>
				  Library
				  <div className="dropdown-content">
				    <Link to="/teacher/bookList">Book List</Link>
				  </div>
				</Dropdown>
				<Option to="/teacher/attendance"> Attendance </Option>
				<Option to="/teacher/gallery"> Gallery </Option>
				<Option to="/teacher/exam"> Exam </Option>
				<Option to="/teacher/tutorial"> Tutorial </Option>
				<Option to="/teacher/transport"> Transport </Option>
				<Button name="Logout" type="button" handleClick={this.handleLogout} />
			</Options>
		</HeaderContainer>

		)
	}

}

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
	isLoading: state.user.isLoading,
	year: state.user.year,
	classes: state.class.classes
})

const mapDispatchToProps = (dispatch) => ({
	LogoutStart: (login, token) => dispatch(LogoutStart({login, token})),
	YearSelected: (year) => dispatch(YearSelected(year)),
	LoadingStart: () => dispatch(LoadingStart()),
	LoadingEnd: () => dispatch(LoadingEnd()),
	SetClasses: (classes) => dispatch(SetClasses(classes)),
	SetClassesFail: (error) => dispatch(SetClassesFail(error))
})


export default connect(mapStateToProps, mapDispatchToProps)(TeacherHeader);