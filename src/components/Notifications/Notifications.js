import React from 'react';

import {NotificationsContainer, UpperContainer, StyledLink,
	TitleContainer, FormContainer, TableContainer} from './NotificationStyles.js';

import InputForm from '../InputForm/InputForm.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import {SetNotification} from '../../redux/class/ClassActions.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class Notifications extends React.Component {
	constructor() {
		super()
		this.state = {
			Notifications: null,
			openModal: false,
			deleteid: null,
			message: null
		}
	}

	handleEdit = async(id) => {

		let url = `${process.env.REACT_APP_API_URL}/getnotificationbyid/${id}`

		if(this.props.currentUser.hasOwnProperty('admin')) {
			this.props.LoadingStart()
			const response = await fetch(url, {
				method: 'GET',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})
			const data = await response.json()

			this.props.SetNotification(data)

			this.props.LoadingEnd()
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

		let url = `${process.env.REACT_APP_API_URL}/deletenotification/${this.state.deleteid}`

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
			this.loadNotifications()
		}
	}

	loadNotifications = async() => {
		this.setState({Notifications: []})
		
		let url = null

		if(this.props.currentUser.hasOwnProperty('admin')) {
			url = `${process.env.REACT_APP_API_URL}/getnotifications/0/0/noticetype:asc?year=${this.props.year}`
		} else if(this.props.currentUser.hasOwnProperty('teacher')) {
			url = `${process.env.REACT_APP_API_URL}/getnotificationbyrecipient/0/0/noticetype:asc?recipient=Teacher&year=${this.props.year}`
		} else if(this.props.currentUser.hasOwnProperty('admin')) {
			url = `${process.env.REACT_APP_API_URL}/getnotificationbyrecipient/0/0/noticetype:asc?recipient=Parent/Student&year=${this.props.year}`
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
				let counter = 1

				data.forEach((notification) => {
					array.push([counter, notification.noticetype, 
					notification.description, notification.date, notification.status,
					<StyledLink to='/admin/addnotification'><span role="img" aria-label="edit" onClick={() => {this.handleEdit(notification._id)}}>&#9997;</span></StyledLink>,
					<span role="img" aria-label="delete" onClick={() => this.handleDelete(notification._id)}>&#10060;</span>])
					counter = counter + 1
				})

				this.setState({Notifications: array})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	componentDidMount() {
		this.loadNotifications()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState.year !== this.state.year) {
			this.loadNotifications()
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
			<NotificationsContainer>
			<ToastContainer />
				{
					this.state.openModal ?
					DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
					: null
				}
					<TitleContainer>
						<span> Notice Board </span>
					</TitleContainer>
				<UpperContainer>
					<FormContainer>
						<InputForm placeholder="Search"/>
					</FormContainer>
				</UpperContainer>
				{
					this.props.isLoading ? <Spinner /> :
					<TableContainer>
						<ViewsTable admin={this.props.currentUser.admin} Edit={this.props.Edit} Delete={this.props.Delete} 
						th={['Sr No.', 'Notice Type', 'Description', 'Date', 'Status']} 
						td={this.state.Notifications ? this.state.Notifications : [['Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null']]}/>
					</TableContainer>
				}
			</NotificationsContainer>
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
	LoadingEnd: () => dispatch(LoadingEnd()),
	SetNotification: (notification) => dispatch(SetNotification(notification))
})


export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

