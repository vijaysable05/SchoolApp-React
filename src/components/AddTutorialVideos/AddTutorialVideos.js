import React from 'react';

import {AddTutorialVideosContainer, TitleContainer, UpperContainer, 
	BottomContainer, SelectDiv,
	UploadContainer, ImageContainer, SubmitButtonContainer} from './AddTutorialVideosStyles.js';

import Button from '../Button/Button.js';

import img from './gallery.png';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class AddTutorialVideos extends React.Component {
	constructor() {
		super()
		this.state = {
			name: '',
			length: '',
			message: null,
			tutorials: null,
			class: null,
			tutorial: null,
			isFetching: false,
			videos: null
		}
	}

	setName = (e) => {
		const array = e.target.value.split('\\')
		const element = array[array.length - 1]
		this.setState({name: element})
	}

	handleChange = (e) => {
		this.setState({[e.target.id]: e.target.value})
	}

	setLength = (e) => {
		this.setState({length: e.target.files.length, videos: e.target.files})
	}

	loadTutorials = async() => {
		this.setState({albums: []})
	
		let url = `${process.env.REACT_APP_API_URL}/gettutorials/0/0/tutorialname:asc?year=${this.props.year}`
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

				data.forEach((tut) => {
					array.push({tutorial: tut.tutorialname, id: tut._id, class: tut.class})
				})

				this.setState({tutorials: array})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	loadClasses = async() => {
		if(this.props.classes) {
			this.setState({class: this.props.classes[0].classid})
		}
	}

	renderClasses = () => {
		let data = []
		if(this.props.classes) {
			this.props.classes.forEach((cls) => {
				data.push(<option id={cls.classid} key={cls.class} value={cls.classid}>{cls.class}</option>)
			})
		}
		return data
	}

	renderTutorials = () => {
		let data = []
		if(this.state.tutorials) {
			this.state.tutorials.forEach((tut) => {
				if(this.state.class === tut.class) {
					data.push(<option id={tut.tutorial} key={tut.id} value={tut.id}>{tut.tutorial}</option>)
				}
			})
		}
		return data
	}

	componentDidMount() {
		this.loadClasses()
		this.loadTutorials()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadClasses()
			this.loadTutorials()
		}
	}

	handleSubmit = async() => {

		this.setState({isFetching: true})

		let url = `${process.env.REACT_APP_API_URL}/addtutorialvideos`

		let formData = new FormData()
		formData.append('id', this.state.tutorial)
		for (const property in this.state.videos) {
			if(property !== 'length' && property !== 'item') {
				formData.append('videos', this.state.videos[property])
			}
		}
		
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
		this.setState({message: data, videos: null, isFetching: false})
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
			this.props.isLoading ? <Spinner /> :
			<AddTutorialVideosContainer>
			<ToastContainer />
				<TitleContainer>
					<span> Add Videos </span>
				</TitleContainer>
				<UpperContainer>
					<SelectDiv>
							<select name="class" id="class" onChange={this.handleChange}>
							  {
							  	this.renderClasses()
							  }
							</select>
					</SelectDiv>
					<SelectDiv>
							<select name="tutorial" id="tutorial" onChange={this.handleChange}>
							<option id="selecttutorial" value="selecttutorial">select tutorial</option>
							  {
							  	this.renderTutorials()
							  }
							</select>
					</SelectDiv>
				</UpperContainer>
				{
					this.state.isFetching ? <Spinner /> :
					<BottomContainer>
						<UploadContainer>
							<ImageContainer>
								<label htmlFor="videos"><img id="imgid" src={img} alt="img"/>{this.state.length ? `${this.state.length} files selected` : 'Add Videos'}</label>
						  		<input type="file" id="videos" name="videos" multiple onChange={this.setLength}/>
							</ImageContainer>
						</UploadContainer>
						<SubmitButtonContainer>
							<Button type="button" name="Add Videos" handleClick={this.handleSubmit}/>
						</SubmitButtonContainer>
					</BottomContainer>
				}
			</AddTutorialVideosContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(AddTutorialVideos);
