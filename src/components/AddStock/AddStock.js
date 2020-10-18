import React from 'react';

import {AddStockContainer, UpperContainer, BottomContainer, 
	SearchContainer, SearchTitleContainer, SearchInputFormContainer, 
	MemberInfoContainer, FormContainer2, ButtonContainer,
	NoteContainer, FormContainer3, SelectDiv} from './AddStockStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

let counter = 1

class AddStock extends React.Component {
	constructor() {
		super()
		this.state = {
			array: [1],
			vendors: [],
			vendor: null,
			message: null
		}
	}

	addGood = () => {

		this.setState((prevState) => ({
			...prevState.array.push(counter)
		}))

		counter = counter + 1
	}

	removeGood = () => {

		this.setState((prevState) => ({
			...prevState.array.pop(counter)
		}))
	}

	loadVendors = async() => {
		this.setState({vendors: []})
		
		let url = `${process.env.REACT_APP_API_URL}/getvendors/0/0/firstname:asc?year=${this.props.year}`
		let array = []

		if(this.props.currentUser) {
			this.props.LoadingStart()
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Cache-Control': 'no-cache',
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const data = await response.json()
			
			if(data.length > 0) {

				data.forEach((ven) => {
					array.push({name: `${ven.firstname} ${ven.lastname}`, id: ven._id})
				})

				this.setState({vendors: array, vendor: array[0].id})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	componentDidMount() {
		this.loadVendors()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadVendors()
		}
	}


	renderAddGood = () => {
		let addBooks = []

		this.state.array.forEach((c) => {
			addBooks.push(
				
					<FormContainer2 key={c} className="addgoods">
							<InputForm placeholder="Good" id={`good${c}`} handleClick={this.handleFocus} />
						<FormContainer3 key={c}>
							<InputForm placeholder="Quantity" id={`quantity${c}`} />
							<InputForm placeholder="Buy Price" id={`buyprice${c}`} />
							<InputForm placeholder=" Sell Price" id={`sellprice${c}`} />
						</FormContainer3>
					</FormContainer2>
				
				)
		})

		return addBooks
	}

	renderVendors = () => {
		let data = []

		if(this.state.vendors) {
			this.state.vendors.forEach((ven) => {
				data.push(<option key={ven.id} value={ven.id}>{ven.name}</option>)
			})
		}

		return data
	}

	handleSubmit = async() => {
		const length = document.getElementsByClassName('addgoods').length
		const collection = document.getElementsByClassName('addgoods')
		let array = []

		for(let i=0;i<length;i++) {
			let good = collection[i].children[0].children[0].value
			let quantity = collection[i].children[1].children[0].children[0].value
			let buyprice = collection[i].children[1].children[1].children[0].value
			let sellprice = collection[i].children[1].children[2].children[0].value
			array.push({vendor: this.state.vendor, good: good, quantity: quantity, buyprice: buyprice, sellprice: sellprice, year: this.props.year})
		}

		if(this.props.currentUser.hasOwnProperty('admin')) {

			let url = `${process.env.REACT_APP_API_URL}/addstock`
			this.props.LoadingStart()
			const response = await fetch(url, {
				method: 'POST',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: JSON.stringify(array)
			})

			const data = await response.json()
			this.setState({message: data, vendor: null})

			this.returnMessage()
			this.props.LoadingEnd()
		}
		
	}

	handleChange = (e) => {
		this.setState({[e.target.id]: e.target.value})
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
			<AddStockContainer>
			<ToastContainer />
			<UpperContainer>
					<span> Add Stock </span>
					<Button type="button" name="Back" handleClick={this.props.changeStock}/>
				</UpperContainer>
				{
					this.props.isLoading ? <Spinner /> :
					<BottomContainer>
						<SearchContainer>
							<SearchTitleContainer>
								<span>Select Vendor</span>
							</SearchTitleContainer>
							<SearchInputFormContainer>
								<SelectDiv>
									<select name="vendor" id="vendor" onChange={this.handleChange}>
									 {
									 	this.renderVendors()
									 }
									</select>
								</SelectDiv>
							</SearchInputFormContainer>
							<NoteContainer>
								<span><b> Note: </b> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
								cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
								proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </span>
							</NoteContainer>
						</SearchContainer>
						<MemberInfoContainer id="stockform" >
							<SearchTitleContainer>
								<span>Add Goods</span>
							</SearchTitleContainer>
							
								{
									this.renderAddGood()
								}
							
							<ButtonContainer>
								<Button type="button" name="Add" handleClick={this.addGood}/>
								<Button type="button" name="Remove" handleClick={this.removeGood}/>
								<Button type="button" name="Add Goods" handleClick={this.handleSubmit}/>
							</ButtonContainer>
						</MemberInfoContainer>
					</BottomContainer>
				}
			</AddStockContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddStock);

// <Button type="button" name="&#8594;"/>
