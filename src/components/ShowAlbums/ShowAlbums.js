import React from 'react';

import {ShowAlbumsContainer, AlbumContainer, ImageContainer, AlbumInfoContainer, SpanContainer} from './ShowAlbumsStyles.js';

import img from './gallery.png';
import img2 from './trash.png';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

class ShowAlbums extends React.Component {
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

		let url = `${process.env.REACT_APP_API_URL}/deletealbum?albumid=${this.state.deleteid}`

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
			this.props.loadAlbums(this.props.year)
		}
	}

	renderAlbums = () => {
		const Albums = this.props.albums
		let data = []

		Albums.forEach((item) => {
			data.push(
					<AlbumContainer key={item.album}>
						<ImageContainer>
							<img src={item.albumcover} height="100%" width="60%" alt="img" onClick={() => this.props.handleClick(item._id)} />
						</ImageContainer>
						<AlbumInfoContainer>
						<SpanContainer>
							<span> {item.album} </span>
						</SpanContainer>
							{
								this.props.admin ? 
								<img src={img2} height="100%" width="60%" alt="img" id={item._id} onClick={() => this.handleDelete(item._id)} />
								: null
							}
						</AlbumInfoContainer>
					</AlbumContainer>
				)
		})

		return data
	}


	render() {
		return (
			<ShowAlbumsContainer>
			{
				this.state.openModal ?
				DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
				: null
			}
			{
				this.props.isLoading ? <Spinner /> :
				this.renderAlbums()
			}
			</ShowAlbumsContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(ShowAlbums);