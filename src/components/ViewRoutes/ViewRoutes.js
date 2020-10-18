import React from 'react';

import {ViewRoutesContainer} from './ViewRoutesStyles.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';


class ViewRoutes extends React.Component {
	constructor() {
		super()
		this.state = {
			routes: null,
			openModal: false,
			deleteid: null,
			message: null
		}
	}

	handleDelete = (id, route) => {
		this.setState((prevState) => ({
			openModal: !prevState.openModal,
			deleteid: id
		}))
	}

	handleDeleteConfirm = async() => {
		this.handleDelete()

		let url = `${process.env.REACT_APP_API_URL}/deletebusroute?id=${this.state.deleteid}&year=${this.props.year}`

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
			this.loadRoutes()
		}
	}

	loadRoutes = async() => {
		this.setState({routes: []})
		
		let url = `${process.env.REACT_APP_API_URL}/getbusroutes/0/0/route:asc?year=${this.props.year}`
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

				data.forEach((route) => {
					if(this.props.currentUser.hasOwnProperty('admin')) {
						array.push([route.busid.busno, `${route.busid.driverfirstname} ${route.busid.driverlastname}`, route.route.route, route.route.stops.toString(),
						<span role="img" aria-label="edit" onClick={() => {this.props.handleEdit(route)}}>&#9997;</span>,
						<span role="img" aria-label="delete" onClick={() => this.handleDelete(route._id)}>&#10060;</span>])
					} else {
						array.push([route.busid.busno, `${route.busid.driverfirstname} ${route.busid.driverlastname}`, route.route.route, route.route.stops.toString()])
					}
				})

				this.setState({routes: array})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	componentDidMount() {
		this.loadRoutes()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadRoutes()
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
			<React.Fragment>
			<ToastContainer />
			{
				this.state.openModal ?
				DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
				: null
			}
			{
				this.props.isLoading ? <Spinner /> :
				<ViewRoutesContainer>
					<ViewsTable admin={this.props.currentUser.admin} Edit={this.props.currentUser.admin ? true : false} Delete={this.props.currentUser.admin ? true : false}
					th={['Bus no.', 'Driver Name', 'Route', 'Stops']} 
					td={this.state.routes ? this.state.routes : [['Null', 'Null', 'Null', 'Null', 'Null', 'Null']]}/>
				</ViewRoutesContainer>
			}
			</React.Fragment>
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


export default connect(mapStateToProps, mapDispatchToProps)(ViewRoutes);



