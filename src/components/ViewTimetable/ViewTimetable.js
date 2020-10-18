import React from 'react';

import {TimeTableContainer, UpperContainer, TitleContainer, 
	FormContainer, ClassContainer, DownloadContainer, ButtonDiv3,
	TableContainer, SelectDiv, ButtonDiv, ButtonDiv2, StyledLink} from './ViewTimetableStyles.js';

import Button from '../Button/Button.js';

import ViewTable from '../ViewsTable/ViewsTable.js'

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import {SetTimetable} from '../../redux/class/ClassActions.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class ViewTimetable extends React.Component {
	constructor() {
		super()
		this.state = {
			isFetching: false,
			selectedClass: null,
			selectedDivision: null,
			isShown: false,
			timetables: null,
			timetableData: null,
			openModal: false,
			deleteid: null,
			message: null
		}
	}

	loadClasses = () => {
		if(this.props.classes) {
			this.setState({selectedClass: this.props.classes[0].class, selectedDivision: this.props.classes[0].divisions[0].division})
		}
	}

	componentDidMount() {
		this.loadClasses()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.classes !== this.props.classes) {
			this.loadClasses()
		}
		if(prevProps.year !== this.props.year) {
			this.loadClasses()
		}
	}

	handleEdit = async() => {

		this.props.SetTimetable(this.state.timetableData)
	}

	handleDelete = () => {
		this.setState((prevState) => ({
			openModal: !prevState.openModal
		}))
	}

	handleDeleteConfirm = async() => {
		this.handleDelete()

		let url = `${process.env.REACT_APP_API_URL}/deletetimetable/${this.state.timetableData._id}`

		if(this.props.currentUser.hasOwnProperty('admin')) {
			this.props.LoadingStart()
			const response = await fetch(url, {
				method: 'DELETE',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: JSON.stringify({
			    	class: this.state.selectedClass,
			    	year: this.props.year
			    })
			})

			const data = await response.json()

			this.setState({message: data})
			this.returnMessage()
			this.props.LoadingEnd()
		}
	}

	loadTimetable = async() => {
		this.setState({isShown: false})

		let url = `${process.env.REACT_APP_API_URL}/gettimetable?year=${this.props.year}&class=${this.state.selectedClass}&division=${this.state.selectedDivision}`
		let array = []

		if(this.props.currentUser) {
			this.setState({isFetching: true})
			const response = await fetch(url, {
				method: 'GET',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const data = await response.json()
			if(data.periods) {

				data.periods.forEach((sub) => {
					array.push([sub.srno, sub.starttime, sub.endtime, sub.mondaysubject, 
					sub.tuesdaysubject, sub.wednesdaysubject, sub.thursdaysubject, sub.fridaysubject, sub.saturdaysubject,
					<StyledLink to='/admin/addtimetable'><span role="img" aria-label="edit" onClick={() => {this.handleEdit()}}>&#9997;</span></StyledLink>])
				})

				this.setState({timetables: array, timetableData: {...data, class: this.state.selectedClass},  isFetching: false, isShown: true})

			} else {
				this.setState({timetables: array, isFetching: false, isShown: false})
				return;
			}
		}
	}


	renderClasses = () => {
		let data = []
		if(this.props.classes) {
			this.props.classes.forEach((cls) => {
				data.push(<option id={cls.classid} key={cls.class} value={cls.class}>{cls.class}</option>)
			})
		}
		return data
	}

	renderDivisions = () => {
		if(this.state.selectedClass){

			let class1 = this.state.selectedClass
			let data = []
			if(this.props.classes) {
				let class2 = this.props.classes.find((cls) => {
					return cls.class === class1
				})

				class2.divisions.forEach((div) => {
					data.push(<option key={div.division} value={div.division}>{div.division}</option>)
				})
			}

			return data
		}
	}

	selectClass = (e) => {
		this.setState({selectedClass: e.target.value})
		let class1 = e.target.value
		let class2 = this.props.classes.find((cls) => {
			return cls.class === class1
		})
		if(class2.divisions.length > 0) {
			this.setState({selectedDivision: class2.divisions[0].division})
			document.getElementById("division").value = class2.divisions[0].division
		} else {
			this.setState({selectedDivision: null})
		}
	}

	selectDivision = (e) => {
		this.setState({selectedDivision: e.target.value})
	}

	returnData = () => {
	if(this.state.isShown) {
		return (
			<React.Fragment>
				<TableContainer>
					<ViewTable admin={this.props.admin} Edit={this.props.Edit}
					th={['Sr no.', 'Start-Time', 'End-Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']} 
					td={this.state.timetables.length !== 0 ? this.state.timetables : [['Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null']]}/>
				</TableContainer>
				{
					this.props.currentUser.hasOwnProperty('admin') ? 
					<ButtonDiv3>
						<Button name="Delete" type="button" handleClick={this.handleDelete}/>
					</ButtonDiv3> : null
				}
			</React.Fragment>
			)
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
			this.props.isLoading ? <Spinner /> :
			<TimeTableContainer>
			<ToastContainer />
			{
				this.state.openModal ?
				DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
				: null
			}
				<UpperContainer>
					<TitleContainer>
						<span> View Time-table </span>
					</TitleContainer>
					<FormContainer>
						<ClassContainer>
							<form>
								<SelectDiv>
									<label htmlFor="class">Class:</label>
										<select name="Class" id="class" onChange={this.selectClass}>
										{
											this.renderClasses()
										}
									</select>
									<label htmlFor="division">Division:</label>
										<select name="Division" id="division" onChange={this.selectDivision}>
										{
											this.renderDivisions()
										}
									</select>
								</SelectDiv>
								<ButtonDiv>
									<Button name="Submit" type="button" handleClick={this.loadTimetable}/>
								</ButtonDiv>
							</form>
						</ClassContainer>
						<DownloadContainer>
							<ButtonDiv2>
								<Button name="Download PDF" type="button" handleClick={this.changeNext} />
							</ButtonDiv2>
						</DownloadContainer>
					</FormContainer>		
				</UpperContainer>
				{
					this.state.isFetching ? <Spinner /> :
					this.returnData()
				}
			</TimeTableContainer>
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
	LoadingEnd: () => dispatch(LoadingEnd()),
	SetTimetable: (timetable) => dispatch(SetTimetable(timetable))
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewTimetable);
