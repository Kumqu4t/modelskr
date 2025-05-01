import { Helmet } from "react-helmet";

function DefaultHelmet({ title, description, image }) {
	const baseTitle = "modelsKR";
	const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
	const desc =
		description ||
		"한국 모델, 포토그래퍼, 에이전시 정보를 한눈에 볼 수 있는 사이트입니다.";
	const img = image || "../../public/SampleIco.ico";
	const url = window.location.href;

	return (
		<Helmet>
			<title>{fullTitle}</title>

			<meta name="description" content={desc} />

			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={desc} />
			<meta property="og:image" content={img} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={url} />
		</Helmet>
	);
}

export default DefaultHelmet;
