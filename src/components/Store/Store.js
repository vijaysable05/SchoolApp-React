import React from 'react';

import {StoreContainer, TitleContainer, UpperContainer, BottomContainer} from './StoreStyles.js';

import Button from '../Button/Button.js';

import IssueGoods from '../IssueGoods/IssueGoods.js';
import VendorList from '../VendorList/VendorList.js';
import Stock from '../Stock/Stock.js';
import PurchaseHistory from '../PurchaseHistory/PurchaseHistory.js';
import IssueHistory from '../IssueHistory/IssueHistory.js';

class Store extends React.Component {
	constructor() {
		super()
		this.state = {
			issueGoods: true,
			vendorList: false,
			stock: false,
			purchaseHistory: false,
			issueHistory: false
		}
	}

	changeIssueGoods = () => {
		this.setState({issueGoods: true,
			vendorList: false,
			stock: false,
			purchaseHistory: false,
			issueHistory: false})
	}

	changeVendorList = () => {
		this.setState({issueGoods: false,
			vendorList: true,
			stock: false,
			purchaseHistory: false,
			issueHistory: false})
	}

	changeStock = () => {
		this.setState({issueGoods: false,
			vendorList: false,
			stock: true,
			purchaseHistory: false,
			issueHistory: false})
	}

	changePurchaseHistory = () => {
		this.setState({issueGoods: false,
			vendorList: false,
			stock: false,
			purchaseHistory: true,
			issueHistory: false})
	}

	changeIssueHistory = () => {
		this.setState({issueGoods: false,
			vendorList: false,
			stock: false,
			purchaseHistory: false,
			issueHistory: true})
	}


	render() {
		return (
			<StoreContainer>
				<TitleContainer>
					<span> Store </span>
				</TitleContainer>
				<UpperContainer>
					<Button type="button" name="Issue Goods" handleClick={this.changeIssueGoods}/>
					<Button type="button" name="Vendor List" handleClick={this.changeVendorList}/>
					<Button type="button" name="Stock" handleClick={this.changeStock} />
					<Button type="button" name="Purchase History" handleClick={this.changePurchaseHistory} />
					<Button type="button" name="History" handleClick={this.changeIssueHistory} />
				</UpperContainer>
				<BottomContainer>
					{
						this.state.issueGoods ? <IssueGoods /> :
						this.state.vendorList ? <VendorList /> :
						this.state.stock ? <Stock /> :
						this.state.purchaseHistory ? <PurchaseHistory /> :
						this.state.issueHistory ? <IssueHistory /> : null
					}
				</BottomContainer>	
			</StoreContainer>
		)
	}
}




export default Store;
