import React from 'react';

import {LeavesSentContainer, TitleContainer, FormContainer, 
	UpperContainer, LeavesListContainer, SelectDiv, 
	Leaves, LeavesTab, ImageAndInfoContainer,
	TabInfoContainer, DateAndStatusContainer, ReasonContainer, 
	Span1} from './LeavesSentStyles.js';

import img from './icon.png';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';

import moment from 'moment';

class LeavesSent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			show: false,
			leaves2: null,
			month: null
		}
	}

	loadLeaves = async() => {
		this.setState({leaves2: null})
		let url = null

		if(this.props.currentUser.hasOwnProperty('staff')) {

			url = `${process.env.REACT_APP_API_URL}/getteacherleaverequestsbyfrom/0/0/createdAt:asc?id=${this.props.currentUser.staff._id}&year=${this.props.year}`

		} else if(this.props.currentUser.hasOwnProperty('student')) {

			url = `${process.env.REACT_APP_API_URL}/getstudentleaverequestsbyfrom/0/0/createdAt:asc?id=${this.props.currentUser.student._id}&year=${this.props.year}`

		}

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

			this.setState({leaves2: data, month: document.getElementById('month').value})
			this.props.LoadingEnd()

		} else {
			this.props.LoadingEnd()
			return;
		}
	}

	componentDidMount() {
		this.loadLeaves()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadLeaves()
		}
	}

	handleChange = (e) => {
		this.setState({month: e.target.value})
	}

	renderLeaves() {
		const {leaves2} = this.state
		const data1 = []

		if(this.state.leaves2) {
			for(let i=0;i<leaves2.length;i++) {
				if(moment(leaves2[i].startdate).format("MMMM") === this.state.month && moment(leaves2[i].startdate).format("YYYY") === this.props.year)
				data1.push([
					<LeavesTab key={i}>
						<ImageAndInfoContainer>
							<img src={img} alt="img"/>
							<TabInfoContainer>
								<Span1> {this.props.currentUser.staff ? 
								`${this.props.currentUser.staff.firstname} ${this.props.currentUser.staff.middlename} ${this.props.currentUser.staff.lastname}`
								: this.props.currentUser.student ? 
								`${this.props.currentUser.student.firstname} ${this.props.currentUser.student.middlename} ${this.props.currentUser.student.lastname}`
								: null} 
								</Span1>
								{
									this.props.currentUser.student ? 
									<span> class {this.props.currentUser.student.class} : division {this.props.currentUser.student.division} </span> : null
								}
							</TabInfoContainer>
						</ImageAndInfoContainer>
						<ReasonContainer>
							<span> {leaves2[i].title} </span>
						</ReasonContainer>
						<DateAndStatusContainer>
							<span> {leaves2[i].startdate} </span>
							<Span1> {leaves2[i].status} </Span1>
						</DateAndStatusContainer>
					</LeavesTab>
					])
			}
			return data1
		}
	}

	render() {
		return (
			<LeavesSentContainer>
					<TitleContainer>
						<span> {this.props.role} Leaves Sent </span>
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
				<LeavesListContainer>
					<Leaves>
						{
							this.renderLeaves()
						}
					</Leaves>
				</LeavesListContainer>
			</LeavesSentContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(LeavesSent);
