const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const linkifyDescription = (text, people) => {
	let result = text;
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
	return result;
};

export { linkifyDescription };
