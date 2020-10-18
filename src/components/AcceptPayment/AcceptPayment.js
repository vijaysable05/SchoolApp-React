import React from 'react';

import Select from 'react-select';

import {AcceptPaymentContainer, UpperContainer, BottomContainer, 
	StudentInfoContainer, FeesFormContainer, 
	FeesDisplayContainer, FeesDisplay, Span1, 
	FormContainer, FormTitle, Form, SelectDiv, AmountForm, FeesConcessionContainer, ConfirmDiv} from './AcceptPaymentStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';

import Spinner from '../spinner/Spinner.js';

import moment from 'moment';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

import img from './icon.png'

class AcceptPayment extends React.Component {
	constructor() {
		super()
		this.state = {
			name: null,
			rollno: null,
			classdiv: null,
			students: null,
			studentValue: null,
			imgsrc: null,
			totalfees: null,
			remainingfees: null,
			totalpaid: null,
			message: null
		}
	}

	loadStudents = async() => {

		this.props.LoadingStart()

		let array1 = []

		let url = `${process.env.REACT_APP_API_URL}/getstudents/0/0/firstname:asc?year=${this.props.year}`

		if(this.props.currentUser.hasOwnProperty('admin')) {

			const response = await fetch(url, {
				method: 'GET',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const data = await response.json()

			await data.forEach((dat) => {
				array1.push({name: `${dat.firstname} ${dat.middlename} ${dat.lastname}`, rollno: dat.rollno, 
							id: dat._id, class: dat.class, division: dat.division, profilepic: dat.profilepic,
							fees: dat.fees})
			})
			this.setState({students: array1})

			this.props.LoadingEnd()

		} else {
			this.props.LoadingEnd()
			return;
		}
	}

	componentDidMount() {
		this.loadStudents()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadStudents()
		}
	}

	renderStudents = () => {
		let data = []

		if(this.state.students) {
			this.state.students.forEach((stu) => {
				data.push({value: stu, label: stu.name})
			})
		}

		return data
	}

	handleChange = (studentValue) => {
		
		this.setState({studentValue: studentValue, name: studentValue.label, imgsrc: studentValue.value.profilepic, 
			rollno: studentValue.value.rollno, classdiv: `${studentValue.value.class}-${studentValue.value.division}`,
			remainingfees: studentValue.value.fees.remainingfee, totalfees: studentValue.value.fees.totalfees})
		if(studentValue.value.fees.totalpaid) {
			this.setState({totalpaid: studentValue.value.fees.totalpaid})
		}
	}

	handleSubmit = async() => {

		let amount = Number(document.getElementById('amount').value)
		let paymentmode = document.getElementById('paymentmode').value
		let feeconcession = Number(document.getElementById('feeconcession').value)

		let url = `${process.env.REACT_APP_API_URL}/acceptpayment`

		this.props.LoadingStart()

		if(this.props.currentUser.hasOwnProperty('admin')) {

			if(feeconcession) {

				const response = await fetch(url, {
					method: 'PATCH',
					headers: { 
				        "Content-type": "application/json; charset=UTF-8",
				        'Authorization': 'Bearer ' + this.props.currentUser.token
				    },
				    body: JSON.stringify({
				    	year: this.props.year,
				    	studentid: this.state.studentValue.value.id,
				    	date: moment(Date.now()).format("YYYY-MM-DD"),
				    	amt: amount,
				    	paymentmode: paymentmode,
				    	feeconcession: feeconcession
				    }), 
				})

				const data = await response.json()
				this.setState({message: data})

			} else {
				const response = await fetch(url, {
					method: 'PATCH',
					headers: { 
				        "Content-type": "application/json; charset=UTF-8",
				        'Authorization': 'Bearer ' + this.props.currentUser.token
				    },
				    body: JSON.stringify({
				    	year: this.props.year,
				    	studentid: this.state.studentValue.value.id,
				    	date: moment(Date.now()).format("YYYY-MM-DD"),
				    	amt: amount,
				    	paymentmode: paymentmode
				    }), 
				})

				const data = await response.json()
				this.setState({message: data})
			}
		}
		this.returnMessage()
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
			this.props.isLoading ? <Spinner /> :
			<AcceptPaymentContainer>
			<ToastContainer />
				<UpperContainer>
					<Select
						value={this.state.studentValue}
				        onChange={this.handleChange}
				        options={this.renderStudents()}
				        placeholder="Student name"
				      />
				</UpperContainer>
				<BottomContainer>
					<StudentInfoContainer>
						<img src={this.state.imgsrc ? this.state.imgsrc : img} alt="img" />
						<InputForm name="Name" id="name" disabled="disabled" value={this.state.name ? this.state.name : '_'}/>
						<InputForm name="Roll No" id="rollno" disabled="disabled" value={this.state.rollno ? this.state.rollno : '_'}/>
						<InputForm name="Class Division" id="classdiv" disabled="disabled" value={this.state.classdiv ? this.state.classdiv : '_'}/>
					</StudentInfoContainer>
					<FeesFormContainer>
						<FeesDisplayContainer>
							<FeesDisplay>
								<Span1>Total Fees</Span1>
								<span>{this.state.totalfees ? this.state.totalfees : 0}</span>
							</FeesDisplay>
							<FeesDisplay>
								<Span1>Total Paid</Span1>
								<span>{this.state.totalpaid ? this.state.totalpaid : 0}</span>
							</FeesDisplay>
							<FeesDisplay>
								<Span1>Remaining Fee</Span1>
								<span>{this.state.remainingfees ? this.state.remainingfees : 0}</span>
							</FeesDisplay>
						</FeesDisplayContainer>
						<FormContainer>
							<FormTitle>
								<Span1> How much are you accepting? </Span1>
							</FormTitle>
							<Form>
							<AmountForm>
								<InputForm placeholder="Enter Amount" id="amount" />
							</AmountForm>
								<SelectDiv>
										<select name="payment" id="paymentmode">
										<option value="cash">Payment Mode</option>
										<option value="cash">Cash</option>
										<option value="cheque">Cheque</option>
									</select>
								</SelectDiv>
							</Form>
						<FeesConcessionContainer>
							<InputForm name="Fee Concession" placeholder="Enter Amount" id="feeconcession" />
						</FeesConcessionContainer>
						<ConfirmDiv>
							<Button type="button" name="Confirm Payment" handleClick={this.handleSubmit}/>
						</ConfirmDiv>
						</FormContainer>
					</FeesFormContainer>
				</BottomContainer>
			</AcceptPaymentContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(AcceptPayment);
