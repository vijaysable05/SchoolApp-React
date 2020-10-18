import React from 'react';

import moment from 'moment';

import {AddStaffContainer, ProfilePicContainer, FormContainer,
	SelectDiv, TitleDiv, DivContainer, ButtonDiv, ImageContainer} from './AddStaffStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import img from './icon.png';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import {removeStaffData} from '../../redux/staff/StaffActions.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class AddStaff extends React.Component {
constructor() {
	super()
	this.state = {
		next: false,
		selectedClass: null,
		selectedDivision: null,
		stafffData: {},
		docs: null,
		profilepic: null,
		message: null,
		counter: false,
		imgsrc: null,
		subjects: null
	}
}

componentWillUnmount() {
	if(this.props.staffData) {
		this.props.removeStaffData()
	}
}

renderValues = async() => {
	if(this.props.staffData) {
		
		const staffData = this.props.staffData

		document.getElementById('firstname').value = staffData.firstname
		document.getElementById('middlename').value = staffData.middlename
		document.getElementById('lastname').value = staffData.lastname
		document.getElementById('gender').value = staffData.gender
		document.getElementById('dob').value = moment(staffData.dob).format('YYYY-MM-DD')
		document.getElementById('mobile').value = staffData.mobile
		document.getElementById('email').value = staffData.email
		document.getElementById('Id').value = staffData.Id
		document.getElementById('designation').value = staffData.designation
		document.getElementById('subjects').value = staffData.subjects
		document.getElementById('username').value = staffData.username
		document.getElementById('pincode').value = staffData.pincode
		document.getElementById('house').value = staffData.house
		document.getElementById('address').value = staffData.address
		document.getElementById('city').value = staffData.city
		document.getElementById('state').value = staffData.state

		document.getElementById('ifsc').value = staffData.ifsc
		document.getElementById('accountno').value = staffData.accountno
		document.getElementById('bankname').value = staffData.bankname
		document.getElementById('branchname').value = staffData.branchname
		document.getElementById('panno').value = staffData.panno
		document.getElementById('degree').value = staffData.degree
		document.getElementById('certificates').value = staffData.certificates

		this.setState({counter: true, imgsrc: staffData.profilepic})
	}
}

componentDidMount() {
	if(this.props.staffData) {
		this.renderValues()
	}
}

handleChange = (e) => {
	this.setState({stafffData: {...this.state.stafffData, [e.target.id]: e.target.value}})	
}

changeNext = () => {
	this.setState((prevState) => ({
	  next: !prevState.next
	}))
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

	if(this.props.staffData) {
		url = `${process.env.REACT_APP_API_URL}/updatestaff/${this.props.staffData._id}`

		let formData = new FormData()

		if(this.state.profilepic) {
			formData.append('profilepic', this.state.profilepic[0])
		}

		if(this.state.docs) {
			formData.append('docs', this.state.docs[0])
		}

		if(this.state.stafffData) {
			if(this.state.subjects) {
				formData.append('data', JSON.stringify({...this.state.stafffData, subjects: this.state.subjects}))
			} else {
				formData.append('data', JSON.stringify({...this.state.stafffData}))
			}
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
		this.setState({message: data, stafffData: {}, profilepic: null, docs: null})
		this.returnMessage()
		}
		this.props.LoadingEnd()

	} else {

		url = `${process.env.REACT_APP_API_URL}/createstaff`
		let formData = new FormData()
		formData.append('profilepic', this.state.profilepic[0])
		formData.append('docs', this.state.docs[0])
		formData.append('data', JSON.stringify({year: this.props.year, ...this.state.stafffData, subjects: this.state.subjects}))
		
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
		this.setState({message: data, stafffData: {}, profilepic: null, docs: null})
		this.returnMessage()
		}
		this.props.LoadingEnd()
	
	}
}

handleSubjects = (e) => {
	let array = []
	if(e.target.value.includes(',')) {
		let values = e.target.value.split(',')
		values.forEach((value) => {
			array.push(value)
		})
		this.setState({subjects: array})
	} else {
		array.push(e.target.value)
		this.setState({subjects: array})
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
		<AddStaffContainer>
		<ToastContainer />
			<ProfilePicContainer>
				<ImageContainer>
					<label htmlFor="profilepic" id="label">{this.state.profilepic ? null : <img id="imgid" src={this.state.imgsrc ? this.state.imgsrc : img} alt="img"/>}</label>
					<input type="file" id="profilepic" name="profilepic" onChange={this.handleProfilepic}/>
				</ImageContainer>
			</ProfilePicContainer>
			<FormContainer>
				<div style={this.state.next ? {display: "none"}: null}>
				<TitleDiv>
					<span> Personal Details </span>
				</TitleDiv>
				<DivContainer>
					<InputForm type='text' name='First Name' id='firstname' handleChange={this.handleChange}/>
					<InputForm type='text' name='Middle Name' id='middlename' handleChange={this.handleChange}/>
					<InputForm type='text' name='Last Name' id='lastname' handleChange={this.handleChange}/>
				</DivContainer>
				<DivContainer>
					<SelectDiv>
					<label htmlFor="gender">Gender:</label>
						<select name="gender" id="gender" onChange={this.handleChange}>
						  <option value="selectgender">Select Gender</option>
						  <option value="male">Male</option>
						  <option value="female">Female</option>
						  <option value="other">Other</option>
						</select>
					</SelectDiv>
					<InputForm type='date' name='Birth Date' id='dob' handleChange={this.handleChange}/>
					<InputForm type='tel' name='Mobile no' id='mobile' pattern="[91]{2}-[0-9]{10}" handleChange={this.handleChange}/>
				</DivContainer>
				<DivContainer>
					<InputForm type='email' name='Email' id='email' handleChange={this.handleChange}/>
					<InputForm type='text' name='Id' id='Id' handleChange={this.handleChange}/>
					<InputForm type='text' name='Designation' id='designation' handleChange={this.handleChange}/>
				</DivContainer>
				<DivContainer>
					<InputForm type='text' name='Subjects' id='subjects' placeholder="Ex. maths,history" handleChange={this.handleSubjects}/>
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
					<span> Bank Details </span>
				</TitleDiv>
				<DivContainer>
					<InputForm type='text' name='IFSC' id='ifsc' handleChange={this.handleChange}/>
					<InputForm type='text' name='Account No' id='accountno' handleChange={this.handleChange}/>
					<InputForm type='text' name='Bank Name' id='bankname' handleChange={this.handleChange}/>
				</DivContainer>
				<DivContainer>
					<InputForm type='text' name='Branch Name' id='branchname' handleChange={this.handleChange}/>
					<InputForm type='text' name='Pan Number' id='panno' handleChange={this.handleChange}/>
				</DivContainer>
				<TitleDiv>
					<span> Qualifications </span>
				</TitleDiv>
				<DivContainer>
					<InputForm type='text' name='Degree' id='degree' handleChange={this.handleChange}/>
					<InputForm type='text' name='Certificates' id='certificates' handleChange={this.handleChange}/>
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
		</AddStaffContainer>


		)
}

}

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	year: state.user.year,
	isLoading: state.user.isLoading,
	staffData: state.staff.staffData
})

const mapDispatchToProps = (dispatch) => ({
	LoadingStart: () => dispatch(LoadingStart()),
	LoadingEnd: () => dispatch(LoadingEnd()),
	removeStaffData: () => dispatch(removeStaffData())
})


export default connect(mapStateToProps, mapDispatchToProps)(AddStaff);

// componentDidUpdate(prevProps, prevState) {
// 	// if(this.state.next === false) {
// 	// 	if(this.props.isLoading) {
// 	// 		return null
// 	// 	}
// 		if(this.state.counter === false) {
// 			console.log('a')
// 			this.renderValues()
// 		}	
// 	// }
// }