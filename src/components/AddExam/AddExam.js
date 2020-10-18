import React from 'react';

import {AddExamContainer, UpperContainer, BottomContainer, 
	ClassesContainer, ManagerAndClassesTitleContainer, ClassesInputFormContainer, 
	ExamInfoContainer, FormContainer2, ButtonContainer, RadioInput,
	FormContainer3, SelectDiv, FormContainer4} from './AddExamStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class AddExam extends React.Component {
	constructor() {
		super()
		this.state = {
			staffs: null,
			message: null,
			classes: [],
			exammanager: null,
			examname: null,
			startdate: null,
			enddate: null,
			isFetching: false,
			class: null
		}
	}

	handleChange2 = (e) => {
		this.setState({[e.target.id]: e.target.value})
	}
	
	renderManagers = () => {
		let data = []
		if(this.state.staffs) {
			this.state.staffs.forEach((stf) => {
				data.push(<option key={stf.id} value={stf.id}>{stf.name}</option>)
			})
		}

		return data
	}

	handleChange = (e) => {
		let value = e.target.value
		if(this.props.exam.class) {
			this.setState({class: value})
		} else {

			if(this.state.classes.includes(value)) {
				let array = this.state.classes.filter((cls) => {
					return cls !== value
				})
				this.setState({classes: array})
			} else {
				this.setState((prevState) => ({
					...prevState.classes.push(value)
				}))
			}

		}
	}

	renderClasses = () => {
		let data = []

		this.props.classes.forEach((cls) => {
			data.push(<React.Fragment key={cls.class}>
			{
				this.props.exam.class ?
				<RadioInput> 
				<label htmlFor={cls.class}>
				{cls.class}
				</label>
				<input type="radio" id={cls.class} name="class" value={cls.classid} onChange={this.handleChange}/>
				</RadioInput>
				:
				<InputForm type="checkbox" id={cls.class} name={cls.class} value={cls.classid} handleChange={this.handleChange}/>
			}
				</React.Fragment>)
		})

		return data
	}

	loadStaffs = async() => {
		this.setState({staffs: []})
		
		let url = `${process.env.REACT_APP_API_URL}/getstaffs/0/0/firstname:asc?year=${this.props.year}`
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

				data.forEach((stf) => {
					array.push({name: `${stf.firstname} ${stf.middlename} ${stf.lastname}`, id: stf._id})
				})

				this.setState({staffs: array})
				this.props.LoadingEnd()
				this.renderValues()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	renderValues = () => {
		if(this.props.exam.class) {
			
			const exam = this.props.exam

			document.getElementById(exam.class.class).click()
			this.setState({class: null})
			document.getElementById('exammanager').value = exam.exammanager._id
			document.getElementById('examname').value = exam.examname
			document.getElementById('startdate').value = exam.startdate
			document.getElementById('enddate').value = exam.enddate
		}
	}

	componentDidMount() {
		this.loadStaffs()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadStaffs()
		}
	}

	handleSubmit = async() => {

		this.setState({isFetching: true})

		let url = null

		if(this.props.exam.class) {

			url = `${process.env.REACT_APP_API_URL}/updateexam?id=${this.props.exam._id}`

			let obj = {}

			if(this.state.class) {
				obj.classes = this.state.class
			}
			if(this.state.exammanager) {
				obj.exammanager = this.state.exammanager
			}
			if(this.state.examname) {
				obj.examname = this.state.examname
			}
			if(this.state.startdate) {
				obj.startdate = this.state.startdate
			}
			if(this.state.enddate) {
				obj.enddate = this.state.enddate
			}

			if(obj) {
				
				if(this.props.currentUser.hasOwnProperty('admin')) {

					const response = await fetch(url, {
					method: 'PATCH',
					headers: { 
				        "Content-type": "application/json; charset=UTF-8",
				        'Authorization': 'Bearer ' + this.props.currentUser.token
				    },
				    body: JSON.stringify(obj), 
				})

				const data = await response.json()
				this.setState({message: data, classes: [], exammanager: null, examname: null, startdate: null, enddate: null})
			}

			}

		} else {

			url = `${process.env.REACT_APP_API_URL}/addexam`

			if(this.props.currentUser.hasOwnProperty('admin')) {

				const response = await fetch(url, {
				method: 'POST',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: JSON.stringify({
			    	year: this.props.year,
			    	classes: this.state.classes,
			    	exammanager: this.state.exammanager,
			    	examname: this.state.examname,
			    	startdate: this.state.startdate,
			    	enddate: this.state.enddate
			    }), 
			})

			const data = await response.json()
			this.setState({message: data, classes: [], exammanager: null, examname: null, startdate: null, enddate: null})
			}

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
			this.props.isLoading ? <Spinner /> :
			<AddExamContainer>
			<ToastContainer />
			<UpperContainer>
					<span> Add Exam </span>
					<Button type="button" name="Back" handleClick={this.props.changeviewExam}/>
				</UpperContainer>
				{
					this.state.isFetching ? <Spinner /> :
					<BottomContainer>
						<ClassesContainer>
							<ManagerAndClassesTitleContainer>
								<span>Select Classes</span>
							</ManagerAndClassesTitleContainer>
							<ClassesInputFormContainer>
									 {
									 	this.renderClasses()
									 }
							</ClassesInputFormContainer>
						</ClassesContainer>
						<ExamInfoContainer>
							<ManagerAndClassesTitleContainer>
								<span>Add Exam Manager</span>
							</ManagerAndClassesTitleContainer>
							<FormContainer2>
								<SelectDiv>
									<select name="managers" id="exammanager" onChange={this.handleChange2}>
									  <option value="selectmanager">Select Manager</option>
									 {
									 	this.renderManagers()
									 }
									</select>
								</SelectDiv>
							</FormContainer2>
							<FormContainer4>
								<InputForm placeholder="Exam Name" id="examname" handleChange={this.handleChange2}/>
							</FormContainer4>
							<FormContainer3>
								<InputForm type="date" name="Start Date" id="startdate" handleChange={this.handleChange2}/>
								<InputForm type="date" name="End Date" id="enddate" handleChange={this.handleChange2}/>
							</FormContainer3>
							<ButtonContainer>
								<Button type="button" name={this.props.exam.class ? "Save" : "Add New Exam"} handleClick={this.handleSubmit}/>
							</ButtonContainer>
						</ExamInfoContainer>
					</BottomContainer>
				}
			</AddExamContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(AddExam);
