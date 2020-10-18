import React from 'react';

import {IssueHistoryContainer, UpperContainer, BottomContainer} from './IssueHistoryStyles.js';

import InputForm from '../InputForm/InputForm.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';

import Spinner from '../spinner/Spinner.js';

import moment from 'moment';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class IssueHistory extends React.Component {
	constructor() {
		super()
		this.state = {
			issuehistory: null,
			openModal: false,
			deleteid: null,
			message: null
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

		let url = `${process.env.REACT_APP_API_URL}/deleteissuehistory?id=${this.state.deleteid}&year=${this.props.year}`

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
			this.loadHistory()
		}
	}

	loadHistory = async() => {
		this.setState({history: null})
		
		let url = `${process.env.REACT_APP_API_URL}/getissuehistory/0/0/issuedon:asc?year=${this.props.year}`
		let array = []

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
			
			if(data.length > 0) {

				data.forEach((hist) => {
					if(hist.issuedtostudent){
						array.push([`${hist.issuedtostudent.firstname} ${hist.issuedtostudent.middlename} ${hist.issuedtostudent.lastname}`,
						`${moment(hist.issuedon).format("MMMM Do, YYYY")}`, hist.goodpurchased, hist.TotalAmt,
						<span role="img" aria-label="delete" onClick={() => this.handleDelete(hist._id)}>&#10060;</span>])
					} else if(hist.issuedtostaff) {
						array.push([`${hist.teacherid.firstname} ${hist.teacherid.middlename} ${hist.teacherid.lastname}`,
						`${moment(hist.issuedon).format("MMMM Do, YYYY")}`, hist.goodpurchased, hist.TotalAmt,
						<span role="img" aria-label="delete" onClick={() => this.handleDelete(hist._id)}>&#10060;</span>])
					}

				})

				this.setState({issuehistory: array})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	componentDidMount() {
		this.loadHistory()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadHistory()
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
			<IssueHistoryContainer>
			<ToastContainer />
				{
					this.state.openModal ?
					DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
					: null
				}
				<UpperContainer>
					<InputForm placeholder="Search" />
				</UpperContainer>
				{
					this.props.isLoading ? <Spinner /> :
					<BottomContainer>
						<ViewsTable admin Delete
						th={['Issued To', 'Issued On', 'Goods Purchased', 'Total Amount']}
						td={this.state.issuehistory ? this.state.issuehistory : [['Null', 'Null', 'Null', 'Null', 'Null']]} />
					</BottomContainer>
				}
			</IssueHistoryContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(IssueHistory);
