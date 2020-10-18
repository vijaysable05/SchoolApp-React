import React from 'react';

import {ViewBusesContainer, UpperContainer, BottomContainer} from './ViewBusesStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

import ViewDocuments from '../ViewDocuments/ViewDocuments.js';

class ViewBuses extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			buses: null,
			openModal: false,
			deleteid: null,
			message: null,
			showDocs: false,
			showDocUser: null,
			showDocId: null
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

		let url = `${process.env.REACT_APP_API_URL}/deletebus?id=${this.state.deleteid}`

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
			this.loadBuses()
		}
	}

	handleShowDocs = (id, user) => {
		this.setState((prevState) => ({
			showDocs: !prevState.showDocs,
			showDocUser: user,
			showDocId: id
		}))
	}

	handleShowDocs2 = () => {
		this.setState((prevState) => ({
			showDocs: !prevState.showDocs
		}))
	}

	loadBuses = async() => {
		this.setState({buses: []})
		
		let url = `${process.env.REACT_APP_API_URL}/getbuses/0/0/driverfirstname:asc`
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

				data.forEach((bus) => {
					if(this.props.admin) {
						array.push([bus.busno, `${bus.driverfirstname} ${bus.driverlastname}`, 
						bus.drivermobile, `${bus.fullname}`, bus.mobile,
						<span role="img" aria-label="docs" onClick={() => this.handleShowDocs(bus._id, 'bus')}>&#128196;</span>,
						<span role="img" aria-label="edit" onClick={() => {this.props.handleEdit(bus)}}>&#9997;</span>,
						<span role="img" aria-label="delete" onClick={() => this.handleDelete(bus._id)}>&#10060;</span>])
					} else {
						array.push([bus.busno, `${bus.driverfirstname} ${bus.driverlastname}`, 
						bus.drivermobile, `${bus.fullname}`, bus.mobile])
					}
				})

				this.setState({buses: array})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	componentDidMount() {
		this.loadBuses()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadBuses()
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
		const {changeAddBus} = this.props
		return (
			this.state.showDocs ?
			<ViewDocuments user={this.state.showDocUser} userid={this.state.showDocId} handleShowDocs={this.handleShowDocs2}/>
			:
			<ViewBusesContainer>
			<ToastContainer />
				{
					this.state.openModal ?
					DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
					: null
				}
				<UpperContainer>
				{
					this.props.admin ? 
					<Button type="button" name="Create New" handleClick={changeAddBus}/>
					: null
				}
					<InputForm placeholder="Search" />
				</UpperContainer>
				{
					this.props.isLoading ? <Spinner /> :
					<BottomContainer>
						<ViewsTable admin={this.props.admin} Edit Delete 
						th={this.props.admin ? ['Bus No.', 'Driver Name', 'Mobile No.', 'Owner Name', 'Mobile No.', 'Docs'] : ['Bus No.', 'Driver Name', 'Mobile No.', 'Owner Name', 'Mobile No.']} 
						td={this.state.buses ? this.state.buses : [['Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null']]}/>
					</BottomContainer>
				}
			</ViewBusesContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(ViewBuses);