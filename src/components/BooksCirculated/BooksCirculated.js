import React from 'react';

import Modal from 'react-modal'; 

import {BooksCirculatedContainer, TitleContainer, UpperContainer, BottomContainer, 
	ModalHeading, ModalBody, EditSpan, ModalSpan, ModalButtons} from './BooksCirculatedStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import moment from 'moment';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

Modal.setAppElement('#root')

class BooksCirculated extends React.Component {
	constructor() {
		super()
		this.state = {
			books: null,
			openModal: false,
			fine: null,
			modalBookname: null,
			modalIssuedto: null,
			modalIssuedon: null,
			modalIssuedtill: null,
			modalBookid: null,
			message: null
		}
	}

	handleEdit = async(issuedbook, bookname, issuedto) => {

		let url = `${process.env.REACT_APP_API_URL}/returnfine?bookid=${issuedbook.book}`

		if(this.props.currentUser.hasOwnProperty('admin')) {
			this.props.LoadingStart()
			const response = await fetch(url, {
				method: 'GET',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const data = await response.json()

			this.props.LoadingEnd()
			this.setState({modalBookid: issuedbook.book, fine: `${data.fine}`, modalBookname: bookname, modalIssuedto: issuedto, modalIssuedon: moment(issuedbook.issuedon).format("YYYY-DD-MM"), modalIssuedtill: moment(issuedbook.issuedtill).format("YYYY-DD-MM")})
			
		}

		this.setState((prevState) => ({
			openModal: !prevState.openModal
		}))
	}

	loadIssuedBooks = async() => {
		this.setState({books: []})
		
		let url = `${process.env.REACT_APP_API_URL}/getissuedbooks`
		let array = []

		if(this.props.currentUser.hasOwnProperty('admin')) {
			this.props.LoadingStart()
			const response = await fetch(url, {
				method: 'GET',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const data = await response.json()
			
			if(data.length > 0) {

				data.forEach((book) => {
					if(book.issuedtostudent) {

						let issuedbook = book.issuedtostudent.booksissued.find((bk) => {
							return bk.book === book._id
						})

						array.push([book.bookname, book.edition, book.publication, `${book.issuedtostudent.firstname} ${book.issuedtostudent.middlename} ${book.issuedtostudent.lastname}`,
						`Class ${book.issuedtostudent.class}: Division ${book.issuedtostudent.division}`, moment(issuedbook.issuedon).format("YYYY-DD-MM"),
						<span role="img" aria-label="edit" onClick={() => {this.handleEdit(issuedbook, book.bookname, `${book.issuedtostudent.firstname} ${book.issuedtostudent.middlename} ${book.issuedtostudent.lastname}`)}}>&#9997;</span>,
						<span role="img" aria-label="delete">&#10060;</span>])

					} else if(book.issuedtostaff) {

						let issuedbook2 = book.issuedtostaff.booksissued.find((bk2) => {
							return bk2.book === book._id
						})

						array.push([book.bookname, book.edition, book.publication, `${book.issuedtostaff.firstname} ${book.issuedtostaff.middlename} ${book.issuedtostaff.lastname}`,
						book.issuedtostaff.designation, moment(issuedbook2.issuedon).format("YYYY-DD-MM"),
						<span role="img" aria-label="edit" onClick={() => {this.handleEdit(issuedbook2, book.bookname, `${book.issuedtostaff.firstname} ${book.issuedtostaff.middlename} ${book.issuedtostaff.lastname}`)}}>&#9997;</span>,
						<span role="img" aria-label="delete">&#10060;</span>])

					}

				})

				this.setState({books: array})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	returnBook = async() => {
		this.props.LoadingStart()
		this.setState({openModal: false})

		let url = `${process.env.REACT_APP_API_URL}/returnbook?bookid=${this.state.modalBookid}`

		if(this.props.currentUser.hasOwnProperty('admin')) {

			const response = await fetch(url, {
			method: 'POST',
			headers: { 
		        "Content-type": "application/json; charset=UTF-8",
		        'Authorization': 'Bearer ' + this.props.currentUser.token
		    }
		})

		const data = await response.json()
		this.setState({message: data})
		}
		this.props.LoadingEnd()
		this.loadIssuedBooks()
	}

	componentDidMount() {
		this.loadIssuedBooks()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadIssuedBooks()
		}
	}

	handleEdit2 = () => {
		this.setState((prevState) => ({
			openModal: !prevState.openModal
		}))
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
			<BooksCirculatedContainer>
			<ToastContainer />
			<Modal isOpen={this.state.openModal}
			onRequestClose={this.handleEdit2}
			closeTimeoutMS={200}
			 style={{
			    overlay: {
			      position: 'fixed',
			      transition: '2000ms ease-in-out',
			      top: 0,
			      left: 0,
			      right: 0,
			      bottom: 0,
			      backgroundColor: 'rgba(255, 255, 255, 0.75)'
			    },
			    content: {
			      display: "flex",
				  flexDirection: "column",
			      height: "50%",
			      width: "35%",
			      position: 'absolute',
			      top: '20%',
			      left: '30%',
			      right: '30%',
			      bottom: '30%',
			      border: '1px solid black',
			      background: '#fff',
			      overflow: 'auto',
			      WebkitOverflowScrolling: 'touch',
			      borderRadius: '4px',
			      outline: 'none',
			      padding: '20px',

			    }
			  }}>
			<ModalHeading>
				<h2> Return Book </h2><EditSpan role="img" onClick={() => {this.handleEdit2()}}>&#215;</EditSpan>
			</ModalHeading>
			<ModalBody>
				<ModalSpan> <b>Book Name:</b>&nbsp;&nbsp;&nbsp; {this.state.modalBookname ? this.state.modalBookname : null} </ModalSpan>
				<ModalSpan> <b>Issued To:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.modalIssuedto ? this.state.modalIssuedto : null} </ModalSpan>
				<ModalSpan> <b>Issued On:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.modalIssuedon ? this.state.modalIssuedon : null} </ModalSpan>
				<ModalSpan> <b>Issued Till:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.modalIssuedtill ? this.state.modalIssuedtill : null} </ModalSpan>
				<ModalSpan> <b>Fine:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.fine ? this.state.fine : null} </ModalSpan>
			</ModalBody>
				<ModalButtons>
					<Button type='button' name='Return' handleClick={this.returnBook}/>
				</ModalButtons>
			</Modal>
				<TitleContainer>
					<span> Books Circulated </span>
				</TitleContainer>
				<UpperContainer>
					<InputForm placeholder="Search" />
				</UpperContainer>
				{
					this.props.isLoading ? <Spinner /> :
					<BottomContainer>
						<ViewsTable admin Edit Delete
						th={['Book Name', 'Editions', 'Publisher', 'Issued To', 'More Info', 'Date']}
						td={this.state.books ? this.state.books : [['Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null']]} />
					</BottomContainer>
				}
			</BooksCirculatedContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(BooksCirculated);
