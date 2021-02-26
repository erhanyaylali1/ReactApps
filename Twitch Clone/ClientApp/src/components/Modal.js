import React from 'react'
import ReactDOM from 'react-dom';

const Modal = ({title, question, onDismiss, onSuccess, stream}) => {

	return ReactDOM.createPortal(
		(
			<div onClick={onDismiss} className="ui dimmer modals visible active">
				<div className="ui standard modal visible active" 
					onClick={(e) => e.stopPropagation()}
					style={{backgroundColor: "transparent", height: "max-content", position: "relative"}}
				>
					<div className="header">{title}</div>
					<div className="content">
						<h3>{stream && stream.streamTitle}</h3>
						{question}
					</div>
					<div className="actions">
						<button onClick={onSuccess} className="ui primary button">Yes</button>
						<button onClick={onDismiss} className="ui button">No</button>
					</div>
				</div>
			</div>
		),document.getElementById('modal')
	)
}

export default Modal