import React from 'react';

import {VendorListContainer, UpperContainer, BottomContainer} from './VendorListStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';
import AddVendor from '../AddVendor/AddVendor.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';


class VendorList extends React.Component {
	constructor() {
		super()
		this.state = {
			addVendor: false,
			viewList: true,
			vendors: null,
			vendor: null,
			openModal: false,
			deleteid: null,
			message: null
		}
	}

	changeaddVendor = () => {
		this.setState({addVendor: true,
			viewList: false})
	}

	changeaddVendor2 = (ven) => {
		this.setState({addVendor: true,
			viewList: false, vendor: ven})
	}

	changeviewList = () => {
		this.setState({addVendor: false,
			viewList: true, vendor: null})
	}

	handleDelete = (id) => {
		this.setState((prevState) => ({
			openModal: !prevState.openModal,
			deleteid: id
		}))
	}

	handleDeleteConfirm = async() => {
		this.handleDelete()

		let url = `${process.env.REACT_APP_API_URL}/deletevendor?id=${this.state.deleteid}&year=${this.props.year}`

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
			this.loadVendors()
		}
	}

	loadVendors = async() => {
		this.setState({vendors: []})
		
		let url = `${process.env.REACT_APP_API_URL}/getvendors/0/0/firstname:asc?year=${this.props.year}`
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

				data.forEach((ven) => {
					array.push([`${ven.firstname} ${ven.lastname}`, 
					ven.mobile, ven.businessname, ven.address,
					<span role="img" aria-label="edit" onClick={() => this.changeaddVendor2(ven)}>&#9997;</span>,
					<span role="img" aria-label="delete" onClick={() => this.handleDelete(ven._id)}>&#10060;</span>])
				})

				this.setState({vendors: array})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	componentDidMount() {
		this.loadVendors()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadVendors()
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
			this.state.viewList ? 
			<VendorListContainer>
			<ToastContainer />
				{
					this.state.openModal ?
					DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
					: null
				}
				<UpperContainer>
					<Button type="button" name="Add Vendor" handleClick={this.changeaddVendor}/>
					<InputForm placeholder="Search" />
				</UpperContainer>
				{
					this.props.isLoading ? <Spinner /> :
					<BottomContainer>
						<ViewsTable admin Edit Delete
						th={['Vendor Name', 'Mobile No', 'Business', 'Address']}
						td={this.state.vendors ? this.state.vendors : [['Null', 'Null', 'Null', 'Null', 'Null', 'Null']]} />
					</BottomContainer>
				}
			</VendorListContainer> 
			: this.state.addVendor ? <AddVendor VendorData={this.state.vendor} changeviewList={this.changeviewList}/> : null
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

export default connect(mapStateToProps, mapDispatchToProps)(VendorList);
