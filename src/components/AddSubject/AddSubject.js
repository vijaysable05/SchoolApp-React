import React from 'react';

import {AddSubjectContainer, SelectClassTitleContainer, ClassInputContainer, 
	ButtonContainer, ClassInput, SelectDiv} from './AddSubjectStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

let counter = 1

class AddSubject extends React.Component {
	constructor() {
		super()
		this.state = {
			subject: [counter],
			selectedClass: null,
			selectedDivision: null,
			message: null,
			counter: true
		}
	}

	renderAddSubject = () => {
		let data = []
		this.state.subject.forEach((e) => {
			data.push(<ClassInput key={e}>
				<InputForm placeholder="Subject" />
				</ClassInput>)
		})
		return data
	}

	addSubjectPost = async() => {
		this.props.LoadingStart()
		const length = document.getElementsByTagName("input").length
		const class1 = document.getElementById('class').value
		const division = document.getElementById('division').value

		let url = `${process.env.REACT_APP_API_URL}/createsubject?year=${this.props.year}`
		let subjects = []

		for(let i=0;i<length;i++) {
			subjects.push({subject: document.getElementsByTagName("input")[i].value})
		}

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
		    	subjects: subjects
		    }), 
		})

		const data = await response.json()
		this.setState({message: data})
		this.returnMessage()
		}
		this.props.LoadingEnd()
	}

	addSubject = () => {
		this.setState((prevState) => ({
			...prevState.subject.push(counter)
		}))
		counter = counter + 1
	}

	loadClasses = () => {
		if(this.props.classes) {
			this.setState({selectedClass: this.props.classes[0].class, selectedDivision: this.props.classes[0].divisions[0].division, counter: false})
		}
	}

	componentDidMount() {
		this.loadClasses()
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

	renderDivisions = () => {
		if(this.props.classes) {
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
			<AddSubjectContainer>
			<ToastContainer />
				<SelectClassTitleContainer>
					<span> Select Class </span>
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
				<ClassInputContainer>
					{
						this.renderAddSubject()
					}
				</ClassInputContainer>
				<ButtonContainer>
					<Button type="button" name="Add New" handleClick={this.addSubject} />
					<Button type="button" name="Save" handleClick={this.addSubjectPost} />
				</ButtonContainer>
			</AddSubjectContainer>


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


export default connect(mapStateToProps, mapDispatchToProps)(AddSubject);