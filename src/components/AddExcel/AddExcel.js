import React from 'react';

import {AddExcelContainer, Title, FormContainer, 
	ButtonContainer, Input, DescDiv, SelectDiv1, ButtonContainer1} from './AddExcelStyles.js';

import Button from '../Button/Button.js';
import img from './icon2.png';
import img2 from './excel.png';
import excel from './example.xlsx';

class AddExcel extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: ""
		}
	}

	setName = (e) => {
		const array = e.target.value.split('\\')
		const element = array[array.length - 1]
		console.log(typeof(element))
		this.setState({name: element})
	}

	render() {
	const {clickAddExcel} = this.props
	return (

		<AddExcelContainer>
			<Title>
				<span> Add Excel </span>
			</Title>
			<DescDiv>
				<span>Upload Student Excel</span>
				<p> Add multiple Student at once through our standard excel file</p>
			</DescDiv>
				<ButtonContainer1>
					<a href={excel} download><button type="button" id='download'>
					<img id="img2" src={img2} height="50%" width="10%" alt="img"/> 
					&nbsp;Download Excel</button></a>
				</ButtonContainer1>
			<FormContainer>
			<form>
				<SelectDiv1>
						<label htmlFor="class">Class:</label>
							<select name="Class" id="class">
							<option value="1">1st</option>
							<option value="2">2nd</option>
						</select>
						<label htmlFor="section">Section:</label>
							<select name="Section" id="section">
							<option value="A">A</option>
							<option value="B">B</option>
						</select>
				</SelectDiv1>
				<Input>
					<label htmlFor="myfile"><img id="imgid" src={img} alt="img"/><p>{this.state.name}</p></label>
					  <input type="file" id="myfile" name="myfile" onChange={this.setName}/>
				</Input>
				<ButtonContainer>
					<Button type="submit" name="Submit" id='submit'/>
					<Button handleClick={clickAddExcel} type="button" name="Back" id='back'/>
				</ButtonContainer>
			</form>
			</FormContainer>
		</AddExcelContainer>

		)

}
}



export default AddExcel;