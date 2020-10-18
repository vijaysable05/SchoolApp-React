import React from 'react';

import {AddDivisionContainer, SelectClassTitleContainer, ClassInputContainer, 
	ButtonContainer, ClassInput, SelectDiv, ClassAndDivisionContainer} from './AddDivisionStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

let counter = 1

class AddDivision extends React.Component {
	constructor() {
		super()
		this.state = {
			division: [counter],
			message: null,
			counter: true
		}
	}

	renderAddDivision = () => {
		let data = []
		this.state.division.forEach((e) => {
			data.push(<ClassInput key={e}>
				<InputForm placeholder={`Division${e}`} />
				<Button type="button" name="Remove" handleClick={() => this.removeDivision([e])}/>
				</ClassInput>)
		})
		return data
	}

	addDivision = () => {
		this.setState((prevState) => ({
			...prevState.division.push(counter)
		}))
		counter = counter + 1
	}

	removeDivision = (e) => {

		const index = this.state.division.indexOf(e[0])

			this.setState((prevState) => ({
				...prevState.division.splice(index, 1)
			}))

		counter = counter - 1
	}

	// componentDidMount() {
	// 	this.props.LoadingEnd()
	// 	// this.getClasses()
	// }

	returnClasses = () => {
		let data = []
		if(this.props.classes) {
			this.props.classes.forEach((cls) => {
				data.push(<option key={cls.class} value={cls.class}>{cls.class}</option>)
			})
		}
		return data
	}

	addDivisionPost = async() => {
		this.props.LoadingStart()
		const length = document.getElementsByTagName("input").length
		const class1 = document.getElementById('class').value

		let url = `${process.env.REACT_APP_API_URL}/createdivision?year=${this.props.year}`
		let divisions = []

		for(let i=0;i<length;i++) {
			divisions.push({division: document.getElementsByTagName("input")[i].value})
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
		    	divisions: divisions
		    }), 
		})

		const data = await response.json()
		this.setState({message: data})
		this.returnMessage()
		}
		this.props.LoadingEnd()
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
			<AddDivisionContainer>
			<ToastContainer />
				<SelectClassTitleContainer>
					<span> Select Class </span>
				</SelectClassTitleContainer>
				<ClassAndDivisionContainer>
					<SelectDiv>
						<label htmlFor="class">Class:</label>
							<select name="class" id="class">
							  {
							  	this.returnClasses()
							  }
							</select>
					</SelectDiv>
					<ClassInputContainer>
						{
							this.renderAddDivision()
						}
					</ClassInputContainer>
					<ButtonContainer>
						<Button type="button" name="Add New" handleClick={this.addDivision}/>
						<Button type="button" name="Save" handleClick={this.addDivisionPost}/>
					</ButtonContainer>
				</ClassAndDivisionContainer>
			</AddDivisionContainer>


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


export default connect(mapStateToProps, mapDispatchToProps)(AddDivision);