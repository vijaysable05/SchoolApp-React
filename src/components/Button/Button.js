import React from 'react'

import {ButtonStyle} from './ButtonStyles.js';

const Button = ({type, id, value, name, handleSubmit, handleClick}) => {

	return (
		<ButtonStyle onClick={handleClick} onSubmit={handleSubmit} type={type} id={id} value={value} name={name}>
			{name}
		</ButtonStyle>

		)
}




export default Button;
