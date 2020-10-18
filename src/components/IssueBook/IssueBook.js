import React from 'react';

import Select from 'react-select';

import {IssueBookContainer, TitleContainer, BottomContainer, 
	SearchContainer, SearchTitleContainer, SearchInputFormContainer, 
	MemberInfoContainer, ImageFormContainer, FormContainer1,
	FormContainer2, ButtonContainer, NoteContainer} from './IssueBookStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import img from './icon.png';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

let counter = 1

class IssueBook extends React.Component {
	constructor() {
		super()
		this.state = {
			array: [1],
			students: null,
			staffs: null,
			studentValue: null,
			staffValue: null,
			imgsrc: null,
			availableBooks: null,
			selectedBooks: [],
			message: null
		}
	}

	addBook = () => {

		this.setState((prevState) => ({
			...prevState.array.push(counter)
		}))

		counter = counter + 1
	}

	removeBook = () => {

		this.setState((prevState) => ({
			...prevState.array.pop(counter),
			...prevState.availableBooks.push(prevState.selectedBooks.pop())
		}))

	}

	// handleChange3 = (book) => {
		
	// 	this.setState((prevState) => ({
	// 		...prevState.selectedBooks.push(book.value),
	// 		availableBooks: prevState.availableBooks.filter((bk)=> {
	// 			return bk.id !== book.value.id
	// 		})
	// 	}))
	// }

	handleChange3 = (book) => {

		if(this.state.selectedBooks.includes(book.value)) {
			alert("Book already added, please add another book")
			this.setState((prevState) => ({
				...prevState.array.pop(counter),
			}))
		} else {
			this.setState((prevState) => ({
				...prevState.selectedBooks.push(book.value)
			}))
		}	
	}

	renderBooks = () => {
		let data = []

		if(this.state.availableBooks) {
			this.state.availableBooks.forEach((book) => {
				data.push({value: book, label: book.name})
			})
		}

		return data
	}

	renderAddBook = () => {
		let addBooks = []

		this.state.array.forEach((c) => {
			addBooks.push(<FormContainer2 key={c}>
				<Select
			        onChange={this.handleChange3}
			        options={this.renderBooks()}
			        placeholder="Book name"
			      />
				</FormContainer2>)
		})

		return addBooks
	}

	loadStudentsAndStaff = async() => {

		this.props.LoadingStart()

		let array1 = []
		let array2 = []
		let array3 = []

		let url = `${process.env.REACT_APP_API_URL}/getstudents/0/0/firstname:asc?year=${this.props.year}`
		let url2 = `${process.env.REACT_APP_API_URL}/getstaffs/0/0/firstname:asc?year=${this.props.year}`
		let url3 = `${process.env.REACT_APP_API_URL}/getavailablebooks`

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
			await data3.forEach((dat) => {
				array3.push({name: dat.bookname, id: dat._id})
			})
			this.setState({availableBooks: array3})

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

			const response = await fetch(`${process.env.REACT_APP_API_URL}/student/profilepic?id=${this.state.studentValue.value.id}`, {
				method: 'GET',
				headers: { 
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})
			let blob = await response.blob()
			const objectUrl = URL.createObjectURL(blob)
			this.setState({imgsrc: objectUrl})

			document.getElementById('name').value = this.state.studentValue.value.name
			document.getElementById('otherinfo').value = this.state.studentValue.value.rollno

		} else if(this.state.staffValue) {

			const response = await fetch(`${process.env.REACT_APP_API_URL}/staff/profilepic?id=${this.state.staffValue.value.id}`, {
				method: 'GET',
				headers: { 
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})
			let blob = await response.blob()
			const objectUrl = URL.createObjectURL(blob)
			this.setState({imgsrc: objectUrl})

			document.getElementById('name').value = this.state.staffValue.value.name
			document.getElementById('otherinfo').value = this.state.staffValue.value.Id

		}
	}

	handleIssueBooks = async() => {
		let bookidarray = []
		let id = null
		let url = null

		await this.state.selectedBooks.forEach((book) => {
			bookidarray.push(book.id)
		})

		if(this.state.studentValue) {

			id = this.state.studentValue.value.id
			url = `${process.env.REACT_APP_API_URL}/issuebookstudent`
			
			if(this.props.currentUser.hasOwnProperty('admin')) {

				this.props.LoadingStart()

				const response = await fetch(url, {
				method: 'POST',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: JSON.stringify({
			    	studentid: id,
			    	bookids: bookidarray
			    })
			})

			const data = await response.json()
			this.setState({message: data})
			this.returnMessage()

			}

		} else if(this.state.staffValue) {

			id = this.state.staffValue.value.id
			url = `${process.env.REACT_APP_API_URL}/issuebookstaff`

			if(this.props.currentUser.hasOwnProperty('admin')) {

				this.props.LoadingStart()

				const response = await fetch(url, {
				method: 'POST',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: JSON.stringify({
			    	staffid: id,
			    	bookids: bookidarray
			    })
			})

			const data = await response.json()
			this.setState({message: data})
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
			<IssueBookContainer>
			<ToastContainer />
				<TitleContainer>
					<span>Issue Book</span>
				</TitleContainer>
				{
					this.props.isLoading ? <Spinner /> :
					<BottomContainer>
						<SearchContainer>
							<SearchTitleContainer>
								<span>Search by Name</span>
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
								<InputForm placeholder="Id or Roll no." id="otherinfo" />
							</FormContainer1>
							
								{
									this.renderAddBook()
								}
							
							<ButtonContainer>
								<Button type="button" name="Add" handleClick={this.addBook}/>
								<Button type="button" name="Remove" handleClick={this.removeBook}/>
								<Button type="button" name="Issue Book" handleClick={this.handleIssueBooks} />
							</ButtonContainer>
						</MemberInfoContainer>
					</BottomContainer>
				}
			</IssueBookContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(IssueBook);
