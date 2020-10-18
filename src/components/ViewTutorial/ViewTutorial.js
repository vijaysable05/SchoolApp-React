import React from 'react';

import {ViewTutorialContainer, UpperContainer, BottomContainer, 
	SelectDiv} from './ViewTutorialStyles.js';

import ShowVideos from '../ShowVideos/ShowVideos.js';
import ShowTutorials from '../ShowTutorials/ShowTutorials.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class ViewTutorial extends React.Component {
	constructor() {
		super()
		this.state = {
			class: null,
			tutorials: false,
			tutorialsshow: null,
			videos: null,
			message: null
		}
	}

	setMessage = (data) => {
		this.setState({message: data})
	}

	loadTutorials = async(classid) => {
		this.setState({albums: []})
	
		let url = `${process.env.REACT_APP_API_URL}/gettutorials/0/0/tutorialname:asc?year=${this.props.year}&classid=${classid}`

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

			this.setState({tutorialsshow: data})
			this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	loadVideos = async(id) => {
		this.setState({videos: []})
	
		let url = `${process.env.REACT_APP_API_URL}/gettutorialvideos?id=${id}`

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
			
			if(data) {

			this.setState({videos: data, class: null})
			this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	handleClick = (id) => {
		this.setState((prevState) => ({tutorials: !prevState.tutorials}))
		this.loadVideos(id)
	}

	handleClick2 = () => {
		this.setState((prevState) => ({tutorials: !prevState.tutorials}))
	}

	// loadClasses = () => {
	// 	if(this.props.classes) {
	// 		this.setState({class: this.props.classes[0].classid})
	// 	}
	// }

	// componentDidMount() {
	// 	this.loadClasses()
	// }

	// componentDidUpdate(prevProps, prevState) {
	// 	if(prevProps.classes !== this.props.classes) {
	// 		this.loadClasses()
	// 	}
	// 	if(prevProps.year !== this.props.year) {
	// 		this.loadClasses()
	// 	}
	// }

	renderClasses = () => {
		let data = []
		if(this.props.classes) {
			this.props.classes.forEach((cls) => {
				data.push(<option id={cls.classid} key={cls.class} value={cls.classid}>{cls.class}</option>)
			})
		}
		return data
	}

	showAlbums = () => {
		if(this.state.class) {
			return (
				<ShowTutorials class={this.state.class} returnMessage={this.returnMessage} setMessage={this.setMessage} loadTutorials={this.loadTutorials} tutorials={this.state.tutorialsshow} handleClick={this.handleClick} admin={this.props.admin} />
				)
		} else {
			return null
		}
	}


	handleChange = (e) => {
		this.setState({class: e.target.value, tutorialsshow: null})
		this.loadTutorials(e.target.value)
	}

	showVideos = () => {
		return (
			<ShowVideos returnMessage={this.returnMessage} setMessage={this.setMessage} loadVideos={this.loadVideos} videos={this.state.videos} handleClick={this.handleClick2} admin={this.props.admin}/>	
		)
	}

	returnTutorialsOrVideos = () => {
		if(this.state.tutorials) {
			return this.showVideos()
		} else {
			return this.showAlbums()
		}
	}

	returnMessage = () => {
		if(this.state.message) {
			if(this.state.message.success) {
				Toast(this.state.message.success, null)
			}else if(this.state.message.error) {
				Toast(null, this.state.message.error)
			}
		}
	}


	render() {
		return (
			<ViewTutorialContainer>
			<ToastContainer />
			{
				this.state.tutorials ? null : 
				<UpperContainer>
					<SelectDiv>
							<select name="Class" id="class" onChange={this.handleChange}>
							<option value="select class">Select Class</option>
							  {
							  	this.renderClasses()
							  }
							</select>
					</SelectDiv>
				</UpperContainer>
			}
				<BottomContainer>
					{
						this.props.isLoading ? <Spinner /> :
						this.returnTutorialsOrVideos()
					}
				</BottomContainer>
			</ViewTutorialContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewTutorial);
