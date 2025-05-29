export const handleAuthError = async (res: Response): Promise<void> => {
	if (res.status === 401) {
		const data = await res.json();
		const message = data.message;
		// console.log("handleAuthError 진입: ", message);

		if (message === "jwt expired") {
			alert("세션이 만료되었습니다. 다시 로그인해주세요.");
			localStorage.removeItem("token");
			window.location.href = "/login";
			return;
		} else if (message === "jwt malformed" || message === "invalid token") {
			alert("유효하지 않은 인증입니다. 다시 로그인해주세요.");
			localStorage.removeItem("token");
			window.location.href = "/login";
			return;
		} else {
			throw new Error(message || "인증 오류가 발생했습니다.");
		}
	} else if (res.status === 403) {
		alert("이 리소스에 접근할 권한이 없습니다.");
		window.location.href = "/";
	}
};
