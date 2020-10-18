import styled from 'styled-components';



export const PaymentContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const TitleAndOptionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 20%;
	border-bottom: 1px solid #80808030;
`

export const TitleContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40%;
	border-bottom: 1px solid #80808030;

	span {
		font-size: 30px;
		font-weight: bold;
	}
`

export const OptionsContainer = styled.div`
	display: flex;
	width: 100%;
	height: 60%;

	button {
		width: 10%;
		height: 50%;
		margin: 20px;
	}
`

export const BottomContainer = styled.div`
	display: flex;
	height: 80%;
	width: 100%;
`