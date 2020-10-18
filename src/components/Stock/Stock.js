import React from 'react';

import {StockContainer, UpperContainer, BottomContainer} from './StockStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';
import AddStock from '../AddStock/AddStock.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

class Stock extends React.Component {
	constructor() {
		super()
		this.state = {
			addStock: false,
			stock: true,
			stocks: null,
			openModal: false,
			deleteid: null,
			message: null
		}
	}

	changeaddStock = () => {
		this.setState({addStock: true,
			stock: false})
	}

	changeStock = () => {
		this.setState({addStock: false,
			stock: true})
	}

	handleDelete = (id) => {
		this.setState((prevState) => ({
			openModal: !prevState.openModal,
			deleteid: id
		}))
	}

	handleDeleteConfirm = async() => {
		this.handleDelete()

		let url = `${process.env.REACT_APP_API_URL}/deletestock?id=${this.state.deleteid}&year=${this.props.year}`

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
			this.loadStocks()
		}
	}

	loadStocks = async() => {
		this.setState({stocks: null})
		
		let url = `${process.env.REACT_APP_API_URL}/getstocks/0/0/quantity:asc?year=${this.props.year}`
		let array = []

		if(this.props.currentUser) {
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

				data.forEach((stck) => {
					array.push([`${stck.vendor.firstname} ${stck.vendor.lastname}`, 
					stck.good, stck.quantity, stck.buyprice, stck.sellprice,
					<span role="img" aria-label="delete" onClick={() => this.handleDelete(stck._id)}>&#10060;</span>])
				})

				this.setState({stocks: array})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	componentDidMount() {
		this.loadStocks()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadStocks()
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
			this.state.stock ? 
			<StockContainer>
			<ToastContainer />
				{
					this.state.openModal ?
					DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
					: null
				}
				<UpperContainer>
					<Button type="button" name="Add Stock" handleClick={this.changeaddStock}/>
					<InputForm placeholder="Search" />
				</UpperContainer>
				{
					this.props.isLoading ? <Spinner /> :
					<BottomContainer>
						<ViewsTable admin Delete
						th={['Vendor', 'Good Name', 'Available Quantity', 'Buying Price', 'Selling Price']} 
						td={this.state.stocks ? this.state.stocks : [['Null', 'Null', 'Null', 'Null', 'Null', 'Null']]} />
					</BottomContainer>
				}
			</StockContainer> 
			:
			this.state.addStock ? <AddStock changeStock={this.changeStock}/> : null
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


export default connect(mapStateToProps, mapDispatchToProps)(Stock);
