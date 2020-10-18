import React from 'react';

import {ViewGalleryContainer, UpperContainer, BottomContainer, 
	SelectDiv} from './ViewGalleryStyles.js';

import ShowPhotos from '../ShowPhotos/ShowPhotos.js';
import ShowAlbums from '../ShowAlbums/ShowAlbums.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class ViewGallery extends React.Component {
	constructor() {
		super()
		this.state = {
			year: null,
			album: false,
			albums: null,
			album2: null,
			message: null
		}
	}

	setMessage = (data) => {
		this.setState({message: data})
	}

	handleClick = (id) => {
		this.setState((prevState) => ({album: !prevState.album}))
		this.loadPhotosAndVideos(id)
	}

	handleClick2 = () => {
		this.setState((prevState) => ({album: !prevState.album}))
		this.loadAlbums(this.state.year)
	}

	loadAlbums = async(year) => {
		this.setState({albums: []})
	
		let url = `${process.env.REACT_APP_API_URL}/getalbums/0/0/album:asc?year=${year}`

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

			this.setState({albums: data})
			this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	loadPhotosAndVideos = async(id) => {
		this.setState({albums: []})
	
		let url = `${process.env.REACT_APP_API_URL}/getalbumphotosandvideos?id=${id}`

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

			this.setState({album2: data})
			this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	showAlbums = () => {
		if(this.state.year) {
			return (
				<ShowAlbums year={this.state.year} returnMessage={this.returnMessage} setMessage={this.setMessage} loadAlbums={this.loadAlbums} albums={this.state.albums} handleClick={this.handleClick} admin={this.props.admin} />
				)
		} else {
			return null
		}
	}


	handleChange = (e) => {
		this.setState({year: e.target.value})
		this.loadAlbums(e.target.value)
	}

	showPhotos = () => {
		return (
			<ShowPhotos returnMessage={this.returnMessage} setMessage={this.setMessage} loadPhotosAndVideos={this.loadPhotosAndVideos} album2={this.state.album2} handleClick={this.handleClick2} admin={this.props.admin}/>	
		)
	}

	returnAlbumOrPhotos = () => {
		if(this.state.album) {
			return this.showPhotos()
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
			<ViewGalleryContainer>
			<ToastContainer />
				<UpperContainer>
					<SelectDiv>
							<select name="year" id="year" onChange={this.handleChange}>
							  <option defaultValue="Academic">Academic Year</option>
							  <option value="2019">2019</option>
							  <option value="2020">2020</option>
							</select>
					</SelectDiv>
				</UpperContainer>
				<BottomContainer>
					{
						this.props.isLoading ? <Spinner /> :
						this.returnAlbumOrPhotos()
					}
				</BottomContainer>
			</ViewGalleryContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewGallery);
