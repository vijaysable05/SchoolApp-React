import React from 'react';

import {AddVendorContainer, UpperContainer, BottomContainer, 
	ImageContainer, FormContainer, TitleContainer, 
	PersonalFormContainer, PersonalFormFields,
	AddressAndBankFormContainer, AddressAndBankFormFields, 
	ButtonContainer} from './AddVendorStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import img from './icon.png';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class AddVendor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			vendorData: null,
			profilepic: null,
			imgsrc: null,
			message: null
		}
	}

	renderValues = async() => {
		if(this.props.VendorData) {
			
			const VendorData = this.props.VendorData

			document.getElementById('firstname').value = VendorData.firstname
			document.getElementById('lastname').value = VendorData.lastname
			document.getElementById('mobile').value = VendorData.mobile
			document.getElementById('businessname').value = VendorData.businessname
			document.getElementById('gstin').value = VendorData.gstin
			document.getElementById('pincode').value = VendorData.pincode
			document.getElementById('houseno').value = VendorData.houseno
			document.getElementById('address').value = VendorData.address
			document.getElementById('city').value = VendorData.city
			document.getElementById('state').value = VendorData.state

			document.getElementById('ifsc').value = VendorData.ifsc
			document.getElementById('accno').value = VendorData.accno
			document.getElementById('bankname').value = VendorData.bankname
			document.getElementById('branchname').value = VendorData.branchname
			document.getElementById('panno').value = VendorData.panno

			this.setState({counter: true, imgsrc: VendorData.profilepic})
		}
	}

	componentDidMount() {
		if(this.props.VendorData) {
			this.renderValues()
		}
	}

	handleChange = (e) => {
		this.setState({vendorData: {...this.state.vendorData, [e.target.id]: e.target.value}})
	}

	handleProfilepic = (e) => {
		this.setState({profilepic: e.target.files})
		let myImage = new Image('100%', '100%')
		myImage.src =  e.target.files[0]
		myImage.src = URL.createObjectURL(e.target.files[0])
		document.getElementById('label').appendChild(myImage)
	}

	handleSubmit = async() => {
		this.props.LoadingStart()

		let url = null

		if(this.props.VendorData) {
			url = `${process.env.REACT_APP_API_URL}/updatevendor?id=${this.props.VendorData._id}&year=${this.props.year}`

			let formData = new FormData()

			if(this.state.profilepic) {
				formData.append('profilepic', this.state.profilepic[0])
			}

			if(this.state.vendorData) {
				formData.append('data', JSON.stringify({...this.state.vendorData}))
			}
			
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
			this.setState({message: data, vendorData: null, profilepic: null})
			this.returnMessage()
			}
			this.props.LoadingEnd()

		} else {
			url = `${process.env.REACT_APP_API_URL}/addvendor`
			let formData = new FormData()
			if(this.state.profilepic) {
				formData.append('profilepic', this.state.profilepic[0])
			}
			formData.append('data', JSON.stringify({year: this.props.year, ...this.state.vendorData}))
			
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
			this.setState({message: data, vendorData: null, profilepic: null})
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

	render() {
		const {changeviewList} = this.props
		return (
			this.props.isLoading ? <Spinner /> :
			<AddVendorContainer>
			<ToastContainer />
				<UpperContainer>
					<span> Add Vendor </span>
					<Button type="button" name="Back" handleClick={changeviewList}/>
				</UpperContainer>
				<BottomContainer>
					<ImageContainer>
						<label htmlFor="profilepic" id="label">{this.state.profilepic ? null : <img id="imgid" src={this.state.imgsrc ? this.state.imgsrc : img} alt="img"/>}</label>
						<input type="file" id="profilepic" name="profilepic" onChange={this.handleProfilepic} />
					</ImageContainer>
					<FormContainer>
						<TitleContainer>
							<span> Personal Details </span>
						</TitleContainer>
						<PersonalFormContainer>
							<PersonalFormFields>
								<InputForm name="First Name" id="firstname" handleChange={this.handleChange}/>
								<InputForm name="Last Name" id="lastname" handleChange={this.handleChange}/>
								<InputForm name="Mobile No" id="mobile" handleChange={this.handleChange}/>
							</PersonalFormFields>
							<PersonalFormFields>
								<InputForm name="Bussines Name" id="businessname" handleChange={this.handleChange}/>
								<InputForm name="GSTIN" id="gstin" handleChange={this.handleChange}/>
							</PersonalFormFields>
						</PersonalFormContainer>
						<TitleContainer>
							<span> Address Details </span>
						</TitleContainer>
						<AddressAndBankFormContainer>
							<AddressAndBankFormFields>
								<InputForm name="Pin Code" id="pincode" handleChange={this.handleChange}/>
								<InputForm name="House No" id="houseno" handleChange={this.handleChange}/>
								<InputForm name="Address" id="address" handleChange={this.handleChange}/>
							</AddressAndBankFormFields>
							<AddressAndBankFormFields>
								<InputForm name="State" id="state" handleChange={this.handleChange}/>
								<InputForm name="City" id="city" handleChange={this.handleChange}/>
							</AddressAndBankFormFields>
						</AddressAndBankFormContainer>
						<TitleContainer>
							<span> Bank Details </span>
						</TitleContainer>
						<AddressAndBankFormContainer>
							<AddressAndBankFormFields>
								<InputForm name="IFCS" id="ifsc" handleChange={this.handleChange}/>
								<InputForm name="Account No" id="accno" handleChange={this.handleChange}/>
								<InputForm name="Bank Name" id="bankname" handleChange={this.handleChange}/>
							</AddressAndBankFormFields>
							<AddressAndBankFormFields>
								<InputForm name="Branch Name" id="branchname" handleChange={this.handleChange}/>
								<InputForm name="Pan No" id="panno" handleChange={this.handleChange}/>
							</AddressAndBankFormFields>
						</AddressAndBankFormContainer>
						<ButtonContainer>
							<Button type="button" name="Add Vendor"handleClick={this.handleSubmit}/>
						</ButtonContainer>
					</FormContainer>
				</BottomContainer>
			</AddVendorContainer>
		)
	}

}

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	year: state.user.year,
	isLoading: state.user.isLoading,
})

const mapDispatchToProps = (dispatch) => ({
	LoadingStart: () => dispatch(LoadingStart()),
	LoadingEnd: () => dispatch(LoadingEnd()),
})


export default connect(mapStateToProps, mapDispatchToProps)(AddVendor);