import React from 'react';

import {FineAndReturnsContainer, TitleContainer, BottomContainer, 
	FineDescriptionContainer, FineCollectionContainer, 
	DescribeContainer, DescribeTitleContainer, DescribeInputContainer, 
	NoteContainer, ButtonContainer, FineCollectionSubContainer, 
	FineCollectionTop, SelectDiv, TotalAndMonthContainer, 
	FineCollectionBottom, SpanContainer, MemberContainer} from './FineAndReturnsStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class FineAndReturns extends React.Component {
	constructor() {
		super()
		this.state = {
			month: null,
			fine2: null,
			daysOfReturn: null,
			totalFine: null,
			monthlyFine: null,
			members: null,
			message: null
		}
	}

	loadFineAndTotalFine = async() => {
		
		let url = `${process.env.REACT_APP_API_URL}/getfine`
		let url2 = `${process.env.REACT_APP_API_URL}/gettotalfine?year=${this.props.year}`
		let url3 = `${process.env.REACT_APP_API_URL}/getmonthlyfine?month=${'January'}&year=${this.props.year}`

		if(this.props.currentUser.hasOwnProperty('admin')) {
			this.props.LoadingStart()
			const response = await fetch(url, {
				method: 'GET',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const response2 = await fetch(url2, {
				method: 'GET',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const response3 = await fetch(url3, {
				method: 'GET',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const data = await response.json()
			const data2 = await response2.json()
			const data3 = await response3.json()
			
			if(data) {
				this.setState({fine2: data.fine, daysOfReturn: data.daysofreturn, totalFine: `${data2.totalfine}`, monthlyFine: `${data3.fine}`, members: `${data3.members}`})
				this.props.LoadingEnd()
			}

			} else {
				this.props.LoadingEnd()
				return;
			}
		}

	handleChange = async(e) => {
		this.setState({month: e.target.value})

		let url = `${process.env.REACT_APP_API_URL}/getmonthlyfine?month=${e.target.value}&year=${this.props.year}`

		if(this.props.currentUser.hasOwnProperty('admin')) {

			const response = await fetch(url, {
				method: 'GET',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const data = await response.json()
			
			if(data) {
				this.setState({monthlyFine: `${data.fine}`, members: `${data.members}`})
			}

			} else {
				return;
			}
	}

	componentDidMount() {
		this.loadFineAndTotalFine()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadFineAndTotalFine()
		}
	}

	handleAddFine = async() => {

		let fine = document.getElementById("fine").value
		let daysofreturn = document.getElementById("daysofreturn").value

		let url = `${process.env.REACT_APP_API_URL}/addfine`

		if(this.props.currentUser.hasOwnProperty('admin')) {
			this.props.LoadingStart()
			const response = await fetch(url, {
			method: 'POST',
			headers: { 
		        "Content-type": "application/json; charset=UTF-8",
		        'Authorization': 'Bearer ' + this.props.currentUser.token
		    },
		    body: JSON.stringify({
		    	fine: fine,
		    	daysofreturn: daysofreturn
		    }), 
		})

		const data = await response.json()
		this.setState({message: data})
		this.returnMessage()
		}
		this.loadFineAndTotalFine()
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
			<FineAndReturnsContainer>
			<ToastContainer />
				<TitleContainer>
					<span> Fine & Returns </span>
				</TitleContainer>
				{
					this.props.isLoading ? <Spinner /> :
					<BottomContainer>
						<FineDescriptionContainer>
							<DescribeContainer>
								<DescribeTitleContainer>
									<span> Describe Fine </span>
								</DescribeTitleContainer>
								<DescribeInputContainer>
									<InputForm id="fine" defaultValue={this.state.fine2 ? this.state.fine2 : null} />
								</DescribeInputContainer>
								<NoteContainer>
									<span> Note*: The amount candidate needs to pay if book is not submitted in give period per day. </span>
								</NoteContainer>
								<DescribeTitleContainer>
									<span> Describe Days of Return </span>
								</DescribeTitleContainer>
								<DescribeInputContainer>
									<InputForm id="daysofreturn" defaultValue={this.state.daysOfReturn ? this.state.daysOfReturn : null} />
								</DescribeInputContainer>
								<NoteContainer>
									<span> Note*: Date(Days) of return will be calculated from the book issues date. </span>
								</NoteContainer>
								<ButtonContainer>
									<Button name="Add Fine" type="button" id="addfine" handleClick={this.handleAddFine} />
								</ButtonContainer>
							</DescribeContainer>
						</FineDescriptionContainer>
						<FineCollectionContainer>
							<FineCollectionSubContainer>
								<FineCollectionTop>
									<span> Total Fine Collected </span>
									<SelectDiv>
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
								</FineCollectionTop>
								<FineCollectionBottom>
									<TotalAndMonthContainer>
										<SpanContainer>
										{
											this.state.totalFine ? <span>{this.state.totalFine}</span> :
											<span> __ </span>
										}
											<span> Total Paid </span>
										</SpanContainer>
										<SpanContainer>
										{
											this.state.monthlyFine ? <span>{this.state.monthlyFine}</span> :
											<span> __ </span>
										}
											<span> This Month </span>
										</SpanContainer>
									</TotalAndMonthContainer>
									<MemberContainer>
										<SpanContainer>
										{
											this.state.members ? <span>{this.state.members}</span> :
											<span> __ </span>
										}
											<span> Members </span>
										</SpanContainer>
									</MemberContainer>
								</FineCollectionBottom>
							</FineCollectionSubContainer>
						</FineCollectionContainer>
					</BottomContainer>
				}
				
			</FineAndReturnsContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(FineAndReturns);
