import React from 'react';

import {NewAlbumContainer, TitleContainer, UpperContainer, 
	BottomContainer, SelectDiv, AlbumNameContainer,
	UploadContainer, ImageContainer, SubmitButtonContainer} from './NewAlbumStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import img from './gallery.png';

import Spinner from '../spinner/Spinner.js';

import {connect} from 'react-redux';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class NewAlbum extends React.Component {
	constructor() {
		super()
		this.state = {
			name: '',
			length: '',
			imgsrc: null,
			albumCover: null,
			photos: null,
			albumname: null,
			year: null,
			isFetching: false,
			message: null
		}
	}

	handleAlbumCover = (e) => {
		this.setState({albumCover: e.target.files, name: e.target.files[0].name})
		let myImage = new Image('100%', '100%')
		myImage.src =  e.target.files[0]
		myImage.src = URL.createObjectURL(e.target.files[0])
		document.getElementById('imgid').replaceWith(myImage)
	}

	handlePhotos = (e) => {
		this.setState({photos: e.target.files, length: e.target.files.length})
	}

	handleSubmit = async() => {

		this.setState({isFetching: true})
		let url = null

		url = `${process.env.REACT_APP_API_URL}/createalbum`

		let formData = new FormData()
		formData.append('albumcover', this.state.albumCover[0])
		for (const property in this.state.photos) {
			if(property !== 'length' && property !== 'item') {
				formData.append('photos', this.state.photos[property])
			}
		}
		formData.append('albumname', this.state.albumname)
		formData.append('year', this.state.year)

		
		if(this.props.currentUser.hasOwnProperty('admin')) {

			const response = await fetch(url, {
			method: 'POST',
			headers: { 
		        // "Content-Type": "multipart/form-data;boundary='boundary'",
		        'Authorization': 'Bearer ' + this.props.currentUser.token
		    },
		    body: formData
		})

		const data = await response.json()
		this.setState({message: data, photos: null, albumCover: null, 
		imgsrc: null, name: null, length: null, albumname: null, isFetching: false})
		this.returnMessage()
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.id]: e.target.value})
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
				<NewAlbumContainer>
				<ToastContainer />
					<TitleContainer>
						<span> Add New Album </span>
					</TitleContainer>
					{
						this.state.isFetching ? <Spinner /> :
					<React.Fragment>
						<UpperContainer>
							<SelectDiv>
									<select name="year" id="year" onChange={this.handleChange}>
									  <option defaultValue="Academic">Academic Year</option>
									  <option value="2019">2019</option>
									   <option value="2020">2020</option>
									</select>
							</SelectDiv>
							<AlbumNameContainer>
								<InputForm placeholder="Album Name" id="albumname" handleChange={this.handleChange} />
							</AlbumNameContainer>
						</UpperContainer>
						<BottomContainer>
							<UploadContainer>
								<ImageContainer>
									<label id="albumcover" htmlFor="album"><img id="imgid" src={img} alt="img"/>{this.state.name ? this.state.name : 'Add Album Cover'}</label>
							  		<input type="file" id="album" name="album" onChange={this.handleAlbumCover}/>
								</ImageContainer>
								<ImageContainer>
									<label htmlFor="photos"><img id="imgid2" src={img} alt="img"/>{this.state.length ? `${this.state.length} files selected` : 'Add Photos'}</label>
							  		<input type="file" id="photos" name="photos" multiple onChange={this.handlePhotos}/>
								</ImageContainer>
							</UploadContainer>
							<SubmitButtonContainer>
								<Button type="button" name="Create Album" handleClick={this.handleSubmit}/>
							</SubmitButtonContainer>
						</BottomContainer>
					</React.Fragment>
				}
				</NewAlbumContainer>
		)
	}
}

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	year: state.user.year,
	isLoading: state.user.isLoading
})


export default connect(mapStateToProps)(NewAlbum);
