import styled from 'styled-components'


export const ButtonStyle = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
	background-color: #2196f3d1;
	color: white;
	border: none;
	border-radius: 10px;
	font-size: 1em;
	width: 50%;

	&:hover {
		cursor: pointer;
		background-color: #2196f3;
	}

	&:focus {
		outline: none;
	}
`