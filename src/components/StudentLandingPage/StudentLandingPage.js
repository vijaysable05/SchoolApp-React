import React from 'react';

import {StudentLandingPageContainer, ProfilePicContainer, FormContainer, DivContainer2,
	SelectDiv, TitleDiv, DivContainer, ButtonDiv, SelectDiv1, Div1, ImageContainer} from './StudentLandingPageStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import img from './icon.png';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

class StudentLandingPage extends React.Component {
constructor() {
	super()
	this.state = {
		next: false,
		selectedClass: null,
		selectedDivision: null
	}
}

loadClasses = () => {
	if(this.props.classes) {
		this.setState({selectedClass: this.props.classes[0].class, selectedDivision: this.props.classes[0].divisions[0].division})
	}
}

componentDidUpdate(prevProps, prevState) {
	if(prevProps.classes !== this.props.classes) {
		this.loadClasses()
	}	
}

componentDidMount() {
	this.loadClasses()
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

changeNext = () => {
	this.setState((prevState) => ({
	  next: !prevState.next
	}));
}

returnPage() {
		return (
		<StudentLandingPageContainer>
			<ProfilePicContainer>
				<ImageContainer>
					<label htmlFor="profilepic" id="label"><img id="imgid" src={this.props.currentUser.student.profilepic ? this.props.currentUser.student.profilepic : img} alt="img"/></label>
					<input type="file" id="profilepic" name="profilepic" disabled/>
				</ImageContainer>
			</ProfilePicContainer>
			<FormContainer>
					<div style={this.state.next ? {display: "none"}: null}>
					<Div1>
						<SelectDiv1>
							<label htmlFor="class">Class:</label>
								<select name="Class" id="class" value={this.props.currentUser.student.class} disabled>
								{
									this.renderClasses()
								}
							</select>
							<label htmlFor="division">Division:</label>
								<select name="Division" id="division" value={this.props.currentUser.student.division} disabled>
								{
									this.renderDivisions()
								}
							</select>
						</SelectDiv1>
					</Div1>
					<TitleDiv>
						<span> Personal Details </span>
					</TitleDiv>
					<DivContainer>
						<InputForm type='text' name='First Name' id='firstname' required={true} disabled={true} value={this.props.currentUser.student.firstname}/>
						<InputForm type='text' name='Middle Name' id='middlename' value={this.props.currentUser.student.middlename} disabled={true}/>
						<InputForm type='text' name='Last Name' id='lastname' value={this.props.currentUser.student.lastname} disabled={true}/>
					</DivContainer>
					<DivContainer>
						<InputForm type='text' name='Father Name' id='fathername' value={this.props.currentUser.student.fathername} disabled={true}/>
						<InputForm type='text' name='Mother Name' id='mothername' value={this.props.currentUser.student.mothername} disabled={true}/>
						<SelectDiv>
						<label htmlFor="gender">Gender:</label>
							<select name="gender" id="gender" value={this.props.currentUser.student.gender} disabled>
							  <option value="selectgender">Select Gender</option>
							  <option value="male">Male</option>
							  <option value="female">Female</option>
							  <option value="other">Other</option>
							</select>
						</SelectDiv>
					</DivContainer>
					<DivContainer>
						<InputForm type='date' name='Birth Date' id='dob' disabled={true} value={this.props.currentUser.student.dob}/>
						<InputForm type='tel' name='Mobile no' id='mobile' pattern="[91]{2}-[0-9]{10}" value={this.props.currentUser.student.mobile} disabled={true}/>
						<InputForm type='email' name='Email' id='email' value={this.props.currentUser.student.email} disabled={true}/>
					</DivContainer>
					<DivContainer>
						<InputForm type='text' name='Roll no.' id='rollno' disabled={true} value={this.props.currentUser.student.rollno}/>
						<InputForm type='text' name='Username' id='username' disabled={true} value={this.props.currentUser.student.username}/>
					</DivContainer>
					<TitleDiv>
						<span> Address </span>
					</TitleDiv>
					<DivContainer>
						<InputForm type='text' name='Pin/Zip code' id='pincode' disabled={true} value={this.props.currentUser.student.pincode}/>
						<InputForm type='text' name='House no/Apt name' id='house' disabled={true} value={this.props.currentUser.student.house}/>
						<InputForm type='text' name='Address' id='address' disabled={true} value={this.props.currentUser.student.address}/>
					</DivContainer>
					<DivContainer>
						<InputForm type='text' name='City' id='city' disabled={true} value={this.props.currentUser.student.city}/>
						<InputForm type='text' name='State' id='state' disabled={true} value={this.props.currentUser.student.state}/>
					</DivContainer>
					<ButtonDiv>
						<Button name="Next" type="button" handleClick={this.changeNext} />
					</ButtonDiv>
					</div>
					<div style={this.state.next ? null : {display: "none"}}>
					<TitleDiv>
						<span> Optional Details </span>
					</TitleDiv>
					<DivContainer2>
						<SelectDiv>
						<label htmlFor="category">Category:</label>
							<select name="category" id="category" disabled value={this.props.currentUser.student.category}>
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
						<InputForm type='date' name='Admission Date' id='admissiondate' disabled={true} value={this.props.currentUser.student.admissiondate}/>
						<InputForm type='text' name='Blood Group' id='bloodgroup' disabled={true} value={this.props.currentUser.student.bloodgroup}/>
					</DivContainer2>
					<DivContainer>
						<InputForm type='text' name='Religion' id='religion' disabled={true} value={this.props.currentUser.student.religion}/>
						<InputForm type='text' name='Nationality' id='nationality' disabled={true} value={this.props.currentUser.student.nationality}/>
					</DivContainer>
					<TitleDiv>
						<span> Previous Education </span>
					</TitleDiv>
					<DivContainer>
						<InputForm type='text' name='Class' id='previousEduClass' disabled={true} value={this.props.currentUser.student.previousEduClass ? this.props.currentUser.student.previousEduClass : null}/>
						<InputForm type='text' name='School' id='previousEduSchool' disabled={true} value={this.props.currentUser.student.previousEduSchool ? this.props.currentUser.student.previousEduSchool : null}/>
						<InputForm type='text' name='From-To' id='previousEduYear' placeholder="2014-2016" disabled={true} value={this.props.currentUser.student.previousEduYear ? this.props.currentUser.student.previousEduYear : null}/>
					</DivContainer>
					<ButtonDiv>
						<Button name="Back" type="button" handleClick={this.changeNext} />
					</ButtonDiv>
				</div>
			</FormContainer>
		</StudentLandingPageContainer>
			)
	}

render() {
		return (
			<React.Fragment>
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
	classes: state.class.classes
})

const mapDispatchToProps = (dispatch) => ({
	LoadingStart: () => dispatch(LoadingStart()),
	LoadingEnd: () => dispatch(LoadingEnd())
})


export default connect(mapStateToProps, mapDispatchToProps)(StudentLandingPage);