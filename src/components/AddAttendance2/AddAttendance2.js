import React from 'react';

import {AddAttendance2Container, UpperContainer, BottomContainer,
	DateContainer, SelectDiv, AttendanceContainer, AttendanceFormContainer} from './AddAttendance2Styles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import {connect} from 'react-redux';
import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class AddAttendance2 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedClass: null,
			selectedDivision: null,
			isShown: false,
			isFetching: false,
			students: null,
			attendance: [],
			message: null
		}
	}

	renderClasses = () => {
		let data = []
		if(this.props.classes) {
			this.props.classes.forEach((cls) => {
				data.push(<option id={cls.classid} key={cls.class} value={cls.class}>{cls.class}</option>)
			})
		}
		return data
	}

	renderDivisions = () => {
		if(this.state.selectedClass){

			let class1 = this.state.selectedClass
			let data = []
			if(this.props.classes) {
				let class2 = this.props.classes.find((cls) => {
					return cls.class === class1
				})

				class2.divisions.forEach((div) => {
					data.push(<option key={div.division} value={div.division}>{div.division}</option>)
				})
			}

			return data
		}
	}

	selectClass = (e) => {
		this.setState({selectedClass: e.target.value})
		let class1 = e.target.value
		let class2 = this.props.classes.find((cls) => {
			return cls.class === class1
		})
		if(class2.divisions.length > 0) {
			this.setState({selectedDivision: class2.divisions[0].division})
			document.getElementById("division").value = class2.divisions[0].division
		} else {
			this.setState({selectedDivision: null})
		}
	}

	selectDivision = (e) => {
		this.setState({selectedDivision: e.target.value})
	}

	loadClasses = () => {
		if(this.props.classes) {
			this.setState({selectedClass: this.props.classes[0].class, selectedDivision: this.props.classes[0].divisions[0].division})
		}
	}

	componentDidMount() {
		this.loadClasses()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.classes !== this.props.classes) {
			this.loadClasses()
		}
		if(prevProps.year !== this.props.year) {
			this.loadClasses()
		}
	}

	handleChange = (e) => {
		let date = document.getElementById('date').value
		const {id, value} = e.target
		let class1 = this.state.selectedClass
		let division = this.state.selectedDivision

		this.setState((prevState) => ({
			...prevState.attendance.push({class: class1, division: division, date: date, studentid: id, status: value})
		}))

	}

	handleFocus = () => {
		let date = document.getElementById('date').value
		if(date === '') {
			alert("please select date")
		}
	}

	getStudents = async() => {
		this.setState({isShown: false, attendance: []})

		let url = `${process.env.REACT_APP_API_URL}/getstudents/0/0/createdAt:asc?year=${this.props.year}&class=${this.state.selectedClass}&division=${this.state.selectedDivision}`
		let array = []

		if(this.props.currentUser) {
			this.setState({isFetching: true})
			const response = await fetch(url, {
				method: 'GET',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const data = await response.json()
			
			if(data.length > 0) {

				data.forEach((stu) => {
					array.push(<AttendanceFormContainer key={stu._id}>
						<span> {`${stu.firstname} ${stu.middlename} ${stu.lastname}`} : </span>
						<SelectDiv>
								<select name="attendance" id={stu._id} onChange={this.handleChange} onClick={this.handleFocus}>
								<option value="selectstatus">Select Status</option>
								<option value="P">P</option>
								<option value="A">A</option>
								<option value="HD">HD</option>
								<option value="L">L</option>
								<option value="WO">WO</option>
								<option value="H">H</option>
							</select>
						</SelectDiv>
						</AttendanceFormContainer>)
				})

				this.setState({students: array, isFetching: false, isShown: true})

			} else {
				this.setState({students: array, isFetching: false, isShown: false})
				return;
			}
		}
	}

	handleSubmit = async() => {
		this.setState({isFetching: true})

		let url = `${process.env.REACT_APP_API_URL}/addstudentattendance`

		if(this.props.currentUser) {

			const response = await fetch(url, {
			method: 'POST',
			headers: { 
		        "Content-type": "application/json; charset=UTF-8",
		        'Authorization': 'Bearer ' + this.props.currentUser.token
		    },
		    body: JSON.stringify(this.state.attendance), 
		})

		const data = await response.json()
		this.setState({message: data, attendance: []})
		this.returnMessage()
		}
		this.setState({isFetching: false})
	}

	returnMessage = async() => {
		if(this.state.message) {
			if(this.state.message.success) {
				await Toast(this.state.message.success, null)
				this.setState({message: null})
			}else if(this.state.message.error) {
				await Toast(null, this.state.message.error)
				this.setState({message: null})
			}
		}
	}

	
	render() {
		return (
			<AddAttendance2Container>
			<ToastContainer />
					<UpperContainer>
						<SelectDiv>
							<label htmlFor="class">Class:</label>
								<select name="Class" id="class" onChange={this.selectClass}>
								{
									this.renderClasses()
								}
							</select>
							<label htmlFor="division">Division:</label>
								<select name="Division" id="division" onChange={this.selectDivision}>
								{
									this.renderDivisions()
								}
							</select>
						</SelectDiv>
						<Button type="button" name="Submit" handleClick={this.getStudents} />
					</UpperContainer>
				{
					this.state.isFetching ? <Spinner /> :
					<BottomContainer>
						<DateContainer>
							<InputForm type="date" id="date" required/>
						</DateContainer>
							<AttendanceContainer>
								{
									this.state.students ? this.state.students : null
								}
							</AttendanceContainer>
						<Button type="button" name="Save" handleClick={this.handleSubmit} />
					</BottomContainer>
				}
			</AddAttendance2Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddAttendance2);
