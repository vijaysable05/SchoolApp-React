import React from 'react';

import {AddAttendance2Container, BottomContainer,
	DateContainer, SelectDiv, AttendanceContainer, AttendanceFormContainer} from './AddAttendance2Styles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import {connect} from 'react-redux';
import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class AddAttendance3 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			staffs: null,
			attendance: [],
			message: null
		}
	}

	handleChange = (e) => {
		let date = document.getElementById('date').value
		const {id, value} = e.target

		this.setState((prevState) => ({
			...prevState.attendance.push({date: date, staffid: id, status: value})
		}))

	}

	handleFocus = () => {
		let date = document.getElementById('date').value
		if(date === '') {
			alert("please select date")
		}
	}

	handleSubmit = async() => {
		this.props.LoadingStart()

		let url = `${process.env.REACT_APP_API_URL}/addstaffattendance`

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
		this.props.LoadingEnd()
	}

	loadStaffs = async() => {
		this.setState({staffs: []})
		
		let url = `${process.env.REACT_APP_API_URL}/getstaffs/0/0/firstname:asc?year=${this.props.year}`
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

				data.forEach((stf) => {
					array.push(<AttendanceFormContainer key={stf._id}>
					<span> {`${stf.firstname} ${stf.middlename} ${stf.lastname}`} : </span>
					<SelectDiv>
							<select name="attendance" id={stf._id} onChange={this.handleChange} onClick={this.handleFocus}>
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

				this.setState({staffs: array})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	componentDidMount() {
		this.loadStaffs()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState.year !== this.state.year) {
			this.loadStaffs()
		}
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
				{
					this.props.isLoading ? <Spinner /> :
					<BottomContainer>
						<DateContainer>
							<InputForm type="date" id="date" />
						</DateContainer>
							<AttendanceContainer>
								{
									this.state.staffs ? this.state.staffs : null
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

export default connect(mapStateToProps, mapDispatchToProps)(AddAttendance3);
