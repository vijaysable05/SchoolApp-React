import styled from 'styled-components';



export const ViewTutorialContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	width: 100%;
	height: 15%;
`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	height: 85%;
`

export const SelectDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 1.1em;
	width: 100%;
	border-bottom: 1px solid #80808030;

	select {
		height: 5vh;
		width: 15%;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`