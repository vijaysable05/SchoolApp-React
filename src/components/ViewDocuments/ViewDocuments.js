import React from 'react';

import {ViewDocumentsContainer, AlbumContainer, ImageContainer, 
	AlbumInfoContainer, UpperContainer, BottomContainer, ButtonContainer} from './ViewDocumentsStyles.js';

import img from './gallery.png';
import img2 from './trash.png';

import Button from '../Button/Button.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class ViewDocuments extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			openModal: false,
			docurl: null,
			message: null,
			docs: null
		}
	}

	handleDelete = (docurl) => {
		this.setState((prevState) => ({
			openModal: !prevState.openModal,
			docurl: docurl
		}))
	}

	handleDeleteConfirm = async() => {
		this.handleDelete()
		let url = null
		if(this.props.user === 'student') {
			url = `${process.env.REACT_APP_API_URL}/deletestudentdoc?id=${this.props.userid}&docurl=${this.state.docurl}`
		} else if(this.props.user === 'staff'){
			url = `${process.env.REACT_APP_API_URL}/deletestaffdoc?id=${this.props.userid}&docurl=${this.state.docurl}`
		} else if(this.props.user === 'bus'){
			url = `${process.env.REACT_APP_API_URL}/deletebusdoc?id=${this.props.userid}&docurl=${this.state.docurl}`
		}

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

			this.setState({message: data})
			this.returnMessage()
			this.loadDocs()
		}
	}

	componentDidMount() {
		this.loadDocs()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadDocs()
		}
	}

	loadDocs = async() => {
		let url = null
		if(this.props.user === 'student') {
			url = `${process.env.REACT_APP_API_URL}/student/docs?id=${this.props.userid}`
		} else if(this.props.user === 'staff'){
			url = `${process.env.REACT_APP_API_URL}/staff/${this.props.userid}/docs`
		} else if(this.props.user === 'bus'){
			url = `${process.env.REACT_APP_API_URL}/bus/docs?id=${this.props.userid}`
		}

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

				this.setState({docs: data})
				this.props.LoadingEnd()
			
			} else {
				this.setState({docs: array})
				this.props.LoadingEnd()
				return;
			}
		}
	}

	renderDocs = () => {
		let data = []

		if(this.state.docs) {
			this.state.docs.forEach((item) => {
				data.push(
					<AlbumContainer key={item}>
						<ImageContainer>
							<img src={item} height="100%" width="60%" alt="img" />
						</ImageContainer>
						<AlbumInfoContainer>
						{
							this.props.currentUser.hasOwnProperty('admin') ? 
							<img src={img2} height="100%" width="60%" alt="img" onClick={() => this.handleDelete(item)} />
							: null
						}
						</AlbumInfoContainer>
					</AlbumContainer>
				)
			})
		}

		return data
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
			<ViewDocumentsContainer>
			<ToastContainer />
			{
				this.state.openModal ?
				DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
				: null
			}
			<UpperContainer>
				<ButtonContainer>
					<Button type='button' name='Back' handleClick={this.props.handleShowDocs} />
				</ButtonContainer>
			</UpperContainer>
			<BottomContainer>
				{
					this.props.isLoading ? <Spinner /> :
					this.renderDocs()
				}
			</BottomContainer>
			</ViewDocumentsContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(ViewDocuments);