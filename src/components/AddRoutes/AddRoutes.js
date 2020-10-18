import React from 'react';

import {AddRoutesContainer, UpperContainer, SelectDiv, BottomContainer, 
	RouteInput, ButtonContainer, BottomContainer1, BottomContainer2} from './AddRoutesStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

import Toast from '../Toast/Toast.js';
import { ToastContainer } from 'react-toastify';

let counter = 1

class AddRoutes extends React.Component {
	constructor() {
		super()
		this.state = {
			routeform: [counter],
			buses: null,
			message: null
		}
	}

	loadBuses = async() => {
		this.setState({buses: []})
		
		let url = `${process.env.REACT_APP_API_URL}/getbuses/0/0/driverfirstname:asc`
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

				data.forEach((bus) => {
					array.push({busno: bus.busno, id: bus._id})
				})

				this.setState({buses: array})
				await this.props.LoadingEnd()

				if(this.props.route) {
					document.getElementById('bus').value = this.props.route.busid._id
				}

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	componentDidMount() {
		this.loadBuses()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadBuses()
		}
	}

	renderBuses = () => {
		let data = []
		if(this.state.buses) {
			this.state.buses.forEach((bs) => {
				data.push(<option key={bs.id} value={bs.id}>{bs.busno}</option>)
			})
		}
		return data
	}

	addRoute = () => {
		this.setState((prevState) => ({
			...prevState.routeform.push(counter)
		}))
		counter = counter + 1
	}

	removeRoute = (e) => {

		const index = this.state.routeform.indexOf(e[0])

			this.setState((prevState) => ({
				...prevState.routeform.splice(index, 1)
			}))

		counter = counter - 1
	}

	renderAddRoute = () => {
		let data = []

		this.state.routeform.forEach((e) => {
			data.push(<RouteInput className={`Routes`} key={e}>
				<InputForm placeholder={`Route`} />
				<InputForm placeholder={`Stops`} />
				<Button type="button" name="Remove" handleClick={() => this.removeRoute([e])}/>
				</RouteInput>)
		})
	
		return data
	}

	renderAddRoute2 = () => {
		let data = []

		if(this.props.route) {
			data.push(<RouteInput className={`Routes`} key={this.props.route.route.route}>
				<InputForm placeholder={`Route`} defaultValue={this.props.route.route.route}/>
				<InputForm placeholder={`Stops`} defaultValue={this.props.route.route.stops.toString()}/>
				</RouteInput>)
		}

		return data
	}

	handleSubmit = async() => {

		let array = []
		const length = document.getElementsByClassName("Routes").length
		let routes = document.getElementsByClassName("Routes")

		for(let i=0;i<length;i++) {
			let route = routes[i].children[0].children[0].value
			let stops = routes[i].children[1].children[0].value.split(',')
			if(route === '' || stops === '') {
				
			} else {
				array.push({route: route, stops: stops})
			}
		}

		let busid = document.getElementById('bus').value

		if(this.props.route) {
			let url = `${process.env.REACT_APP_API_URL}/updatebusroutes?year=${this.props.year}&routeid=${this.props.route._id}`

			if(this.props.currentUser.hasOwnProperty('admin')) {
				this.props.LoadingStart()
				const response = await fetch(url, {
					method: 'PATCH',
					headers: { 
				        "Content-type": "application/json; charset=UTF-8",
				        'Authorization': 'Bearer ' + this.props.currentUser.token
				    },
				    body: JSON.stringify({
				    	routes: array
				    }), 
				})

				const data = await response.json()
				this.setState({message: data})
				this.returnMessage()
			}

		} else {
			let url = `${process.env.REACT_APP_API_URL}/addbustracking`

			if(this.props.currentUser.hasOwnProperty('admin')) {
				this.props.LoadingStart()
				const response = await fetch(url, {
					method: 'POST',
					headers: { 
				        "Content-type": "application/json; charset=UTF-8",
				        'Authorization': 'Bearer ' + this.props.currentUser.token
				    },
				    body: JSON.stringify({
				    	year: this.props.year,
				    	busid: busid,
				    	routes: array
				    }), 
				})

				const data = await response.json()
				this.setState({message: data})
				this.returnMessage()
			}
		}

		this.props.LoadingEnd()
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
			<AddRoutesContainer>
			<ToastContainer />
				{
					this.props.isLoading ? <Spinner /> :
					<React.Fragment>
					<UpperContainer>
						<SelectDiv>
							<label htmlFor="bus">Bus:</label>
								<select name="bus" id="bus">
								  {
								  	this.renderBuses()
								  }
								</select>
						</SelectDiv>
					</UpperContainer>
					<BottomContainer>
						<BottomContainer1>
								{
									this.props.route ?
									this.renderAddRoute2() :
									this.renderAddRoute()
								}
							<ButtonContainer>
							{
								this.props.route ? null : 
								<Button type="button" name="Add New" handleClick={this.addRoute}/>
							}
								<Button type="button" name="Save" handleClick={this.handleSubmit}/>
							</ButtonContainer>
						</BottomContainer1>
						<BottomContainer2>
							<span> <b>Note:</b> Please enter the stops in comma separated format with no spaces. </span>
						</BottomContainer2>
					</BottomContainer>
					</React.Fragment>
				}
			</AddRoutesContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(AddRoutes);



