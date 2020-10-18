import React from 'react';

import {ViewStudentsContainer, FormContainer, SearchContainer, StyledLink, 
	ClassContainer, TableContainer, ButtonContainer} from './ViewStudentsStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import {setStudentData} from '../../redux/student/StudentActions.js';
import Spinner from '../spinner/Spinner.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

import ViewDocuments from '../ViewDocuments/ViewDocuments.js';

class ViewStudents extends React.Component {
constructor(props) {
	super(props)
	this.state = {
		selectedClass: null,
		selectedDivision: null,
		students: [],
		isFetching: false,
		isShown: false,
		openModal: false,
		deleteid: null,
		message: null,
		showDocs: false,
		showDocUser: null,
		showDocId: null
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

loadClasses = async() => {
	if(this.props.classes) {
		await this.setState({selectedClass: this.props.classes[0].class, selectedDivision: this.props.classes[0].divisions[0].division})
		// await this.loadStudents()
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
		this.setState({students: [], isShown: false})
		this.loadClasses()
	}
}

handleEdit = (stu) => {
	this.props.setStudentData(stu)
}

handleDelete = (id) => {
	this.setState((prevState) => ({
		openModal: !prevState.openModal,
		deleteid: id
	}))
}

handleDeleteConfirm = async() => {
	this.handleDelete()

	let url = `${process.env.REACT_APP_API_URL}/deletestudent?id=${this.state.deleteid}`

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
		this.loadStudents()
	}
}

handleShowDocs = (id, user) => {
	this.setState((prevState) => ({
		showDocs: !prevState.showDocs,
		showDocUser: user,
		showDocId: id
	}))
}

handleShowDocs2 = () => {
	this.setState((prevState) => ({
		showDocs: !prevState.showDocs
	}))
}

loadStudents = async() => {
	this.setState({isShown: false})

	let url = `${process.env.REACT_APP_API_URL}/getstudents/0/0/createdAt:asc?year=${this.props.year}&class=${this.state.selectedClass}&division=${this.state.selectedDivision}`
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
		
		if(data.length > 0) {

			data.forEach((stu) => {
				if(this.props.admin) {
					array.push([stu.rollno, `${stu.firstname} ${stu.middlename} ${stu.lastname}`, 
					stu.mobile, stu.email, stu.address, <span role="img" aria-label="docs" onClick={() => this.handleShowDocs(stu._id, 'student')}>&#128196;</span>,
					<StyledLink to='/admin/addstudent'><span role="img" aria-label="edit" onClick={() => {this.handleEdit(stu)}}>&#9997;</span></StyledLink>,
					<span role="img" aria-label="delete" onClick={() => this.handleDelete(stu._id)}>&#10060;</span>])
				} else {
					array.push([stu.rollno, `${stu.firstname} ${stu.middlename} ${stu.lastname}`, 
					stu.mobile, stu.email, stu.address])
				}
			})

			this.setState({students: array, isFetching: false, isShown: true})

		} else {
			this.setState({students: array, isFetching: false, isShown: false})
			return;
		}
	}
}

returnData = () => {
	if(this.state.isShown) {
		return (

			<TableContainer>
				<ViewsTable admin={this.props.admin} Edit={this.props.Edit} Delete={this.props.Delete}
				th={this.props.admin ? ['Roll No.', 'Name', 'Mobile No.', 'Email', 'Address', 'Docs'] : ['Roll No.', 'Name', 'Mobile No.', 'Email', 'Address']} 
				td={this.state.students.length !== 0 ? this.state.students : [['Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null']]}/>
			</TableContainer>

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

render(){
	return (
		this.state.showDocs ?
		<ViewDocuments user={this.state.showDocUser} userid={this.state.showDocId} handleShowDocs={this.handleShowDocs2}/>
		:
		<ViewStudentsContainer>
		<ToastContainer />
		{
			this.props.isLoading ? <Spinner /> :
			<React.Fragment>
			{
				this.state.openModal ?
				DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
				: null
			}
			<FormContainer>
				<ClassContainer>
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
						<ButtonContainer>
							<Button type='button' name='Search' handleClick={this.loadStudents} />
						</ButtonContainer>
				</ClassContainer>
				<SearchContainer>
					<InputForm type='text' name='Search' id='search'/>
					<ButtonContainer>
						<Button type='submit' name='Search'/>
					</ButtonContainer>
				</SearchContainer>
			</FormContainer>
			{
				this.state.isFetching ? <Spinner /> :
				this.returnData()
			}
			</React.Fragment>
		}
		</ViewStudentsContainer>
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
	setStudentData: (studentData) => dispatch(setStudentData(studentData))
})


export default connect(mapStateToProps, mapDispatchToProps)(ViewStudents);