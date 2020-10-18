import React from 'react';

import {AdminLandingPageContainer, UpperContainer, BottomContainer, 
	StudentAttendanceContainer, StaffAttendanceContainer, PaymenthistContainer} from './AdminLandingPageStyles.js';

import LineChart from '../Charts/LineChart.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import moment from 'moment';

class AdminLandingPage extends React.Component {
	constructor() {
		super()
		this.state = {
			studentattendance: null,
			staffattendance: null,
			paymenthist: null
		}
	}

	loadStudentAttendance = async() => {
		let url = `${process.env.REACT_APP_API_URL}/getstudentattendance`
		let obj = {
			January: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			February: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			March: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			April: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			May: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			June: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			July: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			August: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			September: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			October: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			November: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			December: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0}
		}

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

				data.forEach((att) => {
					if(moment(att.date).format('YYYY') === this.props.year) {
						let month = moment(att.date).format('MMMM')
						let status = att.status
						obj[month][status] = obj[month][status] + 1
					}
				})

				this.setState({studentattendance: obj})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	loadStaffAttendance = async() => {
		let url = `${process.env.REACT_APP_API_URL}/getstaffattendance`
		let obj = {
			January: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			February: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			March: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			April: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			May: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			June: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			July: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			August: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			September: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			October: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			November: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0},
			December: {P: 0, L: 0, HD: 0, A: 0, WO: 0, H: 0}
		}

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

				data.forEach((att) => {
					if(moment(att.date).format('YYYY') === this.props.year) {
						let month = moment(att.date).format('MMMM')
						let status = att.status
						obj[month][status] = obj[month][status] + 1
					}
				})

				this.setState({staffattendance: obj})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	loadPaymentHist = async() => {
		let url = `${process.env.REACT_APP_API_URL}/getfeepaymenthistory2`
		let obj = {
			January: {amt: 0},
			February: {amt: 0},
			March: {amt: 0},
			April: {amt: 0},
			May: {amt: 0},
			June: {amt: 0},
			July: {amt: 0},
			August: {amt: 0},
			September: {amt: 0},
			October: {amt: 0},
			November: {amt: 0},
			December: {amt: 0}
		}

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
					if(moment(hist.date).format('YYYY') === this.props.year) {
						let month = moment(hist.date).format('MMMM')
						obj[month].amt = obj[month].amt + hist.amt
					}
				})

				this.setState({paymenthist: obj})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	componentDidMount() {
		this.loadStudentAttendance()
		this.loadStaffAttendance()
		this.loadPaymentHist()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadStudentAttendance()
			this.loadStaffAttendance()
			this.loadPaymentHist()
		}
	}

	returnStudentAttendanceChart = () => {
		if(this.state.studentattendance) {
			let labels = Object.keys(this.state.studentattendance)

			let dataValues = []
			for (const [, value] of Object.entries(this.state.studentattendance)) {
			  dataValues.push(value.A);
			}
			let dataValues2 = []
			for (const [, value] of Object.entries(this.state.studentattendance)) {
			  dataValues2.push(value.L);
			}
			let dataValues3 = []
			for (const [, value] of Object.entries(this.state.studentattendance)) {
			  dataValues3.push(value.HD);
			}
			let dataValues4 = []
			for (const [, value] of Object.entries(this.state.studentattendance)) {
			  dataValues4.push(value.H);
			}
			
			let datasets = [
				{
					label: 'Absent',
					data: dataValues,
					borderColor: 'red',
					backgroundColor: '#ffb3ae'
				},
				{
					label: 'Leave',
					data: dataValues2,
					borderColor: 'blue',
					backgroundColor: '#8396ff'
				},
				{
					label: 'Half Day',
					data: dataValues3,
					borderColor: '#008eff',
					backgroundColor: '#6fbfff'
				},
				{
					label: 'Holidays',
					data: dataValues4,
					borderColor: '#009688',
					backgroundColor: '#70fff2'
				}
			]

			let options = {
				scales: {
					yAxes: [
						{
							ticks: {
								min: 0,
								stepSize: 1
							}
						}
					]
				}
			}
			return LineChart(labels, datasets, options)
		}
	}

	returnStaffAttendanceChart = () => {
		if(this.state.staffattendance) {
			let labels = Object.keys(this.state.staffattendance)

			let dataValues = []
			for (const [, value] of Object.entries(this.state.staffattendance)) {
			  dataValues.push(value.A);
			}
			let dataValues2 = []
			for (const [, value] of Object.entries(this.state.staffattendance)) {
			  dataValues2.push(value.L);
			}
			let dataValues3 = []
			for (const [, value] of Object.entries(this.state.staffattendance)) {
			  dataValues3.push(value.HD);
			}
			let dataValues4 = []
			for (const [, value] of Object.entries(this.state.staffattendance)) {
			  dataValues4.push(value.H);
			}
			
			let datasets = [
				{
					label: 'Absent',
					data: dataValues,
					borderColor: 'red',
					backgroundColor: '#ffb3ae'
				},
				{
					label: 'Leave',
					data: dataValues2,
					borderColor: 'blue',
					backgroundColor: '#8396ff'
				},
				{
					label: 'Half Day',
					data: dataValues3,
					borderColor: '#008eff',
					backgroundColor: '#6fbfff'
				},
				{
					label: 'Holidays',
					data: dataValues4,
					borderColor: '#009688',
					backgroundColor: '#70fff2'
				}
			]

			let options = {
				scales: {
					yAxes: [
						{
							ticks: {
								min: 0,
								stepSize: 1
							}
						}
					]
				}
			}
			return LineChart(labels, datasets, options)
		}
	}

	returnPaymentReceivedChart = () => {
		if(this.state.paymenthist) {
			let labels = Object.keys(this.state.paymenthist)

			let dataValues = []
			for (const [, value] of Object.entries(this.state.paymenthist)) {
			  dataValues.push(value.amt);
			}
			
			let datasets = [
				{
					label: 'Amount received',
					data: dataValues,
					borderColor: 'blue',
					backgroundColor: '#8396ff'
				}
			]

			let options = {
				title: {
					display: false,
					text: "Payment Received"
				},
				scales: {
					yAxes: [
						{
							ticks: {
								min: 0,
								stepSize: 50
							}
						}
					]
				}
			}
			return LineChart(labels, datasets, options)
		}
	}
	
	
	
	render() {
		return (
			this.props.isLoading ? <Spinner /> : 
			<AdminLandingPageContainer>
				<UpperContainer>
					<StudentAttendanceContainer>
					<h3><b> Student Attendance </b></h3>
						{
							this.returnStudentAttendanceChart()
						}
					</StudentAttendanceContainer>
					<StaffAttendanceContainer>
					<h3><b> Staff Attendance </b></h3>
						{
							this.returnStaffAttendanceChart()
						}
					</StaffAttendanceContainer>
				</UpperContainer>
				<BottomContainer>
				<h3><b> Payment Recieved </b></h3>
					<PaymenthistContainer>
						{
							this.returnPaymentReceivedChart()
						}
					</PaymenthistContainer>
				</BottomContainer>
			</AdminLandingPageContainer>
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
	LoadingEnd: () => dispatch(LoadingEnd())
})


export default connect(mapStateToProps, mapDispatchToProps)(AdminLandingPage);