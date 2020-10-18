import React from 'react';

import {TeacherLandingPageContainer, ProfilePicContainer, FormContainer,
	SelectDiv, TitleDiv, DivContainer, ButtonDiv, ImageContainer} from './TeacherLandingPageStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import img from './icon.png';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

class TeacherLandingPage extends React.Component {
constructor() {
	super()
	this.state = {
		next: false
	}
}

changeNext = () => {
	this.setState((prevState) => ({
	  next: !prevState.next
	}))
}


render() {
	return (
		this.props.isLoading ? <Spinner /> : 
		<TeacherLandingPageContainer>
			<ProfilePicContainer>
				<ImageContainer>
					<label htmlFor="profilepic" id="label"><img id="imgid" src={this.props.currentUser.staff.profilepic ? this.props.currentUser.staff.profilepic : img} alt="img"/></label>
					<input type="file" id="profilepic" name="profilepic" />
				</ImageContainer>
			</ProfilePicContainer>
			<FormContainer>
				<div style={this.state.next ? {display: "none"}: null}>
				<TitleDiv>
					<span> Personal Details </span>
				</TitleDiv>
				<DivContainer>
					<InputForm type='text' name='First Name' id='firstname' value={this.props.currentUser.staff.firstname} disabled={true}/>
					<InputForm type='text' name='Middle Name' id='middlename' value={this.props.currentUser.staff.middlename} disabled={true}/>
					<InputForm type='text' name='Last Name' id='lastname' value={this.props.currentUser.staff.lastname} disabled={true}/>
				</DivContainer>
				<DivContainer>
					<SelectDiv>
					<label htmlFor="gender">Gender:</label>
						<select name="gender" id="gender" value={this.props.currentUser.staff.gender} disabled>
						  <option value="selectgender">Select Gender</option>
						  <option value="male">Male</option>
						  <option value="female">Female</option>
						  <option value="other">Other</option>
						</select>
					</SelectDiv>
					<InputForm type='date' name='Birth Date' id='dob' value={this.props.currentUser.staff.dob} disabled={true}/>
					<InputForm type='tel' name='Mobile no' id='mobile' pattern="[91]{2}-[0-9]{10}" value={this.props.currentUser.staff.mobile} disabled={true}/>
				</DivContainer>
				<DivContainer>
					<InputForm type='email' name='Email' id='email' value={this.props.currentUser.staff.email} disabled={true}/>
					<InputForm type='text' name='Id' id='Id' value={this.props.currentUser.staff.Id} disabled={true}/>
					<InputForm type='text' name='Designation' id='designation' value={this.props.currentUser.staff.designation} disabled={true}/>
				</DivContainer>
				<DivContainer>
					<InputForm type='text' name='Subjects' id='subjects' placeholder="Ex. maths,history" value={this.props.currentUser.staff.subjects.toString()} disabled={true}/>
					<InputForm type='text' name='Username' id='username' value={this.props.currentUser.staff.username} disabled={true}/>
				</DivContainer>
				<TitleDiv>
					<span> Address </span>
				</TitleDiv>
				<DivContainer>
					<InputForm type='text' name='Pin/Zip code' id='pincode' value={this.props.currentUser.staff.pincode} disabled={true}/>
					<InputForm type='text' name='House no/Apt name' id='house' value={this.props.currentUser.staff.house} disabled={true}/>
					<InputForm type='text' name='Address' id='address' value={this.props.currentUser.staff.address} disabled={true}/>
				</DivContainer>
				<DivContainer>
					<InputForm type='text' name='City' id='city' value={this.props.currentUser.staff.city} disabled={true}/>
					<InputForm type='text' name='State' id='state' value={this.props.currentUser.staff.state} disabled={true}/>
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
					<InputForm type='text' name='IFSC' id='ifsc' value={this.props.currentUser.staff.ifsc} disabled={true}/>
					<InputForm type='text' name='Account No' id='accountno' value={this.props.currentUser.staff.accountno} disabled={true}/>
					<InputForm type='text' name='Bank Name' id='bankname' value={this.props.currentUser.staff.bankname} disabled={true}/>
				</DivContainer>
				<DivContainer>
					<InputForm type='text' name='Branch Name' id='branchname' value={this.props.currentUser.staff.branchname} disabled={true}/>
					<InputForm type='text' name='Pan Number' id='panno' value={this.props.currentUser.staff.panno} disabled={true}/>
				</DivContainer>
				<TitleDiv>
					<span> Qualifications </span>
				</TitleDiv>
				<DivContainer>
					<InputForm type='text' name='Degree' id='degree' value={this.props.currentUser.staff.degree} disabled={true}/>
					<InputForm type='text' name='Certificates' id='certificates' value={this.props.currentUser.staff.certificates} disabled={true}/>
				</DivContainer>
				<ButtonDiv>
				<Button name="Back" type="button" handleClick={this.changeNext} />
				</ButtonDiv>
			</div>
			</FormContainer>
		</TeacherLandingPageContainer>


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


export default connect(mapStateToProps, mapDispatchToProps)(TeacherLandingPage);