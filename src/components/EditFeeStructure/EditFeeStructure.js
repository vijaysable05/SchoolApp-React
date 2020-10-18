import React from 'react';

import {EditFeeStructureContainer, UpperContainer, BottomContainer, 
	FeeTitles, FeeInputContainer, FeeNameContainer, 
	FeeAmountContainer, FeeArrowContainer, ButtonContainer} from './EditFeeStructureStyles.js';

import InputForm from '../InputForm/InputForm.js';
import Button from '../Button/Button.js';

import {connect} from 'react-redux';

import {LoadingStart, LoadingEnd} from '../../redux/user/UserActions.js';
import Spinner from '../spinner/Spinner.js';

let count = 1;

class EditFeeStructure extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			totalArray: [0],
			total: 0,
			singleArray: [],
			dataArray: this.props.th
		}
	}

	calculateTotal = () => {
		const arr = document.getElementsByTagName('input');
		let tot=0

	    for(var i=1;i<arr.length;i++){
	        if(!isNaN(parseFloat(arr[i].value)))
	            tot = tot + parseFloat(arr[i].value)
	    }

	    document.getElementById("total").value = tot
	    // this.setState({total: tot})
	}

	renderFeeInput() {

		const data = []

		if(this.props.editfeestructure) {

			this.props.editfeestructure.feesStructure.forEach((t)=> {
				data.push(
					<FeeInputContainer className="feeinputs" key={t.feename}>
						<FeeNameContainer>
							<span onClick={() => this.deleteSingleFeeState(t)}> &#128465; </span>
							<InputForm placeholder="Name" defaultValue={t.feename}/>
						</FeeNameContainer>
						<FeeArrowContainer>
							<span> &#8680; </span>
						</FeeArrowContainer>
						<FeeAmountContainer>
							<InputForm defaultValue={t.feeamount} placeholder="Amount" id={`${t.feename}qty`} />
						</FeeAmountContainer>
					</FeeInputContainer>
				)
			})
		} else {
			this.state.dataArray.forEach((t)=> {
				data.push(
					<FeeInputContainer className="feeinputs" key={t}>
						<FeeNameContainer>
							<span onClick={() => this.deleteSingleFeeState(t)}> &#128465; </span>
							<InputForm placeholder="Name" defaultValue={t}/>
						</FeeNameContainer>
						<FeeArrowContainer>
							<span> &#8680; </span>
						</FeeArrowContainer>
						<FeeAmountContainer>
							<InputForm placeholder="Amount" id={`${t}qty`} />
						</FeeAmountContainer>
					</FeeInputContainer>
				)
			})
		}

		return data;
	}

	renderSingleFeeInput = () => {
		let data = []
		this.state.singleArray.forEach((t) => {
			data.push(
				<FeeInputContainer className="feeinputs" key={t}>
					<FeeNameContainer>
						<span onClick={() => this.deleteSingleFeeState(t)}> &#128465; </span>
						<InputForm placeholder="Name" />
					</FeeNameContainer>
					<FeeArrowContainer>
						<span> &#8680; </span>
					</FeeArrowContainer>
					<FeeAmountContainer>
						<InputForm placeholder="Amount" id="qty" />
					</FeeAmountContainer>
				</FeeInputContainer>
			)
		}
		)
		return data;
	}

	changeSingleFeeState = () => {

		this.setState((prevState) => ({
			...prevState.singleArray.push(count)
		}))

		count = count + 1
	}

	deleteSingleFeeState = (t) => {

		this.setState((prevState) => ({
			singleArray: prevState.singleArray.filter(function(item) {
												    return t !== item
												}),
			dataArray: prevState.dataArray.filter(function(item) {
												    return t !== item
												})
		}))
	}


	render() {
		return (
			this.props.isFetching ? <Spinner /> :
			<EditFeeStructureContainer>
				<UpperContainer>
					<span> Create New Fee Structure </span>
					<InputForm name="Total" id="total" />
					<Button type="button" name="Calculate Total" handleClick={this.calculateTotal} />
				</UpperContainer>
				<BottomContainer>
					<FeeTitles>
						<span> Fee Name </span>
						<span> Fee Amount </span>
					</FeeTitles>
					{
						this.renderFeeInput()
					}
					{
						this.renderSingleFeeInput()
					}
					<ButtonContainer>
						<Button type="button" name="Add New" id="addnew" handleClick={this.changeSingleFeeState} />
						<Button type="button" name="Create Structure" handleClick={this.props.handleSubmit}/>
					</ButtonContainer>
				</BottomContainer>
			</EditFeeStructureContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditFeeStructure);