import React from 'react';

import {ViewStaffContainer, SearchFormContainer, InfoDisplayContainer, ButtonContainer, StyledLink} from './ViewStaffStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import {setStaffData} from '../../redux/staff/StaffActions.js';
import Spinner from '../spinner/Spinner.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

import ViewDocuments from '../ViewDocuments/ViewDocuments.js';

class ViewStaff extends React.Component {
constructor() {
	super()
	this.state= {
		staffs: [],
		openModal: false,
		deleteid: null,
		message: null,
		showDocs: false,
		showDocUser: null,
		showDocId: null
	}
}

handleEdit = (staff) => {
	this.props.setStaffData(staff)
}

handleDelete = (id) => {
	this.setState((prevState) => ({
		openModal: !prevState.openModal,
		deleteid: id
	}))
}

handleDeleteConfirm = async() => {
	this.handleDelete()

	let url = `${process.env.REACT_APP_API_URL}/deletestaff/${this.state.deleteid}`

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
		this.loadStaffs()
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

loadStaffs = async() => {
	this.setState({staffs: []})
	
	let url = `${process.env.REACT_APP_API_URL}/getstaffs/0/0/firstname:asc?year=${this.props.year}`
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

			data.forEach((stf) => {
				if(this.props.admin) {
					array.push([stf.Id, `${stf.firstname} ${stf.middlename} ${stf.lastname}`, 
					stf.mobile, stf.email, stf.designation, 
					<span role="img" aria-label="docs" onClick={() => this.handleShowDocs(stf._id, 'staff')}>&#128196;</span>,
					<StyledLink to='/admin/addstaff'><span role="img" aria-label="edit" onClick={() => {this.handleEdit(stf)}}>&#9997;</span></StyledLink>,
					<span role="img" aria-label="delete" onClick={() => this.handleDelete(stf._id)}>&#10060;</span>])
				} else {
					array.push([stf.Id, `${stf.firstname} ${stf.middlename} ${stf.lastname}`, 
					stf.mobile, stf.email, stf.designation])
				}
			})

			this.setState({staffs: array})
			this.props.LoadingEnd()

		} else {
			this.props.LoadingEnd()
			return;
		}
	}
}

componentDidMount() {
	this.loadStaffs()
}

componentDidUpdate(prevProps, prevState) {
	if(prevProps.year !== this.props.year) {
		this.loadStaffs()
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


render(){
	return (
		this.state.showDocs ?
		<ViewDocuments user={this.state.showDocUser} userid={this.state.showDocId} handleShowDocs={this.handleShowDocs2}/>
		:
		<ViewStaffContainer>
		<ToastContainer />
		{
			this.props.isLoading ? <Spinner /> :
			<React.Fragment>
			{
				this.state.openModal ?
				DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
				: null
			}
			<SearchFormContainer>
			<form>
				<InputForm type='text' name='Search' id='search'/>
				<ButtonContainer>
					<Button type='submit' name='Search'/>
				</ButtonContainer>
			</form>
			</SearchFormContainer>
			<InfoDisplayContainer>
			<ViewsTable admin={this.props.currentUser.admin} Edit={this.props.Edit} Delete={this.props.Delete}
			th={this.props.admin ? ['Id', 'Staff Name', 'Mobile No.', 'Email-id', 'Designation', 'Docs'] : ['Id', 'Staff Name', 'Mobile No.', 'Email-id', 'Designation']} 
			td={this.state.staffs.length !== 0 ? this.state.staffs : [['Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null']]}/>
			</InfoDisplayContainer>
			</React.Fragment>
		}
		</ViewStaffContainer>

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
	LoadingEnd: () => dispatch(LoadingEnd()),
	setStaffData: (staffData) => dispatch(setStaffData(staffData))
})


export default connect(mapStateToProps, mapDispatchToProps)(ViewStaff);