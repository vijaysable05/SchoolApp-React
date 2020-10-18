import React from 'react';

import {ContactPageContainer, ContactFormContainer, ContactPageContainer2, 
		ImageContainer, ContentContainer, TitleContainer, FormContainer, FieldContainer, FieldContainer2, ButtonContainer} from './ContactPageStyles.js';
import Button from '../../components/Button/Button.js';
import InputForm from '../../components/InputForm/InputForm.js';

import {connect} from 'react-redux';

import contact from './contact.jpg';

import Header from '../../components/Header/Header.js';

import Toast from '../../components/Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class ContactPage extends React.Component {
	constructor() {
		super()
		this.state = {
			name: null,
			email: null,
			message: null,
			message2: null,
			isFetching: false
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.id]: e.target.value})
	}

	handleSubmit = async(e) => {
		e.preventDefault()
		let url = `${process.env.REACT_APP_API_URL}/sendemail`
		this.setState({isFetching: true})
		const response = await fetch(url, {
			method: 'POST',
			headers: {
		        "Content-type": "application/json; charset=UTF-8"
		    },
		    body: JSON.stringify({
		    	name: this.state.name,
		    	email: this.state.email,
		    	message: this.state.message
		    })
		})

		const data = await response.json()
		this.setState({message2: data})
		this.setState({isFetching: false})
		this.returnMessage()
	}

	returnMessage = async() => {
		if(this.state.message2) {
			if(this.state.message2.success) {
				await Toast('We will get back to you the soonest. Thank You!', null)
				this.setState({message2: null})
			}else if(this.state.message2.error) {
				await Toast(null, this.state.message2.error)
				this.setState({message2: null})
			}
		}
	}


	render() {
		return (
			<ContactPageContainer>
			<Header />
			<ContactPageContainer2>
			<ToastContainer />
				<ContactFormContainer>
					<ImageContainer>
						<img src={contact} alt="img"/>
					</ImageContainer>
					<ContentContainer>
						<TitleContainer>
							<span> Contact Us </span>
						</TitleContainer>
						<FormContainer onSubmit={this.handleSubmit}>
							<FieldContainer>	
								<InputForm handleChange={this.handleChange} type='text' id='name' name='Name' required={true}/>
							</FieldContainer>
							<FieldContainer>	
								<InputForm handleChange={this.handleChange} type='text' id='email' name='Email' required={true} />
							</FieldContainer>
							<FieldContainer2>
								<label htmlFor='message'> Message:  </label>
								<textarea onChange={this.handleChange} type='textarea' rows='5' columns='5' id='message' name='Message' required/>
							</FieldContainer2>
							<ButtonContainer>
								<Button type='submit' name={this.state.isFetching ? 'Sending. . .' : 'Send'} handleSubmit={this.handleSubmit}/>
							</ButtonContainer>
						</FormContainer>
					</ContentContainer>
				</ContactFormContainer>
			</ContactPageContainer2>
			</ContactPageContainer>
			)

	}

}

const mapStateToProps = (state) => ({
	
})

const mapDispatchToProps = (dispatch) => ({
	
})



export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
