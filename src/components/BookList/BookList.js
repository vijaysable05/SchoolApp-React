import React from 'react';

import {BookListContainer, TitleContainer, UpperContainer, BottomContainer} from './BookListStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';
import AddBook from '../AddBook/AddBook.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';

import Spinner from '../spinner/Spinner.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class BookList extends React.Component {
	constructor() {
		super()
		this.state = {
			addBook: false,
			viewList: true,
			booklist: null,
			bookdata: null,
			openModal: false,
			deleteid: null,
			message: null
		}
	}

	changeaddBook = () => {
		this.setState({addBook: true,
			viewList: false})
	}

	changeviewList = () => {
		this.setState({addBook: false,
			viewList: true, bookdata: null})
	}

	handleEdit = (dat) => {
		this.setState({addBook: true,
			viewList: false, bookdata: dat})
	}

	handleDelete = (id) => {
		this.setState((prevState) => ({
			openModal: !prevState.openModal,
			deleteid: id
		}))
	}

	handleDeleteConfirm = async() => {
		this.handleDelete()

		let url = `${process.env.REACT_APP_API_URL}/deletebook/${this.state.deleteid}`

		if(this.props.currentUser.hasOwnProperty('admin')) {
			this.props.LoadingStart()
			const response = await fetch(url, {
				method: 'DELETE',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const data = await response.json()

			this.setState({message: data})
			this.returnMessage()
			this.loadBooks()
		}
	}

	loadBooks = async() => {
		this.setState({leaves: null})
		let url = null
		let array = []

		if(this.props.currentUser) {

			url = `${process.env.REACT_APP_API_URL}/getbooks/0/0/cupboardno:asc`

		}

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
			await data.forEach((dat) => {
				if(dat.issuedtostudent || dat.issuedtostaff) {
					array.push([dat.isbn, dat.bookname, dat.authorname, dat.publication, dat.edition, dat.noofcopies, "Issued", 
					<span role="img" aria-label="edit" onClick={() => {this.handleEdit(dat)}}>&#9997;</span>,
					<span role="img" aria-label="delete">&#10060;</span>])
				} else {
					array.push([dat.isbn, dat.bookname, dat.authorname, dat.publication, dat.edition, dat.noofcopies, "Available",
					<span role="img" aria-label="edit" onClick={() => {this.handleEdit(dat)}}>&#9997;</span>,
					<span role="img" aria-label="delete" onClick={() => this.handleDelete(dat._id)}>&#10060;</span> ])
				}
			})
			
			this.setState({booklist: array})
			this.props.LoadingEnd()

		} else {
			this.props.LoadingEnd()
			return;
		}
	}

	componentDidMount() {
		this.loadBooks()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadBooks()
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
		return (
			this.state.viewList ? 
			<BookListContainer>
			<ToastContainer />
			{
				this.state.openModal ?
				DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
				: null
			}
				<TitleContainer>
					<span> Book List </span>
				</TitleContainer>
				{
					this.props.admin ? 
					<UpperContainer>
						<Button type="button" name="Add Book" handleClick={this.changeaddBook}/>
						<InputForm placeholder="Search" />
					</UpperContainer>
					: null
				}
				{
					this.props.isLoading ? <Spinner /> : 
					<BottomContainer>
						<ViewsTable admin={this.props.admin} Edit={this.props.Edit} Delete={this.props.Delete}
						th={['Book Id', 'Book Name', 'Author', 'Publisher', 'Editions', 'Total Copies', 'Issued']} 
						td={this.state.booklist ? this.state.booklist : [['Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null']]}/>
					</BottomContainer>
				}
			</BookListContainer> 
			:
			this.state.addBook ? <AddBook bookdata={this.state.bookdata} changeviewList={this.changeviewList}/> : null
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


export default connect(mapStateToProps, mapDispatchToProps)(BookList);
