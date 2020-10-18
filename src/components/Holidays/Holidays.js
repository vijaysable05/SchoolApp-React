import React from 'react';

import {HolidaysContainer, UpperContainer, BottomContainer} from './HolidaysStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

import moment from 'moment';

class Holidays extends React.Component {
	constructor() {
		super()
		this.state = {
			holidays: null,
			message: null,
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

		let url = `${process.env.REACT_APP_API_URL}/deleteholiday/${this.state.deleteid}`

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
			this.loadHolidays()
		}
	}

	loadHolidays = async() => {
		this.setState({holidays: null})
	
		let url = `${process.env.REACT_APP_API_URL}/getholidays/0/0/date:asc?year=${this.props.year}`
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

				data.forEach((holi) => {
					if(this.props.currentUser.hasOwnProperty('admin')) {
						array.push([counter, holi.eventtitle, moment(holi.date).format("MMMM Do, YYYY"),
						<span role="img" onClick={() => this.handleDelete(holi._id)} aria-label="delete">&#10060;</span>])
					} else {
						array.push([counter, holi.eventtitle, moment(holi.date).format("MMMM Do, YYYY")])
					}
					counter = counter + 1
				})

				this.setState({holidays: array})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	componentDidMount() {
		this.loadHolidays()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadHolidays()
		}
	}

	handleSubmit = async() => {
		const eventtitle = document.getElementById("eventname").value
		const date = document.getElementById('date').value

		this.props.LoadingStart()
		
		let url = `${process.env.REACT_APP_API_URL}/addholiday`
		
		if(this.props.currentUser.hasOwnProperty('admin')) {

			const response = await fetch(url, {
			method: 'POST',
			headers: { 
		        "Content-type": "application/json; charset=UTF-8",
		        'Authorization': 'Bearer ' + this.props.currentUser.token
		    },
		    body: JSON.stringify({
		    	eventtitle: eventtitle,
		    	date: date,
		    	year: this.props.year
		    }), 
		})

		const data = await response.json()
		this.loadHolidays()
		this.setState({message: data})
		this.returnMessage()
		}
		this.props.LoadingEnd()
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
			<HolidaysContainer>
			<ToastContainer />
			{
				this.state.openModal ?
				DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
				: null
			}
			{
				this.props.isLoading ? <Spinner /> :
				<UpperContainer>
					<ViewsTable admin={this.props.admin} Delete 
					th={['Sr No.', 'Event Title', 'Date']} 
					td={this.state.holidays ? this.state.holidays : this.props.admin ? [['Null', 'Null', 'Null', 'Null']] : [['Null', 'Null', 'Null']]} />
				</UpperContainer>
			}
			{
				this.props.admin ? 
				<BottomContainer>
					<InputForm name="Event Name" id="eventname"/>
					<InputForm type="date" Date="Event Name" id="date"/>
					<Button type="button" name="Add" handleClick={this.handleSubmit}/>
				</BottomContainer>
				: null
			}
			</HolidaysContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(Holidays);
