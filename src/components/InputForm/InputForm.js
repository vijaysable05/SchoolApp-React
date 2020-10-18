import React from 'react';

import {LabelStyle, Input, InputFormContainer} from './InputFormStyles.js';

const InputForm = ({type="text", handleFocus, handleClick, list, id, name, handleChange, placeholder, pattern, required, multiple, key, defaultValue, value, readonly, disabled}) => {


	return (
		<InputFormContainer>
		{
			name ? <LabelStyle htmlFor={id}>{name}:</LabelStyle> : null
		}
			
			<Input onFocus={handleFocus} onClick={handleClick} list={list} multiple={multiple} required={required} onChange={handleChange} 
			type={type} id={id} name={name} placeholder={placeholder} pattern={pattern} 
			defaultValue={defaultValue} readOnly={readonly} disabled={disabled} value={value} />
		</InputFormContainer>
		)
}








export default InputForm;