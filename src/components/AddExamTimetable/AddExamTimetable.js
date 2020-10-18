import React from 'react';

import {AddExamTimetableContainer, UpperContainer, 
	ClassContainer, BottomContainer, TableContainer, 
	FormContainer, SelectDiv, ButtonDiv2} from './AddExamTimetableStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import ViewTable from '../ViewsTable/ViewsTable.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

let obj = {}

class AddExamTimetable extends React.Component {
	constructor() {
		super()
		this.state = {
			array: [],
			counter: 1,
			exams: null,
			isFetching: false,
			message: null,
			update: {}
		}
	}

	loadExams = async() => {
		this.setState({exams: null})
		
		let url = `${process.env.REACT_APP_API_URL}/getexams/0/0/startdate:asc?year=${this.props.year}`
		let array = []

		if(this.props.currentUser) {
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

				data.forEach((exm) => {
					array.push({examname: exm.examname, id: exm._id, examclass: exm.class.class})
				})

				this.setState({exams: array})
				this.props.LoadingEnd()

				if(this.props.exam) {
					this.addInputForms2(this.props.exam)
				}

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	componentDidMount() {
		this.loadExams()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadExams()
		}
	}

	handleUpdate = (e) => {
		let {id, value} = e.target

		obj[id] = value
	}

	addInputForms2 = async(exam) => {
		let array1 = []
		document.getElementById('exam').value = exam.id
		await array1.push(exam.subject.srno, 
			<InputForm type="text" id={`subject`} handleChange={this.handleUpdate}/>, 
			<InputForm type="text" id={`totalmarks`} handleChange={this.handleUpdate}/>, 
			<InputForm type="text" id={`minmarks`} handleChange={this.handleUpdate}/>,
			<InputForm type="date" id={`date`} handleChange={this.handleUpdate}/>,
			<InputForm type="time" id={`starttime`} handleChange={this.handleUpdate}/>, 
			<InputForm type="time" id={`endtime`} handleChange={this.handleUpdate}/>, 
			)

		await this.setState((prevState) => ({
			counter: prevState.counter + 1,
			...prevState.array.push(array1)
		}))

		document.getElementById('subject').value = exam.subject.subject
		document.getElementById('totalmarks').value = exam.subject.totalmarks
		document.getElementById('minmarks').value = exam.subject.minmarks
		document.getElementById('date').value = exam.subject.date
		document.getElementById('starttime').value = exam.subject.starttime
		document.getElementById('endtime').value = exam.subject.endtime
	}

	addInputForms = () => {
		let array1 = []
		
		array1.push(this.state.counter, 
			<InputForm type="text" id={`subject${this.state.counter}`} />, 
			<InputForm type="text" id={`totalmarks${this.state.counter}`} />, 
			<InputForm type="text" id={`minmarks${this.state.counter}`} />,
			<InputForm type="date" id={`date${this.state.counter}`} />,
			<InputForm type="time" id={`start${this.state.counter}`} />, 
			<InputForm type="time" id={`end${this.state.counter}`} />, 
			)

		this.setState((prevState) => ({
			counter: prevState.counter + 1,
			...prevState.array.push(array1)
		}))
	}

	removeInputForms = () => {

		this.setState((prevState) => ({
			counter: prevState.counter - 1,
			...prevState.array.pop()
		}))
	}

	renderExams = () => {
		let data = []
		if(this.state.exams) {
			this.state.exams.forEach((exm) => {
				data.push(<option id={exm.id} key={exm.id} value={exm.id}>{exm.examname} | Class - {exm.examclass}</option>)
			})
		}
		return data
	}

	handleUpdateSave = async() => {
		if(this.props.currentUser.hasOwnProperty('admin')) {

			this.setState({isFetching: true})

			let url = `${process.env.REACT_APP_API_URL}/updateexamtimetable?id=${this.props.exam.id}`

			const response = await fetch(url, {
			method: 'PATCH',
			headers: { 
		        "Content-type": "application/json; charset=UTF-8",
		        'Authorization': 'Bearer ' + this.props.currentUser.token
		    },
		    body: JSON.stringify([{
    		    	subjectid: this.props.exam.subject._id,
    		    	update: obj 
    		    }]), 
		})

		const data = await response.json()
		this.setState({message: data})
		}

		this.returnMessage()
		this.setState({isFetching: false})
	}


	handleSubmit = async() => {
		
		let classid = document.getElementById('exam').value
		let length = document.getElementsByTagName('tr').length
		let array = []

		for(let i=1;i<length;i++) {
			let srno = document.getElementsByTagName('tr')[i].children[0].innerText
			let subject = document.getElementsByTagName('tr')[i].children[1].children[0].children[0].value
			let totalmarks = document.getElementsByTagName('tr')[i].children[2].children[0].children[0].value
			let minmarks = document.getElementsByTagName('tr')[i].children[3].children[0].children[0].value
			let date = document.getElementsByTagName('tr')[i].children[4].children[0].children[0].value
			let starttime = document.getElementsByTagName('tr')[i].children[5].children[0].children[0].value
			let endtime = document.getElementsByTagName('tr')[i].children[6].children[0].children[0].value
			array.push({
				srno: srno,
				subject: subject,
				totalmarks: totalmarks,
				minmarks: minmarks,
				date: date,
				starttime: starttime,
				endtime: endtime
			})
		}

		this.setState({isFetching: true})

		let url = `${process.env.REACT_APP_API_URL}/addexamtimetable?id=${classid}`

		if(this.props.currentUser.hasOwnProperty('admin')) {

			const response = await fetch(url, {
			method: 'PATCH',
			headers: { 
		        "Content-type": "application/json; charset=UTF-8",
		        'Authorization': 'Bearer ' + this.props.currentUser.token
		    },
		    body: JSON.stringify(array), 
		})

		const data = await response.json()
		this.setState({message: data})
		}

		this.returnMessage()
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
			<AddExamTimetableContainer>
			<ToastContainer />
			{
				this.props.isLoading ? <Spinner /> :
				<React.Fragment>
					<UpperContainer>
						<ClassContainer>
								<SelectDiv>
									<label htmlFor="Exam">Exam:</label>
										<select name="Exam" id="exam">
										{
											this.renderExams()
										}
									</select>
								</SelectDiv>
						</ClassContainer>
						<Button name="Back" type="button" handleClick={this.props.renderViewExam} />
					</UpperContainer>
					{
						this.state.isFetching ? <Spinner /> :
						<BottomContainer>
								<TableContainer>
									<ViewTable 
									th={['Sr no.', 'Subject', 'Total Marks', 'Minimum Marks', 'Date', 'Start Time', 'End Time']} 
									td={this.state.array}/>
								</TableContainer>
							<FormContainer>
									<ButtonDiv2>
									{
										this.props.exam ? null :
										<React.Fragment>
										<Button name="Add Subject" type="button" handleClick={this.addInputForms}/>
										<Button name="Remove Subject" type="button" handleClick={this.removeInputForms}/>
										</React.Fragment>
									}
										<Button name="Save" type="button" handleClick={this.props.exam ? this.handleUpdateSave : this.handleSubmit}/>
									</ButtonDiv2>
								</FormContainer>
						</BottomContainer>
					}
				</React.Fragment>
			}
			</AddExamTimetableContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddExamTimetable);











