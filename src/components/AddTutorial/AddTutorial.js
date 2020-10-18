import React from 'react';

import {AddTutorialContainer, TitleContainer, UpperContainer, 
	BottomContainer, SelectDiv, AlbumNameContainer, 
	UploadContainer, ImageContainer, SubmitButtonContainer} from './AddTutorialStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import img from './gallery.png';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class AddTutorial extends React.Component {
	constructor() {
		super()
		this.state = {
			name: '',
			length: '',
			class: null,
			tutorialCover: null,
			tutorialname: null,
			isFetching: false
		}
	}

	handleTutorialCover = (e) => {
		this.setState({tutorialCover: e.target.files, name: e.target.files[0].name})
		let myImage = new Image('100%', '100%')
		myImage.src =  e.target.files[0]
		myImage.src = URL.createObjectURL(e.target.files[0])
		document.getElementById('imgid').replaceWith(myImage)
	}

	handleChange = (e) => {
		this.setState({[e.target.id]: e.target.value})
	}

	setLength = (e) => {
		const array = e.target.value.split('\\')
		this.setState({length: array.length})
	}

	loadClasses = () => {
		if(this.props.classes) {
			this.setState({class: this.props.classes[0].classid})
		}
	}

	componentDidMount() {
		this.loadClasses()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadClasses()
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

	handleSubmit = async() => {

		this.setState({isFetching: true})

		let url = `${process.env.REACT_APP_API_URL}/addtutorial`

		let data = JSON.stringify({
			year: this.props.year,
			class: this.state.class,
			tutorialname: this.state.tutorialname
		})

		let formData = new FormData()
		formData.append('data', data)
		formData.append('tutorialcover', this.state.tutorialCover[0])
		
		if(this.props.currentUser.hasOwnProperty('admin') || this.props.currentUser.hasOwnProperty('teacher')) {

			const response = await fetch(url, {
			method: 'POST',
			headers: { 
		        // "Content-Type": "multipart/form-data;boundary='boundary'",
		        'Authorization': 'Bearer ' + this.props.currentUser.token
		    },
		    body: formData
		})

		const data = await response.json()
		this.setState({message: data, name: null, tutorialCover: null, tutorialname: null, isFetching: false})
		this.returnMessage()
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
			<AddTutorialContainer>
			<ToastContainer />
				<TitleContainer>
					<span> Add New Tutorial </span>
				</TitleContainer>
				{
					this.state.isFetching ? <Spinner /> :
					<React.Fragment>
						<UpperContainer>
							<SelectDiv>
								<select name="class" id="class" onChange={this.handleChange}>
									{
									 	this.renderClasses()
									}
								</select>
							</SelectDiv>
							<AlbumNameContainer>
								<InputForm placeholder="Tutorial Name" id="tutorialname" handleChange={this.handleChange} />
							</AlbumNameContainer>
						</UpperContainer>
						<BottomContainer>
							<UploadContainer>
								<ImageContainer>
									<label htmlFor="tutorial"><img id="imgid" src={img} alt="img"/>{this.state.name ? this.state.name : 'Add Tutorial Cover'}</label>
							  		<input type="file" id="tutorial" name="tutorial" onChange={this.handleTutorialCover}/>
								</ImageContainer>
							</UploadContainer>
							<SubmitButtonContainer>
								<Button type="button" name="Create Tutorial" handleClick={this.handleSubmit} />
							</SubmitButtonContainer>
						</BottomContainer>
					</React.Fragment>
				}
			</AddTutorialContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(AddTutorial);
