import React from 'react';

import {PaymentHistoryContainer, UpperContainer, FormContainer, SelectDiv, BottomContainer} from './PaymentHistoryStyles.js';

import InputForm from '../InputForm/InputForm.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';

import Spinner from '../spinner/Spinner.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

import moment from 'moment';

class PaymentHistory extends React.Component {
	constructor() {
		super()
		this.state = {
			history: null,
			month: "January",
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

		let url = `${process.env.REACT_APP_API_URL}/deletefeepaymenthistory?id=${this.state.deleteid}`

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
		
		let url = `${process.env.REACT_APP_API_URL}/getfeepaymenthistory/0/0/date:asc?year=${this.props.year}`

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

				this.setState({history: data})
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

	handleChange = (e) => {
		this.setState({month: e.target.value})
	}

	renderHist = () => {
		let array = []
		if(this.state.history) {
			this.state.history.forEach((hist) => {
				if(this.state.month === moment(hist.date).format("MMMM"))
				array.push([`${hist.student.firstname} ${hist.student.middlename} ${hist.student.lastname}`, 
					`${hist.student.class} - ${hist.student.division}`, hist.amtpaid, moment(hist.date).format("MMMM Do, YYYY"),
					<span role="img" aria-label="delete" onClick={() => this.handleDelete(hist._id)}>&#10060;</span>])
			})
		} else {
			array.push(["Null", "Null", "Null", "Null", "Null"])
		}
		return array
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
			<PaymentHistoryContainer>
			<ToastContainer />
				{
					this.state.openModal ?
					DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
					: null
				}
				<UpperContainer>
					<SelectDiv>
						<label htmlFor="month">Month:</label>
							<select name="month" id="month" onChange={this.handleChange}>
							  <option value="January">January</option>
							  <option value="February">February</option>
							  <option value="March">March</option>
							  <option value="April">April</option>
							  <option value="May">May</option>
							  <option value="June">June</option>
							  <option value="July">July</option>
							  <option value="August">August</option>
							  <option value="September">September</option>
							  <option value="October">October</option>
							  <option value="November">November</option>
							  <option value="December">December</option>
							</select>
						</SelectDiv>
					<FormContainer>
						<InputForm placeholder="Search"/>
					</FormContainer>
				</UpperContainer>
				{
					this.props.isLoading ? <Spinner /> :
					<BottomContainer>
						<ViewsTable admin Delete th={['Student Name', 'Class-Div', 'Paid-Amt', 'Date']} 
						td={this.renderHist()}/>
					</BottomContainer>
				}
			</PaymentHistoryContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentHistory);


// th={{ReceiptNo : 'Receipt No.', StudentName: 'Student Name', ClassDiv: 'Class-Div', PaidAmt: 'Paid-Amt', Date: 'Date'}} 
// td={[{Srno: '12', name: 'Simon Cowell', class: '7th - A', cash: 'Rs.1500 | Cash', date: 'July 21, 2020'}]}