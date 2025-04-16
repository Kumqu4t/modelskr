import React from "react";
import "../styles/Button.css";

function Button({ children, onClick, type = "default", disabled = false }) {
	return (
		<button className={`btn btn-${type}`} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
}

export default Button;
