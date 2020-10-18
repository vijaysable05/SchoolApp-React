import styled from 'styled-components';



export const FineAndReturnsContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const TitleContainer = styled.div`
	display: flex;
	height: 10%;
	width: 100%;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid #80808030;

	span {
		font-size: 30px;
		font-weight: bold;
	}
`

export const BottomContainer = styled.div`
	display: flex;
	height: 90%;
	width: 100%;
`

export const FineDescriptionContainer = styled.div`
	display: flex;
	height: 100%;
	width: 50%;
	flex-direction: column;
`

export const FineCollectionContainer = styled.div`
	display: flex;
	height: 100%;
	width: 50%;
	flex-direction: column;
`

export const DescribeContainer = styled.div`
	display: flex;
	margin: 10%;
	width: 100%;
	height: 60%;
	flex-direction: column;
	align-items: center;
`

export const DescribeTitleContainer = styled.div`
	display: flex;
	width: 100%;
	height: 10%;

	span {
		font-size: 20px;
		font-weight: bold;
	}
`

export const DescribeInputContainer = styled.div`
	display: flex;
	width: 100%;
	height: 40%;

	div {
		width: 100%;

		input {
			font-size: 15px;
			width: 50%;
			height: 45%;
			text-align: center;
		}
	}
`

export const NoteContainer = styled.div`
	display: flex;
	width: 50%;
	height: 20%;
	align-self: flex-start;
`

export const ButtonContainer = styled.div`
	display: flex;
	width: 100%;
	height: 10%;

	button {
		margin-top: 5%;
		width: 20%;
		height: 100%;
	}
`

export const FineCollectionSubContainer = styled.div`
	display: flex;
	margin-top: 7%;
	width: 100%;
	height: 60%;
	flex-direction: column;
	align-items: center;
`

export const FineCollectionTop = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 20%;

	span {
		font-size: 20px;
		font-weight: bold;
	}
`

export const SelectDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 1.1em;
	width: 60%;
	margin-left: 20px;

	select {
		height: 5vh;
		width: 50%;
		margin: 7px;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`

export const FineCollectionBottom = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 70%;
`

export const TotalAndMonthContainer = styled.div`
	display: flex;
	width: 100%;
	height: 50%;
`

export const SpanContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	width: 50%;

	span {
		font-size: 20px;
		font-weight: bold;
	}
`

export const MemberContainer = styled.div`
	display: flex;
	width: 100%;
	height: 50%;
`