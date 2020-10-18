import React from 'react';

import {LeaveContainer, TitleContainer, FormContainer, 
	UpperContainer, LeavesListContainer, SelectDiv, 
	Leaves, IndividualLeave, LeavesTab, ImageAndInfoContainer,
	TabInfoContainer, DateAndStatusContainer, ReasonContainer, 
	Span1, LeavesTab2, ImageAndInfoContainer2, TabInfoContainer2,
	ReasonContainer2, StartEndDateContainer, StatusContainer, DescriptionContainer} from './LeaveStyles.js';

import Button from '../Button/Button.js';
import img from './icon.png';

import moment from 'moment';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class Leave extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			show: false,
			leaves: null,
			month: null,
			isFetching: false,
			message: null,
			leaves1: null
		}
	}

	componentWillUnmount() {
		this.setState({leaves: null, leaves1: null, message: null})
	}

	loadLeaves1 = async() => {
		let url = null
		let array = []

		if(this.props.currentUser.hasOwnProperty('staff')) {

			url = `${process.env.REACT_APP_API_URL}/getstudentleaverequestsbyto/0/0/createdAt:asc?id=${this.props.currentUser.staff._id}&year=${this.props.year}`

		} else if(this.props.currentUser.hasOwnProperty('admin')) {

			if(this.props.role === "Teacher's") {

				url = `${process.env.REACT_APP_API_URL}/getteacherleaverequestsbyto/0/0/createdAt:asc?id=${this.props.currentUser.admin._id}&}&year=${this.props.year}`

			} else if(this.props.role === "Student's") {

				url = `${process.env.REACT_APP_API_URL}/getstudentleaverequestsforadmin/0/0/createdAt:asc?year=${this.props.year}`

			}

		}
		this.setState({isFetching: true})
		const response = await fetch(url, {
			method: 'GET',
			headers: { 
		        "Content-type": "application/json; charset=UTF-8",
		        'Authorization': 'Bearer ' + this.props.currentUser.token
		    }
		})

		const data = await response.json()
		
		if(data.length > 0) {
			if(this.props.role === "Student's") {
				await data.forEach((dat) => {
					array.push({
						name: `${dat.from.firstname} ${dat.from.middlename} ${dat.from.lastname}`,
						class: `Class ${dat.from.class}: Division ${dat.from.division}`,
						title: dat.title,
						startdate: dat.startdate,
						enddate: dat.enddate,
						description: dat.description,
						status: dat.status,
						id: dat._id
					})
				})
			} else {
				await data.forEach((dat) => {
					array.push({
						name: `${dat.from.firstname} ${dat.from.middlename} ${dat.from.lastname}`,
						title: dat.title,
						startdate: dat.startdate,
						enddate: dat.enddate,
						description: dat.description,
						status: dat.status,
						id: dat._id
					})
				})
			}

			this.setState({leaves1: array, isFetching: false})

		} else {
			this.setState({isFetching: false})
			return;
		}
	}

	handleAccept = async() => {
		let accept = null
		if(window.confirm("Are you sure you want to accept this request? Once accepted you will not be able to change it")) {
		    accept = true
		} else {
			accept = false
		}

		if(accept === true) {
			let url = null
			if(this.props.role === "Student's"){
				url =  `${process.env.REACT_APP_API_URL}/updatestudentleaverequest?id=${this.state.leaves.id}`
			} else if(this.props.role === "Teacher's") {
				url =  `${process.env.REACT_APP_API_URL}/updateteacherleaverequest?id=${this.state.leaves.id}`
			}

			this.setState({isFetching: true})
			const response = await fetch(url, {
				method: 'PATCH',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: JSON.stringify({
			    	status: "Accepted"
			    })
			})

			const data = await response.json()
			
			await this.loadLeaves1()
			if(data.length > 0) {

				this.setState({isFetching: false, message: data, show: false})
				this.returnMessage()
				

			} else {
				this.setState({isFetching: false, message: data, show: false})
				this.returnMessage()
				return;
			}
		}
	}

	handleReject = async() => {
		let reject = null
		if(window.confirm("Are you sure you want to reject this request? Once rejected you will not be able to change it")) {
		    reject = true
		} else {
			reject = false
		}

		if(reject === true) {
			let url = null
			if(this.props.role === "Student's"){
				url =  `${process.env.REACT_APP_API_URL}/updatestudentleaverequest?id=${this.state.leaves.id}`
			} else if(this.props.role === "Teacher's") {
				url =  `${process.env.REACT_APP_API_URL}/updateteacherleaverequest?id=${this.state.leaves.id}`
			}

			this.setState({isFetching: true})
			const response = await fetch(url, {
				method: 'PATCH',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: JSON.stringify({
			    	status: "Rejected"
			    })
			})

			const data = await response.json()
			
			if(data.length > 0) {

				this.setState({isFetching: false, message: data, show: false})
				this.returnMessage()
				this.loadLeaves1()

			} else {
				this.setState({isFetching: false, message: data, show: false})
				this.returnMessage()
				return;
			}
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

	renderLeave() {
		const data = this.state.leaves

		if(this.state.leaves) {
			if(this.state.show) {
				return(
					<LeavesTab2>
						<ImageAndInfoContainer2>
						<img src={img} alt="img" />
							<TabInfoContainer2>
								<Span1> {data.name} </Span1>
								<span> {data.class} </span>
							</TabInfoContainer2>
						</ImageAndInfoContainer2>
						<ReasonContainer2>
							<Span1> Title: &nbsp;</Span1>
							<span> {data.title} </span>
						</ReasonContainer2>
						<StartEndDateContainer>
							<div>
							<Span1> Start date: &nbsp;</Span1><br />
							<span> {data.startdate} </span>
							</div>
							<div>
							<Span1> End date: &nbsp;</Span1><br />
							<span> {data.enddate} </span>
							</div>
						</StartEndDateContainer>
						<DescriptionContainer>
							<Span1> Description:&nbsp; </Span1><br />
							<span> {data.description} </span>
						</DescriptionContainer>
						<StatusContainer>
							<Button type="button" name="Accept" handleClick={this.handleAccept} />
							<Button type="button" name="Reject" handleClick={this.handleReject} />
						</StatusContainer>
					</LeavesTab2>
				)
			}
		} else {
			return null
		}
	}

	handleChange = (e) => {
		this.setState({month: e.target.value})
	}

	componentDidMount() {
		this.setState({month: document.getElementById('month').value, leaves1: this.props.leaves})
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.setState({month: document.getElementById('month').value, leaves1: this.props.leaves})
		}
		if(prevProps.leaves !== this.props.leaves) {
			this.setState({month: document.getElementById('month').value, leaves1: this.props.leaves})
		}
	}

	renderLeaves() {
		const leaves = this.state.leaves1
		const data = []

		if(leaves) {
			for(let i=0;i<leaves.length;i++) {
				if(moment(leaves[i].startdate).format("MMMM") === this.state.month && moment(leaves[i].startdate).format("YYYY") === this.props.year) {
					data.push(
						<LeavesTab key={i}>
							<ImageAndInfoContainer>
								<img src={img} alt="img"/>
								<TabInfoContainer>
									<Span1> {leaves[i].name} </Span1>
									<span> {leaves[i].class} </span>
								</TabInfoContainer>
									{
										leaves[i].status === "pending" ?
											<Button type="button" name="View" handleClick={() => {
												this.setState((prevState) => ({
													show: !prevState.show,
													leaves: leaves[i]
												}))
											}}/>
										: null
									}
							</ImageAndInfoContainer>
							<ReasonContainer>
								<span> {leaves[i].title} </span>
							</ReasonContainer>
							<DateAndStatusContainer>
								<span> {leaves[i].startdate} </span>
								<Span1> {leaves[i].status} </Span1>
							</DateAndStatusContainer>
						</LeavesTab>
					)
				}
			}
			return data
		}
	}

	render() {
		return (
			<LeaveContainer>
			<ToastContainer />
					<TitleContainer>
						<span> {this.props.role} Leave </span>
					</TitleContainer>
				<UpperContainer>
					<FormContainer>
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
					</FormContainer>
				</UpperContainer>
				{
					this.state.isFetching ? <Spinner /> :
					<LeavesListContainer>
						<Leaves>
							{
								this.renderLeaves()
							}
						</Leaves>
						<IndividualLeave>
							{
								this.renderLeave()
							}
						</IndividualLeave>
					</LeavesListContainer>
				}
			</LeaveContainer>
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



export default connect(mapStateToProps, mapDispatchToProps)(Leave);





