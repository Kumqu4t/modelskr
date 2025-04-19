import "./Pagination.css";

function Pagination({ totalItems, itemLimit, currentPage, onPageChange }) {
	const totalPages = Math.ceil(totalItems / itemLimit);

	return (
		<div className="pagination">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				이전
			</button>

			{Array.from({ length: totalPages }, (_, i) => (
				<button
					key={i + 1}
					className={currentPage === i + 1 ? "active" : ""}
					onClick={() => onPageChange(i + 1)}
				>
					{i + 1}
				</button>
			))}

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				다음
			</button>
		</div>
	);
}

export default Pagination;
