import React from 'react';

import {AddBookContainer, TitleContainer, UpperContainer,
	BottomContainer, 
	BookInfoContainer, SubTitleContainer, FormContainer, ButtonContainer} from './AddBookStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';

import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class AddBook extends React.Component {
	constructor() {
		super()
		this.state = {
			bookdata: null,
			bookdata2: {},
			message: null
		}
	}

	loadBookdata = async() => {
		await this.setState({bookdata: this.props.bookdata})

		if(this.state.bookdata) {
			document.getElementById('bookname').value = this.state.bookdata.bookname
			document.getElementById('isbn').value = this.state.bookdata.isbn
			document.getElementById('authorname').value = this.state.bookdata.authorname
			document.getElementById('publication').value = this.state.bookdata.publication
			document.getElementById('publishingyear').value = this.state.bookdata.publishingyear
			document.getElementById('edition').value = this.state.bookdata.edition
			document.getElementById('noofcopies').value = this.state.bookdata.noofcopies
			document.getElementById('bookprice').value = this.state.bookdata.bookprice
			document.getElementById('cupboardno').value = this.state.bookdata.cupboardno
			document.getElementById('rackno').value = this.state.bookdata.rackno
		}
	}

	componentWillUnmount() {
		this.setState({bookdata: null})
	}

	componentDidMount() {
		this.loadBookdata()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadBookdata()
		}
	}

	handleReset = () => {
		let length = document.getElementsByTagName('input').length
		for(let i=0;i<length;i++) {
			document.getElementsByTagName('input')[i].value = null
		}
	}

	handleSubmit = async() => {

		this.props.LoadingStart()

		let url = null

		if(this.props.currentUser.hasOwnProperty('admin')) {

			if(this.state.bookdata) {

				url = `${process.env.REACT_APP_API_URL}/updatebook/${this.state.bookdata._id}`

				const response = await fetch(url, {
					method: 'PATCH',
					headers: { 
				        "Content-type": "application/json; charset=UTF-8",
				        'Authorization': 'Bearer ' + this.props.currentUser.token
				    },
				    body: JSON.stringify(this.state.bookdata2)
				})

				const data = await response.json()
				this.setState({message: data})
				
				this.props.LoadingEnd()

			} else {
				
				url = `${process.env.REACT_APP_API_URL}/addbook`

				const response = await fetch(url, {
					method: 'POST',
					headers: { 
				        "Content-type": "application/json; charset=UTF-8",
				        'Authorization': 'Bearer ' + this.props.currentUser.token
				    },
				    body: JSON.stringify(this.state.bookdata2)
				})

				const data = await response.json()
				this.setState({message: data})
				this.returnMessage()
				
				this.props.LoadingEnd()
			}
		}
	}

	handleChange = (e) => {
		this.setState({bookdata2: {...this.state.bookdata2, [e.target.id]: e.target.value}})
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
			<AddBookContainer>
			<ToastContainer />
				<TitleContainer>
					<span> Add Book </span>
				</TitleContainer>
				<UpperContainer>
					<Button type="button" name="Back" handleClick={this.props.changeviewList} />
				</UpperContainer>
				<BottomContainer>
					{
						this.props.isLoading ? <Spinner /> :
						<BookInfoContainer>
							<SubTitleContainer>
								<span> Book Information </span>
							</SubTitleContainer>
							<FormContainer>
								<InputForm id="bookname" placeholder="Book Name" handleChange={this.handleChange}/>
								<InputForm id="isbn" placeholder="ISBN No." handleChange={this.handleChange}/>
							</FormContainer>
							<FormContainer>
								<InputForm id="authorname" placeholder="Author Name" handleChange={this.handleChange}/>
								<InputForm id="publication" placeholder="Publication" handleChange={this.handleChange}/>
							</FormContainer>
							<FormContainer>
								<InputForm id="publishingyear" placeholder="Publishing Year" handleChange={this.handleChange}/>
								<InputForm id="edition" placeholder="Edition" handleChange={this.handleChange}/>
							</FormContainer>
							<SubTitleContainer>
								<span> Book Insights </span>
							</SubTitleContainer>
							<FormContainer>
								<InputForm id="noofcopies" placeholder="No. of Copies" handleChange={this.handleChange}/>
								<InputForm id="bookprice" placeholder="Book Price" handleChange={this.handleChange}/>
							</FormContainer>
							<FormContainer>
								<InputForm id="cupboardno" placeholder="Cup-Board No." handleChange={this.handleChange}/>
								<InputForm id="rackno" placeholder="Rack No." handleChange={this.handleChange} />
							</FormContainer>
							<ButtonContainer>
								<Button type="button" name={this.state.bookdata ? "Save" : "Add New"} handleClick={this.handleSubmit} />
								<Button type="button" name="Reset" handleClick={this.handleReset}/>
							</ButtonContainer>
						</BookInfoContainer>
					}
				</BottomContainer>
			</AddBookContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(AddBook);


//<AddNewBookContainer>
//	<ButtonAndSearchContainer>
//		<InputForm id="search" placeholder="Search Here" />
//		<Button type="button" name="&#8594;" />
//	</ButtonAndSearchContainer>
//</AddNewBookContainer>
