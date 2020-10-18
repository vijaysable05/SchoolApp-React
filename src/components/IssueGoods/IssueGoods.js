import React from 'react';

import Select from 'react-select';

import {IssueGoodsContainer, SearchContainer, SearchTitleContainer, SearchInputFormContainer, 
	MemberInfoContainer, ImageFormContainer, FormContainer1,
	FormContainer2, ButtonContainer, NoteContainer, FormContainer3} from './IssueGoodsStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';
import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

import img from './icon.png';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

let counter = 1

class IssueGoods extends React.Component {
	constructor() {
		super()
		this.state = {
			array: [1],
			students: null,
			staffs: null,
			stocks: null,
			selectedStocks: [],
			studentValue: null,
			staffValue: null,
			message: null,
			sellprices:[],
			value: null,
			imgsrc: null
		}
	}

	loadStudentsAndStaff = async() => {

		this.props.LoadingStart()

		let array1 = []
		let array2 = []
		let array3 = []

		let url = `${process.env.REACT_APP_API_URL}/getstudents/0/0/firstname:asc?year=${this.props.year}`
		let url2 = `${process.env.REACT_APP_API_URL}/getstaffs/0/0/firstname:asc?year=${this.props.year}`
		let url3 = `${process.env.REACT_APP_API_URL}/getstocks/0/0/quantity:asc?year=${this.props.year}`

		if(this.props.currentUser.hasOwnProperty('admin')) {

			const response = await fetch(url, {
				method: 'GET',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const data = await response.json()
			await data.forEach((dat) => {
				array1.push({name: `${dat.firstname} ${dat.middlename} ${dat.lastname}`, rollno: dat.rollno, id: dat._id})
			})
			this.setState({students: array1})

			const response2 = await fetch(url2, {
				method: 'GET',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const data2 = await response2.json()
			await data2.forEach((dat) => {
				array2.push({name: `${dat.firstname} ${dat.middlename} ${dat.lastname}`, Id: dat.Id, id: dat._id})
			})
			this.setState({staffs: array2})

			const response3 = await fetch(url3, {
				method: 'GET',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const data3 = await response3.json()
			await data3.forEach((stck) => {
				array3.push({name: stck.good, id: stck._id, sellprice: stck.sellprice})
			})
			this.setState({stocks: array3})

			this.props.LoadingEnd()

		} else {
			this.props.LoadingEnd()
			return;
		}
	}

	componentDidMount() {
		this.loadStudentsAndStaff()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadStudentsAndStaff()
		}
	}

	addGood = () => {

		this.setState((prevState) => ({
			...prevState.array.push(counter)
		}))

		counter = counter + 1
	}

	removeGood = () => {

		if(this.state.array.length > 1) {
			this.setState((prevState) => ({
				...prevState.array.pop(counter),
				...prevState.stocks.push(prevState.selectedStocks.pop()),
				...prevState.sellprices.splice(-1,1)
			}))
		}

	}

	handleChange3 = (stock) => {

		if(this.state.selectedStocks.includes(stock.value)) {
			alert("Good already added, please add another good")
			this.setState((prevState) => ({
				...prevState.array.pop(counter),
			}))
		} else {
			this.setState((prevState) => ({
				...prevState.selectedStocks.push(stock.value),
				...prevState.sellprices.push(stock.value.sellprice)
			}))
		}	
	}

	renderGoods = () => {
		let data = []

		if(this.state.stocks) {
			this.state.stocks.forEach((stck) => {
				data.push({value: stck, label: stck.name})
			})
		}

		return data
	}

	handleSellPrice = (e) => {
		let no = e.target.id.split('ty')[1]
		document.getElementById(`sell${no}`).placeholder = this.state.sellprices[no-1] * e.target.value
	}

	renderAddGood = () => {
		let addBooks = []

		this.state.array.forEach((c) => {
			addBooks.push(
				
					<FormContainer2 key={c}>
						
							<Select
						        onChange={this.handleChange3}
						        options={this.renderGoods()}
						        placeholder="Good name"
						      />
						
						<FormContainer3 key={c}>
							<InputForm id={`qty${c}`} placeholder="Quantity" handleChange={this.handleSellPrice}/>
							<InputForm id={`sell${c}`} placeholder={this.state.sellprices.length <= 0 ? "Sell Price" : this.state.sellprices[c-1]} readonly/>
						</FormContainer3>
					</FormContainer2>
				
				)
		})

		return addBooks
	}

	renderStudents = () => {
		let data = []

		if(this.state.students) {
			this.state.students.forEach((stu) => {
				data.push({value: stu, label: stu.name})
			})
		}

		return data
	}

	renderStaffs = () => {
		let data = []

		if(this.state.staffs) {
			this.state.staffs.forEach((stf) => {
				data.push({value: stf, label: stf.name})
			})
		}

		return data
	}

	handleChange = (studentValue) => {
		
		this.setState({studentValue: studentValue, staffValue: null})
	}

	handleChange2 = (staffValue) => {
		
		this.setState({staffValue: staffValue, studentValue: null})
	}

	loadMemberInfo = async() => {
		if(this.state.studentValue) {

			const response = await fetch(`${process.env.REACT_APP_API_URL}/getstudentbyid?id=${this.state.studentValue.value.id}`, {
				method: 'GET',
				headers: { 
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})
			const data = await response.json()
			this.setState({imgsrc: data.profilepic})

			document.getElementById('name').value = this.state.studentValue.value.name
			document.getElementById('otherinfo').value = this.state.studentValue.value.rollno

		} else if(this.state.staffValue) {

			const response = await fetch(`${process.env.REACT_APP_API_URL}/getstaff/${this.state.staffValue.value.id}`, {
				method: 'GET',
				headers: { 
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})
			const data2 = await response.json()
			this.setState({imgsrc: data2.profilepic})

			document.getElementById('name').value = this.state.staffValue.value.name
			document.getElementById('otherinfo').value = this.state.staffValue.value.Id

		}
	}

	handleIssueGoods = async() => {
		let goodsarray = []
		let id = null
		let url = `${process.env.REACT_APP_API_URL}/issuegoods`

		for(let i=0;i<this.state.selectedStocks.length;i++) {
			await goodsarray.push({goodid: this.state.selectedStocks[i].id, quantity: document.getElementById(`qty${i+1}`).value})
		}

		if(this.state.studentValue) {

			id = this.state.studentValue.value.id
			
			if(this.props.currentUser.hasOwnProperty('admin')) {

				this.props.LoadingStart()

				const response = await fetch(url, {
				method: 'PATCH',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: JSON.stringify({
			    	year: this.props.year,
			    	id: id,
			    	student: true,
			    	teacher: false,
			    	goods: goodsarray
			    })
			})

			const data = await response.json()
			this.setState({message: data, selectedStocks: [], sellprices: [], studentValue: null, imgsrc: null})
			this.returnMessage()
			}

		} else if(this.state.staffValue) {

			id = this.state.staffValue.value.id
			
			if(this.props.currentUser.hasOwnProperty('admin')) {

				this.props.LoadingStart()

				const response = await fetch(url, {
				method: 'PATCH',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: JSON.stringify({
			    	year: this.props.year,
			    	id: id,
			    	student: false,
			    	teacher: true,
			    	goods: goodsarray
			    })
			})

			const data = await response.json()
			this.setState({message: data, selectedStocks: [], sellprices: [], staffValue: null, imgsrc: null})
			this.returnMessage()
			}
		}
	
		await this.loadStudentsAndStaff()
		// this.props.LoadingEnd()
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
			<React.Fragment>
			<ToastContainer />
			{
				this.props.isLoading ? <Spinner /> :
				<IssueGoodsContainer>
						<SearchContainer>
							<SearchTitleContainer>
								<span>Search by Id</span>
							</SearchTitleContainer>
							<SearchInputFormContainer>
								<Select
									value={this.state.studentValue}
							        onChange={this.handleChange}
							        options={this.renderStudents()}
							        placeholder="Student name"
							      />
								<Select
									value={this.state.staffValue}
							        onChange={this.handleChange2}
							        options={this.renderStaffs()}
							        placeholder="Staff name"
							      />
								<Button type="button" name="&#8594;" handleClick={this.loadMemberInfo}/>
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
						<MemberInfoContainer>
							<SearchTitleContainer>
								<span>Member Information</span>
							</SearchTitleContainer>
							<ImageFormContainer>
								<img src={this.state.imgsrc ? this.state.imgsrc : img} alt="img" />
							</ImageFormContainer>
							<FormContainer1>
								<InputForm placeholder="Name" id="name" />
								<InputForm placeholder="Other Info" id="otherinfo" />
							</FormContainer1>
							
								{
									this.renderAddGood()
								}
							
							<ButtonContainer>
								<Button type="button" name="Add" handleClick={this.addGood}/>
								<Button type="button" name="Remove" handleClick={this.removeGood}/>
								<Button type="button" name="Issue Goods" handleClick={this.handleIssueGoods}/>
							</ButtonContainer>
						</MemberInfoContainer>
				</IssueGoodsContainer>
			}
			</React.Fragment>
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


export default connect(mapStateToProps, mapDispatchToProps)(IssueGoods);


// renderGoods = () => {
// 		let data = []

// 		this.state.data.forEach((d) => {
// 			data.push(<option value={d}>{d}</option>)
// 		})

// 		return data
// 	}

// 	renderAddGood = () => {
// 		let addBooks = []

// 		this.state.array.forEach((c) => {
// 			addBooks.push(
				
// 					<FormContainer2 key={c}>
// 						<SelectDiv>
// 								<select name="goods" id="goods">
// 								  <option value="selectgoods">Select Good</option>
// 								 {
// 								 	this.renderGoods()
// 								 }
// 								</select>
// 							</SelectDiv>
// 						<FormContainer3 key={c}>
// 							<InputForm placeholder="Quantity" id="quantity" />
// 							<InputForm placeholder="Price" id="price" />
// 						</FormContainer3>
// 					</FormContainer2>
				
// 				)
// 		})

// 		return addBooks
// 	}

// removeGood = () => {

// 	this.setState((prevState) => ({
// 		...prevState.array.pop(counter),
// 		...prevState.stocks.push(prevState.selectedStocks.pop()),
// 		...prevState.sellprices.splice(-1,1)
// 	}))

// }

// handleChange3 = (stock) => {
	
// 	this.setState((prevState) => ({
// 		...prevState.selectedStocks.push(stock.value),
// 		stocks: prevState.stocks.filter((st)=> {
// 			return st.id !== stock.value.id
// 		}),
// 		...prevState.sellprices.push(stock.value.sellprice)
// 	}))
// }