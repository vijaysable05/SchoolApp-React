import React from 'react';

import {HistoryContainer, TitleContainer, UpperContainer, BottomContainer} from './HistoryStyles.js';

import InputForm from '../InputForm/InputForm.js';

import ViewsTable from '../ViewsTable/ViewsTable.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';

import Spinner from '../spinner/Spinner.js';

import moment from 'moment';

class History extends React.Component {
	constructor() {
		super()
		this.state = {
			history: null
		}
	}

	loadHistory = async() => {
		this.setState({history: null})
		
		let url = `${process.env.REACT_APP_API_URL}/gethistory/0/0/issueddate:asc`
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

				data.forEach((hist) => {
					if(hist.studentid){
						array.push([hist.bookid.bookname, hist.bookid.edition, hist.bookid.publication, `${hist.studentid.firstname} ${hist.studentid.middlename} ${hist.studentid.lastname}`,
						`${moment(hist.issueddate).format("YYYY-DD-MM")} - ${moment(hist.returndate).format("YYYY-DD-MM")}`, `${hist.fine} | returned`,
						<span role="img" aria-label="delete">&#10060;</span>])
					} else if(hist.teacherid) {
						array.push([hist.bookid.bookname, hist.bookid.edition, hist.bookid.publication, `${hist.teacherid.firstname} ${hist.teacherid.middlename} ${hist.teacherid.lastname}`,
						`${moment(hist.issueddate).format("YYYY-DD-MM")} - ${moment(hist.returndate).format("YYYY-DD-MM")}`, `${hist.fine} | returned`,
						<span role="img" aria-label="delete">&#10060;</span>])
					}

				})

				this.setState({history: array})
				this.props.LoadingEnd()

			} else {
				this.props.LoadingEnd()
				return;
			}
		}
	}

	componentDidMount() {
		this.loadHistory()
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.year !== this.props.year) {
			this.loadHistory()
		}
	}

	
	render() {
		return (
			<HistoryContainer>
				<TitleContainer>
					<span> History </span>
				</TitleContainer>
				<UpperContainer>
					<InputForm placeholder="Search" />
				</UpperContainer>
				{
					this.props.isLoading ? <Spinner /> :
					<BottomContainer>
						<ViewsTable admin Delete 
						th={['Book Name', 'Editions', 'Publisher', 'Issued To', 'Date', 'Fine | Status']}
						td={this.state.history ? this.state.history : [['Null', 'Null', 'Null', 'Null', 'Null', 'Null', 'Null']]} />
					</BottomContainer>
				}
			</HistoryContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(History);
