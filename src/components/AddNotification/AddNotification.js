import React from 'react';

import {AddNotificationContainer, Title, FormContainer, InputContainer1, 
	InputContainer2, InputContainer3, InputContainer4, SelectDiv2,
	NoteContainer, SelectDiv, FormNoteContainer, Span1, Span2} from './AddNotificationStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import {RemoveNotification} from '../../redux/class/ClassActions.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class AddNotification extends React.Component {
	constructor() {
		super() 
		this.state = {
			message: null,
			updates: {},
			sendsms: false,
			counter: false
		}
	}

	componentWillUnmount() {
		this.props.RemoveNotification()
	}

	handleSubmit = async(e) => {
		e.preventDefault()

		if(this.props.notification) {

			let url = `${process.env.REACT_APP_API_URL}/updatenotification/${this.props.notification[0]._id}`
			
			if(this.props.currentUser.hasOwnProperty('admin')) {
				this.props.LoadingStart()
				const response = await fetch(url, {
				method: 'PATCH',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: JSON.stringify({
			    	...this.state.updates,
			    	sendsms: this.state.sendsms
			    })
			})

			const data = await response.json()
			console.log(data)
			this.setState({message: data})
			this.returnMessage()
			}
			this.props.LoadingEnd()

		} else {

			const recipient = document.querySelector("form").elements[0].value
			const noticetype = document.querySelector("form").elements[1].value
			const date = document.querySelector("form").elements[2].value
			const description = document.querySelector("form").elements[3].value
			const status = document.querySelector("form").elements[4].value
			const sendsms = document.querySelector("form").elements[5].checked

			console.log(document.querySelector("form").elements)
			console.log(date)

			let url = `${process.env.REACT_APP_API_URL}/createnotification`
			
			if(this.props.currentUser.hasOwnProperty('admin')) {
				this.props.LoadingStart()
				const response = await fetch(url, {
				method: 'POST',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: JSON.stringify({
			    	year: this.props.year,
			    	recipient: recipient,
			    	noticetype: noticetype,
			    	date: date,
			    	description: description,
			    	status: status,
			    	sendsms: sendsms
			    })
			})

			const data = await response.json()
			this.setState({message: data})
			this.returnMessage()
			}
			this.props.LoadingEnd()
		}

	}

	handleChange = (e) => {
		if(e.target.id === 'sendsms') {
			if(e.target.checked === true) {
				this.setState((prevState) => ({sendsms: !prevState.sendsms}))
			}
		}
		this.setState({updates: {...this.state.updates, [e.target.id]: e.target.value}})
	}

	renderValues = () => {
		if(this.props.notification) {
			let noti = this.props.notification[0]
			document.getElementById('recipient').value = noti.recipient
			document.getElementById('noticetype').value = noti.noticetype
			document.getElementById('date').value = noti.date
			document.getElementById('description').value = noti.description
			document.getElementById('status').value = noti.status
			this.setState({counter: true})
		}
	}

	componentDidMount() {
		this.renderValues()
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.isLoading) {
			return null
		}
		if(this.state.counter === false) {
			this.renderValues()
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
		console.log(this.state)
		return (
			<AddNotificationContainer>
			<ToastContainer />
				<Title>
					<span> Add Notice </span>
				</Title>
				{
					this.props.isLoading ? <Spinner /> : 
					<FormNoteContainer>
					<FormContainer onSubmit={this.handleSubmit} id="noticeform">
						<InputContainer1>
							<SelectDiv>
								<label htmlFor="recipient">Recipient:</label>
									<select name="recipient" id="recipient" onChange={this.handleChange}>
									  <option value="Teacher">Teacher</option>
									  <option value="Parent/Student">Parent/Student</option>
									  <option value="Both">Both</option>
									</select>
								<label htmlFor="noticetype">Type:</label>
									<select name="NoticeType" id="noticetype" onChange={this.handleChange}>
									  <option value="Event">Event</option>
									  <option value="Meeting">Meeting</option>
									  <option value="Holiday">Holiday</option>
									  <option value="Fees">Fees</option>
									  <option value="Exam">Exam</option>
									</select>
									<InputForm type='date' id='date' onChange={this.handleChange}/>
							</SelectDiv>
						</InputContainer1>
						<InputContainer2>
							<textarea form="noticeform" placeholder="Description" id='description' rows="7" cols="50" onChange={this.handleChange}/>
						</InputContainer2>
							<SelectDiv2>
								<label htmlFor="status">Status:</label>
									<select name="status" id="status" onChange={this.handleChange}>
									  <option value="pending">pending</option>
									  <option value="completed">completed</option>
									</select>
							</SelectDiv2>
						<InputContainer3>
							<InputForm type='checkbox' id='sendsms' handleChange={this.handleChange}/><span> Send SMS </span>
						</InputContainer3>
						<InputContainer4>
							<Button name="SAVE" type="submit" />
						</InputContainer4>
					</FormContainer>
					<NoteContainer>
						<Span1>Note:</Span1>
						<Span2>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Span2>
					</NoteContainer>
					</FormNoteContainer>
				}
			</AddNotificationContainer>
		)
	}
}


const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	year: state.user.year,
	isLoading: state.user.isLoading,
	notification: state.class.notification
})

const mapDispatchToProps = (dispatch) => ({
	LoadingStart: () => dispatch(LoadingStart()),
	LoadingEnd: () => dispatch(LoadingEnd()),
	RemoveNotification: () => dispatch(RemoveNotification())
})


export default connect(mapStateToProps, mapDispatchToProps)(AddNotification);

