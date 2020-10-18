import React from 'react';

import {AddBusContainer, UpperContainer, BottomContainer, 
	ImageContainer, FormContainer, TitleContainer, 
	OwnerFormContainer, DriverFormContainer, DriverFormFields, 
	AddressFormContainer, AddressFormFields, UploadFormContainer, 
	UploadFormFields, ButtonContainer} from './AddBusStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

import img from './icon.png';

class AddBus extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			busData: {},
			docs: null,
			profilepic: null,
			imgsrc: null
		}
	}

	renderValues = async() => {
		if(this.props.bus) {
			
			const bus = this.props.bus

			document.getElementById('fullname').value = bus.fullname
			document.getElementById('mobile').value = bus.mobile
			document.getElementById('driverfirstname').value = bus.driverfirstname
			document.getElementById('driverlastname').value = bus.driverlastname
			document.getElementById('drivermobile').value = bus.drivermobile
			document.getElementById('busno').value = bus.busno
			document.getElementById('pincode').value = bus.pincode
			document.getElementById('houseno').value = bus.houseno
			document.getElementById('address').value = bus.address
			document.getElementById('city').value = bus.city
			

			this.setState({imgsrc: bus.profilepic})
		}
	}

	componentDidMount() {
		if(this.props.bus) {
			this.renderValues()
		}
	}

	handleChange = (e) => {
		if(e.target.id === "docs") {
			this.setState({docs: e.target.files})
		} else {
			this.setState({busData: {...this.state.busData, [e.target.id]: e.target.value}})	
		}
	}

	handleSubmit = async() => {
		this.props.LoadingStart()

		if(this.props.bus) {

			let url = `${process.env.REACT_APP_API_URL}/updatebus?id=${this.props.bus._id}`
			let formData = new FormData()
			if(this.state.profilepic) {
				formData.append('profilepic', this.state.profilepic[0])
			}
			if(this.state.docs) {
				formData.append('docs', this.state.docs[0])
			}
			formData.append('data', JSON.stringify(this.state.busData))
			
			if(this.props.currentUser.hasOwnProperty('admin')) {

				const response = await fetch(url, {
				method: 'PATCH',
				headers: { 
			        // "Content-Type": "multipart/form-data;boundary='boundary'",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: formData
			})

			const data = await response.json()
			this.setState({message: data, busData: {}, profilepic: null, docs: null})
			this.returnMessage()
			}

		} else {

			let url = `${process.env.REACT_APP_API_URL}/addbus`
			let formData = new FormData()
			if(this.state.profilepic) {
				formData.append('profilepic', this.state.profilepic[0])
			}
			if(this.state.docs) {
				formData.append('docs', this.state.docs[0])
			}
			formData.append('data', JSON.stringify(this.state.busData))
			
			if(this.props.currentUser.hasOwnProperty('admin')) {

				const response = await fetch(url, {
				method: 'POST',
				headers: { 
			        // "Content-Type": "multipart/form-data;boundary='boundary'",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: formData
			})

			const data = await response.json()
			this.setState({message: data, busData: {}, profilepic: null, docs: null})
			this.returnMessage()
			}

		}
		this.props.LoadingEnd()
	}

	handleProfilepic = (e) => {
		this.setState({profilepic: e.target.files})
		let myImage = new Image('100%', '100%')
		myImage.src =  e.target.files[0]
		myImage.src = URL.createObjectURL(e.target.files[0])
		document.getElementById('label').appendChild(myImage)
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
		const {changeViewBus} = this.props
		return (
			<AddBusContainer>
			<ToastContainer />
				<UpperContainer>
					<span> Add Bus </span>
					<Button type="button" name="Back" handleClick={changeViewBus}/>
				</UpperContainer>
				{
					this.props.isLoading ? <Spinner /> :
					<BottomContainer>
						<ImageContainer>
							<label htmlFor="profilepic" id="label">{this.state.profilepic ? null : <img id="imgid" src={img} alt="img"/>}</label>
							<input type="file" id="profilepic" name="myfile" onChange={this.handleProfilepic}/>
						</ImageContainer>
						<FormContainer>
							<TitleContainer>
								<span> Owner Details </span>
							</TitleContainer>
							<OwnerFormContainer>
								<InputForm name="Full Name" id="fullname" handleChange={this.handleChange}/>
								<InputForm name="Mobile No" id="mobile" handleChange={this.handleChange}/>
							</OwnerFormContainer>
							<TitleContainer>
								<span> Driver Details </span>
							</TitleContainer>
							<DriverFormContainer>
								<DriverFormFields>
									<InputForm name="First Name" id="driverfirstname" handleChange={this.handleChange}/>
									<InputForm name="Last Name" id="driverlastname" handleChange={this.handleChange}/>
									<InputForm name="Mobile No" id="drivermobile" handleChange={this.handleChange}/>
								</DriverFormFields>
								<DriverFormFields>
									<InputForm name="Bus No" id="busno" handleChange={this.handleChange}/>
								</DriverFormFields>
							</DriverFormContainer>
							<TitleContainer>
								<span> Address Details </span>
							</TitleContainer>
							<AddressFormContainer>
								<AddressFormFields>
									<InputForm name="Pin Code" id="pincode" handleChange={this.handleChange}/>
									<InputForm name="House No" id="houseno" handleChange={this.handleChange}/>
									<InputForm name="Address" id="address" handleChange={this.handleChange}/>
								</AddressFormFields>
								<AddressFormFields>
									<InputForm name="City" id="city" handleChange={this.handleChange}/>
								</AddressFormFields>
							</AddressFormContainer>
							<TitleContainer>
								<span> Upload Documents </span>
							</TitleContainer>
							<UploadFormContainer>
								<UploadFormFields>
									<InputForm type="file" name="Upload" multiple="multiple" id="docs" handleChange={this.handleChange}/>
								</UploadFormFields>
							</UploadFormContainer>
							<ButtonContainer>
								<Button type="button" name="Add New" handleClick={this.handleSubmit}/>
							</ButtonContainer>
						</FormContainer>
					</BottomContainer>
				}
			</AddBusContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(AddBus);