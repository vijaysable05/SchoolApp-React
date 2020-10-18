import React from 'react';

import {AddClass2Container,
	SelectClassTitleContainer, ClassInputContainer, ButtonContainer, ClassInput} from './AddClass2Styles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import {connect} from 'react-redux';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

let counter = 1

class AddClass2 extends React.Component {
	constructor() {
		super()
		this.state = {
			class: [counter],
			classes: [],
			message: null
		}
	}

	renderAddClass = () => {
		let data = []
		this.state.class.forEach((e) => {
			data.push(<ClassInput key={e}>
				<InputForm placeholder="Class" id={`class${e}`} />
				</ClassInput>)
		})
		return data
	}

	addClass = () => {
		this.setState((prevState) => ({
			...prevState.class.push(counter)
		}))
		counter = counter + 1
	}

	handleSubmit = async () => {
		this.props.LoadingStart()
		const length = document.getElementsByTagName("input").length
		let url = `${process.env.REACT_APP_API_URL}/createclass`
		let classes = []

		for(let i=0;i<length;i++) {
			classes.push({class: document.getElementsByTagName("input")[i].value})
		}

		if(this.props.currentUser.hasOwnProperty('admin')) {

			const response = await fetch(url, {
			method: 'POST',
			headers: { 
		        "Content-type": "application/json; charset=UTF-8",
		        'Authorization': 'Bearer ' + this.props.currentUser.token
		    },
		    body: JSON.stringify({ 
		       year: this.props.year,
		       classes: classes
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
			<AddClass2Container style={{visibility: this.props.isLoading ? 'hidden' : 'visible'}}>
			<ToastContainer />
				<SelectClassTitleContainer>
					<span> Select Class </span>
				</SelectClassTitleContainer>
				<ClassInputContainer>
					{
						this.renderAddClass()
					}
				</ClassInputContainer>
				<ButtonContainer>
					<Button type="button" name="Add New" handleClick={this.addClass}/>
					<Button type="button" name="Save" handleClick={this.handleSubmit}/>
				</ButtonContainer>
			</AddClass2Container>


			)
	}
	
}

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	year: state.user.year,
	isLoading: state.user.isLoading
})

const mapDispatchToProps = (dispatch) => ({
	LoadingStart: () => dispatch(LoadingStart()),
	LoadingEnd: () => dispatch(LoadingEnd())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddClass2);



// addDivision = (i) => {
	// 	console.log(i)
	// 	this.setState((prevState) => ({
	// 		...prevState.class[i].push([])
	// 	}))
	// }

	// <Button type="button" name="Add Division" handleClick={() => this.addDivision([i])} />
	// class: [[]]
	// ...prevState.class.push([])

	// renderDivision = (i) => {
	// 	let data = []
	// 	this.state.class[i].forEach((e, i) => {
	// 		data.push(<React.Fragment key={Math.floor(Math.random() * 100000)}>
	// 			<InputForm placeholder="Division" />
	// 			</React.Fragment>)
	// 	})
	// 	return data
	// }

