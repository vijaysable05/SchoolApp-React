import React from 'react';

import {AttendanceTableContainer, UpperContainer, BottomContainer, SelectDiv, TableContainer, SpanContainer} from './AttendanceTableStyles.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';

import Button from '../Button/Button.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';

import Spinner from '../spinner/Spinner.js';

import moment from 'moment';

class AttendanceTable extends React.Component {
	constructor() {
		super()
		this.state = {
			month: "January", 
			year: 2019,
			selectedClass: null,
			selectedDivision: null,
			isFetching: false,
			isShown: false,
			attendance: null
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

	loadClasses = () => {
		if(this.props.classes) {
			this.setState({selectedClass: this.props.classes[0].class, selectedDivision: this.props.classes[0].divisions[0].division})
		}
	}

	componentDidMount() {
		this.loadClasses()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.classes !== this.props.classes) {
			this.loadClasses()
		}
		if(prevProps.year !== this.props.year) {
			this.loadClasses()
		}
	}

	returnMonthDays = () => {
		let {month} = this.state
		let {year} = this.state

		let data = ["Name"]

		if(month === 'January'|| month ==='March'|| month ==='May'|| month ==='July'|| 
			month ==='August'|| month ==='October'|| month ==='December') {
			for(let i=1;i<=31;i++) {
				data.push(i)
			}
		} else if(month === 'April'|| month ==='June'|| month ==='September'|| month ==='November') {
			for(let i=1;i<=30;i++) {
				data.push(i)
			}
		} else if(month === 'February') {
			if(year%400 === 0 || year%4 === 0) {
				for(let i=1;i<=29;i++) {
					data.push(i)
				}
			} else {
				for(let i=1;i<=28;i++) {
					data.push(i)
				}
			}
		} else {
			return null;
		}
		return data
	}

	setMonth = (e) => {
		const mnth = e.target.value
		this.setState({month: mnth})
	}

	setYear = (e) => {
		const yr = Number(e.target.value)
		this.setState({year: yr})
	}

	handleSubmit = async() => {

		let url = null

		if(this.props.student) {
			url = `${process.env.REACT_APP_API_URL}/getstudentattendancebyclassandmonth?month=${this.state.month}&year=${this.state.year}&class=${this.state.selectedClass}&division=${this.state.selectedDivision}`
		} else if(this.props.staff) {
			url = `${process.env.REACT_APP_API_URL}/getstaffattendancebymonth?month=${this.state.month}&year=${this.state.year}`
		} else if(this.props.self) {
			if(this.props.currentUser.hasOwnProperty('student')) {
				url = `${process.env.REACT_APP_API_URL}/getstudentattendancebymonth/${this.props.currentUser.student._id}?month=${this.state.month}&year=${this.state.year}`
			} else if(this.props.currentUser.hasOwnProperty('staff')) {
				url = `${process.env.REACT_APP_API_URL}/getstaffattendancebystaffid/${this.props.currentUser.staff._id}?month=${this.state.month}&year=${this.state.year}`
			}
		}
		
		let array = []

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

			if(data.length > 0) {

				data.forEach((att) => {
					let data2 = []

					if(att.studentname) {
						data2.push(att.studentname)
					} else if(att.staffname) {
						data2.push(att.staffname)
					}

					let {month} = this.state
					let {year} = this.state

					if(month === 'January'|| month ==='March'|| month ==='May'|| month ==='July'|| 
						month ==='August'|| month ==='October'|| month ==='December') {
						for(let i=1;i<=31;i++) {
							data2.push('_')
						}
					} else if(month === 'April'|| month ==='June'|| month ==='September'|| month ==='November') {
						for(let i=1;i<=30;i++) {
							data2.push('_')
						}
					} else if(month === 'February') {
						if(year%400 === 0 || year%4 === 0) {
							for(let i=1;i<=29;i++) {
								data2.push('_')
							}
						} else {
							for(let i=1;i<=28;i++) {
								data2.push('_')
							}
						}
					}

					const length = data2.length

					for(let i=1;i<=length;i++) {
						att.attendance.forEach((atten) => {
							if(moment(atten.date).format('D') === String(i)) {
								data2[i] = atten.status
							}
						})
					}

					array.push(data2)
				})

				this.setState({attendance: array, isFetching: false, isShown: true})

			} else {
				this.setState({attendance: array, isFetching: false, isShown: false})
				return;
			}
		}
	}

	returnTable = () => {
		if(this.state.isShown) {
			return (
				<BottomContainer>
					<TableContainer>
						<ViewsTable
						th={this.returnMonthDays()} 
						td={this.state.attendance ? this.state.attendance : this.returnMonthDays()}/>
					</TableContainer>
				</BottomContainer>
				)
		} else {
			return null
		}
	}

	returnClassAndDivisions = () => {
		if(!this.props.currentUser.hasOwnProperty('student')) {
			if(this.props.student) {
				return (

					<React.Fragment> 
						<select name="class" id="class" onChange={this.selectClass} >
						  {
						  	this.renderClasses()
						  }
						</select>
						<select name="division" id="division" onChange={this.selectDivision} >
						  {
						  	this.renderDivisions()
						  }
						</select>
					</React.Fragment>

					)
			} else {
				return null
			}
		}
	}

	
	render() {
		return (
			<AttendanceTableContainer>
				<UpperContainer>
					<SelectDiv>
							<select name="year" id="year" onChange={this.setYear}>
							  <option value="2019">2019</option>
							  <option value="2020">2020</option>
							</select>
							<select name="month" id="month" onChange={this.setMonth}>
							  <option value="January">January</option>
							  <option value="February">February</option>
							  <option value="March">March</option>
							  <option value="April">April</option>
							  <option value="May">May</option>
							  <option value="June">June</option>
							  <option value="July">July</option>
							  <option value="August">August</option>
							  <option value="September">September</option>
							  <option value="October">October</option>
							  <option value="November">November</option>
							  <option value="December">December</option>
							</select>
							{
								this.returnClassAndDivisions()
							}
						</SelectDiv>
						<Button type="button" name="Submit" handleClick={this.handleSubmit}/>
						<SpanContainer>
							<span>P - PRESENT </span>
							<span>A - ABSENT </span>
							<span>HD - HALF DAY </span>
							<span>L - LEAVE </span>
							<span>WO - WEEK OFF </span>
							<span>H - HOLIDAY </span>
						</SpanContainer>
				</UpperContainer>
				{
					this.state.isFetching ? <Spinner /> :
					this.returnTable()
				}
			</AttendanceTableContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(AttendanceTable);