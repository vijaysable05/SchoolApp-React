import React from 'react';

import {ShowPhotosContainer, UpperContainer, BottomContainer, ImageContainer, PhotoContainer, DeleteContainer} from './ShowPhotosStyles.js';

import Button from '../Button/Button.js';

import img from './pikachu.png';
import img2 from './trash.png';

import ReactPlayer from 'react-player/lazy';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

class ShowPhotos extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			openModal: false,
			deleteurl: null,
			message: null,
			type: null
		}
	}

	handleDelete = (url, type) => {
		this.setState((prevState) => ({
			openModal: !prevState.openModal,
			deleteurl: url,
			type: type
		}))
	}

	handleDeleteConfirmImage = async(photourl) => {
		this.handleDelete()

		let url = `${process.env.REACT_APP_API_URL}/deletephoto2?albumid=${this.props.album2.albumid}&photourl=${this.state.deleteurl}`

		if(this.props.currentUser.hasOwnProperty('admin')) {
			this.props.LoadingStart()
			const response = await fetch(url, {
				method: 'DELETE',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const data = await response.json()
			
			this.props.loadPhotosAndVideos(this.props.album2.albumid)

			this.props.setMessage(data)
			this.props.returnMessage()
		}
	}

	handleDeleteConfirmVideo = async(videourl) => {
		this.handleDelete()

		let url = `${process.env.REACT_APP_API_URL}/deletevideo2?albumid=${this.props.album2.albumid}&videourl=${this.state.deleteurl}`

		if(this.props.currentUser.hasOwnProperty('admin')) {
			this.props.LoadingStart()
			const response = await fetch(url, {
				method: 'DELETE',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const data = await response.json()

			this.props.loadPhotosAndVideos(this.props.album2.albumid)

			this.props.setMessage(data)
			this.props.returnMessage()
		}
	}

	renderImagesAndVideos = () => {
		const album2 = this.props.album2
		let data = []
		
		if(album2) {
			if(album2.photos) {
				album2.photos.forEach((item) => {
					data.push(
							<ImageContainer key={item}>
							<PhotoContainer>
								<img src={item} alt="img" height="100%" width="100%" />
							</PhotoContainer>
							{
								this.props.admin ? 
								<DeleteContainer>
									<img src={img2} onClick={() => this.handleDelete(item, "image")} height="80%" width="10%" alt="img" />
								</DeleteContainer>
								: null
							}
							</ImageContainer>		
						)
				})
			}

			if(album2.videos) {
				album2.videos.forEach((item) => {
					data.push(
							<ImageContainer key={item}>
							<PhotoContainer>
								<ReactPlayer width="100%" height="80%" controls url={item}
								  config={{ file: { attributes: { controlsList: 'nodownload' } } }} 
								  onError={(e) => {
								  	console.log(e)
								  }}/>
							</PhotoContainer>
							{
								this.props.admin ? 
								<DeleteContainer>
									<img src={img2} onClick={() => this.handleDelete(item, "video")} height="80%" width="10%" alt="img" />
								</DeleteContainer>
								: null
							}
							</ImageContainer>		
						)
				})
			}
		}

		return data
	}

	returnHandleConfirm = () => {
		if(this.state.type === "image") {
			return DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirmImage)
		} else if (this.state.type === "video") {
			return DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirmVideo)
		}
	}

	render() {
		return (
			<ShowPhotosContainer>
				{
					this.state.openModal ?
					this.returnHandleConfirm()
					: null
				}
				<UpperContainer>
					<Button type="button" name="Back" handleClick={this.props.handleClick}/>
				</UpperContainer>
				{
					this.props.isLoading ? <Spinner /> :
					<BottomContainer>
						{
							this.renderImagesAndVideos()
						}	
					</BottomContainer>
				}
			</ShowPhotosContainer>
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



export default connect(mapStateToProps, mapDispatchToProps)(ShowPhotos);
