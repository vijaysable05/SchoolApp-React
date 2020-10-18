import React from 'react';

import {HeaderContainer, OptionContainer, OptionsContainer, Option} from './HeaderStyles.js';



const Header = () => {

		return (
			
			<HeaderContainer>
				<OptionContainer>
					<Option to='/'> Home </Option>
				</OptionContainer>
				<OptionsContainer>
					<Option to='/login'>Login</Option>
					<Option to='/contact'>Contact</Option>
				</OptionsContainer>
			</HeaderContainer>

		)

}







export default Header;