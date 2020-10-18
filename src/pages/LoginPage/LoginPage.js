import React from 'react';

import {LoginPageContainer, LoginContentContainer, LoginPage2Container, LoginImagesContainer,
	Title, ImageContainer, FormContainer, LoginBoxContainer, ContentContainer, ErrorContainer} from './LoginPageStyles.js';
import Button from '../../components/Button/Button.js';
import InputForm from '../../components/InputForm/InputForm.js';

import {connect} from 'react-redux';
import {LoginStart} from '../../redux/user/UserActions.js';

import Header from '../../components/Header/Header.js';

import student from './student.png';
import teacher from './teacher.png';
import admin from './admin.png';

class LoginPage extends React.Component {
	constructor() {
		super()
		this.state = {
			login: 'student',
			username: '',
			password: ''
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const {LoginStart} = this.props

		const {username, password, login} = this.state

		LoginStart(username, password, login)
	}

	handleChange = (e) => {

		this.setState({[e.target.id]: e.target.value})
	}

	returnButton = () => {
		if(this.state.login === 'student') {
			return <Button name='Login' handleClick={this.handleSubmit} type="submit" value="Submit" height="20%" width="50%"/>
		} else if(this.state.login === 'teacher') {
			return <Button name='Login' handleClick={this.handleSubmit} type="submit" value="Submit" height="20%" width="50%"/>
		} else if(this.state.login === 'admin') {
			return <Button name='Login' handleClick={this.handleSubmit} type="submit" value="Submit" height="20%" width="50%"/>
		}
	}

	handleClick = (e) => {
		const {value} = e.target
		this.setState({login: value})
		this.returnButton()
	}

	returnError = () => {
		if(this.props.error) {
			return <ErrorContainer> {this.props.error} </ErrorContainer>
		}
	}


	render() {
		return (

			<LoginPageContainer>
			<Header />
				<LoginPage2Container>
					<LoginBoxContainer>
						<LoginImagesContainer>
							<ImageContainer>
								<input type="radio" name="login" id="myCheckbox1" value="student" defaultChecked onClick={this.handleClick} />
								<label htmlFor="myCheckbox1">
									<img src={student} alt="img"/>
								</label>
								<span> Student </span>
							</ImageContainer>
							<ImageContainer>
								<input type="radio" name="login" id="myCheckbox2" value="teacher" onClick={this.handleClick}/>
								<label htmlFor="myCheckbox2">
									<img src={teacher} alt="img"/>
								</label>
								<span> Teacher </span>
							</ImageContainer>
							<ImageContainer>
								<input type="radio" name="login" id="myCheckbox3" value="admin" onClick={this.handleClick}/>
								<label htmlFor="myCheckbox3">
									<img src={admin} alt="img"/>
								</label>
								<span> Admin </span>
							</ImageContainer>
						</LoginImagesContainer>
						<LoginContentContainer>
							<ContentContainer>
								<Title> Login </Title>
								<FormContainer>
									<InputForm handleChange={this.handleChange} type='text' id='username' placeholder='Username' />
									<InputForm handleChange={this.handleChange} type='password' id='password' placeholder='Password' />
									{
										this.returnButton()
									}
								</FormContainer>
								
							</ContentContainer>
						</LoginContentContainer>
					</LoginBoxContainer>
				</LoginPage2Container>
			</LoginPageContainer>


			)

	}

}

const mapStateToProps = (state) => ({
	error: state.user.error
})

const mapDispatchToProps = (dispatch) => ({
	LoginStart: (username, password, login) => dispatch(LoginStart({username, password, login}))
})



export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);



// <LoginBoxContainer>
// 				<LoginContentContainer>
// 					<Title> Admin Login </Title>
// 					<FormContainer>
// 						<form onSubmit={this.handleSubmit}>
// 							<InputForm handleChange={this.handleChange} type='email' id='Email' name='Email' /><br />
// 							<InputForm handleChange={this.handleChange} type='password' id='Password' name='Password' /><br /><br />
// 							<Link to='/admin'><Button name='Submit' type="submit" value="Submit" height="20%" width="50%"/></Link>
// 						</form>
// 					</FormContainer>
// 				</LoginContentContainer>
// 				<LoginContentContainer>
// 					<Title> Teacher Login </Title>
// 					<FormContainer>
// 						<form onSubmit={this.handleSubmit}>
// 							<InputForm handleChange={this.handleChange} type='email' id='Email' name='Email' /><br />
// 							<InputForm handleChange={this.handleChange} type='password' id='Password' name='Password' /><br /><br />
// 							<Link to='/teacher'><Button name='Submit' type="submit" value="Submit" height="20%" width="50%"/></Link>
// 						</form>
// 					</FormContainer>
// 				</LoginContentContainer>
// 				<LoginContentContainer>
// 					<Title> Student Login </Title>
// 					<FormContainer>
// 						<form onSubmit={this.handleSubmit}>
// 							<InputForm handleChange={this.handleChange} type='email' id='Email' name='Email' /><br />
// 							<InputForm handleChange={this.handleChange} type='password' id='Password' name='Password' /><br /><br />
// 							<Link to='/student'><Button name='Submit' type="submit" value="Submit" height="20%" width="50%"/></Link>
// 						</form>
// 					</FormContainer>
// 				</LoginContentContainer>
// 			</LoginBoxContainer>