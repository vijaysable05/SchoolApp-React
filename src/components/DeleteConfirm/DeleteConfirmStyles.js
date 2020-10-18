import styled from 'styled-components';

export const ModalHeading = styled.div`
	display: flex;
	height: 50%;
	margin-left: 10%;
	align-items: center;
	justify-content: space-between;
`

export const ModalBody = styled.div`
	display: flex;
	height: 80%;
	margin-top: 2%;
	justify-content: center;
	flex-direction: column;
`

export const ModalSpan = styled.span`
	height: 15%;
	font-size: 1.5rem;
	margin-left: 10%;
`

export const ModalButtons = styled.div`
	height: 50%;
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin-bottom: 2%;
	
	button {
		width: 20%;
	}
`
	