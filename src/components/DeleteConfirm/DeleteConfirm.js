import React from 'react';

import Modal from 'react-modal';

import { ModalHeading, ModalButtons } from './DeleteConfirmStyles.js';
import Button from '../Button/Button.js';

Modal.setAppElement('#root')

const DeleteConfirm = (openModal, handleEdit, handleConfirm) => {
	return (

		<Modal isOpen={openModal}
			onRequestClose={handleEdit}
			closeTimeoutMS={200}
			 style={{
			    overlay: {
			      position: 'fixed',
			      transition: '2000ms ease-in-out',
			      top: 0,
			      left: 0,
			      right: 0,
			      bottom: 0,
			      backgroundColor: 'rgba(255, 255, 255, 0.75)'
			    },
			    content: {
			      display: "flex",
				  flexDirection: "column",
			      height: "30%",
			      width: "35%",
			      position: 'absolute',
			      top: '10%',
			      left: '35%',
			      right: '35%',
			      bottom: '30%',
			      border: '1px solid black',
			      background: '#fff',
			      overflow: 'auto',
			      WebkitOverflowScrolling: 'touch',
			      borderRadius: '4px',
			      outline: 'none',
			      padding: '20px',
			    }
			  }}>
			<ModalHeading>
				<h4> Are you sure you want to delete this record? It will be permanently deleted from the system </h4>
			</ModalHeading>
				<ModalButtons>
					<Button type='button' name='Confirm' handleClick={handleConfirm}/>
					<Button type='button' name='Cancel' handleClick={handleEdit}/>
				</ModalButtons>
			</Modal>

		)
}


export default DeleteConfirm;


// <ModalBody>
// 				<ModalSpan> <b>Book Name:</b>&nbsp;&nbsp;&nbsp; {this.state.modalBookname ? this.state.modalBookname : null} </ModalSpan>
// 				<ModalSpan> <b>Issued To:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.modalIssuedto ? this.state.modalIssuedto : null} </ModalSpan>
// 				<ModalSpan> <b>Issued On:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.modalIssuedon ? this.state.modalIssuedon : null} </ModalSpan>
// 				<ModalSpan> <b>Issued Till:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.modalIssuedtill ? this.state.modalIssuedtill : null} </ModalSpan>
// 				<ModalSpan> <b>Fine:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.fine ? this.state.fine : null} </ModalSpan>
// 			</ModalBody>