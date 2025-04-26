import ClipLoader from "react-spinners/ClipLoader";

function Loading() {
	return (
		<div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
			<ClipLoader color="#3498db" size={40} />
		</div>
	);
}

export default Loading;
