const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const linkifyDescription = (text, people) => {
	let result = text;

	// 1. 인물 이름 링크 처리
	people.forEach((person) => {
		const escapedName = escapeRegExp(person.name);
		const regex = new RegExp(`(${escapedName})`, "g");
		const link =
			person.type === "model"
				? `/models/${person._id}`
				: `/photographers/${person._id}`;
		result = result.replace(
			regex,
			`<span class="link-name" onclick="window.location='${link}'">$1</span>`
		);
	});

	// 2. URL 자동 링크 처리
	result = result.replace(
		/(https?:\/\/[^\s]+)/g,
		'<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
	);

	// 3. 줄바꿈 처리
	result = result.replace(/\n/g, "<br />");

	return result;
};

export { linkifyDescription };
