import styled from 'styled-components';



export const EditFeeStructureContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	align-items: center;
	height: 15%;
	width: 100%;

	span {
		font-weight: bold;
		font-size: 20px;
		width: 50%;
	}

	div {
		width: 20%;

		input {
			width: 70%;
			border: none;
		}

		label {
			width: 10%;
		}
	}

	button {
		width: 10%;
	}
`

export const BottomContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 85%;
`

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 20%;

	div {
		height: 100%;
	}

	button {
		height: 100%;
		width: 12%;
		margin: 10px;
	}
`

export const FeeTitles = styled.div`
	display: flex;
	width: 100%;
	height: 13%;

	span {
		width: 50%;
		font-weight: bold;
		font-size: 17px;
	}
`

export const FeeInputContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 15%;

	span {
		font-size: 30px;
	}
`

export const FeeNameContainer = styled.div`
	display: flex;
	align-items: center;
	width: 40%;
	height: 100%;

	div {
		margin-left: 20px;
		height: 100%;
		width: 90%;

		input {
			align-text: center;
			height: 70%;
			width: 100%;
		}
	}

	span {
		width: 10%;
		cursor: pointer;
	}

`

export const FeeAmountContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 20%;
	height: 100%;
	width: 100%;

	div {
		height: 100%;
		width: 100%;
		margin-left: 9%;

		input {
			align-text: center;
			height: 70%;
			width: 40%;
		}
	}
`

export const FeeArrowContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40%;
	height: 100%;

	span {
		font-size: 40px;
	}
`
