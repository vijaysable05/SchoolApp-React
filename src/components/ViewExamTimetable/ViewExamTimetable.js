import React from 'react';

import {ViewExamTimetableContainer, UpperContainer,
	ClassContainer, ButtonDiv3,
	TableContainer, SelectDiv, AddExamContainer} from './ViewExamTimetableStyles.js';

import Button from '../Button/Button.js';

import ViewTable from '../ViewsTable/ViewsTable.js';
import AddExamTimetable from '../AddExamTimetable/AddExamTimetable.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

import moment from 'moment';

class ViewExamTimetable extends React.Component {
	constructor() {
		super()
		this.state = {
			addExam: false,
			viewExam: true,
			exams: null,
			timetable: null,
			viewtable: false,
			openModal: false,
			message: null,
			timetableid: null
		}
	}

	handleDelete = (id) => {
		this.setState((prevState) => ({
			openModal: !prevState.openModal
		}))
	}

	handleDeleteConfirm = async() => {
		this.handleDelete()

		let url = `${process.env.REACT_APP_API_URL}/deleteexamtimetable?id=${this.state.timetableid}`

		if(this.props.currentUser.hasOwnProperty('admin')) {
			this.setState({isFetching: true})
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
			this.loadExamTimetable()
		}
	}

	loadExamTimetable = async() => {
		this.setState({timetable: []})
		let id = document.getElementById('exam').value
		
		let url = `${process.env.REACT_APP_API_URL}/getexamtimetable?id=${id}`
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
			
			if(data.examtimetable.length > 0) {

				data.examtimetable.forEach((exm) => {
					array.push([exm.subject, exm.totalmarks, exm.minmarks, moment(exm.date).format("MMMM Do, YYYY"), 
					moment(exm.starttime, "HH:mm").format("hh:mm A"), moment(exm.endtime, "HH:mm").format("hh:mm A"),
					<span role="img" aria-label="edit" onClick={() => {this.renderAddExam2(exm, id)}}>&#9997;</span>])
				})

				this.setState({timetable: array, viewtable: true, timetableid: data.examid})
				this.setState({isFetching: false})

			} else {
				this.setState({isFetching: false})
				return;
			}
		}
	}

	loadExams = async() => {
		this.setState({exams: null})
		
		let url = `${process.env.REACT_APP_API_URL}/getexams/0/0/startdate:asc?year=${this.props.year}`
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

				data.forEach((exm) => {
					array.push({examname: exm.examname, id: exm._id, examclass: exm.class.class})
				})

				this.setState({exams: array})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	componentDidMount() {
		this.loadExams()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadExams()
		}
	}

	renderViewExam = () => {
		this.setState({addExam: false,
			viewExam: true})
	}

	renderAddExam = () => {
		this.setState({addExam: true,
			viewExam: false})
	}

	renderAddExam2 = (exm, id) => {
		this.setState({addExam: true,
			viewExam: false, exam: {subject: exm, id: id}})
	}

	renderExams = () => {
		let data = []
		if(this.state.exams) {
			this.state.exams.forEach((exm) => {
				data.push(<option id={exm.id} key={exm.id} value={exm.id}>{exm.examname} | Class - {exm.examclass}</option>)
			})
		}
		return data
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
			<ViewExamTimetableContainer>
			<ToastContainer />
				{
					this.state.openModal ?
					DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
					: null
				}
				{
					this.state.viewExam ? 
					<React.Fragment>
					{
						this.props.isLoading ? <Spinner /> :
						<UpperContainer>
						{
							this.props.admin ?
							<AddExamContainer>
								<Button name="Add Exam Timetable" type="button" handleClick={this.renderAddExam}/>
							</AddExamContainer>
							: null
						}
								<ClassContainer>
									<SelectDiv>
										<label htmlFor="exam">Exam:</label>
											<select name="Exam" id="exam">
											{
												this.renderExams()
											}
										</select>
									</SelectDiv>
									<Button name="Submit" type="button" handleClick={this.loadExamTimetable}/>
									<Button name="Download PDF" type="button" />
								</ClassContainer>
						</UpperContainer>
					}
						{
							this.state.isFetching ? <Spinner /> :
							this.state.viewtable ?
							<React.Fragment> 
								<TableContainer>
									<ViewTable admin={this.props.admin} Edit
									th={['Subject', 'Total Marks', 'Minimum Marks', 'Date', 'Start Time', 'End Time']} 
									td={this.state.timetable ? this.state.timetable : [['Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null']]}/>
								</TableContainer>
								{
									this.props.currentUser.hasOwnProperty('admin') ? 
									<ButtonDiv3>
										<Button name="Delete" type="button" handleClick={this.handleDelete}/>
									</ButtonDiv3> : null
								}
							</React.Fragment>  : null
						}
					</React.Fragment> 
						:
						this.state.addExam ? <AddExamTimetable exam={this.state.exam} renderViewExam={this.renderViewExam} /> 
						: null
				}
			</ViewExamTimetableContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewExamTimetable);


// <DeleteUpdateContainer>
// 							<Button name="Update Timetable" type="button" />
// 							<Button name="Delete Timetable" type="button" />
// 						</DeleteUpdateContainer>