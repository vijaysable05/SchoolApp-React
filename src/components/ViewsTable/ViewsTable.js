import React from 'react';

import {ViewTableContainer, TableStyle} from './ViewsTableStyles.js';

import img from './print.png';

class ViewTable extends React.Component {
constructor(props) {
	super(props)
	this.state= {

	}
}


returnTh() {
	const {th} = this.props

	const data = th.map((t) => {
		return (<th key={`${t}${Math.floor(Math.random() * 100000)}`}>{t}</th>)
	})

	return data
}

returnEditDelete = () => {
	let data = []
	if (this.props.admin) {
		if(this.props.Edit) 
			data.push(<th key={`${this.props.Edit}${Math.floor(Math.random() * 100000)}`}>Edit</th>)
		if(this.props.Delete) 
			data.push(<th key={`${this.props.Delete}${Math.floor(Math.random() * 100000)}`}>Delete</th>)
		if(this.props.print) 
			data.push(<th key={`${this.props.print}${Math.floor(Math.random() * 100000)}`}>Print</th>)
		}
		return data
}

returnEditDelete2 = () => {
	let data = []
	if (this.props.admin) {
		if(this.props.Edit) 
			data.push(<td><span role="img" aria-label="edit">&#9997;</span></td>)
		if(this.props.Delete) 
			data.push(<td><span role="img" aria-label="delete">&#10060;</span></td>)
		if(this.props.print) 
			data.push(<td><img src={img} alt="img" height="10%" width="10%"/></td>)
		}
		return data
}

returnTd() {
	const {td} = this.props

	let data2 = []

	td.forEach((t, i) => {
		for(let j=0;j<t.length;j++) {
			
			data2.push(
		 			<td key={`${t[j]}${Math.floor(Math.random() * 100000)}`}>{t[j]}</td>
			)
		}
	})
	return data2
}

returnTr() {
	const {td} = this.props
	let data = []
	const data3 = this.returnTd()

	let arrays = [], size = td[0].length
    
	while (data3.length > 0)
	arrays.push(data3.splice(0, size))

	arrays.forEach((t, i) => {
		data.push(
			<tr key={`${i}${Math.floor(Math.random() * i)}`}>
		 		{t}
		 	</tr>
		)
	})
	
	return data
}

render(){
	return (

		<ViewTableContainer>
		
			<TableStyle className="myTable">
				<thead>
					<tr>
						{
							this.returnTh()
						}
						{
							this.returnEditDelete()
						}
					</tr>
				</thead>
				<tbody>
						{
							this.props.td.length ? this.returnTr() : null
						}
				</tbody>
			</TableStyle>
		
		</ViewTableContainer>

		)
}

}


export default ViewTable;

// returnTh2() {
// 	const {th} = this.props
// 	const keys = Object.keys(th)

// 	const data = keys.map((t) => {
// 		return (<th key={th[t]}>{th[t]}</th>)
// 	})

// 	return data
// }

// returnTd2() {
// 	const {td} = this.props

// 	let keys = Object.keys(td[0])
// 	let a = keys[0]
// 	console.log(td[0][a])
// 	let data2 = []

// 	td.forEach((t, i) => {
// 		for(let j=0;j<keys.length;j++) {
// 			data2.push(
// 		 			<td key={t[keys[j]]}>{t[keys[j]]}</td>
// 			)
// 		}
// 	})
// 	console.log(data2)
// 	return data2
// }

// returnTr2() {
// 	const {td} = this.props

// 	const data = []

// 	for(let i=0;i<td.length;i++) {
// 		data.push(
// 			<tr key={i}>
// 		 		{this.returnTd2()}
// 		 		{
// 			 		this.props.EditDelete ?
// 			 		<React.Fragment>
// 				 		<td><span role="img" aria-label="edit">&#9997;</span></td>
// 				 		<td><span role="img" aria-label="delete">&#10060;</span></td>
// 			 		</React.Fragment>
// 			 		: 
// 			 		this.props.print ? 
// 			 		<td><img src={img} alt="img" height="10%" width="10%"/></td> : null
// 		 		}
// 		 	</tr>
// 			)
// 	}
// 	return data
// }