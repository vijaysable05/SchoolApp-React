import React from 'react';

import moment from 'moment';

import Modal from 'react-modal'; 

import {AddStudentContainer, ProfilePicContainer, FormContainer, 
	SelectDiv, TitleDiv, DivContainer, ModalHeading, ModalBody, EditSpan, ModalSpan,
	ModalSpan2, ButtonDiv, SelectDiv1, Div1, ButtonDiv1, ImageContainer} from './AddStudentStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';
import AddExcel from '../AddExcel/AddExcel.js';
import img from './icon.png';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import {removeStudentData} from '../../redux/student/StudentActions.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

Modal.setAppElement('#root')

class AddStudent extends React.Component {
constructor() {
	super()
	this.state = {
		next: false,
		excel: false,
		selectedClass: null,
		selectedDivision: null,
		stuData: {},
		docs: null,
		profilepic: null,
		message: null,
		counter: false,
		imgsrc: null,
		openModal: false
	}
}

componentWillUnmount() {
	if(this.props.studentData) {
		this.props.removeStudentData()
	}
}

loadClasses = () => {
	if(this.props.classes) {
		this.setState({selectedClass: this.props.classes[0].class, selectedDivision: this.props.classes[0].divisions[0].division})
	}
}

renderValues = async() => {
	if(this.props.studentData) {
		
		const studentData = this.props.studentData

		document.getElementById('class').value = studentData.class
		document.getElementById('division').value = studentData.division
		document.getElementById('firstname').value = studentData.firstname
		document.getElementById('middlename').value = studentData.middlename
		document.getElementById('lastname').value = studentData.lastname
		document.getElementById('fathername').value = studentData.fathername
		document.getElementById('mothername').value = studentData.mothername
		document.getElementById('gender').value = studentData.gender
		document.getElementById('dob').value = moment(studentData.dob).format('YYYY-MM-DD')
		document.getElementById('mobile').value = studentData.mobile
		document.getElementById('email').value = studentData.email
		document.getElementById('rollno').value = studentData.rollno
		document.getElementById('username').value = studentData.username
		document.getElementById('pincode').value = studentData.pincode
		document.getElementById('house').value = studentData.house
		document.getElementById('address').value = studentData.address
		document.getElementById('city').value = studentData.city
		document.getElementById('state').value = studentData.state

		document.getElementById('category').value = studentData.category
		document.getElementById('admissiondate').value = moment(studentData.admissiondate).format('YYYY-MM-DD')
		document.getElementById('bloodgroup').value = studentData.bloodgroup
		document.getElementById('religion').value = studentData.religion
		document.getElementById('nationality').value = studentData.nationality
		document.getElementById('previousEduClass').value = studentData.previousEduClass
		document.getElementById('previousEduSchool').value = studentData.previousEduSchool
		document.getElementById('previousEduYear').value = studentData.previousEduYear

		this.setState({counter: true, imgsrc: studentData.profilepic})
	}
}

componentDidUpdate(prevProps, prevState) {
	if(prevProps.classes !== this.props.classes) {
		this.loadClasses()
	}
	if(this.state.next === false) {
		if(this.props.isLoading) {
			return null
		}
		if(this.state.counter === false) {
			this.renderValues()
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

componentDidMount() {
	this.loadClasses()
}

handleChange = (e) => {
	
	this.setState({stuData: {...this.state.stuData, [e.target.id]: e.target.value}})
		
}

handleFiles = (e) => {
	this.setState({docs: e.target.files})
}

handleProfilepic = (e) => {
	this.setState({profilepic: e.target.files})
	let myImage = new Image('100%', '100%')
	myImage.src =  e.target.files[0]
	myImage.src = URL.createObjectURL(e.target.files[0])
	document.getElementById('label').appendChild(myImage)
}

handleSubmit = async() => {

	let url = null

	if(this.props.studentData) {
		url = `${process.env.REACT_APP_API_URL}/updatestudent`

		let formData = new FormData()

		formData.append('id', `${this.props.studentData._id}`)

		if(this.state.profilepic) {
			formData.append('profilepic', this.state.profilepic[0])
		}

		if(this.state.docs) {
			for (const property in this.state.docs) {
				if(property !== 'length' && property !== 'item') {
					formData.append('docs', this.state.docs[property])
				}
			}
		}

		if(this.state.stuData) {
			formData.append('data', JSON.stringify({...this.state.stuData}))
		}
		
		if(this.props.currentUser.hasOwnProperty('admin')) {
			this.props.LoadingStart()
			const response = await fetch(url, {
			method: 'PATCH',
			headers: { 
		        // "Content-Type": "multipart/form-data;boundary='boundary'",
		        'Authorization': 'Bearer ' + this.props.currentUser.token
		    },
		    body: formData
		})

		const data = await response.json()
		this.setState({message: data, stuData: {}, profilepic: null, docs: null})
		this.returnMessage()
		}
		this.props.LoadingEnd()

	} else {

		let studata = this.state.stuData

		if(!studata.firstname || !studata.lastname || !studata.middlename ||
		!studata.fathername || !studata.mothername || !studata.gender || !studata.dob || !studata.mobile ||
		!studata.email || !studata.rollno || !studata.username || !studata.password || !studata.pincode || !studata.house ||
		!studata.address || !studata.city || !studata.state || !studata.category || !studata.admissiondate || !studata.bloodgroup ||
		!studata.religion || !studata.nationality) {
			return this.handleEdit2()
		}

		url = `${process.env.REACT_APP_API_URL}/createstudent`
		let formData = new FormData()

		if(this.state.profilepic) {
			formData.append('profilepic', this.state.profilepic[0])
		}

		if(this.state.docs) {
			for (const property in this.state.docs) {
				if(property !== 'length' && property !== 'item') {
					formData.append('docs', this.state.docs[property])
				}
			}
		}

		formData.append('data', JSON.stringify({year: this.props.year, class: this.state.selectedClass, division: this.state.selectedDivision, ...this.state.stuData}))
		
		if(this.props.currentUser.hasOwnProperty('admin')) {
			this.props.LoadingStart()
			const response = await fetch(url, {
			method: 'POST',
			headers: { 
		        // "Content-Type": "multipart/form-data;boundary='boundary'",
		        'Authorization': 'Bearer ' + this.props.currentUser.token
		    },
		    body: formData
		})

		const data = await response.json()
		this.setState({message: data, stuData: {}, profilepic: null, docs: null})
		this.returnMessage()
		}
		this.props.LoadingEnd()
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

changeNext = () => {
	this.setState((prevState) => ({
	  next: !prevState.next
	}));
}

addExcel = () => {
	return (
		<AddExcel clickAddExcel={this.clickAddExcel} />
		)
}

clickAddExcel = () => {
	this.setState((prevState) => ({
	  excel: !prevState.excel
	}));
}

handleEdit2 = () => {
	this.setState((prevState) => ({
		openModal: !prevState.openModal
	}))
}

returnPage() {
	if(this.state.excel) {
		return this.addExcel()
	} else {
		return (
		<AddStudentContainer>
		<Modal isOpen={this.state.openModal}
			onRequestClose={this.handleEdit2}
			closeTimeoutMS={200}
			 style={{
			    overlay: {
			      position: 'fixed',
			      transition: '2000ms ease-in-out',
			      top: 0,
			      left: 0,
			      right: 0,
			      bottom: 0,
			      backgroundColor: 'rgba(255, 255, 255, 0.75)'
			    },
			    content: {
			      display: "flex",
				  flexDirection: "column",
			      height: "30%",
			      width: "35%",
			      position: 'absolute',
			      top: '10%',
			      left: '35%',
			      right: '35%',
			      bottom: '30%',
			      border: '1px solid red',
			      background: '#fff',
			      overflow: 'auto',
			      WebkitOverflowScrolling: 'touch',
			      borderRadius: '4px',
			      outline: 'none',
			      padding: '20px'
			    }
			  }}>
			<ModalHeading>
				<h2 style={{color:"red"}}> Validation Error </h2><EditSpan role="img" onClick={() => {this.handleEdit2()}}>&#215;</EditSpan>
			</ModalHeading>
			<ModalBody>
				<ModalSpan> <b>The below fields are required:</b></ModalSpan>
				<ModalSpan2 style={{color:"red"}}> Class, Division, First Name, Middle Name, Last Name, Father Name, Mother Name, Gender, Birth Date,
				Mobile, Email, Roll No, Username, Password, Pin Code, House No, Address, City, State, Category, Addmission date, 
				Blood Group, Religion, Nationality</ModalSpan2>
			</ModalBody>
			</Modal>
			<ProfilePicContainer>
				<ImageContainer>
					<label htmlFor="profilepic" id="label">{this.state.profilepic ? null : <img id="imgid" src={this.state.imgsrc ? this.state.imgsrc : img} alt="img"/>}</label>
					<input type="file" id="profilepic" name="profilepic" onChange={this.handleProfilepic}/>
				</ImageContainer>
			</ProfilePicContainer>
			<FormContainer>
					<div style={this.state.next ? {display: "none"}: null}>
					<Div1>
						<SelectDiv1>
							<label htmlFor="class">Class:</label>
								<select name="Class" id="class" onChange={this.selectClass}>
								{
									this.renderClasses()
								}
							</select>
							<label htmlFor="division">Section:</label>
								<select name="Division" id="division" onChange={this.selectDivision}>
								{
									this.renderDivisions()
								}
							</select>
						</SelectDiv1>
					<ButtonDiv1>
						<Button handleClick={this.clickAddExcel}name="Add Excel &#x271A;" type="button" />
					</ButtonDiv1>
					</Div1>
					<TitleDiv>
						<span> Personal Details </span>
					</TitleDiv>
					<DivContainer>
						<InputForm type='text' name='First Name' id='firstname' required={true} handleChange={this.handleChange}/>
						<InputForm type='text' name='Middle Name' id='middlename' handleChange={this.handleChange}/>
						<InputForm type='text' name='Last Name' id='lastname' handleChange={this.handleChange}/>
					</DivContainer>
					<DivContainer>
						<InputForm type='text' name='Father Name' id='fathername' handleChange={this.handleChange}/>
						<InputForm type='text' name='Mother Name' id='mothername' handleChange={this.handleChange}/>
						<SelectDiv>
						<label htmlFor="gender">Gender:</label>
							<select name="gender" id="gender" onChange={this.handleChange}>
							  <option value="selectgender">Select Gender</option>
							  <option value="male">Male</option>
							  <option value="female">Female</option>
							  <option value="other">Other</option>
							</select>
						</SelectDiv>
					</DivContainer>
					<DivContainer>
						<InputForm type='date' name='Birth Date' id='dob' handleChange={this.handleChange}/>
						<InputForm type='tel' name='Mobile no' id='mobile' pattern="[91]{2}-[0-9]{10}" handleChange={this.handleChange}/>
						<InputForm type='email' name='Email' id='email' handleChange={this.handleChange}/>
					</DivContainer>
					<DivContainer>
						<InputForm type='text' name='Roll no.' id='rollno' handleChange={this.handleChange}/>
						<InputForm type='text' name='Username' id='username' handleChange={this.handleChange}/>
						<InputForm type='password' name='Password' id='password' handleChange={this.handleChange}/>
					</DivContainer>
					<TitleDiv>
						<span> Address </span>
					</TitleDiv>
					<DivContainer>
						<InputForm type='text' name='Pin/Zip code' id='pincode' handleChange={this.handleChange}/>
						<InputForm type='text' name='House no/Apt name' id='house' handleChange={this.handleChange}/>
						<InputForm type='text' name='Address' id='address' handleChange={this.handleChange}/>
					</DivContainer>
					<DivContainer>
						<InputForm type='text' name='City' id='city' handleChange={this.handleChange}/>
						<InputForm type='text' name='State' id='state' handleChange={this.handleChange}/>
					</DivContainer>
					<ButtonDiv>
						<Button name="Next" type="button" handleClick={this.changeNext} />
					</ButtonDiv>
					</div>
					<div style={this.state.next ? null : {display: "none"}}>
					<TitleDiv>
						<span> Optional Details </span>
					</TitleDiv>
					<DivContainer>
						<SelectDiv>
						<label htmlFor="category">Category:</label>
							<select name="category" id="category" onChange={this.handleChange}>
							  <option value="category">Select Category</option>
							  <option value="Open">Open</option>
							  <option value="SC">SC</option>
							  <option value="ST">ST</option>
							  <option value="OBC">OBC</option>
							  <option value="VJ">VJ</option>
							  <option value="NT">NT</option>
							  <option value="ESBC">ESBC</option>
							  <option value="Non-Resident">Non-Resident</option>
							  <option value="Other">Other</option>
							</select>
						</SelectDiv>
						<InputForm type='date' name='Admission Date' id='admissiondate' handleChange={this.handleChange}/>
						<InputForm type='text' name='Blood Group' id='bloodgroup' handleChange={this.handleChange}/>
					</DivContainer>
					<DivContainer>
						<InputForm type='text' name='Religion' id='religion' handleChange={this.handleChange}/>
						<InputForm type='text' name='Nationality' id='nationality' handleChange={this.handleChange}/>
					</DivContainer>
					<TitleDiv>
						<span> Previous Education </span>
					</TitleDiv>
					<DivContainer>
						<InputForm type='text' name='Class' id='previousEduClass' handleChange={this.handleChange}/>
						<InputForm type='text' name='School' id='previousEduSchool' handleChange={this.handleChange}/>
						<InputForm type='text' name='From-To' id='previousEduYear' placeholder="2014-2016" handleChange={this.handleChange}/>
					</DivContainer>
					<TitleDiv>
						<span> Upload Documents </span>
					</TitleDiv>
					<DivContainer>
						<InputForm type='file' name='Documents' id='docs' multiple={true} handleChange={this.handleFiles}/>
					</DivContainer>
					<ButtonDiv>
						<Button name="Back" type="button" handleClick={this.changeNext} />
						<Button name="Confirm" type="button" handleClick={this.handleSubmit} />
					</ButtonDiv>
				</div>
			</FormContainer>
		</AddStudentContainer>
			)
	}
}

render() {
		return (
			<React.Fragment>
			<ToastContainer />
			{	
				this.props.isLoading ? <Spinner /> : 
				this.returnPage()
			}
			</React.Fragment>
		)
	}

}

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	year: state.user.year,
	isLoading: state.user.isLoading,
	studentData: state.student.studentData,
	classes: state.class.classes
})

const mapDispatchToProps = (dispatch) => ({
	LoadingStart: () => dispatch(LoadingStart()),
	LoadingEnd: () => dispatch(LoadingEnd()),
	removeStudentData: () => dispatch(removeStudentData())
})


export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);



// renderValues12 = () => {
// 	document.getElementById('class').value = window.localStorage.getItem('class')
// 	document.getElementById('division').value = window.localStorage.getItem('division')
// 	document.getElementById('firstname').value = window.localStorage.getItem('firstname')
// 	document.getElementById('middlename').value = window.localStorage.getItem('middlename')
// 	document.getElementById('lastname').value = window.localStorage.getItem('lastname')
// 	document.getElementById('fathername').value = window.localStorage.getItem('fathername')
// 	document.getElementById('mothername').value = window.localStorage.getItem('mothername')
// 	document.getElementById('gender').value = window.localStorage.getItem('gender')
// 	document.getElementById('dob').value = window.localStorage.getItem('dob')
// 	document.getElementById('mobile').value = window.localStorage.getItem('mobile')
// 	document.getElementById('email').value = window.localStorage.getItem('email')
// 	document.getElementById('rollno').value = window.localStorage.getItem('rollno')
// 	document.getElementById('username').value = window.localStorage.getItem('username')
// 	document.getElementById('pincode').value = window.localStorage.getItem('pincode')
// 	document.getElementById('house').value = window.localStorage.getItem('house')
// 	document.getElementById('address').value = window.localStorage.getItem('address')
// 	document.getElementById('city').value = window.localStorage.getItem('city')
// 	document.getElementById('state').value = window.localStorage.getItem('state')
// }

// renderValues2 = () => {
// 	if(this.props.studentData) {
// 		this.setState({counter2: true})

// 		const studentData = this.props.studentData.studentData

// 		document.getElementById('category').value = studentData.category
// 		document.getElementById('admissiondate').value = Date(studentData.admissiondate)
// 		document.getElementById('bloodgroup').value = studentData.bloodgroup
// 		document.getElementById('religion').value = studentData.religion
// 		document.getElementById('nationality').value = studentData.nationality
// 		document.getElementById('previousEduClass').value = studentData.previousEduClass
// 		document.getElementById('previousEduSchool').value = studentData.previousEduSchool
// 		document.getElementById('previousEduYear').value = studentData.previousEduYear

// 		window.localStorage.setItem('category', document.getElementById('category').value)
// 		window.localStorage.setItem('admissiondate', document.getElementById('admissiondate').value)
// 		window.localStorage.setItem('bloodgroup', document.getElementById('bloodgroup').value)
// 		window.localStorage.setItem('religion', document.getElementById('religion').value)
// 		window.localStorage.setItem('nationality', document.getElementById('nationality').value)
// 		window.localStorage.setItem('previousEduClass', document.getElementById('previousEduClass').value)
// 		window.localStorage.setItem('previousEduSchool', document.getElementById('previousEduSchool').value)
// 		window.localStorage.setItem('previousEduYear', document.getElementById('previousEduYear').value)

// 	}
// }

// renderValues22 = () => {
// 	document.getElementById('category').value = window.localStorage.getItem('category')
// 	document.getElementById('admissiondate').value = window.localStorage.getItem('admissiondate')
// 	document.getElementById('bloodgroup').value = window.localStorage.getItem('bloodgroup')
// 	document.getElementById('religion').value = window.localStorage.getItem('religion')
// 	document.getElementById('nationality').value = window.localStorage.getItem('nationality')
// 	document.getElementById('previousEduClass').value = window.localStorage.getItem('previousEduClass')
// 	document.getElementById('previousEduSchool').value = window.localStorage.getItem('previousEduSchool')
// 	document.getElementById('previousEduYear').value = window.localStorage.getItem('previousEduYear')
// }


// document.getElementById('class').value = window.localStorage.getItem('class')
// document.getElementById('division').value = window.localStorage.getItem('division')
// document.getElementById('firstname').value = window.localStorage.getItem('firstname')
// document.getElementById('middlename').value = window.localStorage.getItem('middlename')
// document.getElementById('lastname').value = window.localStorage.getItem('lastname')
// document.getElementById('fathername').value = window.localStorage.getItem('fathername')
// document.getElementById('mothername').value = window.localStorage.getItem('mothername')
// document.getElementById('gender').value = window.localStorage.getItem('gender')
// document.getElementById('dob').value = window.localStorage.getItem('dob')
// document.getElementById('mobile').value = window.localStorage.getItem('mobile')
// document.getElementById('email').value = window.localStorage.getItem('email')
// document.getElementById('rollno').value = window.localStorage.getItem('rollno')
// document.getElementById('username').value = window.localStorage.getItem('username')
// document.getElementById('pincode').value = window.localStorage.getItem('pincode')
// document.getElementById('house').value = window.localStorage.getItem('house')
// document.getElementById('address').value = window.localStorage.getItem('address')
// document.getElementById('city').value = window.localStorage.getItem('city')
// document.getElementById('state').value = window.localStorage.getItem('state')

// document.getElementById('category').value = window.localStorage.getItem('category')
// document.getElementById('admissiondate').value = window.localStorage.getItem('admissiondate')
// document.getElementById('bloodgroup').value = window.localStorage.getItem('bloodgroup')
// document.getElementById('religion').value = window.localStorage.getItem('religion')
// document.getElementById('nationality').value = window.localStorage.getItem('nationality')
// document.getElementById('previousEduClass').value = window.localStorage.getItem('previousEduClass')
// document.getElementById('previousEduSchool').value = window.localStorage.getItem('previousEduSchool')
// document.getElementById('previousEduYear').value = window.localStorage.getItem('previousEduYear')
