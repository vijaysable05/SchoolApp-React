import React from 'react';

import {AddTimetableContainer, TitleContainer, UpperContainer, 
	ClassContainer, BottomContainer, TableContainer,
	FormContainer, SelectDiv, ButtonDiv2} from './AddTimetableStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import ViewTable from '../ViewsTable/ViewsTable.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import {RemoveTimetable} from '../../redux/class/ClassActions.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

let update = []

class AddTimetable extends React.Component {
	constructor() {
		super()
		this.state = {
			periods: [],
			array: [],
			counter: 1,
			selectedClass: null,
			selectedDivision: null,
			isFetching: false,
			message: null,
			update: null
		}
	}

	loadClasses = () => {
		if(this.props.classes) {
			this.setState({selectedClass: this.props.classes[0].class, selectedDivision: this.props.classes[0].divisions[0].division})
		}
	}

	handleChange = (e, id) => {
		
		if(update.length > 0) {
			let period = update.find((sub) => {
				return sub.id === id
			})

			if(period) {
				period.periods[e.target.id.slice(0, -1)] = e.target.value
			} else {
				update.push({
					id: id,
					periods:{
						[e.target.id.slice(0, -1)]: e.target.value
					}
				})
			}
		} else {
			update.push({
				id: id,
				periods:{
					[e.target.id.slice(0, -1)]: e.target.value
				}
			})
		}
	}

	addInputForms2 = () => {
		if(this.props.timetable) {
			let array1 = []
			let counter2 = 1

			this.props.timetable.periods.forEach((sub) => {
				array1.push([sub.srno, 
					<InputForm type="time" defaultValue={sub.starttime} id={`starttime${sub.srno}`} handleChange={(e) => {this.handleChange(e, sub._id)}} />, 
					<InputForm type="time" defaultValue={sub.endtime} id={`endtime${sub.srno}`} handleChange={(e) => {this.handleChange(e, sub._id)}} />, 
					<InputForm type="text" defaultValue={sub.mondaysubject} id={`mondaysubject${sub.srno}`} handleChange={(e) => {this.handleChange(e, sub._id)}} />, 
					<InputForm type="text" defaultValue={sub.tuesdaysubject} id={`tuesdaysubject${sub.srno}`} handleChange={(e) => {this.handleChange(e, sub._id)}} />, 
					<InputForm type="text" defaultValue={sub.wednesdaysubject} id={`wednesdaysubject${sub.srno}`} handleChange={(e) => {this.handleChange(e, sub._id)}} />,
					<InputForm type="text" defaultValue={sub.thursdaysubject} id={`thursdaysubject${sub.srno}`} handleChange={(e) => {this.handleChange(e, sub._id)}} />,
					<InputForm type="text" defaultValue={sub.fridaysubject} id={`fridaysubject${sub.srno}`} handleChange={(e) => {this.handleChange(e, sub._id)}} />,
					<InputForm type="text" defaultValue={sub.saturdaysubject} id={`saturdaysubject${sub.srno}`} handleChange={(e) => {this.handleChange(e, sub._id)}} />]
				)
				counter2 = counter2 + 1
			})

			this.setState((prevState) => ({
				counter: counter2,
				array: array1,
				selectedClass: this.props.timetable.class,
				selectedDivision: this.props.timetable.division
			}))
			document.getElementById("division").value = this.props.timetable.division
			document.getElementById("class").value = this.props.timetable.class
		}
	}
	

	componentDidMount() {
		this.loadClasses()
		if(this.props.timetable) {
			this.addInputForms2()
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.classes !== this.props.classes) {
			this.loadClasses()
		}
		if(prevProps.year !== this.props.year) {
			this.loadClasses()
		}
	}

	componentWillUnmount() {
		if(this.props.timetable) {
			this.props.RemoveTimetable()
		}
	}

	renderClasses = () => {
		let data = []
		if(this.props.classes) {
			this.props.classes.forEach((cls) => {
				data.push(<option id={cls.classid} key={cls.class} value={cls.class}>{cls.class}</option>)
			})
		}
		return data
	}

	renderDivisions = () => {
		if(this.props.classes) {
			if(this.state.selectedClass){

				let class1 = this.state.selectedClass
				let data = []
				if(this.props.classes) {
					let class2 = this.props.classes.find((cls) => {
						return cls.class === class1
					})

					class2.divisions.forEach((div) => {
						data.push(<option key={div.division} value={div.division}>{div.division}</option>)
					})
				}

				return data
			}
		}
	}

	selectClass = (e) => {
		this.setState({selectedClass: e.target.value})
		let class1 = e.target.value
		let class2 = this.props.classes.find((cls) => {
			return cls.class === class1
		})
		if(class2.divisions.length > 0) {
			this.setState({selectedDivision: class2.divisions[0].division})
			document.getElementById("division").value = class2.divisions[0].division
		} else {
			this.setState({selectedDivision: null})
		}
	}

	selectDivision = (e) => {
		this.setState({selectedDivision: e.target.value})
	}

	addInputForms = () => {
		let array1 = []

		array1.push(this.state.counter, 
			<InputForm type="time" id={`starttime${this.state.counter}`} />, 
			<InputForm type="time" id={`endtime${this.state.counter}`} />, 
			<InputForm type="text" id={`mondaysubject${this.state.counter}`} />, 
			<InputForm type="text" id={`tuesdaysubject${this.state.counter}`} />, 
			<InputForm type="text" id={`wednesdaysubject${this.state.counter}`} />,
			<InputForm type="text" id={`thursdaysubject${this.state.counter}`} />,
			<InputForm type="text" id={`fridaysubject${this.state.counter}`} />,
			<InputForm type="text" id={`saturdaysubject${this.state.counter}`} />
			)

		this.setState((prevState) => ({
			counter: prevState.counter + 1,
			...prevState.array.push(array1)
		}))
	}

	handleSubmit = async() => {
		let array = []

		let length = document.getElementsByTagName('input').length
		let length2 = length / 8

		for(let i=1;i<=length2;i++) {
			for(let j=i*8-8;j<i*8;j++) {
				if(document.getElementsByTagName('input')[j].id.includes(`${i}`)) {
					if(document.getElementsByTagName('input')[j].id.includes(`${i}`)) {
						array[`${i-1}`] = {...array[`${i-1}`], srno: i, [document.getElementsByTagName('input')[j].id.replace(`${i}`,'')]: document.getElementsByTagName('input')[j].value}
					}
				}
			}
		}

		this.setState({isFetching: true})
		const division = document.getElementById("division").value
		const class1 = document.getElementById('class').value

		let url = `${process.env.REACT_APP_API_URL}/createtimetable`

		if(this.props.currentUser.hasOwnProperty('admin')) {

			const response = await fetch(url, {
			method: 'POST',
			headers: { 
		        "Content-type": "application/json; charset=UTF-8",
		        'Authorization': 'Bearer ' + this.props.currentUser.token
		    },
		    body: JSON.stringify({
		    	year: this.props.year,
		    	class: class1,
		    	division: division,
		    	periods: array
		    }), 
		})

		const data = await response.json()
		this.setState({message: data})
		this.returnMessage()
		}
		this.setState({isFetching: false})

	}

	handleSubmit2 = async() => {
		let array = []

		let length = document.getElementsByTagName('input').length
		let length2 = length / 8

		let counter = 0
		
		for(let i=this.props.timetable.periods.length+1;i<=length2;i++) {
			for(let j=i*8-8;j<i*8;j++) {
				if(document.getElementsByTagName('input')[j].id.includes(`${i}`)) {
					if(document.getElementsByTagName('input')[j].id.includes(`${i}`)) {
						array[`${counter}`] = {...array[`${counter}`], srno: i, [document.getElementsByTagName('input')[j].id.replace(`${i}`,'')]: document.getElementsByTagName('input')[j].value}
					}
				}
			}
			counter = counter + 1
		}

		this.setState({isFetching: true})
		const division = document.getElementById("division").value
		const class1 = document.getElementById('class').value
		
		let url = `${process.env.REACT_APP_API_URL}/updatetimetable`

		if(this.props.currentUser.hasOwnProperty('admin')) {

			const response = await fetch(url, {
			method: 'PATCH',
			headers: { 
		        "Content-type": "application/json; charset=UTF-8",
		        'Authorization': 'Bearer ' + this.props.currentUser.token
		    },
		    body: JSON.stringify({
		    	year: this.props.year,
		    	class: class1,
		    	division: division,
		    	update: update,
		    	periods: array
		    }), 
		})

		const data = await response.json()
		this.setState({message: data})
		this.returnMessage()
		}
		this.setState({isFetching: false})

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
			this.props.isLoading ? <Spinner /> :
			<AddTimetableContainer>
			<ToastContainer />
				<UpperContainer>
					<TitleContainer>
						<span> Add/Edit Time Table </span>
					</TitleContainer>
					<ClassContainer>
							<SelectDiv>
								<label htmlFor="class">Class:</label>
									<select name="Class" id="class" onChange={this.selectClass}>
									{
										this.renderClasses()
									}
								</select>
								<label htmlFor="division">Division:</label>
									<select name="Division" id="division" onChange={this.selectDivision}>
									{
										this.renderDivisions()
									}
								</select>
							</SelectDiv>
					</ClassContainer>
				</UpperContainer>
				{
					this.state.isFetching ? <Spinner /> :
					<BottomContainer>
						<TableContainer>
							<ViewTable th={['Sr no.', 'Start-Time', 'End-Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']} 
							td={this.state.array}/>
						</TableContainer>
						<FormContainer>
							<ButtonDiv2>
								<Button name="Add Period" type="button" handleClick={this.addInputForms}/>
								<Button name="Save" type="button" handleClick={this.props.timetable ? this.handleSubmit2 : this.handleSubmit}/>
							</ButtonDiv2>
						</FormContainer>
					</BottomContainer>
				}
			</AddTimetableContainer>
			)
	}
}

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
	year: state.user.year,
	isLoading: state.user.isLoading,
	classes: state.class.classes,
	timetable: state.class.timetable
})

const mapDispatchToProps = (dispatch) => ({
	LoadingStart: () => dispatch(LoadingStart()),
	LoadingEnd: () => dispatch(LoadingEnd()),
	RemoveTimetable: () => dispatch(RemoveTimetable())
})


export default connect(mapStateToProps, mapDispatchToProps)(AddTimetable);








// for(let i=1;i<=length2;i++) {
// 	for(let j=0;j<length;j++) {
// 		if(document.getElementsByTagName('input')[j].id.includes(`${i}`)) {
// 			if(document.getElementsByTagName('input')[j].id.includes(`${i}`)) {
// 				array[`${i-1}`] = {...array[`${i-1}`], srno: i, [document.getElementsByTagName('input')[j].id.replace(`${i}`,'')]: document.getElementsByTagName('input')[j].value}
// 			}
// 		}
// 	}
// }


