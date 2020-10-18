import React from 'react';

import {FeeStructureContainer, UpperContainer, FormContainer, SelectDiv2,
	SelectDiv, BottomContainer, UpperContainer2} from './FeeStructureStyles.js';

import Button from '../Button/Button.js';
import InputForm from '../InputForm/InputForm.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';
import EditFeeStructure from '../EditFeeStructure/EditFeeStructure.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

import DeleteConfirm from '../DeleteConfirm/DeleteConfirm.js';

class FeeStructure extends React.Component {
	constructor() {
		super()
		this.state = {
			table: true,
			edit: false,
			class: null,
			category: null,
			isFetching: false,
			message: null,
			feestructures: null,
			isShown: false,
			editfeestructure: null,
			openModal: false,
			deleteid: null,
		}
	}

	changeTab = () => {
		this.setState((prevState) => ({
			table: true,
			edit: false,
			class: null,
			category: null,
			editfeestructure: null
		}))
	}

	changeTab2 = () => {
		this.setState((prevState) => ({
			table: false,
			edit: true,
			class: null,
		}))
	}

	renderClasses = () => {
		let data = []
		if(this.props.classes) {
			this.props.classes.forEach((cls) => {
				data.push(<option id={cls.classid} key={cls.class} value={cls.classid}>{cls.class}</option>)
			})
		}
		return data
	}

	handleChange = (e) => {
		this.setState({[e.target.id]: e.target.value})
	}

	handleSubmit = async() => {

		let array = []
		let length = document.getElementsByClassName('feeinputs').length
		let doc = document.getElementsByClassName('feeinputs')

		for(let i=0;i<length;i++) {
			await array.push({feename: doc[i].children[0].children[1].children[0].value,
						feeamount: Number(doc[i].children[2].children[0].children[0].value)})
		}


		this.setState({isFetching: true})

		if(this.state.editfeestructure) {

			let url = `${process.env.REACT_APP_API_URL}/updatefeestructure`

			if(this.props.currentUser.hasOwnProperty('admin')) {

				const response = await fetch(url, {
				method: 'PATCH',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: JSON.stringify({
			    	year: this.props.year,
			    	id: this.state.editfeestructure._id,
			    	feestructure: array
			    }), 
			})

			const data = await response.json()
			this.setState({message: data})
			}

		} else {

			let url = `${process.env.REACT_APP_API_URL}/createfeestructure`

			if(this.props.currentUser.hasOwnProperty('admin')) {

				const response = await fetch(url, {
				method: 'POST',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    },
			    body: JSON.stringify({
			    	year: this.props.year,
			    	class: this.state.class,
			    	category: this.state.category,
			    	feestructure: array
			    }), 
			})

			const data = await response.json()
			this.setState({message: data})

			}
	
		}
		this.returnMessage()
		this.setState({isFetching: false})
	}

	handleDelete = (id) => {
		this.setState((prevState) => ({
			openModal: !prevState.openModal,
			deleteid: id
		}))
	}

	handleDeleteConfirm = async() => {
		this.handleDelete()

		let url = `${process.env.REACT_APP_API_URL}/deletefeestructure?id=${this.state.deleteid}`

		if(this.props.currentUser.hasOwnProperty('admin')) {
			this.setState({isFetching: true})
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
			this.loadFeeStructures()
		}
	}

	loadFeeStructures = async() => {

		let url = `${process.env.REACT_APP_API_URL}/getfeestructures/0/0/category:asc?year=${this.props.year}&class=${this.state.class}`

		if(this.props.currentUser) {
			this.setState({isFetching: true})
			const response = await fetch(url, {
				method: 'GET',
				headers: { 
			        "Content-type": "application/json; charset=UTF-8",
			        'Authorization': 'Bearer ' + this.props.currentUser.token
			    }
			})

			const data = await response.json()
			
			if(data) {

				this.setState({feestructures: data, isFetching: false, isShown: true})

			} else {
				this.setState({feestructures: null, isFetching: false})
				return;
			}
		}
	}

	// componentDidMount() {
	// 	this.loadFeeStructures()
	// }

	// componentDidUpdate(prevProps, prevState) {
	// 	if(prevProps.year !== this.props.year) {
	// 		this.loadFeeStructures()
	// 	}
	// }

	handleEdit = (fst) => {
		this.setState({editfeestructure: fst, 
			table: false,
			edit: true,
			class: fst.class})
		document.getElementById('class').value = fst.class
	}

	returnViewsTables = () => {
		if(this.state.isShown) {
		let data = []
			if(this.state.feestructures) {
				this.state.feestructures.forEach((feest, i) => {
					let tharray = ['Class', 'Category']
					let class1 = this.props.classes.find((cls) => {
						return cls.classid === feest.class
					})
					let tdarray = [class1.class, feest.category]
					feest.feesStructure.forEach((feeth) => {
						tharray.push(feeth.feename)
						tdarray.push(feeth.feeamount)
					})
					
					data.push(<ViewsTable key={i} admin Edit Delete
							th={tharray} 
							td={[[...tdarray, <span role="img" aria-label="edit" onClick={() => {this.handleEdit(feest)}}>&#9997;</span>, 
							<span role="img" aria-label="delete" onClick={() => this.handleDelete(feest._id)}>&#10060;</span>]]}/>)
				})
			}
		return data
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
			<FeeStructureContainer>
			{
				this.state.openModal ?
				DeleteConfirm(this.state.openModal, this.handleDelete, this.handleDeleteConfirm)
				: null
			}
			{
				this.props.isLoading ? <Spinner /> :
				<React.Fragment>
				<ToastContainer />
				{
					this.state.edit ? 
					<React.Fragment>
						<UpperContainer2>
							<Button type="button" handleClick={this.changeTab} name="Back" id="back"/>
					{
						this.state.editfeestructure ? null :
						<React.Fragment>
							<SelectDiv>
								<select name="class" id="class" onChange={this.handleChange}>
								  <option value="class">Select Class</option>
								  {
								  	this.renderClasses()
								  }
								</select>
								<select name="category" id="category" onChange={this.handleChange}>
								  <option value="category">Select Category</option>
								  <option value="Open">Open</option>
								  <option value="SC">SC</option>
								  <option value="ST">ST</option>
								  <option value="OBC">OBC</option>
								  <option value="VJ">VJ</option>
								  <option value="NT">NT</option>
								  <option value="ESBC">ESBC</option>
								  <option value="Non-Resident">Non-Resident</option>
								  <option value="Other">Other</option>
								</select>
							</SelectDiv>
						</React.Fragment>
					}
						</UpperContainer2>
						<BottomContainer>
							<EditFeeStructure editfeestructure={this.state.editfeestructure} 
							isFetching={this.state.isFetching} handleSubmit={this.handleSubmit} 
							th={['Admission Fee', 'Development Fee', 'Library Fee', 'Security Fee', 
							'Tution Fee', 'Labarotary Fee', 'Transport Fee', 'Exam Fee', 'Sports Fee', 'Stationary Fee']}/>
						</BottomContainer>
					</React.Fragment>
					:
					<React.Fragment>
						<UpperContainer>
							<Button type="button" handleClick={this.changeTab2} name="Create / Edit Structure" id="createeditstructure"/>
							<SelectDiv2>
								<select name="class" id="class" onChange={this.handleChange}>
								  <option value="class">Select Class</option>
								  {
								  	this.renderClasses()
								  }
								</select>
							<Button type="button" name="Search" handleClick={this.loadFeeStructures}/>
							</SelectDiv2>
							<FormContainer>
								<InputForm placeholder="Search"/>
							</FormContainer>
						</UpperContainer>
						<BottomContainer>
						{
							this.state.isFetching ? <Spinner /> :
							this.returnViewsTables()
						}
						</BottomContainer>
					</React.Fragment>
				}
				</React.Fragment>
			}
			</FeeStructureContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(FeeStructure)


// <ViewsTable admin Edit Delete
// th={['Sr No.', 'Class', 'Category', 'Admission Fee', 'Development Fee', 'Library Fee', 'Security Fee', 'Tution Fee', 'Labarotary Fee', 'Transport Fee', 'Exam Fee', 'Sports Fee', 'Stationary Fee']} 
// td={[['1', '5th', 'Open', '500', '1000', '200', '200', '2000', '200', '200', '500', '100', '100']]}/>


// loadClasses = () => {
	// 	if(this.props.classes) {
	// 		this.setState({class: this.props.classes[0].class})
	// 	}
	// }

	// componentDidMount() {
	// 	this.loadClasses()
	// }

	// componentDidUpdate(prevProps, prevState) {
	// 	if(prevProps.year !== this.props.year) {
	// 		this.loadClasses()
	// 	}
	// }