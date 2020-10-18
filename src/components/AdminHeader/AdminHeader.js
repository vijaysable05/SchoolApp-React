import React from 'react';

import {HeaderContainer, Title, Options, Option, Dropdown, SelectYear} from './AdminHeaderStyles.js';

// import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';

import Button from '../Button/Button.js';

import {connect} from 'react-redux';
import {LogoutStart, YearSelected} from '../../redux/user/UserActions.js';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
// import Spinner from '../spinner/Spinner.js';
import {SetClasses, SetClassesFail} from '../../redux/class/ClassActions.js';

import {Link} from 'react-router-dom';

class AdminHeader extends React.Component {
	constructor() {
		super()
		this.state = {
			bool: false
		}
	}

	async componentDidMount() {
		if(!this.props.classes) {

			const year = document.getElementById("year")[0].value
			this.props.YearSelected(year)

			let url = `${process.env.REACT_APP_API_URL}/getclasses/0/0/createdAt:asc?year=${year}`
			let array = []

			if(this.props.currentUser.hasOwnProperty('admin')) {
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

	// componentDidUpdate() {
	// 	document.getElementById('year').value = window.localStorage.getItem('year')
	// }


	handleLogout = (e) => {
		const {currentUser, LogoutStart} = this.props

		LogoutStart(currentUser, currentUser.token)

	}

	handleChange = async(e) => {
		this.props.YearSelected(e.target.value)
		window.localStorage.setItem('year', e.target.value)
		// this.props.YearSelected(year)

		let url = `${process.env.REACT_APP_API_URL}/getclasses/0/0/createdAt:asc?year=${e.target.value}`
		let array = []

		if(this.props.currentUser.hasOwnProperty('admin')) {
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


	render() {
	return (
		
		<HeaderContainer>
			<Title>
				<span><Link to="/admin"> Admin </Link></span>
				<SelectYear name="year" id="year" onChange={this.handleChange}>
				  <option value="2019">2019</option>
				  <option value="2020">2020</option>
				</SelectYear>
			</Title>
			<Options>
				<Dropdown>
				  Class
				  <div className="dropdown-content">
				    <Link to="/admin/addclass">Add Class</Link>
				    <Link to="/admin/class">Class</Link>
				  </div>
				</Dropdown>
				<Dropdown>
				  Staff
				  <div className="dropdown-content">
				    <Link to="/admin/addstaff">Add Staff</Link>
				    <Link to="/admin/viewstaff">View Staff</Link>
				  </div>
				</Dropdown>
				<Dropdown>
				  Student
				  <div className="dropdown-content">
				    <Link to="/admin/addstudent">Add Student</Link>
				    <Link to="/admin/viewstudents">View Students</Link>
				  </div>
				</Dropdown>
				<Dropdown>
				  Time Table
				  <div className="dropdown-content">
				    <Link to="/admin/viewtimetable">View Time Table</Link>
				    <Link to="/admin/addtimetable">Add/Edit Time Table</Link>
				  </div>
				</Dropdown>
				<Dropdown>
				  Notice Board
				  <div className="dropdown-content">
				    <Link to="/admin/viewnotifications">Notice Board</Link>
				    <Link to="/admin/addnotification">Add Notification</Link>
				  </div>
				</Dropdown>
				<Dropdown>
				  Leave
				  <div className="dropdown-content">
				    <Link to="/admin/teacherleave">Teacher's Leave</Link>
				    <Link to="/admin/studentleave">Student's Leave</Link>
				  </div>
				</Dropdown>
				<Dropdown>
				  Library
				  <div className="dropdown-content">
				    <Link to="/admin/bookList">Book List</Link>
				    <Link to="/admin/issuebook">Issue Book</Link>
				    <Link to="/admin/bookscirculated">Books Circulated</Link>
				    <Link to="/admin/history">History</Link>
				    <Link to="/admin/fine">Fine & Returns</Link>
				  </div>
				</Dropdown>
				<Option to="/admin/attendance"> Attendance </Option>
				<Option to="/admin/gallery"> Gallery </Option>
				<Option to="/admin/store"> Store </Option>
				<Option to="/admin/exam"> Exam </Option>
				<Option to="/admin/tutorial"> Tutorial </Option>
				<Option to="/admin/payment"> Payment </Option>
				<Option to="/admin/transport"> Transport </Option>
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


export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);












// <React.Fragment>
// 		<Button handleClick={() => {this.setState({bool: true})}}/>
// 		<ProSidebar breakPoint="md" width='10%' min-width='5%' toggled={this.state.bool} onToggle={(value) => {this.setState({bool: value})}}>
// 			<Menu iconShape="square">
// 			    <MenuItem>
// 				  Dashboard
// 				  <Link to="/admin" />
// 				</MenuItem>
// 			</Menu>
// 			   <Menu iconShape="square">
// 			     <MenuItem>Year</MenuItem>
// 			    <SubMenu title="Components">
// 			      <MenuItem>2019</MenuItem>
// 			      <MenuItem>2020</MenuItem>
// 			    </SubMenu>
// 			</Menu>
// 			<Menu iconShape="square">
// 			    <MenuItem>Class</MenuItem>
// 			    <SubMenu title="Components">
// 				    <MenuItem>
// 					  Add Class
// 					  <Link to="/admin/addclass" />
// 					</MenuItem>
// 				      <MenuItem>
// 					  Class
// 					  <Link to="/admin/class" />
// 					</MenuItem>
// 			    </SubMenu>
// 			</Menu>
// 			<Menu iconShape="square">
// 			    <MenuItem>Staff</MenuItem>
// 			    <SubMenu title="Components">
// 				    <MenuItem>
// 					  Add Staff
// 					  <Link to="/admin/addstaff" />
// 					</MenuItem>
// 				      <MenuItem>
// 					  View Staff
// 					  <Link to="/admin/viewstaff" />
// 					</MenuItem>
// 			    </SubMenu>
// 			</Menu>
// 			<Menu iconShape="square">
// 			    <MenuItem>Student</MenuItem>
// 			    <SubMenu title="Components">
// 				    <MenuItem>
// 					  Add Student
// 					  <Link to="/admin/addstudent" />
// 					</MenuItem>
// 				      <MenuItem>
// 					  View Student
// 					  <Link to="/admin/viewstudents" />
// 					</MenuItem>
// 			    </SubMenu>
// 			</Menu>
// 		</ProSidebar>
// 		</React.Fragment>