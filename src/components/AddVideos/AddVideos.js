import React from 'react';

import {AddVideosContainer, TitleContainer, UpperContainer, 
	BottomContainer, SelectDiv,
	UploadContainer, ImageContainer, SubmitButtonContainer} from './AddVideosStyles.js';

import Button from '../Button/Button.js';

import img from './gallery.png';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class AddVideos extends React.Component {
	constructor() {
		super()
		this.state = {
			name: '',
			length: '',
			albums: null,
			album: null,
			message: null,
			isFetching: false,
			videos: null
		}
	}

	setName = (e) => {
		const array = e.target.value.split('\\')
		const element = array[array.length - 1]
		this.setState({name: element})
	}

	loadAlbums = async() => {
		this.setState({albums: []})
	
		let url = `${process.env.REACT_APP_API_URL}/getalbums/0/0/album:asc?year=${this.props.year}`
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

				data.forEach((alb) => {
					array.push({album: alb.album, id: alb._id})
				})

				this.setState({albums: array})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	componentDidMount() {
		this.loadAlbums()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadAlbums()
		}
	}

	renderAlbums = () => {
		let data = []
		if(this.state.albums) {
			this.state.albums.forEach((alb) => {
				data.push(<option id={alb.id} key={alb.id} value={alb.id}>{alb.album}</option>)
			})
		}
		return data
	}

	handleChange = (e) => {
		const {id, value} = e.target
		this.setState({[id]: value})
	}

	handleVideos = (e) => {
		this.setState({videos: e.target.files, length: e.target.files.length})
	}

	handleSubmit = async() => {

		this.setState({isFetching: true})

		let url = `${process.env.REACT_APP_API_URL}/addvideos2`

		let formData = new FormData()
		for (const property in this.state.videos) {
			if(property !== 'length' && property !== 'item') {
				formData.append('videos', this.state.videos[property])
			}
		}
		formData.append('id', this.state.album)
		formData.append('year', this.props.year)

		
		if(this.props.currentUser.hasOwnProperty('admin')) {

			const response = await fetch(url, {
				method: 'PATCH',
				headers: { 
			        // "Content-Type": "multipart/form-data;boundary='boundary'",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: formData
			})

			const data = await response.json()
			this.setState({message: data, videos: null, length: null, album: null, isFetching: false})
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
			<AddVideosContainer>
			<ToastContainer />
				<TitleContainer>
					<span> Add Videos </span>
				</TitleContainer>
				<UpperContainer>
					<SelectDiv>
							<select name="album" id="album" onChange={this.handleChange}>
							  <option defaultValue="selectAlbum">Select Album</option>
							  {
							  	this.renderAlbums()
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
						  		<input type="file" id="videos" name="videos" multiple onChange={this.handleVideos}/>
							</ImageContainer>
						</UploadContainer>
						<SubmitButtonContainer>
							<Button type="button" name="Add Videos" handleClick={this.handleSubmit}/>
						</SubmitButtonContainer>
					</BottomContainer>
				}
			</AddVideosContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(AddVideos);
