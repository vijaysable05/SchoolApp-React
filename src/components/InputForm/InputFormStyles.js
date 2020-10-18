import styled from 'styled-components';


export const LabelStyle = styled.label`
	font-size: 1.1em;
`

export const Input = styled.input`
	padding: 0.5em;
	margin: 0.5em;
	font-size: 1em;

	&:focus {
		outline: none;
	}
`

export const InputFormContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`
