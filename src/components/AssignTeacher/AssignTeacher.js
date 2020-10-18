import React from 'react';

import {AssignTeacherContainer, SelectClassTitleContainer, ClassInputContainer, 
	ButtonContainer, ClassInput, SelectDiv} from './AssignTeacherStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import {RemoveClass} from '../../redux/class/ClassActions.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';


class AssignTeacher extends React.Component {
	constructor() {
		super()
		this.state = {
			selectedClass: null,
			selectedDivision: null,
			message: null,
			staffs: []
		}
	}

	getStaff = async() => {
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

			data.forEach((staff) => {
				array.push({name: `${staff.firstname} ${staff.middlename} ${staff.lastname}`, id: staff._id})
			})

			this.setState({staffs: array})
			this.props.LoadingEnd()


			if(this.props.classData) {

				let classData = this.props.classData.classData
				document.getElementById('class').value = classData.class
				document.getElementById('division').value = classData.division.division
				let staff = array.find((sta) => {
					return sta.name === `${classData.division.classteacher.firstname} ${classData.division.classteacher.middlename} ${classData.division.classteacher.lastname}`
				})
				document.getElementById('classteacher').value = staff.id
				this.setState({selectedClass: classData.class, selectedDivision: classData.division.division})
			} else {
				this.setState({selectedClass: this.props.classes[0].class, selectedDivision: this.props.classes[0].divisions[0].division})
			}
		}
	}

	componentDidMount() {
		this.getStaff()	
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.getStaff()
		}
	}

	renderClasses = () => {
		let data = []
		if(this.props.classes) {
			this.props.classes.forEach((cls) => {
				data.push(<option key={cls.class} value={cls.class}>{cls.class}</option>)
			})
		}
		return data
	}

	renderStaff = () => {
		let data = []
		this.state.staffs.forEach((stf) => {
			data.push(<option key={stf.name} value={stf.id}>{stf.name}</option>)
		})
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

	renderSubjects = () => {
		if(this.state.selectedDivision){

			let class1 = this.state.selectedClass
			let division1 = this.state.selectedDivision

			let data = []
			if(this.props.classes) {
				let class2 = this.props.classes.find((cls) => {
					return cls.class === class1
				})

				let divi = class2.divisions.find((div) => {
					return div.division === division1
				})
				if(divi) {
					divi.subjects.forEach((sub) => {
						data.push(<ClassInput key={sub.subject}>
						<InputForm defaultValue={sub.subject} disabled/>
						<SelectDiv>
							<select name={sub.subject} id="staff">
								{
							 		this.renderStaff()
								}
							</select>
						</SelectDiv>
						</ClassInput>)
					})
				}
			}

			return data
		}
	}

	selectDivision = (e) => {
		this.setState({selectedDivision: e.target.value})
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

	assignTeachers = async() => {
		this.props.LoadingStart()
		const length = document.getElementsByTagName("input").length
		const class1 = document.getElementById('class').value
		const division = document.getElementById('division').value
		const classteacherid = document.getElementById('classteacher').value
		let subjectArray = []

		for(let i=0;i<length;i++) {
			let subject = document.getElementsByTagName("input")[i].value
			let subjectteacherid = document.getElementsByName(subject)[0].value
			subjectArray.push({subject: subject, subjectteacherid: subjectteacherid})
		}

		let url = `${process.env.REACT_APP_API_URL}/assignclassteacher?year=${this.props.year}`
		let url2 = `${process.env.REACT_APP_API_URL}/assignsubjectteacher?year=${this.props.year}`

		if(this.props.currentUser.hasOwnProperty('admin')) {

			const response = await fetch(url, {
				method: 'POST',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: JSON.stringify({
			    	class: class1,
			    	division: division,
			    	classteacherid: classteacherid
			    }), 
			})

			const response2 = await fetch(url2, {
				method: 'POST',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: JSON.stringify({
			    	class: class1,
			    	division: division,
			    	subjects: subjectArray
			    }), 
			})

		const data = await response.json()
		const data2 = await response2.json()
		
		this.setState({message: data})
		this.returnMessage()
		this.setState({message: data2})
		this.returnMessage()
		}
		this.props.LoadingEnd()
	}
	
	
	render() {
		return (
			this.props.isLoading ? <Spinner /> : 
			<AssignTeacherContainer>
			<ToastContainer />
				<SelectClassTitleContainer>
					<span> Assign Teachers </span>
				</SelectClassTitleContainer>
					<SelectDiv>
						<label htmlFor="class">Class:</label>
							<select name="class" id="class" onChange={this.selectClass}>
								{
								  this.renderClasses()
								}
							</select>
					</SelectDiv>
					<SelectDiv>
						<label htmlFor="division">Division:</label>
							<select name="division" id="division" onChange={this.selectDivision}>
								{
							 	this.renderDivisions()
								}
							</select>
					</SelectDiv>
					<SelectDiv>
						<label htmlFor="classteacher">Class-Teacher:</label>
							<select name="classteacher" id="classteacher">
							  {
							  	this.renderStaff()
							  }
							</select>
					</SelectDiv>
				<ClassInputContainer>
					{
						this.renderSubjects()
					}
				</ClassInputContainer>
				<ButtonContainer>
					<Button type="button" name="Save" handleClick={this.assignTeachers}/>
				</ButtonContainer>
			</AssignTeacherContainer>

			)
	}
	
}

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	year: state.user.year,
	isLoading: state.user.isLoading,
	classData: state.class.classData,
	classes: state.class.classes
})

const mapDispatchToProps = (dispatch) => ({
	LoadingStart: () => dispatch(LoadingStart()),
	LoadingEnd: () => dispatch(LoadingEnd()),
	RemoveClass: () => dispatch(RemoveClass())
})


export default connect(mapStateToProps, mapDispatchToProps)(AssignTeacher);