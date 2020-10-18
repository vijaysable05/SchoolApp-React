import React from 'react';

import {ViewExamContainer, UpperContainer, BottomContainer} from './ViewExamStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';
import AddExam from '../AddExam/AddExam.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

import moment from 'moment';

class ViewExam extends React.Component {
	constructor() {
		super()
		this.state = {
			addNewExam: false,
			viewExam: true,
			exams: null,
			exam: null,
			openModal: false,
			deleteid: null,
			message: null
		}
	}

	changeaddNewExam = (exm) => {
		this.setState({addNewExam: true,
			viewExam: false, exam: exm})
	}

	changeviewExam = () => {
		this.setState({addNewExam: false,
			viewExam: true, exam: null})
	}

	handleDelete = (id) => {
		this.setState((prevState) => ({
			openModal: !prevState.openModal,
			deleteid: id
		}))
	}

	handleDeleteConfirm = async() => {
		this.handleDelete()

		let url = `${process.env.REACT_APP_API_URL}/deleteexam?id=${this.state.deleteid}`

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
			this.loadExams()
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
					array.push([exm.examname, `${exm.exammanager.firstname} ${exm.exammanager.middlename} ${exm.exammanager.lastname}`,
					moment(exm.startdate).format("MMMM Do, YYYY"), moment(exm.enddate).format("MMMM Do, YYYY"), exm.class.class,
					<span role="img" aria-label="edit" onClick={() => {this.changeaddNewExam(exm)}}>&#9997;</span>,
					<span role="img" aria-label="delete" onClick={() => this.handleDelete(exm._id)}>&#10060;</span>])
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
			this.state.viewExam ? 
			<ViewExamContainer>
			<ToastContainer />
				{
					this.state.openModal ?
					DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
					: null
				}
				<UpperContainer>
				{
					this.props.admin ? 
					<Button type="button" name="Add New Exam" handleClick={this.changeaddNewExam}/>
					: null
				}
					<InputForm placeholder="Search" />
				</UpperContainer>
				{
					this.props.isLoading ? <Spinner /> :
					<BottomContainer>
						<ViewsTable admin={this.props.admin} Edit Delete
						th={['Exam Name', 'Exam Manager', 'Start From', 'End On', 'Class']}
						td={this.state.exams ? this.state.exams : [['Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null']]} />
					</BottomContainer>
				}
			</ViewExamContainer> 
			:
			this.state.addNewExam ? <AddExam exam={this.state.exam} changeviewExam={this.changeviewExam}/> : null
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


export default connect(mapStateToProps, mapDispatchToProps)(ViewExam);
