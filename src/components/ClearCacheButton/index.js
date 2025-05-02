import { useQueryClient } from "@tanstack/react-query";
import Button from "../Button";
import { clearCache } from "../../api/cache";

function ClearCacheButton() {
	const queryClient = useQueryClient();

	const handleClear = async () => {
		const confirmed = window.confirm("정말 캐시를 초기화하시겠습니까?");
		if (!confirmed) return;

		queryClient.clear();

		try {
			await clearCache();
			alert("프론트와 백엔드 캐시가 초기화되었습니다.");
		} catch (err) {
			console.error("백엔드 캐시 초기화 에러:", err);
			alert("백엔드 캐시 초기화 중 에러가 발생했습니다.");
		}
	};

	return (
		<Button type="danger" onClick={handleClear}>
			캐시 초기화
		</Button>
	);
}

export default ClearCacheButton;
