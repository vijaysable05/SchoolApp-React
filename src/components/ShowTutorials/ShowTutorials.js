import React from 'react';

import {ShowTutorialsContainer, AlbumContainer, ImageContainer, AlbumInfoContainer, SpanContainer} from './ShowTutorialsStyles.js';

import img from './gallery.png';
import img2 from './trash.png';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

class ShowTutorials extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			openModal: false,
			deleteid: null
		}
	}

	handleDelete = (id) => {
		this.setState((prevState) => ({
			openModal: !prevState.openModal,
			deleteid: id
		}))
	}

	handleDeleteConfirm = async() => {
		this.handleDelete()

		let url = `${process.env.REACT_APP_API_URL}/deletetutorial?id=${this.state.deleteid}`

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

			this.props.setMessage(data)
			this.props.returnMessage()
			this.props.loadTutorials(this.props.class)
		}
	}

	renderTutorials = () => {
		let data = []

		if(this.props.tutorials) {
			this.props.tutorials.forEach((item) => {
				data.push(
					<AlbumContainer key={item._id}>
						<ImageContainer>
							<img src={item.tutorialcover} height="100%" width="60%" alt="img" onClick={() => this.props.handleClick(item._id)} />
						</ImageContainer>
						<AlbumInfoContainer>
						<SpanContainer>						
							<span> {item.tutorialname} </span>
						</SpanContainer>
						{
							this.props.admin ? 
							<img src={img2} height="100%" width="60%" alt="img" onClick={() => this.handleDelete(item._id)} />
							: null
						}
						</AlbumInfoContainer>
					</AlbumContainer>
				)
			})
		}

		return data
	}


	render() {
		return (
			<ShowTutorialsContainer>
			{
				this.state.openModal ?
				DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
				: null
			}
			{
				this.props.isLoading ? <Spinner /> :
				this.renderTutorials()
			}
			</ShowTutorialsContainer>
		)
	}
}

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	isLoading: state.user.isLoading
})

const mapDispatchToProps = (dispatch) => ({
	LoadingStart: () => dispatch(LoadingStart()),
	LoadingEnd: () => dispatch(LoadingEnd())
})


export default connect(mapStateToProps, mapDispatchToProps)(ShowTutorials);

	// renderImagesAndVideos = () => {
	// 	const album2 = this.props.album2
	// 	let data = []
	// 	console.log(album2)

	// 		if(this.props.tutorials.videos) {
	// 			album2.videos.forEach((item) => {
	// 				data.push(
	// 						<ImageContainer key={item}>
	// 						<PhotoContainer>
	// 							<video src={item} alt="video" height="100%" width="100%" controls/>
	// 						</PhotoContainer>
	// 						{
	// 							this.props.admin ? 
	// 							<DeleteContainer>
	// 								<img src={img2} height="80%" width="10%" alt="img" />
	// 							</DeleteContainer>
	// 							: null
	// 						}
	// 						</ImageContainer>		
	// 					)
	// 			})
	// 		}
	// 	}