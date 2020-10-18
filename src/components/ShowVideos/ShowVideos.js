import React from 'react';

import {ShowVideosContainer, UpperContainer, BottomContainer, VideoContainer, DeleteContainer} from './ShowVideosStyles.js';

import Button from '../Button/Button.js';

// import video from './example.mp4';
import img2 from './trash.png';

import ReactPlayer from 'react-player/lazy';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

class ShowVideos extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			openModal: false,
			deleteurl: null,
			message: null
		}
	}

	handleDelete = (url) => {
		this.setState((prevState) => ({
			openModal: !prevState.openModal,
			deleteurl: url
		}))
	}

	handleDeleteConfirmVideo = async(videourl) => {
		this.handleDelete()

		let url = `${process.env.REACT_APP_API_URL}/deletetutorialvideo?tutorialid=${this.props.videos.id}&videourl=${this.state.deleteurl}`

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

			this.props.loadVideos(this.props.videos.id)

			this.props.setMessage(data)
			this.props.returnMessage()
		}
	}

	renderVideos = () => {
		let data = []

		if(this.props.videos.videos) {
			this.props.videos.videos.forEach((item, i) => {
				data.push(
						<VideoContainer key={i}>
							  <ReactPlayer width="100%" height="80%" controls url={item}
							  config={{ file: { attributes: { controlsList: 'nodownload' } } }} 
							  onError={(e) => {
							  	console.log(e)
							  }}/>
							{
								this.props.admin ?
								<DeleteContainer>
									<img src={img2} onClick={() => this.handleDelete(item)} alt="img" />
								</DeleteContainer>
								: null
							}
						</VideoContainer>
					)
			})
		}


		return data
	}


	render() {
		return (
			<ShowVideosContainer>
				{
					this.state.openModal ?
					DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirmVideo)
					: null
				}
				<UpperContainer>
					<Button type="button" name="Back" handleClick={this.props.handleClick}/>
				</UpperContainer>
				{
					this.props.isLoading ? <Spinner /> :
					<BottomContainer>
						{
							this.renderVideos()
						}	
					</BottomContainer>
				}
			</ShowVideosContainer>
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



export default connect(mapStateToProps, mapDispatchToProps)(ShowVideos);


// <video controls>
// <source src={item} type="video/mp4" />
// </video>