import React from 'react';

import {PaymentContainer, TitleAndOptionsContainer, TitleContainer, OptionsContainer, BottomContainer} from './PaymentStyles.js';

import AcceptPayment from '../AcceptPayment/AcceptPayment.js';
import PaymentHistory from '../PaymentHistory/PaymentHistory.js';
import FeeStructure from '../FeeStructure/FeeStructure.js';

import Button from '../Button/Button.js';

class Payment extends React.Component {
	constructor() {
		super()
		this.state = {
			name: "acceptpayment"
		}
	}

	renderBottom() {
		if(this.state.name === "acceptpayment") {
			return <AcceptPayment />
		} else if(this.state.name === "history") {
			return <PaymentHistory />
		} else if(this.state.name === "feestructure") {
			return <FeeStructure />
		}
	}

	render() {
		return (
			<PaymentContainer>
				<TitleAndOptionsContainer>
					<TitleContainer>
						<span> Payment </span>
					</TitleContainer>
					<OptionsContainer>
						<Button type="button" name="Accept payment" handleClick={() => this.setState({name: "acceptpayment"})}/>
						<Button type="button" name="History" handleClick={() => this.setState({name: "history"})}/>
						<Button type="button" name="Fee Structure" handleClick={() => this.setState({name: "feestructure"})}/>
					</OptionsContainer>
				</TitleAndOptionsContainer>
				<BottomContainer>
					{
						this.renderBottom()
					}
				</BottomContainer>
			</PaymentContainer>
		)
	}
}


export default Payment;
