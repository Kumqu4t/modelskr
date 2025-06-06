import React from "react";

function Footer() {
	const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;

	return (
		<footer style={styles.footer}>
			<p style={styles.text}>© 2025 modelsKR. All rights reserved.</p>
			<div style={styles.links}>
				<a href="/legal" style={styles.link}>
					개인정보 처리방침
				</a>
				<a href="/legal" style={styles.link}>
					이용 약관
				</a>
				<a
					href={`mailto:${adminEmail}?subject=ModelsKR 문의사항`}
					style={styles.link}
				>
					문의하기
				</a>
			</div>
		</footer>
	);
}

const styles = {
	footer: {
		backgroundColor: "#f1f1f1",
		padding: "20px",
		textAlign: "center",
		marginTop: "20px",
	},
	text: {
		margin: "5px 0",
	},
	links: {
		display: "flex",
		justifyContent: "center",
		gap: "15px",
	},
	link: {
		color: "#333",
		textDecoration: "none",
	},
};

export default Footer;
