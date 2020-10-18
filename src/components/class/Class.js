import React from 'react';

import {ClassContainer, SearchFormContainer, InfoDisplayContainer, 
	SelectDiv, ClassSearchContainer, StyledLink,
	SearchContainer, StudentTableContainer, TeacherTableContainer, ClassTeacherContainer} from './ClassStyles.js';
import { withRouter } from "react-router";

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import {SetClass} from '../../redux/class/ClassActions.js';
import {setStudentData} from '../../redux/student/StudentActions.js';
import Spinner from '../spinner/Spinner.js';

class Class extends React.Component {
constructor() {
	super()
	this.state = {
		teachersData: [],
		studentData: [],
		classTeacherData: [],
		selectedClass: null,
		selectedDivision: null,
		classData: null,
		isFetching: false,
		isShown: false
	}
}

// static getDerivedStateFromProps(props, state) {
// 	if(props.classes) {
// 		return {selectedClass: props.classes[0].class, selectedDivision: props.classes[0].divisions[0].division}
// 	} else {
// 		return {selectedClass: null, selectedDivision: null}
// 	}
// }

renderClasses = () => {
	let data = []
	if(this.props.classes) {
		this.props.classes.forEach((cls) => {
			data.push(<option key={cls.class} value={cls.class}>{cls.class}</option>)
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
	// let class1 = e.target.value
	// let class2 = this.props.classes.find((cls) => {
	// 	return cls.class === class1
	// })
	// if(class2.divisions.length > 0) {
	// 	this.setState({selectedDivision: class2.divisions[0].division})
	// 	document.getElementById("division").value = class2.divisions[0].division
	// } else {
	// 	this.setState({selectedDivision: null})
	// }
}

selectDivision = (e) => {
	this.setState({selectedDivision: e.target.value})
}

handleEdit = async(user, id) => {
	if(user === 'staff') {

		this.props.SetClass({division: this.state.classData, class: this.state.selectedClass})

	} else if(user === 'student') {

		this.props.setStudentData(id)

	}
	
}

getSelectedClass = async() => {
	this.setState({isShown: false})

	let url = `${process.env.REACT_APP_API_URL}/getdivision?class=${this.state.selectedClass}&division=${this.state.selectedDivision}&year=${this.props.year}`

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

		if(!data.error) {

			let array = []
			if(data.subjects.length !== 0) {
				await data.subjects.forEach((sub) => {
					array.push([`${sub.subjectteacher.firstname} ${sub.subjectteacher.middlename} ${sub.subjectteacher.lastname}`, sub.subject, sub.subjectteacher.mobile, <StyledLink to='/admin/assignteacher'><span role="img" aria-label="edit" onClick={() => {this.handleEdit('staff', sub.subjectteacher._id)}}>&#9997;</span></StyledLink>, <span role="img" aria-label="delete">&#10060;</span> ])
				})
			}

			let array2 = []
			if(data.students.length !== 0) {
				await data.students.forEach((stu) => {
					array2.push([stu.rollno,`${stu.firstname} ${stu.middlename} ${stu.lastname}`, stu.mobile, stu.address, <StyledLink to='/admin/addstudent'><span role="img" aria-label="edit" onClick={() => {this.handleEdit('student', stu)}}>&#9997;</span></StyledLink>])
				})
			}

			let array3 = []
			if(data.classteacher) {
				await array3.push([`${data.classteacher.firstname} ${data.classteacher.middlename} ${data.classteacher.lastname}`, data.classteacher.mobile])
			}

			this.setState({classData: data, teachersData: array, studentData: array2, classTeacherData: array3, isFetching: false, isShown: true})

		} else {
			this.setState({classData: [], teachersData: [], studentData: [], classTeacherData: [], isFetching: false, isShown: false})
			return;
		}
	}
}

loadClasses = () => {
	if(this.props.classes) {
		this.setState({selectedClass: this.props.classes[0].class, selectedDivision: this.props.classes[0].divisions[0].division})
		// await this.getSelectedClass()
	}
}

componentDidMount() {
	this.loadClasses()
}

componentDidUpdate(prevProps, prevState) {
	if(prevProps.year !== this.props.year) {
		this.setState({classData: [], teachersData: [], studentData: [], classTeacherData: [], isShown: false})
		this.loadClasses()
	}
	if(prevProps.classes !== this.props.classes) {
		this.loadClasses()
	}
}

returnData = () => {
	if(this.state.isShown) {
		return (

			<React.Fragment>
			<ClassTeacherContainer>
				<ViewsTable admin={this.props.currentUser.admin} Delete={this.props.Delete}
				th={['Class-Teacher Name', 'Mobile No.']} 
				td={this.state.classTeacherData.length !== 0 ? this.state.classTeacherData : [['Null', 'Null', 'Null']] }/>
			</ClassTeacherContainer>
			<TeacherTableContainer>
				<ViewsTable admin={this.props.currentUser.admin} Edit={this.props.Edit}
				th={['Teacher Name', 'Subject', 'Mobile No.']} 
				td={this.state.teachersData.length !== 0 ? this.state.teachersData : [['Null', 'Null', 'Null', 'Null']]}/>
			</TeacherTableContainer>
			<StudentTableContainer>
				<ViewsTable admin={this.props.currentUser.admin} Edit={this.props.Edit}
				th={['Roll No.', 'Student Name', 'Mobile No.', 'Address']} 
				td={this.state.studentData.length !== 0 ? this.state.studentData : [['Null', 'Null', 'Null', 'Null', 'Null']]}/>
			</StudentTableContainer>
			</React.Fragment>

		)
	}
}

render(){
	return (
	this.props.isLoading ? <Spinner /> : 
	<ClassContainer>
		<SearchFormContainer>
			<ClassSearchContainer>
				<SelectDiv>
					<label htmlFor="class">Class:</label>
						<select name="class" id="class" onChange={this.selectClass}>
						  {
						  	this.renderClasses()
						  }
						</select>
					</SelectDiv>
				<SelectDiv>
					<label htmlFor="division">Division:</label>
						<select name="division" id="division" onChange={this.selectDivision}>
						  {
						  	this.renderDivisions()
						  }
						</select>
					</SelectDiv>
					<Button type='button' name='Search' handleClick={this.getSelectedClass}/>
			</ClassSearchContainer>
			<SearchContainer>
				<InputForm type='text' name='Search' id='search'/>
				<Button type='submit' name='Search'/>
			</SearchContainer>
		</SearchFormContainer>
		<InfoDisplayContainer>
		{
			this.state.isFetching ? <Spinner /> :
			this.returnData()
		}
		</InfoDisplayContainer>
	</ClassContainer>

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
	SetClass: (classData) => dispatch(SetClass({classData})),
	setStudentData: (studentData) => dispatch(setStudentData(studentData))
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Class));



// window.localStorage.setItem('class', data.class)
// window.localStorage.setItem('division', data.division)
// window.localStorage.setItem('firstname', data.firstname)
// window.localStorage.setItem('middlename', data.middlename)
// window.localStorage.setItem('lastname', data.lastname)
// window.localStorage.setItem('fathername', data.fathername)
// window.localStorage.setItem('mothername', data.mothername)
// window.localStorage.setItem('gender', data.gender)
// window.localStorage.setItem('dob', data.dob)
// window.localStorage.setItem('mobile', data.mobile)
// window.localStorage.setItem('email', data.email)
// window.localStorage.setItem('rollno', data.rollno)
// window.localStorage.setItem('username', data.username)
// window.localStorage.setItem('pincode', data.pincode)
// window.localStorage.setItem('house', data.house)
// window.localStorage.setItem('address', data.address)
// window.localStorage.setItem('city', data.city)
// window.localStorage.setItem('state', data.state)

// window.localStorage.setItem('category', data.category)
// window.localStorage.setItem('admissiondate', data.admissiondate)
// window.localStorage.setItem('bloodgroup', data.bloodgroup)
// window.localStorage.setItem('religion', data.religion)
// window.localStorage.setItem('nationality', data.nationality)
// window.localStorage.setItem('previousEduClass', data.previousEduClass)
// window.localStorage.setItem('previousEduSchool', data.previousEduSchool)
// window.localStorage.setItem('previousEduYear', data.previousEduYear)