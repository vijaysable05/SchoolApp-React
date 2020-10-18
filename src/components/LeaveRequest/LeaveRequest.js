import React from 'react';

import {LeaveRequestContainer, Title, FormContainer, InputContainer1, 
	InputContainer2, InputContainer4, MessageContainer,
	NoteContainer, FormNoteContainer, Span1, Span2} from './LeaveRequestStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

class LeaveRequest extends React.Component {
	constructor() {
		super() 
		this.state = {
			message: null
		}
	}

	handleSubmit = async(e) => {
		e.preventDefault()

		const startdate = document.getElementById("startdate").value
		const enddate = document.getElementById('enddate').value
		const title = document.getElementById("title").value
		const description = document.getElementById('description').value

		let url = null
		let from1 = null

		if(this.props.currentUser.hasOwnProperty('staff')) {

			url = `${process.env.REACT_APP_API_URL}/createteacherleaverequest`
			from1 = this.props.currentUser.staff._id

		} else if(this.props.currentUser.hasOwnProperty('student')) {

			url = `${process.env.REACT_APP_API_URL}/createstudentleaverequest`
			from1 = this.props.currentUser.student._id

		}

		this.props.LoadingStart()
		const response = await fetch(url, {
			method: 'POST',
			headers: { 
		        "Content-type": "application/json; charset=UTF-8",
		        'Authorization': 'Bearer ' + this.props.currentUser.token
		    },
		    body: JSON.stringify({
		    	year: this.props.year,
		    	from: from1,
		    	startdate: startdate,
		    	enddate: enddate,
		    	title: title,
		    	description: description
		    }), 
		})

		const data = await response.json()
		this.setState({message: data})
		this.props.LoadingEnd()
	}

	returnMessage = () => {
		if(this.state.message) {
			if(this.state.message.success) {
				return (<MessageContainer> <span style={{color:"#2196f3"}}> {this.state.message.success} </span> </MessageContainer>)
			}else if(this.state.message.error) {
				return (<MessageContainer> <span style={{color:"red"}}> {this.state.message.error} </span> </MessageContainer>)
			}
		}
	}

	render() {
		return (
			<LeaveRequestContainer>
				<Title>
					<span> Leave Request </span>
				</Title>
				{
					this.props.isLoading ? <Spinner /> :
					<FormNoteContainer>
					<FormContainer id="leaveform">
						<InputContainer1>
							<InputForm name="Start Date" type='date' id='startdate'/>
							<InputForm name="End Date" type='date' id='enddate'/>
						</InputContainer1>
						<InputContainer2>
							<InputForm type="text" id="title" placeholder="Title" />
							<textarea form="leaveform" placeholder="Description" id='description' rows="7" cols="50"/>
						</InputContainer2>
						<InputContainer4>
							<Button name="Send" type="button" handleClick={this.handleSubmit}/>
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
				{
					this.returnMessage()
				}
			</LeaveRequestContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(LeaveRequest);

